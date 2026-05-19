export default function PatientAppointments({
  appointments
}) {

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mb-6">

      <h2 className="text-2xl font-bold mb-4">
        Appointment History
      </h2>

      <div className="space-y-4">

        {appointments.map((appointment) => (

          <div
            key={appointment.id}
            className="border rounded-xl p-4"
          >

            <div className="flex justify-between">

              <div>
                <p className="font-semibold">
                  {appointment.treatment_type}
                </p>

                <p className="text-gray-500">
                  {appointment.appointment_date}
                </p>
              </div>

              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm h-fit">
                {appointment.status}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}