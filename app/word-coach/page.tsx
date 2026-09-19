import type { Metadata } from "next";
import PageHeading from "./PageHeading";
import Dashboard from "./Dashboard";
import { modeInfo, type Mode } from "./session";
import { INTERVALS, MAX_BOX } from "./progress-store";
import { words } from "./data";

export const metadata: Metadata = {
  title: "Word Coach — IELTS Masters",
  description: `Learn ${words.length} high-value IELTS words with spaced repetition, five drill types and topic packs.`,
};

const modes = Object.entries(modeInfo) as [Mode, (typeof modeInfo)[Mode]][];

export default function WordCoachPage() {
  return (
    <>
      <PageHeading
        title="Word Coach"
        description={`${words.length} high-value words for IELTS Writing and Speaking, drilled with spaced repetition so you review each one just before you would forget it.`}
      />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Dashboard />

        <section aria-labelledby="modes" className="mt-12">
          <h2 id="modes" className="text-sm font-extrabold tracking-[0.18em] text-brand">FIVE WAYS TO DRILL</h2>
          <p className="mt-2 text-muted">
            Sessions mix these automatically. Recognising a word is easy; producing it under exam pressure is not, so the drills get harder as you improve.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {modes.map(([id, m], i) => (
              <li key={id} className="rounded-xl border border-line bg-white p-4">
                <span className="grid size-8 place-items-center rounded-lg bg-brand/10 text-sm font-extrabold text-brand">{i + 1}</span>
                <p className="mt-3 font-bold text-ink">{m.name}</p>
                <p className="mt-1 text-sm text-muted">{m.instruction}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="srs" className="mt-12 rounded-2xl border border-line bg-surface p-5 sm:p-7">
          <h2 id="srs" className="text-lg font-extrabold text-ink">How the review schedule works</h2>
          <p className="mt-2 text-sm text-muted">
            Every word sits in one of five boxes. Answer correctly and it moves up a box, so you see it again later. Answer
            wrongly and it drops back to box 1, so you see it again today.
          </p>
          <ol className="mt-5 grid gap-2 sm:grid-cols-5">
            {Array.from({ length: MAX_BOX }, (_, i) => i + 1).map((box) => (
              <li key={box} className="rounded-xl border border-line bg-white p-3 text-center">
                <p className="text-xs font-extrabold tracking-wider text-muted">BOX {box}</p>
                <p className="mt-1 text-sm font-bold text-ink">
                  {box === MAX_BOX ? "Mastered" : INTERVALS[box] === 0 ? "Same day" : `+${INTERVALS[box]} day${INTERVALS[box] === 1 ? "" : "s"}`}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-muted">
            Progress is saved in this browser only. It does not sync between devices, and clearing your browser data will clear it.
          </p>
        </section>
      </div>
    </>
  );
}
