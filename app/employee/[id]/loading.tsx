export default function LoadingEmployeeDetail() {
  return (
    <div className="mx-auto max-w-3xl animate-pulse rounded-2xl border bg-white p-8 shadow-sm">
      <div className="h-8 w-1/3 rounded bg-slate-200" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-xl bg-slate-100 p-4">
            <div className="h-4 w-20 rounded bg-slate-200" />
            <div className="mt-3 h-5 w-28 rounded bg-slate-300" />
          </div>
        ))}
      </div>
    </div>
  );
}