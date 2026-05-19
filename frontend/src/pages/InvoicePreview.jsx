import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import {
  getSingleInvoice
} from "../services/invoiceService";

export default function InvoicePreview() {

  const { id } = useParams();

  const [invoice, setInvoice] =
    useState(null);

  const fetchInvoice = async () => {

    try {

      const data =
        await getSingleInvoice(id);

      setInvoice(data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInvoice();
  }, []);

  if (!invoice) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-lg">

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-4xl font-bold">
              Dental Clinic
            </h1>

            <p className="text-gray-500">
              Professional Dental Care
            </p>

          </div>

          <button
            onClick={() => window.print()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Print Invoice
          </button>

        </div>

        <div className="mb-10">

          <h2 className="text-2xl font-bold mb-4">
            Invoice Details
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <div>

              <p className="text-gray-500">
                Invoice ID
              </p>

              <p className="font-semibold">
                #{invoice.id}
              </p>

            </div>

            <div>

              <p className="text-gray-500">
                Patient ID
              </p>

              <p className="font-semibold">
                {invoice.patient_id}
              </p>

            </div>

            <div>

              <p className="text-gray-500">
                Payment Status
              </p>

              <p className="font-semibold">
                {invoice.payment_status}
              </p>

            </div>

            <div>

              <p className="text-gray-500">
                Total Amount
              </p>

              <p className="font-semibold">
                Rs. {invoice.total_amount}
              </p>

            </div>

          </div>

        </div>

        <table className="w-full mb-10">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">
                Treatment
              </th>

              <th className="text-left p-4">
                Amount
              </th>

            </tr>

          </thead>

          <tbody>

            {invoice.items.map(
              (item, index) => (

              <tr
                key={index}
                className="border-t"
              >

                <td className="p-4">
                  {item.treatment_name}
                </td>

                <td className="p-4">
                  Rs. {item.amount}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <div className="flex justify-end">

          <div className="text-right">

            <h2 className="text-3xl font-bold">
              Total:
              {" "}
              Rs. {invoice.total_amount}
            </h2>

          </div>

        </div>

      </div>

    </div>
  );
}