"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-red-50 p-8 text-center shadow-sm">
      <h2 className="text-2xl font-semibold text-red-800">Something went wrong</h2>
      <p className="mt-2 text-sm text-red-700">
        A database or rendering error occurred. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="mt-5 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        Try again
      </button>
    </div>
  );
}