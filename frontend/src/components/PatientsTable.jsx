import {
  Phone,
  User,
  ChevronRight
} from "lucide-react";

import { Link } from "react-router-dom";

export default function PatientsTable({
  patients
}) {

  return (

    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

      <div className="px-6 py-5 border-b border-gray-100">

        <h2 className="text-2xl font-bold text-gray-800">
          Patients List
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          View and manage registered clinic patients.
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
                Contact
              </th>

              <th className="text-left px-6 py-5 text-sm font-semibold text-gray-500">
                Gender
              </th>

              <th className="text-left px-6 py-5 text-sm font-semibold text-gray-500">
                Age
              </th>

              <th className="text-right px-6 py-5 text-sm font-semibold text-gray-500">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {patients.map((patient) => {

              const initials =
                patient.full_name
                  ?.split(" ")
                  .map((name) => name[0])
                  .join("")
                  .toUpperCase();

              return (

                <tr
                  key={patient.id}
                  className="border-t border-gray-100 hover:bg-blue-50/40 transition-all duration-200"
                >

                  {/* Patient Info */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold">

                        {initials}

                      </div>

                      <div>

                        <p className="font-semibold text-gray-800">
                          {patient.full_name}
                        </p>

                        <p className="text-sm text-gray-500">
                          Patient ID #{patient.id}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Phone */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3 text-gray-700">

                      <Phone size={16} />

                      {patient.phone_number}

                    </div>

                  </td>

                  {/* Gender */}

                  <td className="px-6 py-5">

                    <span className="bg-gray-100 px-4 py-2 rounded-xl text-sm text-gray-700">

                      {patient.gender}

                    </span>

                  </td>

                  {/* Age */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-2 text-gray-700">

                      <User size={16} />

                      {patient.age} years

                    </div>

                  </td>

                  {/* Actions */}

                  <td className="px-6 py-5 text-right">

                    <Link
                      to={`/patients/${patient.id}`}
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl transition-all duration-200 shadow-sm"
                    >

                      View Profile

                      <ChevronRight size={18} />

                    </Link>

                  </td>

                </tr>

              );
            })}

          </tbody>

        </table>

      </div>

      {patients.length === 0 && (

        <div className="py-20 text-center">

          <div className="text-gray-400 text-lg">
            No patients found
          </div>

          <p className="text-gray-500 text-sm mt-2">
            Add a patient to get started.
          </p>

        </div>

      )}

    </div>
  );
}