import {
  useEffect,
  useState
} from "react";

import {
  Search,
  Users,
  UserPlus
} from "lucide-react";

import MainLayout from "../layouts/MainLayout";

import AddPatientForm from "../components/AddPatientForm";

import PatientsTable from "../components/PatientsTable";

import {
  getPatients
} from "../services/patientService";

export default function Patients() {

  const [patients, setPatients] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const fetchPatients =
    async (searchValue = "") => {

      try {

        const data =
          await getPatients(searchValue);

        setPatients(data);

      } catch (error) {
        console.error(error);
      }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSearch = async (e) => {

    const value = e.target.value;

    setSearch(value);

    fetchPatients(value);
  };

  return (

    <MainLayout>

      <div className="space-y-8">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

          <div>

            <h1 className="text-4xl font-bold text-gray-800">
              Patients Management
            </h1>

            <p className="text-gray-500 mt-2">
              Manage clinic patients and medical records.
            </p>

          </div>

          <div className="flex items-center gap-4">

            <div className="bg-white rounded-2xl px-5 py-4 border border-gray-100 shadow-sm flex items-center gap-4">

              <div className="bg-blue-100 p-3 rounded-2xl">

                <Users
                  size={22}
                  className="text-blue-600"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Total Patients
                </p>

                <h3 className="text-2xl font-bold text-gray-800">
                  {patients.length}
                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* Search */}

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">

          <div className="relative">

            <Search
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search patient by name or phone number..."
              className="w-full pl-14 pr-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              value={search}
              onChange={handleSearch}
            />

          </div>

        </div>

        {/* Add Patient Form */}

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="bg-blue-100 p-3 rounded-2xl">

              <UserPlus
                size={22}
                className="text-blue-600"
              />

            </div>

            <div>

              <h2 className="text-2xl font-bold text-gray-800">
                Add New Patient
              </h2>

              <p className="text-gray-500 text-sm">
                Register a patient into clinic records.
              </p>

            </div>

          </div>

          <AddPatientForm
            fetchPatients={fetchPatients}
          />

        </div>

        {/* Patients Table */}

        <PatientsTable
          patients={patients}
        />

      </div>

    </MainLayout>
  );
}