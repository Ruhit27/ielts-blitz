import type { Metadata } from "next";
import PageHeading from "../PageHeading";
import { tipGroups } from "../data";

export const metadata: Metadata = {
  title: "IELTS Study Tips — IELTS Masters",
  description: "Tactics for every IELTS question type across Reading, Listening, Writing and Speaking.",
};

export default function StudyTipsPage() {
  return (
    <>
      <PageHeading title="Study Tips" description="One tactic per question type. Short enough to read before a practice session, specific enough to change your score." crumbs={[{ label: "Study Tips" }]} />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {tipGroups.map((g) => (
          <section key={g.id} aria-labelledby={g.id} className="mt-10 first:mt-0">
            <h2 id={g.id} className="text-sm font-extrabold tracking-[0.18em] text-brand">{g.skill.toUpperCase()}</h2>
            <p className="mt-1.5 text-sm text-muted">{g.blurb}</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {g.tips.map((t) => (
                <li key={t.name} className="rounded-xl border border-line bg-white p-5">
                  <h3 className="font-semibold text-ink">{t.name}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted">{t.tactic}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
