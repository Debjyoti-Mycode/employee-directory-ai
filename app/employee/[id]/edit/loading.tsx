export default function LoadingEditEmployeePage() {
  return (
    <div className="mx-auto max-w-3xl animate-pulse rounded-2xl border bg-white p-8 shadow-sm">
      <div className="h-8 w-1/3 rounded bg-slate-200" />
      <div className="mt-6 space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index}>
            <div className="mb-2 h-4 w-24 rounded bg-slate-200" />
            <div className="h-10 rounded bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  );
}