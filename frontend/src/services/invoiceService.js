import api from "./api";

export const getInvoices =
  async (
    search = "",
    status = ""
  ) => {

    const response = await api.get(
      `/invoices?search=${search}&status=${status}`
    );

    return response.data;
};
export const createInvoice = async (
  invoiceData
) => {

  const response = await api.post(
    "/invoices",
    invoiceData
  );

  return response.data;
};
export const getSingleInvoice =
  async (invoiceId) => {

    const response = await api.get(
      `/invoices/${invoiceId}`
    );

    return response.data;
};