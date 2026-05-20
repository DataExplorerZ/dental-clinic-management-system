export default function PatientAppointments({
  appointments
}) {

  return (

    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mt-8">

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Appointment History
      </h2>

      {appointments?.length === 0 ? (

        <p className="text-gray-500">
          No appointments found.
        </p>

      ) : (

        <div className="space-y-4">

          {appointments?.map((appointment) => (

            <div
              key={appointment.id}
              className="border border-gray-100 rounded-2xl p-4"
            >

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="font-semibold text-gray-800">
                    {appointment.treatment_type || "Appointment"}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    {appointment.date}
                  </p>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    appointment.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >

                  {appointment.status || "Pending"}

                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}