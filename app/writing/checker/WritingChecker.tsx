"use client";

import Link from "next/link";
import { useState } from "react";
import { analyze, countWords, type Check } from "../analyze";
import { task1, task2 } from "../data";
import { addEntries } from "../history-store";
import PromptBlock from "../PromptBlock";

export default function WritingChecker() {
  const [task, setTask] = useState<1 | 2>(2);
  const [text, setText] = useState("");
  const [result, setResult] = useState<{ checks: Check[]; words: number } | null>(null);

  const min = task === 1 ? task1.min : task2.min;
  const words = countWords(text);
  const passed = result?.checks.filter((c) => c.pass).length ?? 0;

  function run() {
    const r = analyze(text, task);
    setResult(r);
    addEntries([
      {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        source: "Checker",
        task,
        words: r.words,
        note: `${r.checks.filter((c) => c.pass).length}/${r.checks.length} checks passed`,
        snippet: text.trim().slice(0, 140),
      },
    ]);
  }

  return (
    <div>
      <div role="tablist" aria-label="Task" className="inline-flex rounded-xl bg-surface p-1">
        {([1, 2] as const).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={task === t}
            onClick={() => {
              setTask(t);
              setResult(null);
            }}
            className={`rounded-lg px-5 py-2 text-sm font-semibold transition-colors ${task === t ? "bg-white text-brand shadow-sm" : "text-muted hover:text-ink"}`}
          >
            Task {t}
          </button>
        ))}
      </div>

      <div className="mt-5">
        <PromptBlock task={task} />
      </div>

      <label htmlFor="answer" className="mt-6 block text-sm font-bold text-ink">Your answer</label>
      <textarea
        id="answer"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setResult(null);
        }}
        rows={12}
        placeholder="Type or paste your answer here. Leave a blank line between paragraphs."
        className="mt-2 w-full rounded-xl border border-line bg-white p-4 text-sm leading-relaxed text-ink outline-none focus:border-brand"
      />
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <p className={`text-sm font-semibold ${words >= min ? "text-success" : "text-muted"}`} aria-live="polite">
          {words} / {min} words {words >= min && "✓"}
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setText("");
              setResult(null);
            }}
            className="h-11 rounded-xl border border-line px-5 text-sm font-semibold text-ink hover:border-brand hover:text-brand"
          >
            Clear
          </button>
          <button
            onClick={run}
            disabled={words === 0}
            className="h-11 rounded-xl bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            Check my writing
          </button>
        </div>
      </div>

      {result && (
        <section aria-labelledby="results" className="mt-8 rounded-2xl border border-line bg-white p-5 shadow-[0_4px_16px_rgba(17,24,39,0.06)]">
          <h2 id="results" className="text-lg font-extrabold text-ink">
            {passed}/{result.checks.length} checks passed
          </h2>
          <ul className="mt-4 divide-y divide-line">
            {result.checks.map((c) => (
              <li key={c.id} className="flex gap-3 py-3">
                <span className={`grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold text-white ${c.pass ? "bg-success" : "bg-gold text-ink"}`} aria-hidden="true">
                  {c.pass ? "✓" : "!"}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">
                    {c.label} <span className="sr-only">{c.pass ? "passed" : "needs work"}</span>
                  </span>
                  <span className="block text-sm text-muted">{c.detail}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-lg bg-surface p-3 text-xs text-muted">
            These are automatic checks of form, not a band score. They can&apos;t judge whether you answered the task or whether your ideas are relevant. See <Link href="/writing/how-writing-is-marked" className="font-semibold text-brand">How Writing Is Marked</Link>.
          </p>
        </section>
      )}
    </div>
  );
}
