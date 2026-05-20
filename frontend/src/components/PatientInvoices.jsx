import { Link } from "react-router-dom";

export default function PatientInvoices({
  invoices
}) {

  return (

    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mt-8">

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Billing & Invoice History
      </h2>

      {invoices.length === 0 ? (

        <p className="text-gray-500">
          No invoices found.
        </p>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="text-left p-4">
                  Invoice ID
                </th>

                <th className="text-left p-4">
                  Date
                </th>

                <th className="text-left p-4">
                  Amount
                </th>

                <th className="text-left p-4">
                  Status
                </th>

                <th className="text-left p-4">
                  Next Visit
                </th>

                <th className="text-left p-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {invoices.map((invoice) => (

                <tr
                  key={invoice.id}
                  className="border-t"
                >

                  <td className="p-4 font-semibold">
                    #{invoice.id}
                  </td>

                  <td className="p-4">
                    {
                      new Date(
                        invoice.created_at
                      ).toLocaleDateString()
                    }
                  </td>

                  <td className="p-4 text-green-600 font-semibold">
                    Rs. {invoice.total_amount}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        invoice.payment_status ===
                        "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >

                      {invoice.payment_status}

                    </span>

                  </td>

                  <td className="p-4">
                    {
                      invoice.next_visit_date
                      || "N/A"
                    }
                  </td>

                  <td className="p-4">

                    <Link
                      to={`/invoices/${invoice.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
                    >
                      View
                    </Link>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}