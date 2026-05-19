import { useEffect, useState } from "react";

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

        const data = await getPatients();

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

    const updatedItems = [...items];

    updatedItems[index][field] = value;

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

        items: formattedItems
      });

      alert("Invoice created successfully");

      fetchInvoices();

      setPatientId("");

      setPaymentStatus("Unpaid");

      setNotes("");

      setItems([
        {
          treatment_name: "",
          customTreatment: "",
          amount: ""
        }
      ]);

    } catch (error) {

      console.error(error);

      alert("Error creating invoice");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md mb-6"
    >

      <h2 className="text-2xl font-bold mb-6">
        Create Invoice
      </h2>

      <div className="mb-6">

        <select
          className="border p-3 rounded-lg w-full"
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

      <div className="space-y-4">

        {items.map((item, index) => (

          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-4 rounded-xl"
          >

            <select
              className="border p-3 rounded-lg"
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

            {item.treatment_name ===
              "Other" && (

              <input
                type="text"
                placeholder="Custom Treatment"
                className="border p-3 rounded-lg"
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

            )}

            <input
              type="number"
              placeholder="Amount"
              className="border p-3 rounded-lg"
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

            <button
              type="button"
              onClick={() =>
                removeItem(index)
              }
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Remove
            </button>

          </div>

        ))}

      </div>

      <button
        type="button"
        onClick={addItem}
        className="mt-6 bg-gray-200 px-6 py-3 rounded-lg"
      >
        + Add Item
      </button>

      <div className="mt-6 text-2xl font-bold">

        Total:
        {" "}
        Rs. {calculateTotal()}

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

        <select
          className="border p-3 rounded-lg"
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

      <textarea
        placeholder="Notes"
        className="border p-3 rounded-lg w-full mt-6"
        rows="4"
        value={notes}
        onChange={(e) =>
          setNotes(e.target.value)
        }
      />

      <button
        type="submit"
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Generate Invoice
      </button>

    </form>
  );
}