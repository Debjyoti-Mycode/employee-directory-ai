import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border bg-white p-8 text-center shadow-sm">
      <h2 className="text-2xl font-semibold">Employee not found</h2>
      <p className="mt-2 text-sm text-slate-600">
        The requested employee record does not exist.
      </p>
      <Link
        href="/"
        className="mt-5 inline-flex rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
      >
        Back to directory
      </Link>
    </div>
  );
}