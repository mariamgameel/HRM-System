const User = require("../models/User.model");
const calculateSalary = require("../utils/calculateSalary");
const {
    createEmployeeSchema,
    updateEmployeeSchema,
    updateStatusSchema,
} = require("../validators/employeeValidator");


const getAllEmployees = async (req, res) => {
    try {
        const employees = await User.find({ role: "employee" }).select("_password");
        res.status(200).json({ count: employees.length, employees });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


const getEmployeeById = async (req, res) => {
    try {
        const employee = await User.findById(req.params.id).select("-password");
        if (!employee || employee.role !== "employee") {
            return res.status(404).json({ msg: "Employee not found" });
        }
        res.status(200).json({ employee });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


const createEmployee = async (req, res) => {
    try {
        const { error } = createEmployeeSchema.validate(req.body, { abortEarly: false });
        if (error) return res.status(400).json({ msg: error.details.map(d => d.message) });
        const { name, email, phone, department, position, salary, hireDate } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "An account with this email already exists" });
        }
        const bcrypt = require("bcrypt");
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("Employee@123", salt);
        const employee = await User.create({
            name, 
            email,
            phone,
            department,
            position,
            salary: salary || 0,
            hireDate: hireDate || Date.now(),
            password: hashedPassword,
            role: "employee",
            status: "active",
        });
        const employeeResponse = employee.toObject();
        delete employeeResponse.password;
        res.status(201).json({ msg: "Employee created successfully", employee: employeeResponse });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


const updateEmployee = async (req, res) => {
    try {
        const { error } = updateEmployeeSchema.validate(req.body, { abortEarly: false });
        if (error) return res.status(400).json({ msg: error.details.map(d => d.message) });
        const employee = await User.findById(req.params.id);
        if (!employee || employee.role !== "employee") {
            return res.status(404).json({ msg: "Employee not found" });
        }
        const updatedEmployee = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).select("-password");
    } catch (error) {
        res.status(500).json({ msg: error.message});
    }
};


const updateEmployeeStatus = async (req, res) => {
    try {
        const { error } = updateStatusSchema.validate(req.body, { abortEarly: false });
        if (error) return res.status(400).json({ msg: error.details.map(d => d.message) });
        const { status } = req.body;
        const employee = await User.findById(req.params.id);
        if (!employee || employee.role !== "employee") {
            return res.status(404).json({ msg: "Employee not found" });
        }
        employee.status = status;
        await employee.save();
        res.status(200).json({ msg: `Employee status updated to "${status}"`, employee });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


const getEmployeeSalary = async (req, res) => {
    try {
        const employee = await User.findById(req.params.id).select("name salary role");
        if (!employee || employee.role !== "employee") {
            return res.status(404).json({ msg: "Employee not found" });
        }
        const bonus = parseFloat(req.query.bonus) || 0;
        const deductions = parseFloat(req.query.deductions) || 0;
        const netSalary = calculateSalary(employee.salary, bonus, deductions);
        res.status(200).json({
            employee: employee.name,
            baseSalary: employee.salary,
            bonus,
            deductions,
            netSalary,
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


const uploadEmployeeDocs = async (req, res) => {
    try {
        const employee = await User.findById(req.params.id);
        if (!employee || employee.role !== "employee") {
            return res.status(404).json({ msg: "Employee not found" });
        }
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ msg: "No files were uploaded" });
        }
        if (req.files.profilePicture) {
            employee.profileImage = req.files.profilePicture[0].path;
        }
        if (req.files.cv) {
            employee.cv = req.files.cv[0].path;
        }
        await employee.save();
        res.status(200).json({
            msg: "Documents uploaded successfully",
            profilePicture: req.files.profilePicture?.[0].path || null,
            cv: req.files.cv?.[0].path || null,
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


const deleteEmployee = async (req, res) => {
    try {
        const employee = await User.findById(req.params.id);
        if (!employee || employee.role !== "employee") {
            return res.status(404).json({ msg: "Employee not found" });
        }
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    updateEmployeeStatus,
    getEmployeeSalary,
    uploadEmployeeDocs,
    deleteEmployee,
};