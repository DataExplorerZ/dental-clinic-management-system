import { useState } from "react";

import {
  createPatient
} from "../services/patientService";

export default function AddPatientForm({
  fetchPatients
}) {

  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    address: "",
    age: "",
    gender: "",
    blood_group: "",
    allergies: "",
    diseases: "",
    smoking_history: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await createPatient(formData);

      alert("Patient added successfully");

      fetchPatients();

      setFormData({
        full_name: "",
        phone_number: "",
        email: "",
        address: "",
        age: "",
        gender: "",
        blood_group: "",
        allergies: "",
        diseases: "",
        smoking_history: "",
        notes: "",
      });

    } catch (error) {
      alert("Error adding patient");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md mb-6"
    >

      <h2 className="text-2xl font-bold mb-4">
        Add Patient
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          className="border p-3 rounded-lg"
          value={formData.full_name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          className="border p-3 rounded-lg"
          value={formData.phone_number}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          className="border p-3 rounded-lg"
          value={formData.address}
          onChange={handleChange}
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          className="border p-3 rounded-lg"
          value={formData.age}
          onChange={handleChange}
        />

        <select
          name="gender"
          className="border p-3 rounded-lg"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

      </div>

      <button
        type="submit"
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Add Patient
      </button>

    </form>
  );
}