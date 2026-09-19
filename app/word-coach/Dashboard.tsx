"use client";

import Link from "next/link";
import { setGoal, statusOf, summarise, DEFAULT_GOAL, recentDays } from "./progress-store";
import { topics, words, wordsByTopic } from "./data";
import { useProgress } from "./useProgress";
import Ring from "./Ring";

const GOALS = [10, 15, 25, 40];

export default function Dashboard() {
  const progress = useProgress();
  const stats = summarise(progress, words.map((w) => w.id));
  const days = recentDays(progress.log);
  const peak = Math.max(10, ...days.map((d) => d.answered));

  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-line bg-white p-5 shadow-[0_4px_16px_rgba(17,24,39,0.06)] sm:p-7">
        <div className="flex flex-col items-center gap-7 sm:flex-row">
          <Ring value={stats.answeredToday} max={progress.goal} label={`${stats.answeredToday}/${progress.goal}`} caption="TODAY" />

          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-extrabold text-ink">
              {stats.answeredToday >= progress.goal
                ? "Daily goal complete"
                : stats.due > 0
                  ? `${stats.due} word${stats.due === 1 ? "" : "s"} due for review`
                  : "Ready for a new batch"}
            </h2>
            <p className="mt-1 text-muted">
              {stats.streak > 0 ? (
                <>🔥 <b className="text-ink">{stats.streak}-day streak</b> · </>
              ) : null}
              {stats.started} of {words.length} words started · {stats.accuracy}% accuracy
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3 sm:justify-start">
              <Link href="/word-coach/practice" className="h-11 rounded-xl bg-brand px-6 text-sm font-semibold leading-[2.75rem] text-white transition-colors hover:bg-brand-hover">
                Start today&apos;s session
              </Link>
              <Link href="/word-coach/library" className="h-11 rounded-xl border border-line px-6 text-sm font-semibold leading-[2.75rem] text-ink transition-colors hover:border-brand hover:text-brand">
                Browse all {words.length} words
              </Link>
            </div>
          </div>

          <div className="w-full sm:w-auto">
            <p className="text-xs font-extrabold tracking-[0.14em] text-muted">LAST 7 DAYS</p>
            <div className="mt-3 flex h-20 items-end gap-1.5">
              {days.map((d) => (
                <div key={d.date} className="flex w-7 flex-col items-center gap-1">
                  <div
                    className={`w-full rounded-t ${d.answered ? "bg-brand" : "bg-line"}`}
                    style={{ height: `${Math.max(4, (d.answered / peak) * 64)}px` }}
                    title={`${d.date}: ${d.answered} answered`}
                  />
                  <span className="text-[10px] font-bold uppercase text-muted">{d.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-5">
          <span className="text-sm font-semibold text-ink">Daily goal</span>
          {GOALS.map((g) => (
            <button
              key={g}
              onClick={() => setGoal(g)}
              aria-pressed={progress.goal === g}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
                progress.goal === g ? "bg-brand text-white" : "bg-surface text-muted hover:text-ink"
              }`}
            >
              {g} words
            </button>
          ))}
          {progress.goal !== DEFAULT_GOAL && (
            <button onClick={() => setGoal(DEFAULT_GOAL)} className="text-sm font-medium text-muted underline hover:text-brand">
              Reset
            </button>
          )}
        </div>
      </section>

      <section aria-labelledby="packs">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="packs" className="text-sm font-extrabold tracking-[0.18em] text-brand">TOPIC PACKS</h2>
          <Link href="/word-coach/progress" className="text-sm font-semibold text-muted hover:text-brand">Full progress →</Link>
        </div>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {topics.map((t) => {
            const pack = wordsByTopic(t.id);
            const mastered = pack.filter((w) => statusOf(progress.words[w.id]) === "mastered").length;
            const started = pack.filter((w) => progress.words[w.id]).length;
            return (
              <li key={t.id}>
                <Link
                  href={`/word-coach/packs/${t.id}`}
                  className="group flex h-full items-center gap-4 rounded-xl border p-4 transition-transform hover:-translate-y-0.5"
                  style={{ background: `${t.color}0d`, borderColor: `${t.color}33` }}
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl text-lg font-extrabold text-white" style={{ background: t.color }}>
                    {pack.length}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold text-ink">{t.name}</span>
                    <span className="block truncate text-sm text-muted">{t.blurb}</span>
                    <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-white">
                      <span className="block h-full rounded-full" style={{ width: `${(started / pack.length) * 100}%`, background: t.color }} />
                    </span>
                  </span>
                  <span className="shrink-0 text-right text-xs font-bold text-muted">
                    {mastered}/{pack.length}
                    <span className="block font-medium">mastered</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
