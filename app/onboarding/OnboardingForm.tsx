"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BANDS, MONTH_OPTIONS, type ProfileInput } from "@/lib/profile";

const CURRENT = [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7];
const monthLabel = (m: number) => (m === 1 ? "1 month" : `${m} months`);

function Chip({ selected, disabled, onClick, children }: { selected: boolean; disabled?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={selected}
      onClick={onClick}
      className={`min-w-16 cursor-pointer rounded-xl border px-4 py-2.5 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${
        selected ? "border-brand bg-brand text-white" : "border-line bg-white text-ink hover:border-brand hover:text-brand"
      }`}
    >
      {children}
    </button>
  );
}

function Step({ n, title, hint, children }: { n: number; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-2xl border border-line bg-white p-6">
      <legend className="sr-only">{title}</legend>
      <div className="flex items-center gap-3">
        <span className="grid size-7 place-items-center rounded-full bg-brand text-xs font-extrabold text-white">{n}</span>
        <h2 className="text-lg font-extrabold text-ink">{title}</h2>
      </div>
      {hint && <p className="mt-1 pl-10 text-sm text-muted">{hint}</p>}
      <div className="mt-4 flex flex-wrap gap-2.5">{children}</div>
    </fieldset>
  );
}

export default function OnboardingForm({ initial }: { initial: ProfileInput | null }) {
  const router = useRouter();
  const [currentBand, setCurrent] = useState<number | null>(initial?.currentBand ?? null);
  const [goalBand, setGoal] = useState<number | null>(initial?.goalBand ?? null);
  const [months, setMonths] = useState<number | null>(initial?.timeframeMonths ?? null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const ready = currentBand !== null && goalBand !== null && months !== null;

  async function submit() {
    if (!ready) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentBand, goalBand, timeframeMonths: months }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => null))?.error ?? "Something went wrong.");
      router.push("/dashboard");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setSaving(false);
    }
  }

  return (
    <div className="mt-8 space-y-5">
      <Step n={1} title="What's your current level?" hint="Your best guess is fine. A recent test score or practice result works well.">
        {CURRENT.map((b) => (
          <Chip
            key={b}
            selected={currentBand === b}
            onClick={() => {
              setCurrent(b);
              if (goalBand !== null && goalBand <= b) setGoal(null);
            }}
          >
            {b.toFixed(1)}
          </Chip>
        ))}
      </Step>

      <Step n={2} title="What band do you want?" hint="Must be higher than your current level.">
        {BANDS.map((b) => (
          <Chip key={b} selected={goalBand === b} disabled={currentBand !== null && b <= currentBand} onClick={() => setGoal(b)}>
            {b.toFixed(1)}
          </Chip>
        ))}
      </Step>

      <Step n={3} title="How long until your exam?">
        {MONTH_OPTIONS.map((m) => (
          <Chip key={m} selected={months === m} onClick={() => setMonths(m)}>
            {monthLabel(m)}
          </Chip>
        ))}
      </Step>

      {error && <p role="alert" className="text-sm font-medium text-error">{error}</p>}

      <button
        type="button"
        disabled={!ready || saving}
        onClick={submit}
        className="w-full cursor-pointer rounded-xl bg-ink px-6 py-4 text-base font-bold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
      >
        {saving ? "Saving…" : initial ? "Save changes" : "Build my dashboard →"}
      </button>
    </div>
  );
}
