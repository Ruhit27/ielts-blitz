"use client";

import { useState } from "react";
import { enqueue } from "@/lib/outbox";
import { difficultyDot as dot, passage, passageTitle, type Demo, type QuestionType } from "./data";

function isCorrect(user: string | undefined, answer: string[]) {
  const value = (user ?? "").trim().toLowerCase();
  return answer.some((a) => a.toLowerCase() === value);
}

function recordCompletion(kind: "reading" | "listening", title: string, correct: number, total: number) {
  const d = new Date();
  const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  enqueue({ method: "POST", url: "/api/activity", body: { kind, date, id: crypto.randomUUID(), title, detail: kind === "listening" ? "Listening practice" : "Reading practice", correct, total } });
}

export default function QuestionDemo({
  type,
  kind = "reading",
  before,
  after,
}: {
  type: QuestionType;
  kind?: "reading" | "listening";
  /** Shown under the instruction, e.g. an audio player. */
  before?: React.ReactNode;
  /** Shown below the questions once they've been checked. */
  after?: (checked: boolean) => React.ReactNode;
}) {
  const { demo } = type;
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);

  const set = (i: number, v: string) => {
    setChecked(false);
    setAnswers((a) => ({ ...a, [i]: v }));
  };
  const score = demo.questions.filter((q, i) => isCorrect(answers[i], q.answer)).length;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="text-xl font-extrabold text-ink">{type.name}</h3>
        <span className="flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-muted">
          <span className={`size-2 rounded-full ${dot[type.difficulty]}`} aria-hidden="true" />
          {type.difficulty}
        </span>
      </div>
      <p className="mt-3 rounded-xl bg-brand/5 p-4 text-sm font-medium text-ink">{demo.instruction}</p>

      {before}

      {demo.showPassage && (
        <details open className="mt-4 rounded-xl border border-line">
          <summary className="cursor-pointer px-4 py-3 text-sm font-bold text-ink">
            Passage: {passageTitle}
          </summary>
          <div className="max-h-64 space-y-3 overflow-y-auto border-t border-line px-4 py-3 text-sm text-ink">
            {passage.map((p) => (
              <p key={p.label}>
                <span className="mr-2 font-bold text-brand">{p.label}</span>
                {p.text}
              </p>
            ))}
          </div>
        </details>
      )}

      {demo.diagram && <Diagram steps={demo.diagram} />}

      {demo.input === "select" && demo.choices && (
        <ul className="mt-4 space-y-1 rounded-xl border border-line p-4 text-sm text-ink">
          {demo.choices.map((c) => (
            <li key={c.key}>
              <span className="mr-2 inline-block min-w-6 font-bold text-brand">{c.key}</span>
              {c.key === c.text ? "" : c.text}
            </li>
          ))}
        </ul>
      )}

      <ol className="mt-5 space-y-5">
        {demo.questions.map((q, i) => {
          const value = answers[i] ?? "";
          const ok = checked && isCorrect(value, q.answer);
          const bad = checked && !ok;
          return (
            <li key={i} className="flex gap-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-white">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <QuestionBody demo={demo} q={q} i={i} value={value} onChange={(v) => set(i, v)} state={ok ? "ok" : bad ? "bad" : "idle"} />
                {checked && (
                  <p className={`mt-2 text-sm font-semibold ${ok ? "text-success" : "text-error"}`}>
                    {ok ? "✓ Correct" : `✗ Incorrect. Answer: ${q.answer[0]}`}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => {
            // Only the first check of an answer set counts, so re-clicking doesn't pad the log.
            if (!checked) recordCompletion(kind, type.name, score, demo.questions.length);
            setChecked(true);
          }}
          className="h-11 rounded-xl bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
        >
          Check answers
        </button>
        <button
          type="button"
          onClick={() => {
            setAnswers({});
            setChecked(false);
          }}
          className="h-11 rounded-xl border border-line px-6 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
        >
          Reset
        </button>
        {checked && (
          <span className="text-sm font-bold text-ink" role="status">
            Score: {score}/{demo.questions.length}
          </span>
        )}
      </div>
      {after?.(checked)}
    </div>
  );
}

function Diagram({ steps }: { steps: string[] }) {
  return (
    <ol className="mt-4 flex flex-col items-stretch gap-2 rounded-xl border border-line p-4" aria-label="Flow diagram">
      {steps.map((s, i) => (
        <li key={i} className="flex flex-col items-center gap-2">
          <div className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-center text-sm font-medium text-ink">
            {s.split(/(\[\d\])/).map((part, j) =>
              /^\[\d\]$/.test(part) ? (
                <span key={j} className="mx-1 inline-grid size-6 place-items-center rounded-md bg-brand text-xs font-bold text-white">
                  {part[1]}
                </span>
              ) : (
                part
              ),
            )}
          </div>
          {i < steps.length - 1 && <span className="text-brand" aria-hidden="true">↓</span>}
        </li>
      ))}
    </ol>
  );
}

function QuestionBody({
  demo,
  q,
  i,
  value,
  onChange,
  state,
}: {
  demo: Demo;
  q: Demo["questions"][number];
  i: number;
  value: string;
  onChange: (v: string) => void;
  state: "idle" | "ok" | "bad";
}) {
  const ring = state === "ok" ? "border-success" : state === "bad" ? "border-error" : "border-line";
  const field = `rounded-lg border ${ring} bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand`;

  if (demo.input === "radio") {
    const options = q.options ?? demo.choices ?? [];
    return (
      <fieldset>
        <legend className="text-sm font-medium text-ink">{q.prompt}</legend>
        <div className="mt-2 grid gap-2">
          {options.map((o) => (
            <label
              key={o.key}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2 text-sm ${
                value === o.key ? "border-brand bg-brand/5" : "border-line"
              }`}
            >
              <input
                type="radio"
                name={`q${i}`}
                className="mt-1 accent-brand"
                checked={value === o.key}
                onChange={() => onChange(o.key)}
              />
              <span>
                {o.key !== o.text && <b className="mr-1.5 text-brand">{o.key}</b>}
                {o.text}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  if (demo.input === "select") {
    return (
      <label className="flex flex-wrap items-center gap-3 text-sm font-medium text-ink">
        <span>{q.prompt}</span>
        <select value={value} onChange={(e) => onChange(e.target.value)} className={field}>
          <option value="">Select…</option>
          {demo.choices?.map((c) => (
            <option key={c.key} value={c.key}>
              {c.key}
            </option>
          ))}
        </select>
      </label>
    );
  }

  const [before, after] = q.prompt.includes("___") ? q.prompt.split("___") : [q.prompt, ""];
  const inline = q.prompt.includes("___");
  const input = (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={`Answer ${i + 1}`}
      className={`${field} mx-1 w-40 ${inline ? "" : "mt-2 block"}`}
    />
  );
  return (
    <label className="text-sm font-medium text-ink">
      {before}
      {input}
      {after}
    </label>
  );
}
