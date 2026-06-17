const variants = {
  active:    "bg-green-100 text-green-700",
  inactive:  "bg-gray-100 text-gray-600",
  suspended: "bg-red-100 text-red-700",
  present:   "bg-green-100 text-green-700",
  absent:    "bg-red-100 text-red-700",
  late:      "bg-yellow-100 text-yellow-700",
  "on-leave":"bg-blue-100 text-blue-700",
  pending:   "bg-yellow-100 text-yellow-700",
  approved:  "bg-green-100 text-green-700",
  rejected:  "bg-red-100 text-red-700",
  hr:        "bg-indigo-100 text-indigo-700",
  employee:  "bg-blue-100 text-blue-700",
  annual:    "bg-blue-100 text-blue-700",
  sick:      "bg-yellow-100 text-yellow-700",
  unpaid:    "bg-red-100 text-red-700",
};

export default function Badge({ label }) {
  const key = label?.toLowerCase();
  const style = variants[key] || "bg-gray-100 text-gray-600";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style}`}>
      {label}
    </span>
  );
}