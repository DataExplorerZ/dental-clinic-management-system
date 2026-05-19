import {
  useEffect,
  useState
} from "react";

import MainLayout from "../layouts/MainLayout";

import {
  getDashboardStats
} from "../services/dashboardService";

export default function Dashboard() {

  const [stats, setStats] =
    useState(null);

  const fetchStats = async () => {

    try {

      const data =
        await getDashboardStats();

      setStats(data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>

      <div>

        <h1 className="text-3xl font-bold mb-8">
          Dashboard Overview
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow-md">

            <p className="text-gray-500">
              Total Patients
            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-2">
              {stats.total_patients}
            </h2>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">

            <p className="text-gray-500">
              Total Appointments
            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-2">
              {stats.total_appointments}
            </h2>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">

            <p className="text-gray-500">
              Today Appointments
            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-2">
              {stats.today_appointments}
            </h2>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">

            <p className="text-gray-500">
              Total Invoices
            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-2">
              {stats.total_invoices}
            </h2>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">

            <p className="text-gray-500">
              Total Revenue
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-2">
              Rs. {stats.total_revenue}
            </h2>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">

            <p className="text-gray-500">
              Pending Payments
            </p>

            <h2 className="text-4xl font-bold text-red-600 mt-2">
              {stats.pending_payments}
            </h2>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}