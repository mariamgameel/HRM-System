export default function StatCard({ icon, label, value, sub, subColor }) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">{label}</p>
      <p className="text-2xl font-medium text-gray-900 dark:text-slate-100">{value}</p>
      {sub && (
        <p className={`text-xs mt-1 ${subColor || "text-gray-400 dark:text-slate-500"}`}>
          {sub}
        </p>
      )}
    </div>
  );
}