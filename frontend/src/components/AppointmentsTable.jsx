import {
  Calendar,
  Clock3,
  Check,
  X,
  ChevronRight
} from "lucide-react";

import {
  updateAppointmentStatus
} from "../services/appointmentService";

export default function AppointmentsTable({
  appointments,
  fetchAppointments
}) {

  const handleStatusUpdate =
    async (
      appointmentId,
      status
    ) => {

      try {

        await updateAppointmentStatus(
          appointmentId,
          status
        );

        fetchAppointments();

      } catch (error) {
        console.error(error);
      }
  };

  return (

    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

      <div className="px-6 py-5 border-b border-gray-100">

        <h2 className="text-2xl font-bold text-gray-800">
          Appointment Schedule
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          View and manage clinic appointments.
        </p>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="text-left px-6 py-5 text-sm font-semibold text-gray-500">
                Patient
              </th>

              <th className="text-left px-6 py-5 text-sm font-semibold text-gray-500">
                Schedule
              </th>

              <th className="text-left px-6 py-5 text-sm font-semibold text-gray-500">
                Treatment
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

            {appointments.map((appointment) => (

              <tr
                key={appointment.id}
                className="border-t border-gray-100 hover:bg-blue-50/30 transition-all duration-200"
              >

                {/* Patient */}

                <td className="px-6 py-5">

                  <div>

                    <p className="font-semibold text-gray-800">
                      Patient #{appointment.patient_id}
                    </p>

                    <p className="text-sm text-gray-500">
                      Appointment ID #{appointment.id}
                    </p>

                  </div>

                </td>

                {/* Schedule */}

                <td className="px-6 py-5">

                  <div className="space-y-2">

                    <div className="flex items-center gap-2 text-gray-700">

                      <Calendar size={16} />

                      {appointment.appointment_date}

                    </div>

                    <div className="flex items-center gap-2 text-gray-500 text-sm">

                      <Clock3 size={15} />

                      {appointment.appointment_time}

                    </div>

                  </div>

                </td>

                {/* Treatment */}

                <td className="px-6 py-5">

                  <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-2xl text-sm font-medium">

                    {appointment.treatment_type}

                  </span>

                </td>

                {/* Status */}

                <td className="px-6 py-5">

                  <span
                    className={`px-4 py-2 rounded-2xl text-sm font-medium ${
                      appointment.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : appointment.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >

                    {appointment.status}

                  </span>

                </td>

                {/* Actions */}

                <td className="px-6 py-5">

                  <div className="flex justify-end gap-3">

                    <button
                      onClick={() =>
                        handleStatusUpdate(
                          appointment.id,
                          "Completed"
                        )
                      }
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-2xl transition-all duration-200"
                    >

                      <Check size={16} />

                      Complete

                    </button>

                    <button
                      onClick={() =>
                        handleStatusUpdate(
                          appointment.id,
                          "Cancelled"
                        )
                      }
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-2xl transition-all duration-200"
                    >

                      <X size={16} />

                      Cancel

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {appointments.length === 0 && (

        <div className="py-20 text-center">

          <div className="text-gray-400 text-lg">
            No appointments found
          </div>

          <p className="text-gray-500 text-sm mt-2">
            Schedule an appointment to get started.
          </p>

        </div>

      )}

    </div>
  );
}