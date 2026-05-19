export default function PatientInfoCard({
  patient
}) {

  if (!patient) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mb-6">

      <h2 className="text-2xl font-bold mb-4">
        Patient Information
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

        <div>
          <p className="text-gray-500">
            Name
          </p>

          <p className="font-semibold">
            {patient.full_name}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Phone
          </p>

          <p className="font-semibold">
            {patient.phone_number}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Gender
          </p>

          <p className="font-semibold">
            {patient.gender}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Age
          </p>

          <p className="font-semibold">
            {patient.age}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Blood Group
          </p>

          <p className="font-semibold">
            {patient.blood_group}
          </p>
        </div>

      </div>

    </div>
  );
}