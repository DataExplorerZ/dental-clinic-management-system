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
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="text-left p-4">
              Patient ID
            </th>

            <th className="text-left p-4">
              Date
            </th>

            <th className="text-left p-4">
              Time
            </th>

            <th className="text-left p-4">
              Treatment
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

          {appointments.map((appointment) => (

            <tr
              key={appointment.id}
              className="border-t"
            >

              <td className="p-4">
                {appointment.patient_id}
              </td>

              <td className="p-4">
                {appointment.appointment_date}
              </td>

              <td className="p-4">
                {appointment.appointment_time}
              </td>

              <td className="p-4">
                {appointment.treatment_type}
              </td>

              <td className="p-4">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    appointment.status ===
                    "Completed"
                      ? "bg-green-100 text-green-700"
                      : appointment.status ===
                        "Cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {appointment.status}
                </span>

              </td>

              <td className="p-4">

                <div className="flex gap-2">

                  <button
                    onClick={() =>
                      handleStatusUpdate(
                        appointment.id,
                        "Completed"
                      )
                    }
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Complete
                  </button>

                  <button
                    onClick={() =>
                      handleStatusUpdate(
                        appointment.id,
                        "Cancelled"
                      )
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Cancel
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}