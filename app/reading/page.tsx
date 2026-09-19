import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import { difficultyDot, questionTypes } from "./data";

export const metadata: Metadata = {
  title: "IELTS Reading Practice — IELTS Masters",
  description: "Learn every IELTS Reading question type and try a demo question for each.",
};

export default function ReadingPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="bg-surface">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">IELTS Reading</h1>
            <p className="mt-3 max-w-2xl text-lg text-muted">
              Eleven question types, from Moderate to Very Hard. Choose one to learn the format and try demo questions.
            </p>
          </div>
        </div>

        <section aria-labelledby="qt-heading" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 id="qt-heading" className="text-sm font-extrabold tracking-[0.18em] text-brand">
            QUESTION TYPES
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {questionTypes.map((t) => (
              <li key={t.id}>
                <Link
                  href={`/reading/${t.id}`}
                  className="group flex items-center gap-4 rounded-xl border border-line bg-white p-4 transition-shadow hover:shadow-md"
                >
                  <span
                    className="grid size-11 shrink-0 place-items-center rounded-lg bg-surface text-xs font-extrabold text-ink transition-colors group-hover:bg-brand group-hover:text-white"
                    aria-hidden="true"
                  >
                    {t.short}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-ink group-hover:text-brand">{t.name}</span>
                    <span className="flex items-center gap-1.5 text-sm text-muted">
                      <span className={`size-2 rounded-full ${difficultyDot[t.difficulty]}`} aria-hidden="true" />
                      {t.difficulty}
                    </span>
                  </span>
                  <span className="text-muted transition-colors group-hover:text-brand" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
