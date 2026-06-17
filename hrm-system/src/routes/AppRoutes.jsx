import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import HRDashboard from "../pages/hr/Dashboard";
import Employees from "../pages/hr/Employees";
import EmployeeProfile from "../pages/hr/EmployeeProfile";
import Departments from "../pages/hr/Departments";
import HRAttendance from "../pages/hr/Attendance";
import LeaveRequests from "../pages/hr/LeaveRequests";

import EmployeeDashboard from "../pages/employee/Dashboard";
import MyProfile from "../pages/employee/Profile";
import MyAttendance from "../pages/employee/Attendance";
import MyLeaves from "../pages/employee/Leaves";

const ProtectedRoute = ({ children, allowedRole }) => {
    const { token, user } = useAuth();
    if (!token) return <Navigate to="/login" replace />
    if (allowedRole && user?.role !== allowedRole) {
        return <Navigate to={user?.role === "hr" ? "/hr/dashboard" : "/employee/dashboard"} replace />
    }
    return children;
};

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />


                <Route path="/" element={<Navigate to="/login" replace />} />


                <Route path="/hr/dashboard" element={
                    <ProtectedRoute allowedRole="hr"><HRDashboard /></ProtectedRoute>
                }/>
                <Route path="/hr/employees" element={
                    <ProtectedRoute allowedRole="hr"><Employees /></ProtectedRoute>
                }/>
                <Route path="/hr/employees/:id" element={
                    <ProtectedRoute allowedRole="hr"><EmployeeProfile /></ProtectedRoute>
                }/>
                <Route path="/hr/departments" element={
                    <ProtectedRoute allowedRole="hr"><Departments /></ProtectedRoute>
                }/>
                <Route path="/hr/attendance" element={
                    <ProtectedRoute allowedRole="hr"><HRAttendance /></ProtectedRoute>
                }/>
                <Route path="/hr/leaves" element={
                    <ProtectedRoute allowedRole="hr"><LeaveRequests /></ProtectedRoute>
                }/>


                <Route path="/employee/dashboard" element={
                    <ProtectedRoute allowedRole="employee"><EmployeeDashboard /></ProtectedRoute>
                }/>
                <Route path="/employee/profile" element={
                    <ProtectedRoute allowedRole="employee"><MyProfile /></ProtectedRoute>
                }/>
                <Route path="/employee/attendance" element={
                    <ProtectedRoute allowedRole="employee"><MyAttendance /></ProtectedRoute>
                }/>
                <Route path="/employee/leaves" element={
                    <ProtectedRoute allowedRole="employee"><MyLeaves /></ProtectedRoute>
                }/>


                <Route path="*" element={<Navigate to="/login" replace />} />

            </Routes>
        </BrowserRouter>
    );
}