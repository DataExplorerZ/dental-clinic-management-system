import {
  useEffect,
  useState
} from "react";

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

      <div>

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            Patients
          </h1>

          <input
            type="text"
            placeholder="Search patient..."
            className="border p-3 rounded-lg w-80"
            value={search}
            onChange={handleSearch}
          />

        </div>

        <AddPatientForm
          fetchPatients={fetchPatients}
        />

        <PatientsTable
          patients={patients}
        />

      </div>

    </MainLayout>
  );
}