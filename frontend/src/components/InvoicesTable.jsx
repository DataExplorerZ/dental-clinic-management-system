import { Link } from "react-router-dom";

export default function InvoicesTable({
  invoices
}) {

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="text-left p-4">
              Invoice ID
            </th>

            <th className="text-left p-4">
              Patient ID
            </th>

            <th className="text-left p-4">
              Treatments
            </th>

            <th className="text-left p-4">
              Total Amount
            </th>

            <th className="text-left p-4">
              Status
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
              className="border-t align-top"
            >

              <td className="p-4 font-semibold">
                #{invoice.id}
              </td>

              <td className="p-4">
                {invoice.patient_id}
              </td>

              <td className="p-4">

                <div className="space-y-2">

                  {invoice.items?.map(
                    (item, index) => (

                    <div
                      key={index}
                      className="flex justify-between bg-gray-50 px-3 py-2 rounded-lg"
                    >

                      <span>
                        {item.treatment_name}
                      </span>

                      <span className="font-medium">
                        Rs. {item.amount}
                      </span>

                    </div>

                  ))}

                </div>

              </td>

              <td className="p-4 font-semibold text-blue-600">
                Rs. {invoice.total_amount}
              </td>

              <td className="p-4">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
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

                <Link
                  to={`/invoice-preview/${invoice.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-block"
                >
                  Preview
                </Link>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}