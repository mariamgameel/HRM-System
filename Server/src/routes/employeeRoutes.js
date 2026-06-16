const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const auth = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRolesMiddleware");
const upload = require("../middlewares/uploadMiddleware");


router.get("/", auth, authorizeRoles("hr"), employeeController.getAllEmployees);
router.get("/:id", auth, authorizeRoles("hr"), employeeController.getEmployeeById);
router.post("/", auth, authorizeRoles("hr"), employeeController.createEmployee);
router.put("/:id", auth, authorizeRoles("hr"), employeeController.updateEmployee);
router.patch("/:id/status", auth, authorizeRoles("hr"), employeeController.updateEmployeeStatus);
router.get("/:id/salary", auth, authorizeRoles("hr"), employeeController.getEmployeeSalary);
router.post("/:id/upload-docs",
    auth,
    authorizeRoles("hr"), 
    upload.fields([
        { name: "profilePicture", maxCount: 1 },
        { name: "cv", maxCount: 1 },
    ]),
    employeeController.uploadEmployeeDocs
);
router.delete("/:id", auth, authorizeRoles("hr"), employeeController.deleteEmployee);

module.exports = router;