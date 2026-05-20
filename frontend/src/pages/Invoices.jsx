import {
  useEffect,
  useState
} from "react";

import {
  Search,
  Receipt,
  CircleDollarSign,
  AlertCircle
} from "lucide-react";

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

  const totalRevenue =
    invoices.reduce(
      (sum, invoice) =>
        sum + Number(invoice.total_amount || 0),
      0
    );

  const unpaidInvoices =
    invoices.filter(
      (invoice) =>
        invoice.payment_status === "Unpaid"
    ).length;

  return (

    <MainLayout>

      <div className="space-y-8">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

          <div>

            <h1 className="text-4xl font-bold text-gray-800">
              Invoice Management
            </h1>

            <p className="text-gray-500 mt-2">
              Manage clinic billing and patient invoices.
            </p>

          </div>

          <div className="flex gap-4">

            {/* Total Invoices */}

            <div className="bg-white rounded-2xl px-5 py-4 border border-gray-100 shadow-sm flex items-center gap-4">

              <div className="bg-blue-100 p-3 rounded-2xl">

                <Receipt
                  size={22}
                  className="text-blue-600"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Total Invoices
                </p>

                <h3 className="text-2xl font-bold text-gray-800">
                  {invoices.length}
                </h3>

              </div>

            </div>

            {/* Revenue */}

            <div className="bg-white rounded-2xl px-5 py-4 border border-gray-100 shadow-sm flex items-center gap-4">

              <div className="bg-green-100 p-3 rounded-2xl">

                <CircleDollarSign
                  size={22}
                  className="text-green-600"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Revenue
                </p>

                <h3 className="text-2xl font-bold text-green-600">
                  Rs. {totalRevenue}
                </h3>

              </div>

            </div>

            {/* Pending */}

            <div className="bg-white rounded-2xl px-5 py-4 border border-gray-100 shadow-sm flex items-center gap-4">

              <div className="bg-red-100 p-3 rounded-2xl">

                <AlertCircle
                  size={22}
                  className="text-red-600"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Pending
                </p>

                <h3 className="text-2xl font-bold text-red-600">
                  {unpaidInvoices}
                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* Filters */}

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">

          <div className="flex flex-col lg:flex-row gap-4">

            <div className="relative flex-1">

              <Search
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search invoices..."
                className="w-full pl-14 pr-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={handleSearch}
              />

            </div>

            <select
              className="px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[220px]"
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

        {/* Add Invoice Form */}

        <AddInvoiceForm
          fetchInvoices={fetchInvoices}
        />

        {/* Table */}

        <InvoicesTable
          invoices={invoices}
        />

      </div>

    </MainLayout>
  );
}