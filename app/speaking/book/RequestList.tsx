"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SpeakingRequest, SpeakingStatus } from "@/lib/speaking";

const badge: Record<SpeakingStatus, { label: string; cls: string }> = {
  requested: { label: "Awaiting confirmation", cls: "bg-amber-100 text-amber-800" },
  confirmed: { label: "Confirmed", cls: "bg-emerald-100 text-emerald-800" },
  completed: { label: "Completed", cls: "bg-surface text-muted" },
  cancelled: { label: "Cancelled", cls: "bg-surface text-muted" },
};

const fmtDay = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "long", year: "numeric" });

export default function RequestList({ requests }: { requests: SpeakingRequest[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function cancel(id: string) {
    setBusy(id);
    setError("");
    const res = await fetch(`/api/speaking-requests?id=${encodeURIComponent(id)}`, { method: "DELETE" }).catch(() => null);
    if (!res?.ok) setError((await res?.json().catch(() => null))?.error ?? "Could not cancel. Please try again.");
    setBusy(null);
    router.refresh();
  }

  return (
    <section aria-labelledby="mine">
      <h2 id="mine" className="text-sm font-extrabold tracking-[0.18em] text-brand">YOUR REQUESTS</h2>
      {error && <p role="alert" className="mt-2 text-sm font-medium text-error">{error}</p>}
      <ul className="mt-4 space-y-3">
        {requests.map((r) => (
          <li key={r.id} className="rounded-2xl border border-line bg-white p-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${badge[r.status].cls}`}>{badge[r.status].label}</span>
              <span className="font-bold text-ink">{fmtDay(r.date)}</span>
              <span className="text-sm text-muted">{r.timeSlot} · {r.platform}</span>
            </div>
            {r.status === "confirmed" && (
              <p className="mt-3 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-900">
                {r.confirmedTime && <strong className="block">{r.confirmedTime}</strong>}
                {r.meetingLink && <a href={r.meetingLink} target="_blank" rel="noopener noreferrer" className="font-semibold underline">Join link</a>}
              </p>
            )}
            {r.status === "requested" && (
              <button
                type="button"
                disabled={busy === r.id}
                onClick={() => cancel(r.id)}
                className="mt-3 cursor-pointer text-sm font-semibold text-muted hover:text-brand disabled:opacity-50"
              >
                {busy === r.id ? "Cancelling…" : "Cancel request"}
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
