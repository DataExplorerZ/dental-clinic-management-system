import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  LogOut,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col">

      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-blue-600">
          Dental CMS
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/patients"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100"
        >
          <Users size={20} />
          Patients
        </Link>

        <Link
          to="/appointments"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100"
        >
          <Calendar size={20} />
          Appointments
        </Link>

        <Link
          to="/invoices"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100"
        >
          <FileText size={20} />
          Invoices
        </Link>

      </nav>

      <div className="p-4 border-t">

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 text-white p-3 rounded-lg hover:bg-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </div>
  );
}