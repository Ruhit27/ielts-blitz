import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Header from "../components/Header";
import { leagueSummary, topPlayers, type Scope } from "@/lib/league-db";
import { DAILY_XP_CAP, PASS_RATIO, XP_PER_TASK } from "@/lib/xp";

export const metadata: Metadata = { title: "League — IELTS Masters" };

const medal = ["bg-gold text-white", "bg-slate-300 text-slate-700", "bg-amber-700/80 text-white"];

function Row({ rank, name, xp, mine }: { rank: number; name: string; xp: number; mine: boolean }) {
  return (
    <li className={`flex items-center gap-4 px-4 py-3 ${mine ? "bg-red-50/60" : ""}`}>
      <span className={`grid size-8 shrink-0 place-items-center rounded-full text-sm font-extrabold ${rank <= 3 && xp > 0 ? medal[rank - 1] : "bg-surface text-muted"}`}>{rank}</span>
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink text-sm font-bold text-white" aria-hidden="true">{name[0]?.toUpperCase() ?? "L"}</span>
      <span className="min-w-0 flex-1 truncate font-bold text-ink">
        {name}
        {mine && name !== "You" && <span className="ml-2 rounded-full bg-brand px-2 py-0.5 text-[11px] font-bold text-white">You</span>}
      </span>
      <span className="font-extrabold text-ink">{xp.toLocaleString()} <span className="text-xs font-bold text-muted">XP</span></span>
    </li>
  );
}

export default async function LeaguePage({ searchParams }: PageProps<"/league">) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const scope: Scope = (await searchParams).scope === "all" ? "all" : "week";
  const [rows, me] = await Promise.all([topPlayers(scope), leagueSummary(userId, scope)]);
  const inList = rows.some((r) => r.userId === userId);

  return (
    <>
      <Header />
      <main className="flex-1 bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <p className="text-xs font-extrabold tracking-[0.18em] text-brand">LEAGUE</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">How you rank</h1>
          <p className="mt-3 text-muted">
            Earn {XP_PER_TASK} XP each time you finish a task well: score {Math.round(PASS_RATIO * 100)}% or more on a reading set or word session, or write an essay that meets the minimum length. Up to {DAILY_XP_CAP} XP a day.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <div role="tablist" aria-label="Period" className="inline-flex rounded-xl bg-white p-1 shadow-sm">
              {([["week", "This week"], ["all", "All time"]] as const).map(([id, label]) => (
                <Link key={id} href={`/league?scope=${id}`} role="tab" aria-selected={scope === id} className={`rounded-lg px-4 py-2 text-sm font-bold ${scope === id ? "bg-brand text-white" : "text-muted hover:text-ink"}`}>
                  {label}
                </Link>
              ))}
            </div>
            <p className="text-sm text-muted">
              You are <strong className="text-ink">#{me.rank.toLocaleString()}</strong> of {me.total.toLocaleString()} learners
            </p>
          </div>

          <ol className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
            {rows.map((r, i) => <Row key={r.userId} rank={i + 1} name={r.name} xp={r.xp} mine={r.userId === userId} />)}
            {!inList && (
              <>
                <li className="px-4 py-2 text-center text-xs font-semibold text-muted" aria-hidden="true">•••</li>
                <Row rank={me.rank} name="You" xp={me.xp} mine />
              </>
            )}
          </ol>
        </div>
      </main>
    </>
  );
}
