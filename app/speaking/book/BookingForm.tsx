"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { dateRange, PLATFORMS, TIME_SLOTS } from "@/lib/speaking";

const field = "mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-brand";
const label = "text-sm font-bold text-ink";

export default function BookingForm({ defaults }: { defaults: { name: string; email: string } }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const { min, max } = dateRange();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/speaking-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(f),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => null))?.error ?? "Something went wrong.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5 rounded-2xl border border-line bg-white p-6 sm:p-8">
      <h2 className="text-xl font-extrabold text-ink">Your details</h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={label}>
          Full name
          <input name="name" required minLength={2} maxLength={80} autoComplete="name" defaultValue={defaults.name} className={field} />
        </label>
        <label className={label}>
          Email
          <input name="email" type="email" required maxLength={120} autoComplete="email" defaultValue={defaults.email} className={field} />
        </label>
      </div>

      <label className={`block ${label}`}>
        Phone or WhatsApp
        <input name="phone" type="tel" required maxLength={25} autoComplete="tel" placeholder="+880 1XXX XXXXXX" className={field} />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={label}>
          Preferred day
          <input name="date" type="date" required min={min} max={max} className={field} />
        </label>
        <label className={label}>
          Time of day
          <select name="timeSlot" required defaultValue="" className={field}>
            <option value="" disabled>Choose…</option>
            {TIME_SLOTS.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
      </div>
      <p className="-mt-2 text-xs text-muted">Times are in your local timezone. We will confirm the exact time.</p>

      <label className={`block ${label}`}>
        Meet on
        <select name="platform" required defaultValue="" className={field}>
          <option value="" disabled>Choose…</option>
          {PLATFORMS.map((p) => <option key={p}>{p}</option>)}
        </select>
      </label>

      <label className={`block ${label}`}>
        Anything we should know? <span className="font-normal text-muted">(optional)</span>
        <textarea name="notes" rows={3} maxLength={500} placeholder="Your target band, exam date, or the part you find hardest" className={field} />
      </label>

      {error && <p role="alert" className="text-sm font-medium text-error">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="w-full cursor-pointer rounded-xl bg-ink px-6 py-4 text-base font-bold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
      >
        {saving ? "Sending…" : "Request my speaking test"}
      </button>
    </form>
  );
}
