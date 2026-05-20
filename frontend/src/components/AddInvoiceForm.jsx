import { useEffect, useState } from "react";

import {
  Plus,
  Trash2,
  Receipt,
  CircleDollarSign
} from "lucide-react";

import {
  getPatients
} from "../services/patientService";

import {
  createInvoice
} from "../services/invoiceService";

const treatmentOptions = [
  "Consultation",
  "X-Ray",
  "Filling",
  "Extraction",
  "Cleaning / Scaling / Polishing",
  "Denture",
  "Denture Repair",
  "CC Plate",
  "Ortho Treatment / Retainer",
  "Whitening",
  "Implant",
  "Bridge / Crown",
  "Root Canal Treatment",
  "Other"
];

export default function AddInvoiceForm({
  fetchInvoices
}) {

  const [patients, setPatients] =
    useState([]);

  const [paymentStatus, setPaymentStatus] =
    useState("Unpaid");

  const [notes, setNotes] =
    useState("");

  const [nextVisitDate, setNextVisitDate] =
    useState("");

  const [patientId, setPatientId] =
    useState("");

  const [items, setItems] = useState([
    {
      treatment_name: "",
      customTreatment: "",
      amount: ""
    }
  ]);

  useEffect(() => {

    const fetchPatients = async () => {

      try {

        const data =
          await getPatients();

        setPatients(data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchPatients();

  }, []);

  const handleItemChange = (
    index,
    field,
    value
  ) => {

    const updatedItems =
      [...items];

    updatedItems[index][field] =
      value;

    setItems(updatedItems);
  };

  const addItem = () => {

    setItems([
      ...items,
      {
        treatment_name: "",
        customTreatment: "",
        amount: ""
      }
    ]);
  };

  const removeItem = (index) => {

    const updatedItems =
      items.filter(
        (_, i) => i !== index
      );

    setItems(updatedItems);
  };

  const calculateTotal = () => {

    return items.reduce(
      (sum, item) =>
        sum + Number(item.amount || 0),
      0
    );
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formattedItems =
        items.map((item) => ({

          treatment_name:
            item.treatment_name === "Other"
              ? item.customTreatment
              : item.treatment_name,

          amount: Number(item.amount)
        }));

      await createInvoice({

        patient_id: Number(patientId),

        payment_status: paymentStatus,

        notes,

        next_visit_date: nextVisitDate,

        items: formattedItems
      });

      alert(
        "Invoice generated successfully"
      );

      fetchInvoices();

      setPatientId("");

      setPaymentStatus("Unpaid");

      setNotes("");

      setNextVisitDate("");

      setItems([
        {
          treatment_name: "",
          customTreatment: "",
          amount: ""
        }
      ]);

    } catch (error) {

      console.error(error);

      alert(
        "Error generating invoice"
      );
    }
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6"
    >

      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

        <div className="bg-blue-100 p-4 rounded-2xl">

          <Receipt
            size={24}
            className="text-blue-600"
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            Create Invoice
          </h2>

          <p className="text-gray-500 text-sm">
            Generate patient invoices and billing records.
          </p>

        </div>

      </div>

      {/* Patient Selection */}

      <div className="mb-8">

        <label className="block text-sm font-medium text-gray-600 mb-3">
          Select Patient
        </label>

        <select
          className="w-full border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={patientId}
          onChange={(e) =>
            setPatientId(e.target.value)
          }
          required
        >

          <option value="">
            Select Patient
          </option>

          {patients.map((patient) => (

            <option
              key={patient.id}
              value={patient.id}
            >
              {patient.full_name}
            </option>

          ))}

        </select>

      </div>

      {/* Invoice Items */}

      <div className="space-y-5">

        {items.map((item, index) => (

          <div
            key={index}
            className="border border-gray-200 rounded-3xl p-5 bg-gray-50"
          >

            <div className="flex justify-between items-center mb-5">

              <h3 className="font-semibold text-gray-700">
                Treatment Item #{index + 1}
              </h3>

              {items.length > 1 && (

                <button
                  type="button"
                  onClick={() =>
                    removeItem(index)
                  }
                  className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-xl transition-all"
                >

                  <Trash2 size={16} />

                  Remove

                </button>

              )}

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

              {/* Treatment */}

              <div>

                <label className="block text-sm font-medium text-gray-600 mb-3">
                  Treatment Type
                </label>

                <select
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={item.treatment_name}
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      "treatment_name",
                      e.target.value
                    )
                  }
                  required
                >

                  <option value="">
                    Select Treatment
                  </option>

                  {treatmentOptions.map(
                    (treatment, i) => (

                    <option
                      key={i}
                      value={treatment}
                    >
                      {treatment}
                    </option>

                  ))}

                </select>

              </div>

              {/* Amount */}

              <div>

                <label className="block text-sm font-medium text-gray-600 mb-3">
                  Amount
                </label>

                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={item.amount}
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      "amount",
                      e.target.value
                    )
                  }
                  required
                />

              </div>

            </div>

            {/* Custom Treatment */}

            {item.treatment_name ===
              "Other" && (

              <div className="mt-5">

                <label className="block text-sm font-medium text-gray-600 mb-3">
                  Custom Treatment
                </label>

                <input
                  type="text"
                  placeholder="Enter custom treatment"
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={item.customTreatment}
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      "customTreatment",
                      e.target.value
                    )
                  }
                  required
                />

              </div>

            )}

          </div>

        ))}

      </div>

      {/* Add Item Button */}

      <button
        type="button"
        onClick={addItem}
        className="mt-6 flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-5 py-3 rounded-2xl transition-all"
      >

        <Plus size={18} />

        Add Treatment Item

      </button>

      {/* Total */}

      <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 text-white">

        <div className="flex items-center gap-3 mb-4">

          <CircleDollarSign size={28} />

          <h3 className="text-2xl font-bold">
            Invoice Summary
          </h3>

        </div>

        <div className="text-5xl font-bold">

          Rs. {calculateTotal()}

        </div>

        <p className="text-blue-100 mt-2">
          Total invoice amount
        </p>

      </div>

      {/* Payment Status */}

      <div className="mt-8">

        <label className="block text-sm font-medium text-gray-600 mb-3">
          Payment Status
        </label>

        <select
          className="w-full border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={paymentStatus}
          onChange={(e) =>
            setPaymentStatus(
              e.target.value
            )
          }
        >

          <option value="Paid">
            Paid
          </option>

          <option value="Unpaid">
            Unpaid
          </option>

        </select>

      </div>

      {/* Next Visit Date */}

      <div className="mt-8">

        <label className="block text-sm font-medium text-gray-600 mb-3">
          Recommended Next Visit
        </label>

        <input
          type="date"
          value={nextVisitDate}
          onChange={(e) =>
            setNextVisitDate(
              e.target.value
            )
          }
          className="w-full border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      {/* Notes */}

      <div className="mt-8">

        <label className="block text-sm font-medium text-gray-600 mb-3">
          Additional Notes
        </label>

        <textarea
          placeholder="Enter invoice notes..."
          className="w-full border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="5"
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
        />

      </div>

      {/* Submit */}

      <button
        type="submit"
        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-200 shadow-lg"
      >
        Generate Invoice
      </button>

    </form>
  );
}