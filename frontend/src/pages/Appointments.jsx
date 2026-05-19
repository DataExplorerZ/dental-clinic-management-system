import {
  useEffect,
  useState
} from "react";

import {
  Calendar,
  Search,
  ClipboardList,
  CheckCircle2
} from "lucide-react";

import MainLayout from "../layouts/MainLayout";

import AddAppointmentForm from "../components/AddAppointmentForm";

import AppointmentsTable from "../components/AppointmentsTable";

import {
  getAppointments
} from "../services/appointmentService";

export default function Appointments() {

  const [appointments, setAppointments] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const fetchAppointments =
    async (
      searchValue = "",
      statusValue = ""
    ) => {

      try {

        const data =
          await getAppointments(
            searchValue,
            statusValue
          );

        setAppointments(data);

      } catch (error) {
        console.error(error);
      }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleSearch = (e) => {

    const value = e.target.value;

    setSearch(value);

    fetchAppointments(value, status);
  };

  const handleStatus = (e) => {

    const value = e.target.value;

    setStatus(value);

    fetchAppointments(search, value);
  };

  const completedAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status === "Completed"
    ).length;

  return (

    <MainLayout>

      <div className="space-y-8">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

          <div>

            <h1 className="text-4xl font-bold text-gray-800">
              Appointments Management
            </h1>

            <p className="text-gray-500 mt-2">
              Manage patient appointments and scheduling.
            </p>

          </div>

          <div className="flex gap-4">

            <div className="bg-white rounded-2xl px-5 py-4 border border-gray-100 shadow-sm flex items-center gap-4">

              <div className="bg-blue-100 p-3 rounded-2xl">

                <Calendar
                  size={22}
                  className="text-blue-600"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Total Appointments
                </p>

                <h3 className="text-2xl font-bold text-gray-800">
                  {appointments.length}
                </h3>

              </div>

            </div>

            <div className="bg-white rounded-2xl px-5 py-4 border border-gray-100 shadow-sm flex items-center gap-4">

              <div className="bg-green-100 p-3 rounded-2xl">

                <CheckCircle2
                  size={22}
                  className="text-green-600"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Completed
                </p>

                <h3 className="text-2xl font-bold text-gray-800">
                  {completedAppointments}
                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* Filters */}

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">

          <div className="flex flex-col lg:flex-row gap-4">

            <div className="relative flex-1">

              <Search
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search appointments..."
                className="w-full pl-14 pr-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={handleSearch}
              />

            </div>

            <select
              className="px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[220px]"
              value={status}
              onChange={handleStatus}
            >

              <option value="">
                All Status
              </option>

              <option value="Scheduled">
                Scheduled
              </option>

              <option value="Completed">
                Completed
              </option>

              <option value="Cancelled">
                Cancelled
              </option>

            </select>

          </div>

        </div>

        {/* Add Appointment */}

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="bg-purple-100 p-3 rounded-2xl">

              <ClipboardList
                size={22}
                className="text-purple-600"
              />

            </div>

            <div>

              <h2 className="text-2xl font-bold text-gray-800">
                Schedule Appointment
              </h2>

              <p className="text-gray-500 text-sm">
                Create and manage clinic appointments.
              </p>

            </div>

          </div>

          <AddAppointmentForm
            fetchAppointments={fetchAppointments}
          />

        </div>

        {/* Table */}

        <AppointmentsTable
          appointments={appointments}
          fetchAppointments={fetchAppointments}
        />

      </div>

    </MainLayout>
  );
}