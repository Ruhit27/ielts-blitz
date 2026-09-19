"use client";

import Link from "next/link";
import { useState } from "react";
import { topics, words, wordsByTopic } from "../data";
import { isDue, resetAll, resetWord, statusLabel, statusOf, summarise, type Status } from "../progress-store";
import { useProgress } from "../useProgress";

const statusColor: Record<Status, string> = {
  new: "bg-line text-muted",
  learning: "bg-writing/20 text-ink",
  review: "bg-reading/20 text-ink",
  mastered: "bg-success/20 text-success",
};

function when(due: string) {
  const diff = new Date(due).getTime() - Date.now();
  if (diff <= 0) return "Due now";
  const days = Math.ceil(diff / 86_400_000);
  return days <= 1 ? "Tomorrow" : `In ${days} days`;
}

export default function ProgressView() {
  const progress = useProgress();
  const [confirming, setConfirming] = useState(false);
  const stats = summarise(progress, words.map((w) => w.id));
  const order: Status[] = ["mastered", "review", "learning", "new"];

  return (
    <div className="space-y-10">
      <section className="grid gap-3 sm:grid-cols-4">
        {[
          { label: "Words started", value: `${stats.started}/${words.length}` },
          { label: "Mastered", value: stats.counts.mastered },
          { label: "Due now", value: stats.due },
          { label: "Accuracy", value: `${stats.accuracy}%` },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-line bg-white p-4">
            <p className="text-2xl font-extrabold text-ink">{s.value}</p>
            <p className="text-sm text-muted">{s.label}</p>
          </div>
        ))}
      </section>

      <section aria-labelledby="breakdown">
        <h2 id="breakdown" className="text-sm font-extrabold tracking-[0.18em] text-brand">WHERE YOUR WORDS STAND</h2>
        <div className="mt-4 flex h-5 overflow-hidden rounded-full bg-line" role="img" aria-label={order.map((s) => `${statusLabel[s]}: ${stats.counts[s]}`).join(", ")}>
          {order.map((s) => (
            stats.counts[s] > 0 && (
              <span
                key={s}
                className={statusColor[s].split(" ")[0]}
                style={{ width: `${(stats.counts[s] / words.length) * 100}%` }}
              />
            )
          ))}
        </div>
        <ul className="mt-3 flex flex-wrap gap-4 text-sm">
          {order.map((s) => (
            <li key={s} className="flex items-center gap-2">
              <span className={`size-3 rounded-full ${statusColor[s].split(" ")[0]}`} aria-hidden="true" />
              <span className="font-semibold text-ink">{stats.counts[s]}</span>
              <span className="text-muted">{statusLabel[s]}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="bytopic">
        <h2 id="bytopic" className="text-sm font-extrabold tracking-[0.18em] text-brand">BY TOPIC</h2>
        <ul className="mt-4 space-y-3">
          {topics.map((t) => {
            const pack = wordsByTopic(t.id);
            const mastered = pack.filter((w) => statusOf(progress.words[w.id]) === "mastered").length;
            return (
              <li key={t.id} className="flex items-center gap-4">
                <Link href={`/word-coach/packs/${t.id}`} className="w-32 shrink-0 text-sm font-semibold text-ink hover:text-brand">
                  {t.name}
                </Link>
                <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-line">
                  <span className="block h-full rounded-full" style={{ width: `${(mastered / pack.length) * 100}%`, background: t.color }} />
                </span>
                <span className="w-14 shrink-0 text-right text-sm font-bold tabular-nums text-muted">{mastered}/{pack.length}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="all">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="all" className="text-sm font-extrabold tracking-[0.18em] text-brand">EVERY WORD</h2>
          {confirming ? (
            <span className="flex items-center gap-3 text-sm">
              <span className="text-ink">Erase all progress?</span>
              <button onClick={() => { resetAll(); setConfirming(false); }} className="font-bold text-error hover:underline">Yes, erase</button>
              <button onClick={() => setConfirming(false)} className="font-semibold text-muted hover:text-ink">Cancel</button>
            </span>
          ) : (
            <button onClick={() => setConfirming(true)} className="text-sm font-semibold text-muted hover:text-brand">Reset all progress</button>
          )}
        </div>

        <div className="mt-4 overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
            <thead className="bg-surface">
              <tr>
                <th scope="col" className="px-4 py-3 font-bold text-ink">Word</th>
                <th scope="col" className="px-4 py-3 font-bold text-ink">Status</th>
                <th scope="col" className="px-4 py-3 font-bold text-ink">Seen</th>
                <th scope="col" className="px-4 py-3 font-bold text-ink">Next review</th>
                <th scope="col" className="px-4 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {words.map((w) => {
                const state = progress.words[w.id];
                const status = statusOf(state);
                return (
                  <tr key={w.id} className="border-t border-line">
                    <td className="px-4 py-2.5 font-semibold text-ink">{w.word}</td>
                    <td className="px-4 py-2.5">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${statusColor[status]}`}>{statusLabel[status]}</span>
                    </td>
                    <td className="px-4 py-2.5 tabular-nums text-muted">{state ? `${state.correct}/${state.seen}` : "—"}</td>
                    <td className={`px-4 py-2.5 ${isDue(state) ? "font-semibold text-brand" : "text-muted"}`}>
                      {state ? (status === "mastered" ? "Mastered" : when(state.due)) : "—"}
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      {state && (
                        <button onClick={() => resetWord(w.id)} className="text-xs font-semibold text-muted hover:text-brand">Reset</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
