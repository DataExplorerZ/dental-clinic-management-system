export default function DashboardCard({
  title,
  value,
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">

      <h3 className="text-gray-500 text-lg">
        {title}
      </h3>

      <p className="text-4xl font-bold mt-2 text-blue-600">
        {value}
      </p>

    </div>
  );
}