import AddDepartmentForm from "@/components/add-department-form";
import AddEmployeeForm from "@/components/add-employee-form";
import DepartmentFilter from "@/components/department-filter";
import EmployeeCard from "@/components/employee-card";
import SearchFilter from "@/components/search-filter";
import SortFilter from "@/components/sort-filter";
import StatsCards from "@/components/stats-cards";
import AiSalarySidebar from "@/components/ai-salary-sidebar";

import { getDashboardStats, getDepartments, getEmployees } from "@/lib/queries";

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{
    dept?: string;
    search?: string;
    sort?: string;
  }>;
}) {
  const params = await searchParams;

  const dept = params?.dept;
  const search = params?.search;
  const sort = params?.sort;

  const [departments, employees, stats] = await Promise.all([
    getDepartments(),
    getEmployees(dept, search, sort),
    getDashboardStats(),
  ]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      {/* HEADER */}
      <header className="mb-8 rounded-[2rem] border border-white/60 bg-gradient-to-r from-slate-900 via-sky-900 to-slate-900 p-8 text-white shadow-lg">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-200">
          Employee Management System
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Employee Directory
        </h1>

        <p className="mt-3 max-w-2xl text-slate-200">
          Browse employees, filter by department, search records, and manage
          your workforce using a modern interface powered by AI.
        </p>
      </header>

      
      <div className="space-y-8">
        
        <StatsCards stats={stats} />

        <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
          
          <div className="space-y-6">
           
            <SearchFilter />

            <DepartmentFilter departments={departments} />

                        <SortFilter />

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <EmployeeCard key={employee._id} employee={employee} />
                ))
              ) : (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm sm:col-span-2 xl:col-span-3">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
                    🔍
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900">
                    No employees found
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Try changing the department filter, sort option, or search
                    keyword.
                  </p>
                </div>
              )}
            </div>
          </div>

       
          <aside className="space-y-6">
         
            <AddEmployeeForm departments={departments} />

            <AddDepartmentForm />
          </aside>
        </section>
      </div>

      <AiSalarySidebar />
    </main>
  );
}
