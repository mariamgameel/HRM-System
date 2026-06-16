const Department = require("../models/department.model");
const User = require("../models/User.model");
const {
    createDepartmentSchema,
    updateDepartmentSchema,
} = require("../validators/departmentValidator");


const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.status(200).json({ count: departments.length, departments });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


const getDepartmentById = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        if (!department) {
            return res.status(404).json({ msg: "Department not found" });
        }
        const employeeCount = await User.countDocuments({
            department: department.name,
            role: "employee",
            status: "active",
        });
        res.status(200).json({ department, employeeCount });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


const createDepartment = async (req, res) => {
    try {
        const { error } = createDepartmentSchema.validate(req.body, { abortEarly: false });
        if (error) return res.status(400).json({ msg: error.details.map(d => d.message) });
        const { name, description } = req.body;
        const existing = await Department.findOne({ name: new RegExp(`^${name}$`, "i") });
        if (existing) {
            return res.status(400).json({ msg: "A department with this name already exists" });
        }
        const department = await Department.create({ name, description });
        res.status(201).json({ msg: "Department created successfully", department });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


const updateDepartment = async (req, res) => {
    try {
        const { error } = updateDepartmentSchema.validate(req.body, { abortEarly: false });
        if (error) return res.status(400).json({ msg: error.details.map(d => d.message) });
        const department = await Department.findById(req.params.id);
        if (!department) {
            return res.status(404).json({ msg: "Department not found" });
        }
        if (req.body.name) {
            const duplicate = await Department.findOne({
                name: new RegExp(`^${req.body.name}$`, "i"),
                _id: { $ne: req.params.id },
            });
            if (duplicate) {
                return res.status(400).json({ msg: "A department with this name already exists" });
            }
        }
        const updated = await Department.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({ msg: "Department updated successfully", department: updated });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


const deleteDepartment = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        if (!department) {
            return res.status(404).json({ msg: "Department not found" });
        }
        const employeeCount = await User.countDocuments({
            department: depatment.name,
            role: "employee",
            status: "active",
        });
        if (employeeCount > 0) {
            return res.status(400).json({
                msg: `Cannot delete department - ${employeeCount} active employee(s) still assigned to it. Reassign them first.`,
            });
        }
        await Department.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "Department deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


const getDepartmentEmployees = async (req, res) => {
    try {
        const department  = await Department.findById(req.params.id);
        if (!department) {
            return res.status(404).json({ msg: "Department not found" });
        }
        const employees = await User.find({
            department: department.name,
            role: "employee"
        }).select("-password");
        res.status(200).json({
            department: department.name,
            count: employees.length,
            employees,
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


module.exports = {
    getAllDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    getDepartmentEmployees
};