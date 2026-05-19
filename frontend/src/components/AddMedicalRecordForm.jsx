import { useEffect, useState } from "react";

import {
  createMedicalRecord
} from "../services/medicalRecordService";

import {
  getPatientAppointments
} from "../services/appointmentService";

export default function AddMedicalRecordForm({
  patientId,
  fetchHistory
}) {

  const [appointments, setAppointments] =
    useState([]);

  const [formData, setFormData] = useState({
    appointment_id: "",
    symptoms: "",
    diagnosis: "",
    treatment_notes: "",
    follow_up_notes: "",
  });

  useEffect(() => {

    const fetchAppointments = async () => {

      try {

        const data =
          await getPatientAppointments(
            patientId
          );

        setAppointments(data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchAppointments();

  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await createMedicalRecord({
        patient_id: Number(patientId),
        appointment_id: Number(
          formData.appointment_id
        ),
        symptoms: formData.symptoms,
        diagnosis: formData.diagnosis,
        treatment_notes:
          formData.treatment_notes,
        follow_up_notes:
          formData.follow_up_notes,
      });

      alert("Medical record added");

      fetchHistory();

      setFormData({
        appointment_id: "",
        symptoms: "",
        diagnosis: "",
        treatment_notes: "",
        follow_up_notes: "",
      });

    } catch (error) {

      console.error(error);

      alert("Error adding medical record");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md mb-6"
    >

      <h2 className="text-2xl font-bold mb-4">
        Add Medical Record
      </h2>

      <select
        name="appointment_id"
        className="border p-3 rounded-lg w-full mb-4"
        value={formData.appointment_id}
        onChange={handleChange}
        required
      >

        <option value="">
          Select Appointment
        </option>

        {appointments.map((appointment) => (

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

      <textarea
        name="symptoms"
        placeholder="Symptoms"
        className="border p-3 rounded-lg w-full mb-4"
        rows="3"
        value={formData.symptoms}
        onChange={handleChange}
      />

      <textarea
        name="diagnosis"
        placeholder="Diagnosis"
        className="border p-3 rounded-lg w-full mb-4"
        rows="3"
        value={formData.diagnosis}
        onChange={handleChange}
      />

      <textarea
        name="treatment_notes"
        placeholder="Treatment Notes"
        className="border p-3 rounded-lg w-full mb-4"
        rows="3"
        value={formData.treatment_notes}
        onChange={handleChange}
      />

      <textarea
        name="follow_up_notes"
        placeholder="Follow-up Notes"
        className="border p-3 rounded-lg w-full mb-4"
        rows="3"
        value={formData.follow_up_notes}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Save Medical Record
      </button>

    </form>
  );
}