import {
  useEffect,
  useState
} from "react";

import { createMedicalRecord } from "../services/MedicalRecordService";
import {
  getPatientAppointments,
  completeAppointment
} from "../services/appointmentService";

export default function AddMedicalRecordForm({
  patientId,
  fetchHistory
}) {

  const [appointments, setAppointments] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      appointment_id: "",

      symptoms: "",

      diagnosis: "",

      treatment_notes: "",

      follow_up_notes: "",

    });

  // Fetch Patient Appointments

  useEffect(() => {

    const fetchAppointments = async () => {

      try {

        const data =
          await getPatientAppointments(
            patientId
          );

        setAppointments(data || []);

      } catch (error) {

        console.error(error);
      }
    };

    fetchAppointments();

  }, [patientId]);

  // Handle Input Changes

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // Submit Medical Record

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      try {

        // Create Medical Record

        await createMedicalRecord({

          patient_id:
            Number(patientId),

          appointment_id:
            Number(
              formData.appointment_id
            ),

          symptoms:
            formData.symptoms,

          diagnosis:
            formData.diagnosis,

          treatment_notes:
            formData.treatment_notes,

          follow_up_notes:
            formData.follow_up_notes,
        });

        // Auto Complete Appointment

        await completeAppointment(
          Number(
            formData.appointment_id
          )
        );

        alert(
          "Medical record added successfully"
        );

        // Refresh History

        fetchHistory();

        // Reset Form

        setFormData({

          appointment_id: "",

          symptoms: "",

          diagnosis: "",

          treatment_notes: "",

          follow_up_notes: "",
        });

      } catch (error) {

        console.error(error);

        alert(
          "Error adding medical record"
        );

      } finally {

        setLoading(false);
      }
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-8"
    >

      {/* Header */}

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-gray-800">
          Add Medical Record
        </h2>

        <p className="text-gray-500 mt-1">
          Add treatment notes and update patient history
        </p>

      </div>

      {/* Appointment Selection */}

      <select
        name="appointment_id"
        className="border border-gray-200 p-4 rounded-2xl w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={formData.appointment_id}
        onChange={handleChange}
        required
      >

        <option value="">
          Select Appointment
        </option>

        {appointments.map(
          (appointment) => (

          <option
            key={appointment.id}
            value={appointment.id}
          >

            {appointment.treatment_type}

            {" — "}

            {appointment.appointment_date}

          </option>

        ))}

      </select>

      {/* Symptoms */}

      <textarea
        name="symptoms"
        placeholder="Symptoms"
        className="border border-gray-200 p-4 rounded-2xl w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="3"
        value={formData.symptoms}
        onChange={handleChange}
      />

      {/* Diagnosis */}

      <textarea
        name="diagnosis"
        placeholder="Diagnosis"
        className="border border-gray-200 p-4 rounded-2xl w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="3"
        value={formData.diagnosis}
        onChange={handleChange}
      />

      {/* Treatment Notes */}

      <textarea
        name="treatment_notes"
        placeholder="Treatment Notes"
        className="border border-gray-200 p-4 rounded-2xl w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="3"
        value={formData.treatment_notes}
        onChange={handleChange}
      />

      {/* Follow Up */}

      <textarea
        name="follow_up_notes"
        placeholder="Follow-up Notes"
        className="border border-gray-200 p-4 rounded-2xl w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="3"
        value={formData.follow_up_notes}
        onChange={handleChange}
      />

      {/* Submit Button */}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-8 py-3 rounded-2xl hover:bg-blue-700 transition-all duration-200 disabled:opacity-50"
      >

        {loading
          ? "Saving..."
          : "Save Medical Record"}

      </button>

    </form>
  );
}