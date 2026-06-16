const Attendance = require("../models/Attendance.model");
const User = require("../models/User.model");
const {
    manualAttendanceSchema,
    updateAttendance,
} = require("../validators/attendanceValidator");


const getStartOfDay = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
};

const clockIn = async (req, res) => {
    try {
        const employeeId = req.user.id;
        const now = new Date();
        const today = getStartOfDay(now);

        const existing = await Attendance.findOne({
            employee: employeeId,
            date: today
        });
        if (existing) {
            return res.status(400).json({ msg: "You have already clocked in today" });
        }

        const lateThreshold = new Date(today);
        lateThreshold.setHours(9, 0, 0, 0);
        const status = now > lateThreshold ? "late" : "present";

        const attendance = await Attendance.create({
            employee: employeeId,
            date: today,
            clockIn: now,
            status
        });

        res.status(201).json({
            msg: status === "late"
            ? "Clocked in successfully - marked as late"
            : "Clocked in successfully",
            attendance
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


const clockOut = async (req, res) => {
    try {
        const employeeId = req.user.id;
        const now = new Date();
        const today = getStartOfDay(now);

        const attendance = await Attendance.findOne({
            employee: employeeId,
            date: today
        });
        if (!attendance) {
            return res.status(400).json({ msg: "You have not clocked in today" });
        }
        if (attendance.clockOut) {
            return res.status(400).json({ msg: "You have already clocked out today" });
        }

        const totalHours = parseFloat(
            ((now - attendance.clockIn) / (1000 * 60 * 90)).toFixed(2)
        );

        attendance.clockOut = now;
        attendance.totalHours = totalHours;
        await attendance.save();

        res.status(200).json({
            msg: "Clocked out successfully",
            attendance,
            totalHours: `${totalHours} hours`
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


const getMyAttendance = async (req, res) => {
    try {
        const records = await Attendance.find({ employee: req.user.id })
        .sort({ date: -1 });

        res.status(200).json({ count: records.length, records });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


const getEmployeeAttendance = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const employee = await User.findById(employeeId);
        if(!employee || employee.role !== "employee") {
            return res.status(404).json({ msg: "Employee not found" });
        }

        const query = { employee: employeeId };
        if (req.query.from || req.query.to) {
            query.date = {};
            if (req.query.from) query.date.$gte = getStartOfDay(req.query.from);
            if (req.query.to) query.date.$lte = getStartOfDay(req.query.to);
        }
        const records = (await Attendance.find(query)).sort({ date: -1 });

        res.status(200).json({
            employee: employee.name,
            count: records.length,
            records
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


const getAllAttendance = async (req, res) => {
    try {
        const query = {};
        if (req.query.date) {
            query.date = getStartOfDay(req.query.date);
        } else if (req.query.from || req.query.to) {
            query.date = {};
            if (req.query.from) query.date.$gte = getStartOfDay(req.query.from);
            if (req.query.to) query.date.$lte = getStartOfDay(req.query.to);
        }

        const records = await Attendance.find(query)
        .populate("employee", "name email department position")
        .sort({ date: -1 });

        res.status(200).json({ count: records.length, records });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


const markManualAttendance = async (req, res) => {
    try {
        const { error } = manualAttendanceSchema.validate(req.body, { abortEarly: false });
        if (error) return res.status(400).json({ msg: error.details.map(d => d.message) });

        const { employee, date, status, note } = req.body;
        const day = getStartOfDay(date);

        const employeeUser = await User.findById(employee);
        if (!employeeUser || employeeUser.role !== "employee") {
            return res.status(404).json({ msg: "Employee not found" });
        }

        const existing = await Attendance.findOne({ employee, date: day });
        if (existing) {
            return res.status(400).json({ msg: "An attendance record already exists for this employee on this date" });
        }

        const attendance = await Attendance.create({
            employee,
            date: day,
            status,
            note: note || ""
        });

        res.status(201).json({ msg: "Attendance marked successfully", attendance });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


const updateAttendance = async (req, res) => {
    try {
        const { error } = updateAttendanceSchema.validate(req.body, { abortEarly: false });
        if (error) return res.status(400).json({ msg: error.details.map(d => d.message) });

        const attendance = await Attendance.findById(req.params.id);
        if (!attendance) {
            return res.status(404).json({ msg: "Attendance record not found" });
        }

        object.assign(attendance, req.body);

        if (attendance.clockIn && attendance.clockOut) {
            attendance.totalHours = parseFloat(
                ((attendance.clockOut - attendance.clockIn) / (1000 * 60 * 60)).toFixed(2)
            );
        }
        await attendance.save();

        res.status(200).json({ msg: "Attendance updated successfully", attendance });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


const deleteAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndDelete(req.params.id);
        if (!attendance) {
            return res.status(404).json({ msg: "Attendance record not found" });
        }

        res.status(200).json({ msg: "Attendance record deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    clockIn,
    clockOut,
    getMyAttendance,
    getEmployeeAttendance,
    getAllAttendance,
    markManualAttendance,
    updateAttendance,
    deleteAttendance
};