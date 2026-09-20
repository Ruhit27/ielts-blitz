import PageHeading from "./PageHeading";
import WritingIcon from "./WritingIcon";
import type { TaskContent } from "./task-content";

const card = "rounded-2xl border border-line bg-white p-5 shadow-[0_4px_16px_rgba(17,24,39,0.06)]";
const eyebrow = "text-sm font-extrabold tracking-[0.18em] text-brand";

const countWords = (t: string) => t.trim().split(/\s+/).filter(Boolean).length;

function Section({ id, label, title, children }: { id: string; label: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-40 pt-12">
      <p className={eyebrow}>{label}</p>
      <h2 id={`${id}-h`} className="mt-2 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function DataTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="mt-3 w-full max-w-lg border-collapse text-left text-sm">
        <thead>
          <tr>{head.map((h) => <th key={h} className="border-b border-line py-1.5 pr-4 font-bold text-ink">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>{r.map((c, i) => <td key={i} className="border-b border-line py-1.5 pr-4 text-ink">{c}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TaskPage({ task }: { task: TaskContent }) {
  const jumps = [
    ["info", "Test info"],
    ["types", task.id === "task-1" ? "Question types" : "Essay types"],
    ["questions", "Practice questions"],
    ["tips", "Essential tips"],
    ["models", "Model answers"],
    ["lessons", "Practice lessons"],
  ];

  return (
    <>
      <PageHeading crumb={task.id === "task-1" ? "Task 1" : "Task 2"} title={task.title} description={task.description} />

      <nav aria-label="On this page" className="sticky top-[72px] z-30 border-b border-line bg-white/90 backdrop-blur">
        <ul className="mx-auto flex max-w-5xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          {jumps.map(([id, label]) => (
            <li key={id} className="shrink-0">
              <a href={`#${id}`} className="block rounded-full bg-surface px-4 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-brand hover:text-white">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <Section id="info" label="TEST INFORMATION" title={`What to know about ${task.title.replace("IELTS Writing ", "")}`}>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Time", `${task.minutes} min`],
              ["Length", `${task.min}+ words`],
              ["Weight", task.id === "task-1" ? "1/3 of score" : "2/3 of score"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl bg-brand/10 p-5">
                <p className="text-xs font-extrabold tracking-[0.18em] text-brand">{k.toUpperCase()}</p>
                <p className="mt-1 text-2xl font-extrabold text-ink">{v}</p>
              </div>
            ))}
          </div>
          <ol className={`${card} mt-4 space-y-3`}>
            {task.facts.map((f, i) => (
              <li key={f} className="flex gap-3 text-[15px] text-ink">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand text-xs font-bold text-white">{i + 1}</span>
                {f}
              </li>
            ))}
          </ol>
        </Section>

        <Section id="types" label={task.id === "task-1" ? "QUESTION TYPES" : "ESSAY TYPES"} title={task.typesTitle}>
          <p className="max-w-2xl text-muted">{task.typesIntro}</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {task.types.map((t) => (
              <li key={t.name} className="rounded-xl border border-line bg-white p-4">
                <span className="grid size-11 place-items-center rounded-lg bg-brand/10 text-brand"><WritingIcon d={t.icon} /></span>
                <h3 className="mt-3 font-semibold text-ink">{t.name}</h3>
                <p className="mt-1 text-sm text-muted">{t.blurb}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="questions" label="PRACTICE" title="Practice questions">
          <ul className="space-y-3">
            {task.questions.map((q) => (
              <li key={q.prompt} className="rounded-xl border border-line bg-surface p-4">
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-brand">{q.type}</span>
                <p className="mt-2 text-[15px] text-ink">{q.prompt}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="tips" label="ESSENTIAL TIPS" title={`Tips for ${task.title.replace("IELTS Writing ", "")}`}>
          <ol className="grid gap-3 sm:grid-cols-2">
            {task.tips.map((t, i) => (
              <li key={t.title} className="flex gap-3 rounded-xl border border-line bg-white p-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand text-sm font-extrabold text-white">{i + 1}</span>
                <div>
                  <h3 className="font-semibold text-ink">{t.title}</h3>
                  <p className="mt-1 text-sm text-muted">{t.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="models" label="MODEL ANSWERS" title="Band 8 model answers">
          <div className="space-y-3">
            {task.models.map((m) => (
              <details key={m.title} className="group rounded-2xl border border-line bg-white shadow-[0_4px_16px_rgba(17,24,39,0.06)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5">
                  <span>
                    <span className="block text-xs font-extrabold tracking-[0.18em] text-brand">{m.type.toUpperCase()}</span>
                    <span className="mt-1 block text-lg font-bold text-ink">{m.title}</span>
                  </span>
                  <span className="text-muted transition-transform group-open:rotate-180" aria-hidden="true">▾</span>
                </summary>
                <div className="border-t border-line p-5">
                  <div className="rounded-xl bg-surface p-4 text-sm text-ink">
                    <p className="font-bold">About {task.minutes} minutes · at least {task.min} words</p>
                    <p className="mt-2">{m.prompt}</p>
                    {m.table && <DataTable {...m.table} />}
                  </div>
                  <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-ink">
                    {m.text.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                  <p className="mt-4 text-xs font-semibold text-muted">{countWords(m.text)} words</p>
                  <div className="mt-4 rounded-xl bg-success/10 p-4">
                    <p className="text-sm font-bold text-success">Why it scores well</p>
                    <p className="mt-1 text-sm text-ink">{m.notes}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </Section>

        <Section id="lessons" label="PRACTICE LESSONS" title="Practice lessons">
          <div className="space-y-2">
            {task.lessons.map((l, i) => (
              <details key={l.title} className="group rounded-xl border border-line bg-white">
                <summary className="flex cursor-pointer list-none items-center gap-3 p-4">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand/10 text-sm font-extrabold text-brand">{i + 1}</span>
                  <span className="flex-1 font-semibold text-ink group-hover:text-brand">{l.title}</span>
                  <span className="text-muted transition-transform group-open:rotate-180" aria-hidden="true">▾</span>
                </summary>
                <p className="px-4 pb-4 pl-14 text-sm text-muted">{l.body}</p>
              </details>
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}
