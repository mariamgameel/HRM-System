import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const hrLinks = [
  { to: "/hr/dashboard",   icon: "⊞", label: "Dashboard" },
  { to: "/hr/employees",   icon: "👥", label: "Employees" },
  { to: "/hr/departments", icon: "🏢", label: "Departments" },
  { to: "/hr/attendance",  icon: "🕐", label: "Attendance" },
  { to: "/hr/leaves",      icon: "📅", label: "Leave Requests" },
];

const employeeLinks = [
  { to: "/employee/dashboard",  icon: "⊞", label: "Dashboard" },
  { to: "/employee/profile",    icon: "👤", label: "My Profile" },
  { to: "/employee/attendance", icon: "🕐", label: "My Attendance" },
  { to: "/employee/leaves",     icon: "📅", label: "My Leaves" },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const links = user?.role === "hr" ? hrLinks : employeeLinks;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-52 shrink-0 h-screen sticky top-0 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 flex flex-col">

      <div className="px-4 py-4 border-b border-gray-200 dark:border-slate-700">
        <p className="text-sm font-medium text-gray-900 dark:text-slate-100">
          🏢 HRMS
        </p>
        <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">
          {user?.role === "hr" ? "HR Portal" : "Employee Portal"}
        </p>
      </div>

      <nav className="flex-1 px-2 py-3 flex flex-col gap-0.5">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium"
                  : "text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-slate-100"
              }`
            }
          >
            <span className="text-base">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-3 border-t border-gray-200 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-2 px-1">
          <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-xs font-medium text-indigo-600 dark:text-indigo-400">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-900 dark:text-slate-100 truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-400 dark:text-slate-500 capitalize">
              {user?.role}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full text-left px-3 py-1.5 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}