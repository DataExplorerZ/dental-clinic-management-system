import api from "./api";

export const getAppointments =
  async (
    search = "",
    status = ""
  ) => {

    const response = await api.get(
      `/appointments?search=${search}&status=${status}`
    );

    return response.data;
};

export const createAppointment = async (
  appointmentData
) => {
  const response = await api.post(
    "/appointments",
    appointmentData
  );

  return response.data;
};
export const getPatientAppointments =
  async (patientId) => {

    const response = await api.get(
      `/appointments/patient/${patientId}`
    );

    return response.data;
};
export const updateAppointmentStatus =
  async (
    appointmentId,
    status
  ) => {

    const response = await api.put(
      `/appointments/${appointmentId}/status?status=${status}`
    );

    return response.data;
};
export const completeAppointment =
  async (appointmentId) => {

    const response =
      await api.put(

        `/appointments/${appointmentId}/complete`

      );

    return response.data;
};