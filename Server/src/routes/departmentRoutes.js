const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");
const auth = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRolesMiddleware");

router.get("/", auth, authorizeRoles("hr"), departmentController.getAllDepartments);
router.get("/:id", auth, authorizeRoles("hr"), departmentController.getDepartmentById);
router.get("/:id/employees", auth, authorizeRoles("hr"), departmentController.getDepartmentEmployees);
router.post("/", auth, authorizeRoles("hr"), departmentController.createDepartment);
router.put("/:id", auth, authorizeRoles("hr"), departmentController.updateDepartment);
router.delete("/:id", auth, authorizeRoles("hr"), departmentController.deleteDepartment);

module.exports = router;