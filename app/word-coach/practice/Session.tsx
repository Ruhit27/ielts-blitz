"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { plain, topicById, words as allWords, type TopicId } from "../data";
import { enqueue } from "@/lib/outbox";
import { isDue, parse, readRaw, recordAnswer, today } from "../progress-store";
import { buildSession, modeInfo, type Mode, type Question } from "../session";
import { useProgress } from "../useProgress";
import WordCard from "../WordCard";

type Result = { question: Question; correct: boolean };

const normalise = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

export default function Session({ topic, mode, limit }: { topic: TopicId | "all"; mode: Mode | "mixed"; limit: number }) {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const progress = useProgress();

  // Started by a click: the queue is shuffled, so it must never run while rendering.
  const start = useCallback(() => {
    setQuestions(buildSession(parse(readRaw()), { topic, mode, limit }));
    setIndex(0);
    setPicked(null);
    setTyped("");
    setResults([]);
  }, [topic, mode, limit]);

  const current = questions?.[index];
  const answered = picked !== null;
  const done = !!questions && index >= questions.length;

  const submit = useCallback(
    (value: string) => {
      if (!current || picked !== null) return;
      const correct =
        current.mode === "spell" ? normalise(value) === normalise(current.answer) : value === current.answer;
      setPicked(value);
      recordAnswer(current.word.id, correct);
      setResults((r) => [...r, { question: current, correct }]);
    },
    [current, picked],
  );

  const next = useCallback(() => {
    if (questions && index + 1 >= questions.length && results.length > 0) {
      enqueue({
        method: "POST",
        url: "/api/activity",
        body: {
          kind: "words",
          date: today(),
          id: crypto.randomUUID(),
          title: "Word Coach session",
          detail: `${results.length} words`,
          correct: results.filter((r) => r.correct).length,
          total: results.length,
        },
      });
    }
    setPicked(null);
    setTyped("");
    setIndex((i) => i + 1);
  }, [questions, index, results]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!current) return;
      if (answered && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        next();
        return;
      }
      if (!answered && current.options.length > 0) {
        const n = Number(e.key);
        if (n >= 1 && n <= current.options.length) submit(current.options[n - 1].key);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, answered, next, submit]);

  useEffect(() => {
    if (current?.mode === "spell" && !answered) inputRef.current?.focus();
  }, [current, answered]);

  const score = useMemo(() => results.filter((r) => r.correct).length, [results]);

  if (!questions) {
    const pool = topic === "all" ? allWords : allWords.filter((w) => w.topic === topic);
    const due = pool.filter((w) => isDue(progress.words[w.id])).length;
    const fresh = pool.filter((w) => !progress.words[w.id]).length;
    const size = Math.min(limit, pool.length);

    return (
      <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_4px_16px_rgba(17,24,39,0.06)]">
        <h2 className="text-xl font-extrabold text-ink">{size}-word session</h2>
        <ul className="mt-4 space-y-2 text-sm text-muted">
          <li>• <b className="text-ink">{due}</b> word{due === 1 ? "" : "s"} due for review {due > 0 && "— these come first"}</li>
          <li>• <b className="text-ink">{fresh}</b> word{fresh === 1 ? "" : "s"} you have not met yet</li>
          <li>• Drill type: <b className="text-ink">{mode === "mixed" ? "mixed, adapting to each word" : modeInfo[mode].name}</b></li>
          <li>• A wrong answer sends the word back to box 1, so it returns today.</li>
        </ul>
        {pool.length === 0 ? (
          <p className="mt-6 text-sm font-semibold text-ink">This pack is empty. Try another topic.</p>
        ) : (
          <button onClick={start} className="mt-6 h-12 rounded-xl bg-brand px-8 text-base font-semibold text-white transition-colors hover:bg-brand-hover">
            Start session
          </button>
        )}
      </div>
    );
  }

  if (done) {
    const wrong = results.filter((r) => !r.correct);
    const pct = Math.round((score / results.length) * 100);
    return (
      <div>
        <div className="rounded-2xl border border-line bg-white p-6 text-center shadow-[0_4px_16px_rgba(17,24,39,0.06)]">
          <p className="text-xs font-extrabold tracking-[0.18em] text-brand">SESSION COMPLETE</p>
          <p className="mt-3 text-5xl font-extrabold text-ink">{score}/{results.length}</p>
          <p className="mt-2 text-muted">
            {pct >= 80 ? "Strong recall. These words are sticking." : pct >= 50 ? "Solid. The words you missed come back today." : "Tough round. Every word you missed returns today."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button onClick={start} className="rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-hover">
              Another round
            </button>
            <Link href="/word-coach/progress" className="rounded-xl border border-line px-6 py-3 text-sm font-semibold text-ink hover:border-brand hover:text-brand">
              See progress
            </Link>
            <Link href="/word-coach" className="rounded-xl border border-line px-6 py-3 text-sm font-semibold text-ink hover:border-brand hover:text-brand">
              Finish
            </Link>
          </div>
        </div>

        {wrong.length > 0 && (
          <section className="mt-8">
            <h2 className="text-sm font-extrabold tracking-[0.18em] text-brand">REVIEW THESE {wrong.length}</h2>
            <div className="mt-4 space-y-2">
              {wrong.map((r) => (
                <WordCard key={r.question.word.id} word={r.question.word} />
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  const q = current!;
  const topicColor = topicById[q.word.topic].color;
  const correctNow = q.mode === "spell" ? normalise(picked ?? "") === normalise(q.answer) : picked === q.answer;

  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-line" role="progressbar" aria-valuenow={index} aria-valuemin={0} aria-valuemax={questions.length}>
          <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${(index / questions.length) * 100}%` }} />
        </div>
        <p className="shrink-0 text-sm font-bold tabular-nums text-muted">
          {index + 1}/{questions.length} · {score} correct
        </p>
      </div>

      <div className="mt-5 rounded-2xl border border-line bg-white p-5 shadow-[0_4px_16px_rgba(17,24,39,0.06)] sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">{modeInfo[q.mode].name}</span>
          <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: `${topicColor}1a`, color: topicColor }}>
            {topicById[q.word.topic].name}
          </span>
          <span className="rounded-full bg-surface px-3 py-1 text-xs font-bold text-muted">Band {q.word.band}+</span>
        </div>

        <p className="mt-4 text-sm font-medium text-muted">{modeInfo[q.mode].instruction}</p>
        <p className={`mt-2 font-extrabold text-ink ${q.mode === "gap" ? "text-xl leading-relaxed" : "text-2xl"}`}>{q.prompt}</p>
        {q.sub && <p className="mt-1 text-sm italic text-muted">{q.sub}</p>}

        {q.mode === "spell" ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!answered && typed.trim()) submit(typed);
            }}
            className="mt-5"
          >
            <label htmlFor="spell" className="text-sm font-semibold text-ink">
              Your answer <span className="ml-2 font-mono tracking-[0.3em] text-muted">{q.hint}</span>
            </label>
            <div className="mt-2 flex gap-3">
              <input
                id="spell"
                ref={inputRef}
                value={answered ? (picked ?? "") : typed}
                onChange={(e) => setTyped(e.target.value)}
                disabled={answered}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                className={`flex-1 rounded-xl border bg-white px-4 py-3 text-ink outline-none focus:border-brand ${
                  answered ? (correctNow ? "border-success" : "border-error") : "border-line"
                }`}
              />
              {!answered && (
                <button type="submit" disabled={!typed.trim()} className="rounded-xl bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-hover disabled:opacity-50">
                  Check
                </button>
              )}
            </div>
          </form>
        ) : (
          <ul className="mt-5 grid gap-2">
            {q.options.map((o, i) => {
              const isAnswer = o.key === q.answer;
              const isPicked = o.key === picked;
              const style = !answered
                ? "border-line hover:border-brand hover:bg-brand/5"
                : isAnswer
                  ? "border-success bg-success/10"
                  : isPicked
                    ? "border-error bg-error/10"
                    : "border-line opacity-60";
              return (
                <li key={o.key}>
                  <button
                    onClick={() => submit(o.key)}
                    disabled={answered}
                    className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-colors ${style}`}
                  >
                    <span className="grid size-6 shrink-0 place-items-center rounded-md bg-surface text-xs font-bold text-muted" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span className="text-sm text-ink">{o.label}</span>
                    {answered && isAnswer && <span className="ml-auto font-bold text-success" aria-hidden="true">✓</span>}
                    {answered && isPicked && !isAnswer && <span className="ml-auto font-bold text-error" aria-hidden="true">✗</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {answered && (
          <div className="mt-6 border-t border-line pt-5" aria-live="polite">
            <p className={`font-bold ${correctNow ? "text-success" : "text-error"}`}>
              {correctNow ? "✓ Correct" : `✗ The answer is “${q.answer}”`}
            </p>
            <p className="mt-2 text-lg font-extrabold text-ink">{q.word.word}</p>
            <p className="text-sm text-ink">{q.word.definition}</p>
            <p className="mt-2 border-l-2 border-brand/40 pl-3 text-sm italic text-muted">“{plain(q.word.example)}”</p>
            {q.word.collocations.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {q.word.collocations.map((c) => (
                  <li key={c} className="rounded-md bg-surface px-2 py-1 text-xs text-ink">{plain(c)}</li>
                ))}
              </ul>
            )}
            {q.word.note && <p className="mt-3 rounded-lg bg-gold/15 p-3 text-xs text-ink"><b>Watch out:</b> {q.word.note}</p>}
            <button onClick={next} className="mt-5 h-11 w-full rounded-xl bg-brand text-sm font-semibold text-white hover:bg-brand-hover sm:w-auto sm:px-8">
              {index + 1 === questions.length ? "Finish" : "Next word"}
            </button>
          </div>
        )}
      </div>

      <p className="mt-4 text-center text-xs text-muted">
        Tip: press <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 font-sans">1</kbd>–
        <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 font-sans">4</kbd> to answer and{" "}
        <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 font-sans">Enter</kbd> to continue.
      </p>
    </div>
  );
}
