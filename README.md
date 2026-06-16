# HR Management System (HRM)

A full-stack HR Management System built using the MERN Stack.  
This project helps companies manage employees, attendance, departments, leaves, and payroll efficiently.

---

# Features

## Authentication & Authorization
- User Login & Register
- JWT Authentication
- Role-based Access Control (Admin / HR / Employee)

## Employee Management
- Add Employee
- Update Employee
- Delete Employee
- View Employee Details

## Attendance System
- Check In / Check Out
- Attendance Records
- Daily Tracking

## Leave Management
- Apply for Leave
- Approve / Reject Leave Requests
- Leave Status Tracking

## Department Management
- Create Departments
- Assign Employees to Departments

## Payroll System
- Salary Calculation
- Payroll Records
- Deductions Support

---

#  Tech Stack

## Frontend
- React.js
- React Router
- Axios
- Context API
- tailwind / CSS

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## Authentication
- JWT (JSON Web Token)
- bcrypt.js

## Tools
- Git & GitHub
- Postman
- Vite

---

# Project Structure

```bash
hr-management-system/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── validators/
│   │   ├── utils/
│   │   └── app.js
│   │
│   ├── .env
│   ├── package.json
│
├── .gitignore
├── README.md
```

---

#  Installation

## Clone the repository

```bash
git clone https://github.com/your-username/hr-management-system.git
```

## Navigate to project folder

```bash
cd hr-management-system
```

---

#  Install Backend Dependencies

```bash
cd server
npm install
```

---

#  Install Frontend Dependencies

```bash
cd ../client
npm install
```

---

# Environment Variables

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

# Run Backend

```bash
cd server
npm run dev
```

---

# Run Frontend

```bash
cd client
npm run dev
```

---

# API Endpoints

## Auth Routes
- POST `/api/auth/login`
- POST `/api/auth/register`

## Employee Routes
- GET `/api/employees`
- POST `/api/employees`
- PUT `/api/employees/:id`
- DELETE `/api/employees/:id`

## Attendance Routes
- POST `/api/attendance/check-in`
- POST `/api/attendance/check-out`

## Leave Routes
- POST `/api/leaves`
- PUT `/api/leaves/:id`

---

# Screenshots

Screenshots will be added later.

---

# Author

Developed by Mariam Gameel
