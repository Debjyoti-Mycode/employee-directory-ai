import Link from "next/link";
import { notFound } from "next/navigation";
import EditEmployeeForm from "@/components/edit-employee-form";
import { getDepartments, getEmployeeById } from "@/lib/queries";

export default async function EditEmployeePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [employee, departments] = await Promise.all([
    getEmployeeById(id),
    getDepartments(),
  ]);

  if (!employee) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-6">
        <Link
          href={`/employee/${employee._id}`}
          className="inline-flex rounded-2xl border border-white/60 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-300"
        >
          ← Back to Employee Details
        </Link>
      </div>

      <div className="mb-6 rounded-[2rem] border border-white/60 bg-gradient-to-r from-amber-500 to-orange-500 p-8 text-white shadow-lg">
        <p className="text-sm uppercase tracking-[0.2em] text-amber-100">Update Record</p>
        <h1 className="mt-3 text-4xl font-bold">Edit Employee</h1>
        <p className="mt-2 text-amber-50">
          Modify employee information and save the updated details.
        </p>
      </div>

      <EditEmployeeForm employee={employee} departments={departments} />
    </main>
  );
}