import "server-only";
import { collections } from "@/lib/collections";
import { MAX_BOX } from "@/lib/leitner";
import { words } from "@/app/word-coach/data";

export type DayStat = { date: string; label: string; minutes: number; items: number };

export type Stats = {
  streak: number;
  totalWords: number;
  started: number;
  mastered: number;
  due: number;
  accuracy: number;
  essays: number;
  readingSets: number;
  week: DayStat[];
  weekItems: number;
};

const key = (d: Date) => d.toISOString().slice(0, 10);

/** Consecutive active days ending at the latest one, provided it is today or yesterday (either side of a timezone). */
function streakOf(active: string[]) {
  if (active.length === 0) return 0;
  const set = new Set(active);
  const latest = [...set].sort().at(-1)!;
  const cutoff = key(new Date(Date.now() - 2 * 86_400_000));
  if (latest < cutoff) return 0;
  let streak = 0;
  for (const cursor = new Date(`${latest}T12:00:00Z`); set.has(key(cursor)); cursor.setUTCDate(cursor.getUTCDate() - 1)) streak++;
  return streak;
}

export async function getStats(userId: string): Promise<Stats> {
  const { words: wordCol, days: dayCol } = await collections();
  const now = new Date();
  const since = key(new Date(now.getTime() - 400 * 86_400_000));

  const [wordDocs, dayDocs] = await Promise.all([
    wordCol.find({ userId }, { projection: { box: 1, due: 1, seen: 1, correct: 1 } }).toArray(),
    dayCol.find({ userId, date: { $gte: since } }).toArray(),
  ]);

  const seen = wordDocs.reduce((n, w) => n + w.seen, 0);
  const correct = wordDocs.reduce((n, w) => n + w.correct, 0);
  const byDate = new Map(dayDocs.map((d) => [d.date, d]));
  const items = (d?: (typeof dayDocs)[number]) => (d ? d.wordsAnswered + d.essays + d.reading : 0);

  const week: DayStat[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 86_400_000);
    const doc = byDate.get(key(d));
    week.push({
      date: key(d),
      label: d.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" }),
      // Rough effort: a word is ~0.5 min, a reading set ~15, an essay ~40.
      minutes: doc ? Math.round(doc.wordsAnswered * 0.5 + doc.reading * 15 + doc.essays * 40) : 0,
      items: items(doc),
    });
  }

  return {
    streak: streakOf(dayDocs.filter((d) => items(d) > 0).map((d) => d.date)),
    totalWords: words.length,
    started: wordDocs.length,
    mastered: wordDocs.filter((w) => w.box >= MAX_BOX).length,
    due: wordDocs.filter((w) => w.box < MAX_BOX && w.due <= now).length,
    accuracy: seen ? Math.round((correct / seen) * 100) : 0,
    essays: dayDocs.reduce((n, d) => n + d.essays, 0),
    readingSets: dayDocs.reduce((n, d) => n + d.reading, 0),
    week,
    weekItems: week.reduce((n, d) => n + d.items, 0),
  };
}
