const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");
const auth = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRolesMiddleware");


router.post("/clockin", auth, authorizeRoles("employee"), attendanceController.clockIn);
router.post("/clockout", auth, authorizeRoles("employee"), attendanceController.clockOut);
router.get("/my", auth, authorizeRoles("employee"), attendanceController.getMyAttendance);
router.get("/", auth, authorizeRoles("hr"), attendanceController.getAllAttendance);
router.get("employee/:employeeId", auth, authorizeRoles("hr"), attendanceController.getEmployeeAttendance);
router.post("manual", auth, authorizeRoles("hr"), attendanceController.markManualAttendance);
router.put("/:id", auth, authorizeRoles("hr"), attendanceController.updateAttendance);
router.delete("/:id", auth, authorizeRoles("hr"), attendanceController.deleteAttendance);


module.exports = router;