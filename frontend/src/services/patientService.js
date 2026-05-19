import api from "./api";
export const getPatients =
  async (search = "") => {

    const response = await api.get(
      `/patients?search=${search}`
    );

    return response.data;
};

export const createPatient = async (
  patientData
) => {
  const response = await api.post(
    "/patients",
    patientData
  );

  return response.data;
};