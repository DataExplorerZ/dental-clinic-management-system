import {
  Bell,
  CalendarDays
} from "lucide-react";

export default function Navbar() {

  const today =
    new Date().toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }
    );

  return (

    <header className="bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between shadow-sm">

      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">

          <CalendarDays size={16} />

          <span>
            {today}
          </span>

        </div>

      </div>

      <div className="flex items-center gap-6">

        <button className="relative bg-gray-100 hover:bg-gray-200 transition-all duration-200 p-3 rounded-2xl">

          <Bell
            size={20}
            className="text-gray-600"
          />

          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>

        </button>

        <div className="flex items-center gap-4 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100">

          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-md">

            D

          </div>

          <div>

            <p className="font-semibold text-gray-800">
              Dr. Admin
            </p>

            <p className="text-sm text-gray-500">
              Dental Specialist
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}