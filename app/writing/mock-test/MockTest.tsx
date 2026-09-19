"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { countWords } from "../analyze";
import { task1, task2 } from "../data";
import { addEntries } from "../history-store";
import PromptBlock from "../PromptBlock";

const TOTAL = 60 * 60;

export default function MockTest() {
  const [phase, setPhase] = useState<"intro" | "running" | "done">("intro");
  const [endAt, setEndAt] = useState(0);
  const [now, setNow] = useState(0);
  const [task, setTask] = useState<1 | 2>(1);
  const [answers, setAnswers] = useState({ 1: "", 2: "" });

  useEffect(() => {
    if (phase !== "running") return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [phase]);

  const remaining = phase === "running" ? Math.max(0, Math.round((endAt - now) / 1000)) : TOTAL;
  const timeUp = phase === "running" && remaining === 0;
  const w1 = countWords(answers[1]);
  const w2 = countWords(answers[2]);
  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  function start() {
    const t = Date.now();
    setNow(t);
    setEndAt(t + TOTAL * 1000);
    setPhase("running");
  }

  function finish() {
    const date = new Date().toISOString();
    addEntries(
      ([1, 2] as const)
        .filter((t) => answers[t].trim())
        .map((t) => ({
          id: crypto.randomUUID(),
          date,
          source: "Mock test" as const,
          task: t,
          words: t === 1 ? w1 : w2,
          note: `${t === 1 ? w1 : w2}/${t === 1 ? task1.min : task2.min} minimum words`,
          snippet: answers[t].trim().slice(0, 140),
        })),
    );
    setPhase("done");
  }

  if (phase === "intro") {
    return (
      <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_4px_16px_rgba(17,24,39,0.06)]">
        <h2 className="text-xl font-extrabold text-ink">Before you begin</h2>
        <ul className="mt-4 space-y-2 text-sm text-muted">
          <li>• You have <b className="text-ink">60 minutes</b> in total. The timer starts when you press Start.</li>
          <li>• Spend about <b className="text-ink">20 minutes</b> on Task 1 (150+ words) and <b className="text-ink">40 minutes</b> on Task 2 (250+ words).</li>
          <li>• Task 2 carries twice the weight of Task 1, so don&apos;t run out of time for it.</li>
          <li>• When you finish, your answers are saved to Writing History on this device.</li>
        </ul>
        <button onClick={start} className="mt-6 h-12 rounded-xl bg-brand px-8 text-base font-semibold text-white hover:bg-brand-hover">
          Start test
        </button>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="rounded-2xl border border-line bg-white p-6 text-center shadow-[0_4px_16px_rgba(17,24,39,0.06)]">
        <h2 className="text-xl font-extrabold text-ink">Test submitted</h2>
        <p className="mt-2 text-muted">Task 1: {w1} words · Task 2: {w2} words</p>
        <p className="mt-2 text-sm text-muted">Compare your answers with the model answers, or review them in your history.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link href="/writing/sample-answers" className="rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-hover">View sample answers</Link>
          <Link href="/writing/history" className="rounded-xl border border-line px-6 py-3 text-sm font-semibold text-ink hover:border-brand hover:text-brand">Writing history</Link>
        </div>
      </div>
    );
  }

  const t = task === 1 ? task1 : task2;
  const w = task === 1 ? w1 : w2;

  return (
    <div>
      <div className="sticky top-[72px] z-10 -mx-4 flex items-center justify-between gap-4 border-b border-line bg-white/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border">
        <div role="tablist" aria-label="Task" className="inline-flex rounded-xl bg-surface p-1">
          {([1, 2] as const).map((n) => (
            <button
              key={n}
              role="tab"
              aria-selected={task === n}
              onClick={() => setTask(n)}
              className={`rounded-lg px-4 py-1.5 text-sm font-semibold ${task === n ? "bg-white text-brand shadow-sm" : "text-muted"}`}
            >
              Task {n}
            </button>
          ))}
        </div>
        <p className={`text-xl font-extrabold tabular-nums ${remaining < 300 ? "text-brand" : "text-ink"}`} role="timer" aria-label={`${mm} minutes ${ss} seconds remaining`}>
          {mm}:{ss}
        </p>
      </div>

      {timeUp && <p className="mt-4 rounded-lg bg-gold/25 p-3 text-sm font-bold text-ink" role="alert">Time&apos;s up. Submit your answers.</p>}

      <div className="mt-5"><PromptBlock task={task} /></div>
      <label htmlFor="mock-answer" className="sr-only">Answer for {t.label}</label>
      <textarea
        id="mock-answer"
        value={answers[task]}
        disabled={timeUp}
        onChange={(e) => setAnswers((a) => ({ ...a, [task]: e.target.value }))}
        rows={14}
        className="mt-4 w-full rounded-xl border border-line bg-white p-4 text-sm leading-relaxed text-ink outline-none focus:border-brand disabled:bg-surface"
      />
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <p className={`text-sm font-semibold ${w >= t.min ? "text-success" : "text-muted"}`}>{w} / {t.min} words {w >= t.min && "✓"}</p>
        <button onClick={finish} className="h-11 rounded-xl bg-brand px-6 text-sm font-semibold text-white hover:bg-brand-hover">Submit test</button>
      </div>
    </div>
  );
}
