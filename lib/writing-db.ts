import "server-only";
import { collections } from "@/lib/collections";
import type { HistoryEntry } from "@/app/writing/history-store";

const KEEP = 100;

const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : null);

function clean(raw: unknown): HistoryEntry | null {
  if (!raw || typeof raw !== "object") return null;
  const e = raw as Record<string, unknown>;
  const id = str(e.id, 64);
  const date = str(e.date, 40);
  const note = str(e.note, 200);
  const snippet = str(e.snippet, 300);
  if (!id || !date || Number.isNaN(Date.parse(date)) || note === null || snippet === null) return null;
  if (e.source !== "Checker" && e.source !== "Mock test") return null;
  if (e.task !== 1 && e.task !== 2) return null;
  if (typeof e.words !== "number" || !Number.isInteger(e.words) || e.words < 0 || e.words > 10_000) return null;
  return { id, date, source: e.source, task: e.task, words: e.words, note, snippet };
}

export async function listEntries(userId: string): Promise<HistoryEntry[]> {
  const { entries } = await collections();
  return entries.find({ userId }, { projection: { _id: 0, userId: 0 } }).sort({ date: -1 }).limit(KEEP).toArray();
}

/** Stores new entries (already-known ids are ignored) and, when `day` is given, counts them as that day's writing activity. */
export async function addEntries(userId: string, raw: unknown[], day: string | null) {
  const valid = raw.map(clean).filter((e): e is HistoryEntry => e !== null);
  if (valid.length === 0) return 0;
  const { entries, days } = await collections();

  const res = await entries.bulkWrite(
    valid.map((e) => ({ updateOne: { filter: { userId, id: e.id }, update: { $setOnInsert: e }, upsert: true } })),
    { ordered: false },
  );
  if (day && res.upsertedCount > 0) {
    await days.updateOne({ userId, date: day }, { $inc: { essays: res.upsertedCount } }, { upsert: true });
  }

  // Keep only the newest KEEP entries per user so storage stays bounded.
  const cutoff = await entries.find({ userId }, { projection: { date: 1 } }).sort({ date: -1 }).skip(KEEP).limit(1).next();
  if (cutoff) await entries.deleteMany({ userId, date: { $lte: cutoff.date } });
  return res.upsertedCount;
}

export async function clearEntries(userId: string) {
  const { entries } = await collections();
  await entries.deleteMany({ userId });
}
