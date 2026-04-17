"use client";

import { useState } from "react";

export default function AiSalarySidebar() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function handleAI() {
    if (!position.trim()) return;

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/ai/salary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ position }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResult(data.error || "Failed to fetch AI response.");
      } else {
        setResult(data.suggestion || "No suggestion received.");
      }
    } catch (error) {
      setResult("Failed to fetch AI response.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
      >
        🤖 AI Salary
      </button>

      {open && (
        <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <h2 className="text-2xl font-bold text-slate-900">AI Salary Assistant</h2>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            >
              ✕
            </button>
          </div>

          <div className="flex h-[calc(100%-73px)] flex-col">
            <div className="space-y-4 p-5">
              <div>
                <label
                  htmlFor="ai-position"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Job Role
                </label>
                <input
                  id="ai-position"
                  type="text"
                  placeholder="Enter job role (e.g. Software Developer)"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200"
                />
              </div>

              <button
                onClick={handleAI}
                disabled={loading}
                className="w-full rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Thinking..." : "Get Suggestion"}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 pb-5">
              {result ? (
                <div className="flex justify-start">
                  <div className="max-w-[90%] rounded-[22px] rounded-tl-md border border-sky-100 bg-sky-50 px-4 py-3 shadow-sm">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-sky-700">
                      AI Suggestion
                    </p>
                    <div className="whitespace-pre-line break-words text-sm leading-7 text-slate-800">
                      {result.replace(/\*\*/g, "")}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="max-w-xs rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-5 py-6 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl shadow-sm">
                      🤖
                    </div>
                    <p className="text-sm font-medium text-slate-700">
                      Ask AI for a salary suggestion
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Enter a job role above and get an estimated salary range in India.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}