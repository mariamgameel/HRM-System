const User = require("../models/User.model");
const { updateUserSchema } = require ("../validators/userValidator");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ msg: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { error } = updateUserSchema.validate(req.body, { abortEarly: false });
        if (error) return res.status(400).json({ msg: error.details.map(d => d.message) });
        if (req.body.password) {
            const salt = await bcrypt.gensalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ msg: "User not found" });
        res.status(200).json({ msg: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ msg: "User not found" });
        res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};