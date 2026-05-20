import {
  Receipt,
  CircleDollarSign,
  Eye,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

import { Link } from "react-router-dom";

export default function InvoicesTable({
  invoices
}) {

  return (

    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

      {/* Header */}

      <div className="px-6 py-5 border-b border-gray-100">

        <h2 className="text-2xl font-bold text-gray-800">
          Billing Records
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          View and manage generated clinic invoices.
        </p>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="text-left px-6 py-5 text-sm font-semibold text-gray-500">
                Invoice
              </th>

              <th className="text-left px-6 py-5 text-sm font-semibold text-gray-500">
                Patient
              </th>

              <th className="text-left px-6 py-5 text-sm font-semibold text-gray-500">
                Treatments
              </th>

              <th className="text-left px-6 py-5 text-sm font-semibold text-gray-500">
                Amount
              </th>

              <th className="text-left px-6 py-5 text-sm font-semibold text-gray-500">
                Status
              </th>

              <th className="text-right px-6 py-5 text-sm font-semibold text-gray-500">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {invoices.map((invoice) => (

              <tr
                key={invoice.id}
                className="border-t border-gray-100 hover:bg-blue-50/30 transition-all duration-200"
              >

                {/* Invoice Info */}

                <td className="px-6 py-5">

                  <div className="flex items-center gap-4">

                    <div className="bg-blue-100 p-3 rounded-2xl">

                      <Receipt
                        size={20}
                        className="text-blue-600"
                      />

                    </div>

                    <div>

                      <p className="font-semibold text-gray-800">
                        Invoice #{invoice.id}
                      </p>

                      <p className="text-sm text-gray-500">
                        Billing Record
                      </p>

                    </div>

                  </div>

                </td>

                {/* Patient */}

                <td className="px-6 py-5">

                  <div>

                    <p className="font-semibold text-gray-800">
                      Patient #{invoice.patient_id}
                    </p>

                    <p className="text-sm text-gray-500">
                      Clinic Patient
                    </p>

                  </div>

                </td>

                {/* Treatments */}

                <td className="px-6 py-5">

                  <div className="flex flex-wrap gap-2">

                    {invoice.items?.map(
                      (item, index) => (

                      <span
                        key={index}
                        className="bg-purple-100 text-purple-700 px-3 py-2 rounded-2xl text-sm font-medium"
                      >

                        {item.treatment_name}

                      </span>

                    ))}

                  </div>

                </td>

                {/* Amount */}

                <td className="px-6 py-5">

                  <div className="flex items-center gap-3">

                    <div className="bg-green-100 p-2 rounded-xl">

                      <CircleDollarSign
                        size={18}
                        className="text-green-600"
                      />

                    </div>

                    <div>

                      <p className="font-bold text-green-600 text-lg">
                        Rs. {invoice.total_amount}
                      </p>

                      <p className="text-sm text-gray-500">
                        Total Amount
                      </p>

                    </div>

                  </div>

                </td>

                {/* Status */}

                <td className="px-6 py-5">

                  <span
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium ${
                      invoice.payment_status ===
                      "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >

                    {invoice.payment_status ===
                    "Paid" ? (

                      <CheckCircle2 size={16} />

                    ) : (

                      <AlertCircle size={16} />

                    )}

                    {invoice.payment_status}

                  </span>

                </td>

                {/* Actions */}

                <td className="px-6 py-5 text-right">

                  <Link
                    to={`/invoices/${invoice.id}`}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl transition-all duration-200 shadow-sm"
                  >

                    <Eye size={18} />

                    View Invoice

                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Empty State */}

      {invoices.length === 0 && (

        <div className="py-20 text-center">

          <div className="text-gray-400 text-lg">
            No invoices found
          </div>

          <p className="text-gray-500 text-sm mt-2">
            Generate an invoice to get started.
          </p>

        </div>

      )}

    </div>
  );
}