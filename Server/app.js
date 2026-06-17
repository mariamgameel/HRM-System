require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const employeeRoutes = require("./src/routes/employeeRoutes");
const departmentRoutes = require("./src/routes/departmentRoutes");
const attendanceRoutes = require("./src/routes/attendanceRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/attendance", attendanceRoutes);


const connectedDB = require("./src/config/db");
connectedDB();

const port = process.env.PORT || 3000;

app.use((req, res) => {
    res.status(404).json({msg: "Route not found"});
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});