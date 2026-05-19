import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import AddMedicalRecordForm from "../components/AddMedicalRecordForm";

import MedicalHistoryTimeline from "../components/MedicalHistoryTimeline";

import PatientInfoCard from "../components/PatientInfoCard";

import PatientAppointments from "../components/PatientAppointments";

import {
  getPatientMedicalHistory
} from "../services/medicalRecordService";

import {
  getPatients
} from "../services/patientService";

import {
  getPatientAppointments
} from "../services/appointmentService";

export default function PatientProfile() {

  const { id } = useParams();

  const [records, setRecords] =
    useState([]);

  const [patient, setPatient] =
    useState(null);

  const [appointments, setAppointments] =
    useState([]);

  const fetchHistory = async () => {

    try {

      const data =
        await getPatientMedicalHistory(id);

      setRecords(data);

    } catch (error) {
      console.error(error);
    }
  };

  const fetchPatient = async () => {

    try {

      const patients =
        await getPatients();

      const foundPatient =
        patients.find(
          (p) => p.id === Number(id)
        );

      setPatient(foundPatient);

    } catch (error) {
      console.error(error);
    }
  };

  const fetchAppointments =
    async () => {

      try {

        const data =
          await getPatientAppointments(id);

        setAppointments(data);

      } catch (error) {
        console.error(error);
      }
  };

  useEffect(() => {

    fetchPatient();

    fetchAppointments();

    fetchHistory();

  }, []);

  return (
    <MainLayout>

      <div>

        <h1 className="text-3xl font-bold mb-6">
          Patient Profile
        </h1>

        <PatientInfoCard patient={patient} />

        <PatientAppointments
          appointments={appointments}
        />

        <AddMedicalRecordForm
          patientId={id}
          fetchHistory={fetchHistory}
        />

        <MedicalHistoryTimeline
          records={records}
        />

      </div>

    </MainLayout>
  );
}