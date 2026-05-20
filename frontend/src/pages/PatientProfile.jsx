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

import PatientInvoices from "../components/PatientInvoices";

import {
  getPatientMedicalHistory
} from "../services/medicalRecordService";

import {
  getPatients
} from "../services/patientService";

import {
  getPatientAppointments
} from "../services/appointmentService";

import {
  getPatientInvoices
} from "../services/invoiceService";

export default function PatientProfile() {

  const { id } = useParams();

  const [records, setRecords] =
    useState([]);

  const [patient, setPatient] =
    useState(null);

  const [appointments, setAppointments] =
    useState([]);

  const [invoices, setInvoices] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // Fetch Medical History

  const fetchHistory = async () => {

    try {

      const data =
        await getPatientMedicalHistory(id);

      setRecords(data || []);

    } catch (error) {

      console.error(
        "Medical History Error:",
        error
      );
    }
  };

  // Fetch Patient Details

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

      console.error(
        "Patient Fetch Error:",
        error
      );
    }
  };

  // Fetch Appointments

  const fetchAppointments =
    async () => {

      try {

        const data =
          await getPatientAppointments(id);

        setAppointments(data || []);

      } catch (error) {

        console.error(
          "Appointments Error:",
          error
        );
      }
    };

  // Fetch Invoices

  const fetchInvoices =
    async () => {

      try {

        const data =
          await getPatientInvoices(id);

        setInvoices(data || []);

      } catch (error) {

        console.error(
          "Invoices Error:",
          error
        );
      }
    };

  // Initial Load

  useEffect(() => {

    const loadData =
      async () => {

        setLoading(true);

        await Promise.all([

          fetchPatient(),

          fetchAppointments(),

          fetchHistory(),

          fetchInvoices()

        ]);

        setLoading(false);
      };

    loadData();

  }, [id]);

  // Loading State

  if (loading) {

    return (

      <MainLayout>

        <div className="flex items-center justify-center py-20">

          <p className="text-gray-500 text-lg">
            Loading Patient Profile...
          </p>

        </div>

      </MainLayout>
    );
  }

  // Analytics Calculations

  const totalAppointments =
    appointments?.length || 0;

  const totalInvoices =
    invoices?.length || 0;

  const totalRevenue =
    invoices?.reduce(

      (total, invoice) =>

        total +
        Number(
          invoice.total_amount || 0
        ),

      0

    ) || 0;

  const pendingPayments =
    invoices?.filter(

      (invoice) =>

        invoice.payment_status ===
        "Unpaid"

    ).length || 0;

  return (

    <MainLayout>

      <div className="space-y-8">

        {/* Header */}

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">

          <h1 className="text-4xl font-bold text-gray-800">
            Patient Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Complete patient clinical and billing overview
          </p>

        </div>

        {/* Patient Information */}

        <PatientInfoCard patient={patient} />

        {/* Analytics Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Total Appointments */}

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

            <p className="text-gray-500 text-sm">
              Total Appointments
            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-3">

              {totalAppointments}

            </h2>

          </div>

          {/* Total Invoices */}

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

            <p className="text-gray-500 text-sm">
              Total Invoices
            </p>

            <h2 className="text-4xl font-bold text-indigo-600 mt-3">

              {totalInvoices}

            </h2>

          </div>

          {/* Total Revenue */}

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

            <p className="text-gray-500 text-sm">
              Total Revenue
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-3">

              Rs. {totalRevenue}

            </h2>

          </div>

          {/* Pending Payments */}

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

            <p className="text-gray-500 text-sm">
              Pending Payments
            </p>

            <h2 className="text-4xl font-bold text-red-600 mt-3">

              {pendingPayments}

            </h2>

          </div>

        </div>

        {/* Appointments Section */}

        <PatientAppointments
          appointments={appointments}
        />

        {/* Invoice History Section */}

        <PatientInvoices
          invoices={invoices}
        />

        {/* Medical Record Form */}

        <AddMedicalRecordForm
          patientId={id}
          fetchHistory={fetchHistory}
        />

        {/* Medical Timeline */}

        <MedicalHistoryTimeline
          records={records}
        />

      </div>

    </MainLayout>
  );
}