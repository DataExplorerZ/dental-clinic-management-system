import {
  Stethoscope,
  FileText,
  Activity,
  CalendarClock
} from "lucide-react";

export default function MedicalHistoryTimeline({
  records
}) {

  return (

    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">

      {/* Header */}

      <div className="mb-8">

        <h2 className="text-3xl font-bold text-gray-800">
          Medical History Timeline
        </h2>

        <p className="text-gray-500 mt-2">
          Complete clinical treatment journey
        </p>

      </div>

      {/* Empty State */}

      {records?.length === 0 ? (

        <div className="text-center py-16">

          <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">

            <FileText
              size={36}
              className="text-gray-400"
            />

          </div>

          <h3 className="text-2xl font-semibold text-gray-700">
            No Medical Records Found
          </h3>

          <p className="text-gray-500 mt-2">
            Patient medical history will appear here.
          </p>

        </div>

      ) : (

        <div className="relative">

          {/* Timeline Line */}

          <div className="absolute left-6 top-0 bottom-0 w-1 bg-blue-100 rounded-full"></div>

          {/* Timeline Items */}

          <div className="space-y-8">

            {records.map((record) => (

              <div
                key={record.id}
                className="relative pl-20"
              >

                {/* Timeline Dot */}

                <div className="absolute left-0 top-4 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">

                  <Stethoscope
                    size={22}
                    className="text-white"
                  />

                </div>

                {/* Card */}

                <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">

                  {/* Top */}

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

                    <div>

                      <h3 className="text-2xl font-bold text-gray-800">
                        Diagnosis
                      </h3>

                      <p className="text-lg text-gray-600 mt-2">
                        {record.diagnosis || "N/A"}
                      </p>

                    </div>

                    <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-2xl w-fit">

                      <CalendarClock size={18} />

                      <span className="font-medium">

                        {
                          record.created_at
                            ? new Date(
                                record.created_at
                              ).toLocaleDateString()
                            : "Recent"
                        }

                      </span>

                    </div>

                  </div>

                  {/* Grid */}

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Symptoms */}

                    <div className="bg-white rounded-2xl p-5 border border-gray-100">

                      <div className="flex items-center gap-3 mb-4">

                        <div className="bg-red-100 p-3 rounded-xl">

                          <Activity
                            size={20}
                            className="text-red-600"
                          />

                        </div>

                        <h4 className="text-lg font-semibold text-gray-800">
                          Symptoms
                        </h4>

                      </div>

                      <p className="text-gray-600 leading-relaxed">
                        {record.symptoms || "N/A"}
                      </p>

                    </div>

                    {/* Treatment */}

                    <div className="bg-white rounded-2xl p-5 border border-gray-100">

                      <div className="flex items-center gap-3 mb-4">

                        <div className="bg-green-100 p-3 rounded-xl">

                          <Stethoscope
                            size={20}
                            className="text-green-600"
                          />

                        </div>

                        <h4 className="text-lg font-semibold text-gray-800">
                          Treatment Notes
                        </h4>

                      </div>

                      <p className="text-gray-600 leading-relaxed">
                        {record.treatment_notes || "N/A"}
                      </p>

                    </div>

                    {/* Follow Up */}

                    <div className="bg-white rounded-2xl p-5 border border-gray-100">

                      <div className="flex items-center gap-3 mb-4">

                        <div className="bg-yellow-100 p-3 rounded-xl">

                          <FileText
                            size={20}
                            className="text-yellow-600"
                          />

                        </div>

                        <h4 className="text-lg font-semibold text-gray-800">
                          Follow-up Notes
                        </h4>

                      </div>

                      <p className="text-gray-600 leading-relaxed">
                        {record.follow_up_notes || "N/A"}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>
  );
}