import "server-only";
import type { ActivityEvent } from "@/lib/activity";
import { collections } from "@/lib/collections";
import { MAX_BOX } from "@/lib/leitner";
import { recentEvents } from "@/lib/events-db";

export type DayStat = { date: string; label: string; minutes: number };

export type Stats = {
  streak: number;
  week: DayStat[];
  todayMinutes: number;
  totals: { reading: number; listening: number; essays: number; wordSessions: number; mastered: number };
  recent: ActivityEvent[];
};

const key = (d: Date) => d.toISOString().slice(0, 10);
const shift = (day: string, by: number) => key(new Date(Date.parse(`${day}T12:00:00Z`) + by * 86_400_000));

/** Consecutive active days ending at the latest one, provided it is today or yesterday (either side of a timezone). */
function streakOf(active: string[]) {
  if (active.length === 0) return 0;
  const set = new Set(active);
  const latest = [...set].sort().at(-1)!;
  if (latest < key(new Date(Date.now() - 2 * 86_400_000))) return 0;
  let streak = 0;
  for (let d = latest; set.has(d); d = shift(d, -1)) streak++;
  return streak;
}

export async function getStats(userId: string): Promise<Stats> {
  const { words, days } = await collections();
  const since = key(new Date(Date.now() - 400 * 86_400_000));

  const [dayDocs, mastered, recent] = await Promise.all([
    days.find({ userId, date: { $gte: since } }).toArray(),
    words.countDocuments({ userId, box: { $gte: MAX_BOX } }),
    recentEvents(userId, 6),
  ]);

  // Rough effort: a word is ~0.5 min, a reading set ~15, an essay ~40.
  const minutesOf = (d?: (typeof dayDocs)[number]) => (d ? Math.round(d.wordsAnswered * 0.5 + (d.reading + (d.listening ?? 0)) * 15 + d.essays * 40) : 0);
  const byDate = new Map(dayDocs.map((d) => [d.date, d]));

  // Days are the user's own calendar days, so a user ahead of UTC may have activity "tomorrow" by the server's clock.
  const latest = dayDocs.map((d) => d.date).sort().at(-1) ?? "";
  const end = latest > key(new Date()) ? latest : key(new Date());
  const week: DayStat[] = Array.from({ length: 7 }, (_, i) => {
    const date = shift(end, i - 6);
    return { date, label: new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" }), minutes: minutesOf(byDate.get(date)) };
  });

  return {
    streak: streakOf(dayDocs.filter((d) => minutesOf(d) > 0 || (d.wordSessions ?? 0) > 0 || (d.listening ?? 0) > 0).map((d) => d.date)),
    week,
    todayMinutes: week[6].minutes,
    totals: {
      reading: dayDocs.reduce((n, d) => n + d.reading, 0),
      listening: dayDocs.reduce((n, d) => n + (d.listening ?? 0), 0),
      essays: dayDocs.reduce((n, d) => n + d.essays, 0),
      wordSessions: dayDocs.reduce((n, d) => n + (d.wordSessions ?? 0), 0),
      mastered,
    },
    recent,
  };
}
