import type { DashboardStats } from "@/lib/queries";

export default function StatsCards({ stats }: { stats: DashboardStats }) {
  const cards = [
    {
      label: "Total Employees",
      value: stats.totalEmployees,
      icon: "👥",
    },
    {
      label: "Departments",
      value: stats.totalDepartments,
      icon: "🏢",
    },
    {
      label: "Average Salary",
      value: `₹${Math.round(stats.averageSalary).toLocaleString("en-IN")}`,
      icon: "📈",
    },
    {
      label: "Highest Salary",
      value: `₹${stats.highestSalary.toLocaleString("en-IN")}`,
      icon: "💰",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-3xl border border-white/60 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{card.label}</p>
              <p className="mt-3 text-2xl font-bold text-slate-900">{card.value}</p>
            </div>
            <div className="rounded-2xl bg-sky-50 px-3 py-2 text-xl">{card.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}