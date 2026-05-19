import { Link } from "react-router-dom";

export default function PatientsTable({
  patients
}) {

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="text-left p-4">
              Name
            </th>

            <th className="text-left p-4">
              Phone
            </th>

            <th className="text-left p-4">
              Gender
            </th>

            <th className="text-left p-4">
              Age
            </th>

            <th className="text-left p-4">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {patients.map((patient) => (

            <tr
              key={patient.id}
              className="border-t hover:bg-gray-50"
            >

              <td className="p-4">
                {patient.full_name}
              </td>

              <td className="p-4">
                {patient.phone_number}
              </td>

              <td className="p-4">
                {patient.gender}
              </td>

              <td className="p-4">
                {patient.age}
              </td>

              <td className="p-4">

                <Link
                  to={`/patients/${patient.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  View Profile
                </Link>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}