const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRolesMiddleware");
const upload = require("../middlewares/uploadMiddleware");


router.get("/", auth, authorizeRoles("hr"), userController.getAllUsers);
router.get("/:id", auth, authorizeRoles("hr"), userController.getUserById);
router.put("/:id", auth, authorizeRoles("hr"), userController.updateUser);
router.delete("/:id", auth, authorizeRoles("hr"), userController.deleteUser);
router.post(
    "/upload-docs",
    auth,
    authorizeRoles("hr"),
    upload.fields([
        {name: "profilePicture", maxCount: 1},
        {name: "cv", maxCount: 1}
    ]),
    (req, res) => {
        res.json({
            msg: "Files uploaded successfully",
            profilePicture: req.files.profilePicture?.[0].path,
            cv: req.files.cv?.[0].path
        });
    }
);

module.exports = router;