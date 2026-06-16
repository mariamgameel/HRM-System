const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        role: {
            type: String,
            enum: ["hr", "employee"],
            default: "employee"
        },
        department: {
            type: String,
            default: ""
        },
        salary: {
            type: Number,
            default: 0
        },
        profileImage: {
            type: String,
            default: ""
        },
        position: {
            type: String,
            default: ""
        },
        hireDate: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            enum: ["active", "inactive", "suspended"],
            default: "active"
        },
    }, {timestamps: true}
);

module.exports = mongoose.model("User", userSchema);