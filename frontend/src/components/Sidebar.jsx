import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  LogOut,
  Stethoscope
} from "lucide-react";

import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

export default function Sidebar() {

  const navigate = useNavigate();

  const location = useLocation();

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  const menuItems = [

    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard"
    },

    {
      name: "Patients",
      icon: Users,
      path: "/patients"
    },

    {
      name: "Appointments",
      icon: Calendar,
      path: "/appointments"
    },

    {
      name: "Invoices",
      icon: FileText,
      path: "/invoices"
    }
  ];

  return (

    <div className="w-72 min-h-screen bg-white border-r border-gray-200 flex flex-col shadow-sm">

      <div className="h-24 flex items-center px-8 border-b border-gray-100">

        <div className="flex items-center gap-4">

          <div className="bg-blue-600 text-white p-3 rounded-2xl shadow-md">

            <Stethoscope size={24} />

          </div>

          <div>

            <h1 className="text-2xl font-bold text-gray-800">
              Dental CMS
            </h1>

            <p className="text-sm text-gray-500">
              Clinic Management
            </p>

          </div>

        </div>

      </div>

      <nav className="flex-1 px-5 py-8 space-y-3">

        {menuItems.map((item, index) => {

          const Icon = item.icon;

          const isActive =
            location.pathname === item.path;

          return (

            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 group ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >

              <Icon
                size={22}
                className={`${
                  isActive
                    ? "text-white"
                    : "text-gray-500 group-hover:text-blue-600"
                }`}
              />

              <span className="font-medium text-[15px]">
                {item.name}
              </span>

            </Link>

          );
        })}

      </nav>

      <div className="p-5 border-t border-gray-100">

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl transition-all duration-200 shadow-md"
        >

          <LogOut size={18} />

          <span className="font-medium">
            Logout
          </span>

        </button>

      </div>

    </div>
  );
} 