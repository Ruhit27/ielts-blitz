import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import Header from "../components/Header";
import { dailyMinutes, daysUntil, paceOf, weeklyPlan, type Pace } from "@/lib/profile";
import { getProfile } from "@/lib/profile-db";
import { getStats } from "@/lib/stats";

export const metadata = { title: "Dashboard — IELTS Masters" };

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
};

const paceCopy: Record<Pace, { tone: string; text: (gap: string, days: number) => string }> = {
  comfortable: { tone: "border-emerald-200 bg-emerald-50 text-emerald-800", text: (g, d) => `${g} bands to go with ${d} days left. A steady routine will get you there.` },
  focused: { tone: "border-amber-200 bg-amber-50 text-amber-800", text: (g, d) => `${g} bands to go in ${d} days. Stay consistent and this is within reach.` },
  intense: { tone: "border-red-200 bg-red-50 text-brand", text: (g, d) => `${g} bands to go with only ${d} days left. Time to dig in.` },
};

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const profile = await getProfile(userId);
  if (!profile) redirect("/onboarding");

  const [user, stats] = await Promise.all([currentUser(), getStats(userId)]);
  const name = user?.firstName ?? "there";

  const days = daysUntil(profile.examDate);
  const gap = profile.goalBand - profile.currentBand;
  const { pace } = paceOf(gap, days);
  const copy = paceCopy[pace];
  const plan = weeklyPlan(pace, gap);
  const minutes = dailyMinutes(pace);

  // Track spans 4–9 like the design; clamp the marker inside it.
  const pos = (b: number) => `${(Math.min(9, Math.max(4, b)) - 4) / 5 * 100}%`;
  const todayIdx = (new Date().getDay() + 6) % 7;

  return (
    <>
      <Header />
      <main className="flex-1 bg-surface">
        <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
          {/* Readiness */}
          <section className="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-extrabold tracking-[0.18em] text-brand">YOUR READINESS</p>
                <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                  {greeting()}, <em className="text-brand underline decoration-2 underline-offset-4">{name}</em>
                </h1>
                <p className={`mt-4 inline-flex max-w-full items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold ${copy.tone}`}>
                  {copy.text(gap.toFixed(1), days)}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-5">
                  <Link href="/reading/mcq" className="rounded-xl bg-ink px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-black">
                    Practice Multiple Choice Questions →
                  </Link>
                  <Link href="/word-coach/progress" className="text-sm font-semibold text-muted hover:text-brand">See full progress →</Link>
                </div>
              </div>

              <div className="flex items-center gap-6 md:flex-col md:items-center md:border-l md:border-line md:pl-8">
                <div className="grid size-32 place-items-center rounded-full bg-brand text-white shadow-lg ring-4 ring-red-100">
                  <div className="text-center">
                    <p className="text-[10px] font-extrabold tracking-[0.2em] opacity-80">BAND</p>
                    <p className="text-4xl font-extrabold leading-none">{profile.currentBand.toFixed(1)}</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-[11px] font-extrabold tracking-[0.18em] text-muted">YOUR ESTIMATED BAND</p>
                  <p className="mt-2 rounded-xl bg-surface px-4 py-2 text-sm text-muted">
                    <strong className="text-base text-ink">{days} days</strong> to exam
                  </p>
                  <Link href="/onboarding" className="mt-2 inline-block text-xs font-semibold text-muted hover:text-brand">Edit goal</Link>
                </div>
              </div>
            </div>

            {/* Band track */}
            <div className="mt-10 border-t border-line pt-8">
              <div className="relative mx-2 h-16">
                <div className="absolute inset-x-0 top-7 h-2.5 rounded-full bg-surface" />
                <div
                  className="absolute top-7 h-2.5 rounded-full bg-gradient-to-r from-brand to-gold"
                  style={{ left: pos(profile.currentBand), width: `calc(${pos(profile.goalBand)} - ${pos(profile.currentBand)})` }}
                />
                <div className="absolute top-0 -translate-x-1/2 text-center" style={{ left: pos(profile.goalBand) }}>
                  <p className="text-xs font-extrabold text-amber-700">Goal {profile.goalBand.toFixed(1)}</p>
                  <div className="mx-auto mt-1 h-5 w-0.5 bg-gold" />
                </div>
                <div className="absolute top-[22px] -translate-x-1/2" style={{ left: pos(profile.currentBand) }}>
                  <div className="size-5 rounded-full border-2 border-white bg-brand shadow" />
                  <p className="mt-1 -translate-x-0 whitespace-nowrap text-center text-xs font-extrabold text-brand">You {profile.currentBand.toFixed(1)}</p>
                </div>
              </div>
              <div className="mx-2 mt-1 flex justify-between text-xs text-muted">
                {[4, 5, 6, 7, 8, 9].map((b) => <span key={b}>{b}</span>)}
              </div>
            </div>
          </section>

          {/* Tracked activity */}
          <section className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-line bg-white p-6 lg:col-span-2">
              <div className="flex items-baseline justify-between">
                <h2 className="text-lg font-extrabold text-ink">This week</h2>
                <p className="text-sm text-muted">{stats.weekItems} {stats.weekItems === 1 ? "activity" : "activities"} · {minutes} min/day target</p>
              </div>
              <div className="mt-6 flex h-32 items-end gap-3" role="img" aria-label={`Study minutes per day: ${stats.week.map((d) => `${d.label} ${d.minutes}`).join(", ")}`}>
                {stats.week.map((d) => {
                  const h = Math.min(100, (d.minutes / Math.max(minutes, 1)) * 100);
                  return (
                    <div key={d.date} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                      <div className="flex w-full flex-1 items-end rounded-lg bg-surface">
                        <div className={`w-full rounded-lg ${h >= 100 ? "bg-success" : "bg-brand"}`} style={{ height: `${d.minutes > 0 ? Math.max(h, 8) : 0}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-muted">{d.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Day streak", value: String(stats.streak), sub: stats.streak > 0 ? "Keep it going" : "Practise today" },
                { label: "Words mastered", value: String(stats.mastered), sub: `${stats.started} of ${stats.totalWords} started` },
                { label: "Due for review", value: String(stats.due), sub: stats.accuracy ? `${stats.accuracy}% accuracy` : "Word Coach" },
                { label: "Essays checked", value: String(stats.essays), sub: `${stats.readingSets} reading sets` },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-line bg-white p-4">
                  <p className="text-[11px] font-extrabold tracking-[0.12em] text-muted">{s.label.toUpperCase()}</p>
                  <p className="mt-1.5 text-2xl font-extrabold text-ink">{s.value}</p>
                  <p className="mt-0.5 text-xs text-muted">{s.sub}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Weekly plan */}
          <section className="rounded-3xl border border-line bg-white p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-xl font-extrabold text-ink">Your weekly plan</h2>
              <p className="text-sm text-muted">Built for a {profile.currentBand.toFixed(1)} → {profile.goalBand.toFixed(1)} goal in {profile.timeframeMonths} month{profile.timeframeMonths === 1 ? "" : "s"}</p>
            </div>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {plan.map((p, i) => (
                <li key={p.day}>
                  <Link
                    href={p.href}
                    className={`block h-full rounded-2xl border p-4 transition-colors hover:border-brand ${i === todayIdx ? "border-brand bg-red-50/50" : "border-line"}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold tracking-[0.14em] text-brand">{p.day.toUpperCase()}{i === todayIdx && " · TODAY"}</span>
                      <span className="text-xs font-semibold text-muted">{p.minutes} min</span>
                    </div>
                    <p className="mt-2 font-bold text-ink">{p.title}</p>
                    <p className="mt-1 text-sm text-muted">{p.detail}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
