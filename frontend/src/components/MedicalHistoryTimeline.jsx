export default function MedicalHistoryTimeline({
  records
}) {

  return (
    <div className="space-y-4">

      {records.map((record) => (

        <div
          key={record.id}
          className="bg-white p-6 rounded-2xl shadow-md"
        >

          <h3 className="text-xl font-bold mb-2">
            Diagnosis
          </h3>

          <p className="mb-4 text-gray-700">
            {record.diagnosis}
          </p>

          <h3 className="font-semibold">
            Symptoms
          </h3>

          <p className="mb-4">
            {record.symptoms}
          </p>

          <h3 className="font-semibold">
            Treatment Notes
          </h3>

          <p className="mb-4">
            {record.treatment_notes}
          </p>

          <h3 className="font-semibold">
            Follow-up Notes
          </h3>

          <p>
            {record.follow_up_notes}
          </p>

        </div>

      ))}

    </div>
  );
}