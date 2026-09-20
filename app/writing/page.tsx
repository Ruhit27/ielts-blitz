import type { Metadata } from "next";
import Link from "next/link";
import PageHeading from "./PageHeading";
import WritingIcon from "./WritingIcon";
import { writingTasks } from "./data";

export const metadata: Metadata = {
  title: "IELTS Writing Practice — IELTS Masters",
  description: "Lessons, tips and Band 8 model answers for IELTS Writing Task 1 and Task 2.",
};

const facts = [
  { title: "Task 1", lines: ["About 20 minutes", "At least 150 words", "Academic: describe a chart, table, graph, map or process", "General Training: write a letter"] },
  { title: "Task 2", lines: ["About 40 minutes", "At least 250 words", "An essay responding to a point of view or problem", "Counts twice as much as Task 1"] },
];

export default function WritingPage() {
  return (
    <>
      <PageHeading title="IELTS Writing" description="Two tasks, 60 minutes. Learn how each task works, study Band 8 model answers and practise with real exam-style questions." />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <section aria-labelledby="format" className="grid gap-4 sm:grid-cols-2">
          <h2 id="format" className="sr-only">Test format</h2>
          {facts.map((f) => (
            <div key={f.title} className="rounded-2xl border border-line bg-white p-5 shadow-[0_4px_16px_rgba(17,24,39,0.06)]">
              <h3 className="text-lg font-extrabold text-ink">{f.title}</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted">
                {f.lines.map((l) => (
                  <li key={l} className="flex gap-2">
                    <span className="text-brand" aria-hidden="true">•</span>
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <h2 className="mt-12 text-sm font-extrabold tracking-[0.18em] text-brand">CHOOSE A TASK</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {writingTasks.map((p) => (
            <li key={p.id}>
              <Link href={`/writing/${p.id}`} className="group flex h-full gap-4 rounded-xl border border-line bg-white p-4 transition-shadow hover:shadow-md">
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <WritingIcon d={p.icon} />
                </span>
                <span>
                  <span className="block font-semibold text-ink group-hover:text-brand">{p.name}</span>
                  <span className="mt-0.5 block text-sm text-muted">{p.description}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
