const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerSchema, loginSchema } = require("../validators/authValidator");

const registerUser = async (req, res) => {
    try {
        const { error } = registerSchema.validate(req.body, { abortEarly: false });
        if (error) return res.status(400).json({ msg: error.details.map(d => d.message) });
        const { name,
                email,
                password, 
                phone } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "Email already exists" });
        };
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            name,
            email, 
            phone,
            password: hashedPassword
        });
        const userResponse = user.toObject();
        delete userResponse.password;
        res.status(201).json({ msg: "User registered successfully", userResponse });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body, { abortEarly: false });
        if (error) return res.status(400).json({ msg: error.details.map(d => d.message) });
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }
        const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
        );
        res.status(200).json({ msg: "Login successful", token });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser
};