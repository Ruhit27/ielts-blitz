import type { Metadata } from "next";
import Link from "next/link";
import { difficultyDot } from "../reading/data";
import { generalTips, listeningTypes, sections } from "./data";

export const metadata: Metadata = {
  title: "IELTS Listening Practice — IELTS Masters",
  description: "Learn the IELTS Listening format, every question type and the strategies that raise your band.",
};

const facts = [
  ["4", "sections"],
  ["40", "questions"],
  ["30 min", "of audio"],
  ["1", "play only"],
];

export default function ListeningPage() {
  return (
    <>
      <div className="bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">IELTS Listening</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted">
            Four recordings, forty questions. Learn how each section works, master every question type, then practise with audio and get scored instantly.
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {facts.map(([n, l]) => (
              <div key={l} className="rounded-2xl border border-line bg-white p-4">
                <dt className="sr-only">{l}</dt>
                <dd className="text-2xl font-extrabold text-ink">{n}</dd>
                <dd className="text-sm text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-14 px-4 py-12 sm:px-6 lg:px-8">
        <section aria-labelledby="sections">
          <h2 id="sections" className="text-sm font-extrabold tracking-[0.18em] text-brand">THE FOUR SECTIONS</h2>
          <ol className="mt-5 grid gap-4 sm:grid-cols-2">
            {sections.map((s) => (
              <li key={s.n} className="flex gap-4 rounded-2xl border border-line bg-white p-5">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-sm font-extrabold text-white">{s.n}</span>
                <span>
                  <span className="block font-extrabold text-ink">{s.title}</span>
                  <span className="mt-1 block text-sm text-muted">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-muted">
            On paper you get 10 minutes at the end to copy your answers to the answer sheet. On computer you get 2 minutes to check them.
          </p>
        </section>

        <section aria-labelledby="types">
          <h2 id="types" className="text-sm font-extrabold tracking-[0.18em] text-brand">QUESTION TYPES</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {listeningTypes.map((t) => (
              <li key={t.id}>
                <Link href={`/listening/${t.id}`} className="group flex h-full items-start gap-4 rounded-xl border border-line bg-white p-4 transition-shadow hover:shadow-md">
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-surface text-xs font-extrabold text-ink transition-colors group-hover:bg-brand group-hover:text-white" aria-hidden="true">{t.short}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-ink group-hover:text-brand">{t.name}</span>
                    <span className="mt-0.5 block text-sm text-muted">{t.summary}</span>
                    <span className="mt-2 flex items-center gap-2 text-xs text-muted">
                      <span className={`size-2 rounded-full ${difficultyDot[t.difficulty]}`} aria-hidden="true" />
                      {t.difficulty} · {t.section}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="tips">
          <h2 id="tips" className="text-sm font-extrabold tracking-[0.18em] text-brand">SIX STRATEGIES FOR ALL SECTIONS</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {generalTips.map((t) => (
              <li key={t.title} className="rounded-2xl border border-line bg-white p-5">
                <h3 className="font-extrabold text-ink">{t.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{t.text}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
