import {
  useEffect,
  useState
} from "react";

import MainLayout from "../layouts/MainLayout";

import AddInvoiceForm from "../components/AddInvoiceForm";

import InvoicesTable from "../components/InvoicesTable";

import {
  getInvoices
} from "../services/invoiceService";

export default function Invoices() {

  const [invoices, setInvoices] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const fetchInvoices =
    async (
      searchValue = "",
      statusValue = ""
    ) => {

      try {

        const data =
          await getInvoices(
            searchValue,
            statusValue
          );

        setInvoices(data);

      } catch (error) {
        console.error(error);
      }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleSearch = (e) => {

    const value = e.target.value;

    setSearch(value);

    fetchInvoices(value, status);
  };

  const handleStatus = (e) => {

    const value = e.target.value;

    setStatus(value);

    fetchInvoices(search, value);
  };

  return (
    <MainLayout>

      <div>

        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

          <h1 className="text-3xl font-bold">
            Invoices
          </h1>

          <div className="flex gap-4">

            <input
              type="text"
              placeholder="Search invoices..."
              className="border p-3 rounded-lg"
              value={search}
              onChange={handleSearch}
            />

            <select
              className="border p-3 rounded-lg"
              value={status}
              onChange={handleStatus}
            >

              <option value="">
                All Status
              </option>

              <option value="Paid">
                Paid
              </option>

              <option value="Unpaid">
                Unpaid
              </option>

            </select>

          </div>

        </div>

        <AddInvoiceForm
          fetchInvoices={fetchInvoices}
        />

        <InvoicesTable
          invoices={invoices}
        />

      </div>

    </MainLayout>
  );
}