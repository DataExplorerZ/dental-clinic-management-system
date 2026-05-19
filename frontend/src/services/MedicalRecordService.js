import api from "./api";

export const getPatientMedicalHistory =
  async (patientId) => {

    const response = await api.get(
      `/medical-records/patient/${patientId}`
    );

    return response.data;
};

export const createMedicalRecord =
  async (recordData) => {

    const response = await api.post(
      "/medical-records",
      recordData
    );

    return response.data;
};