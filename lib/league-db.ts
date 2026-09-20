import "server-only";
import { currentUser } from "@clerk/nextjs/server";
import { collections, type LeagueDoc } from "@/lib/collections";
import { weekKey } from "@/lib/xp";

const NAME_TTL = 7 * 86_400_000;

export type Standing = { userId: string; name: string; xp: number };
export type Scope = "week" | "all";

const effectiveWeekXp = (d: Pick<LeagueDoc, "weekXp" | "weekKey">) => (d.weekKey === weekKey() ? d.weekXp : 0);

async function displayName() {
  const u = await currentUser();
  const first = u?.firstName?.trim();
  const last = u?.lastName?.trim();
  return first ? (last ? `${first} ${last[0].toUpperCase()}.` : first) : "Learner";
}

/**
 * Makes sure this user is on the league, and returns their XP. The name is copied from Clerk
 * only when missing or a week old, so this stays cheap on the pages that call it.
 */
export async function ensureEntry(userId: string) {
  const { league } = await collections();
  const existing = await league.findOne({ userId });
  if (existing && Date.now() - existing.nameAt.getTime() < NAME_TTL) {
    return { xp: existing.xp, weekXp: effectiveWeekXp(existing) };
  }

  const name = await displayName();
  await league.updateOne(
    { userId },
    { $set: { name, nameAt: new Date() }, $setOnInsert: { xp: 0, weekXp: 0, weekKey: weekKey() } },
    { upsert: true },
  );
  return existing ? { xp: existing.xp, weekXp: effectiveWeekXp(existing) } : { xp: 0, weekXp: 0 };
}

/** Adds XP to the all-time and weekly totals in one atomic update. */
export async function addXp(userId: string, amount: number) {
  const { league } = await collections();
  const wk = weekKey();
  await league.updateOne({ userId }, [
    {
      $set: {
        weekXp: { $cond: [{ $eq: ["$weekKey", wk] }, { $add: [{ $ifNull: ["$weekXp", 0] }, amount] }, amount] },
        weekKey: wk,
        xp: { $add: [{ $ifNull: ["$xp", 0] }, amount] },
      },
    },
  ], { upsert: true });
}

/** Top players, best first. The weekly board lists this week's scorers, then fills with everyone else on 0. */
export async function topPlayers(scope: Scope, limit = 50): Promise<Standing[]> {
  const { league } = await collections();
  const proj = { projection: { userId: 1, name: 1, xp: 1, weekXp: 1 } };

  if (scope === "all") {
    const rows = await league.find({}, proj).sort({ xp: -1, userId: 1 }).limit(limit).toArray();
    return rows.map((r) => ({ userId: r.userId, name: r.name ?? "Learner", xp: r.xp }));
  }

  const wk = weekKey();
  const active = await league.find({ weekKey: wk, weekXp: { $gt: 0 } }, proj).sort({ weekXp: -1, userId: 1 }).limit(limit).toArray();
  const rows = active.map((r) => ({ userId: r.userId, name: r.name ?? "Learner", xp: r.weekXp }));
  if (rows.length < limit) {
    const taken = active.map((r) => r.userId);
    const rest = await league.find({ userId: { $nin: taken } }, proj).sort({ xp: -1, userId: 1 }).limit(limit - rows.length).toArray();
    rows.push(...rest.map((r) => ({ userId: r.userId, name: r.name ?? "Learner", xp: 0 })));
  }
  return rows;
}

export async function leagueSummary(userId: string, scope: Scope) {
  const { league } = await collections();
  const [me, total] = await Promise.all([ensureEntry(userId), league.estimatedDocumentCount()]);
  const mine = scope === "all" ? me.xp : me.weekXp;
  const ahead =
    scope === "all"
      ? await league.countDocuments({ xp: { $gt: mine } })
      : await league.countDocuments({ weekKey: weekKey(), weekXp: { $gt: mine } });
  return { xp: mine, rank: ahead + 1, total };
}
