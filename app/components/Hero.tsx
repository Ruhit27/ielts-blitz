import Link from "next/link";
import SampleReport from "./SampleReport";

const stats = [
  { value: "50K+", label: "Learners" },
  { value: "1,200+", label: "Practice tests" },
  { value: "7.5", label: "Avg. band achieved" },
];

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 size-[560px] rounded-full bg-brand/10 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4  lg:grid-cols-2 lg:px-8 lg:pt-10 lg:pb-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5  text-sm font-semibold text-brand shadow-sm">
            <span className="size-2 rounded-full bg-gold" />
            Trusted by IELTS candidates worldwide
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
            Master the IELTS with <span className="text-brand">IELTS Masters</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg text-muted">
            Realistic Reading, Listening, Writing and Speaking practice with
            instant feedback, so you always know exactly which band you&apos;re
            heading for.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/reading"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-brand px-7 text-base font-semibold text-white shadow-[0_4px_16px_rgba(235,0,0,0.3)] transition-colors hover:bg-brand-hover"
            >
              Start free practice
            </Link>
            <Link
              href="/exam"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-line bg-white px-7 text-base font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
            >
              Take a mock exam
            </Link>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-muted">
            {["No credit card required", "Instant band scores", "Track your progress"].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <span className="text-success"><Check /></span>
                {t}
              </li>
            ))}
          </ul>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-2xl font-extrabold text-ink">{s.value}</dd>
                <dd className="text-sm text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <SampleReport />
      </div>
    </section>
  );
}
