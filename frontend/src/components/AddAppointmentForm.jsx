import { useEffect, useState } from "react";

import {
  getPatients
} from "../services/patientService";

import {
  createAppointment
} from "../services/appointmentService";

export default function AddAppointmentForm({
  fetchAppointments
}) {

  const [patients, setPatients] = useState([]);

  const [formData, setFormData] = useState({
    patient_id: "",
    appointment_date: "",
    appointment_time: "",
    treatment_type: "",
    status: "Scheduled",
    notes: "",
  });

  useEffect(() => {

    const fetchPatients = async () => {

      try {

        const data = await getPatients();

        setPatients(data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchPatients();

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

      await createAppointment(formData);

      alert("Appointment created successfully");

      fetchAppointments();

      setFormData({
        patient_id: "",
        appointment_date: "",
        appointment_time: "",
        treatment_type: "",
        status: "Scheduled",
        notes: "",
      });

    } catch (error) {

      alert(
        error.response?.data?.detail ||
        "Error creating appointment"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md mb-6"
    >

      <h2 className="text-2xl font-bold mb-4">
        Create Appointment
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <select
          name="patient_id"
          className="border p-3 rounded-lg"
          value={formData.patient_id}
          onChange={handleChange}
        >

          <option value="">
            Select Patient
          </option>

          {patients.map((patient) => (

            <option
              key={patient.id}
              value={patient.id}
            >
              {patient.full_name}
            </option>

          ))}

        </select>

        <input
          type="date"
          name="appointment_date"
          className="border p-3 rounded-lg"
          value={formData.appointment_date}
          onChange={handleChange}
        />

        <input
          type="time"
          name="appointment_time"
          className="border p-3 rounded-lg"
          value={formData.appointment_time}
          onChange={handleChange}
        />

        <input
          type="text"
          name="treatment_type"
          placeholder="Treatment Type"
          className="border p-3 rounded-lg"
          value={formData.treatment_type}
          onChange={handleChange}
        />

      </div>

      <textarea
        name="notes"
        placeholder="Notes"
        className="border p-3 rounded-lg w-full mt-4"
        rows="4"
        value={formData.notes}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Create Appointment
      </button>

    </form>
  );
}