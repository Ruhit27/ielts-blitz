import "server-only";
import { collections } from "@/lib/collections";
import { DEFAULT_GOAL, MAX_BOX, nextState, type WordState } from "@/lib/leitner";
import { wordById } from "@/app/word-coach/data";

export type DayLog = { answered: number; correct: number };
export type ProgressPayload = { words: Record<string, WordState>; log: Record<string, DayLog>; goal: number };

const HISTORY_DAYS = 400;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

/** A real calendar date within a day or two of now, in any timezone. */
export function isValidDay(day: unknown): day is string {
  if (typeof day !== "string" || !DATE.test(day)) return false;
  const t = Date.parse(`${day}T12:00:00Z`);
  return Number.isFinite(t) && Math.abs(t - Date.now()) < 3 * 86_400_000;
}

export const isWordId = (id: unknown): id is string => typeof id === "string" && Object.hasOwn(wordById, id);

export async function loadProgress(userId: string): Promise<ProgressPayload> {
  const { words, days, settings } = await collections();
  const since = new Date(Date.now() - HISTORY_DAYS * 86_400_000).toISOString().slice(0, 10);
  const [wordDocs, dayDocs, setting] = await Promise.all([
    words.find({ userId }).toArray(),
    days.find({ userId, date: { $gte: since } }).toArray(),
    settings.findOne({ userId }),
  ]);
  return {
    words: Object.fromEntries(
      wordDocs.map((d) => [d.wordId, { box: d.box, due: d.due.toISOString(), seen: d.seen, correct: d.correct, run: d.run }]),
    ),
    log: Object.fromEntries(dayDocs.filter((d) => d.wordsAnswered > 0).map((d) => [d.date, { answered: d.wordsAnswered, correct: d.wordsCorrect }])),
    goal: setting?.wordGoal ?? DEFAULT_GOAL,
  };
}

export async function recordAnswer(userId: string, wordId: string, correct: boolean, day: string, opId: string) {
  const { words, days } = await collections();
  const prev = await words.findOne({ userId, wordId });
  if (prev?.lastOp === opId) return;

  const next = nextState(prev ? { box: prev.box, due: prev.due.toISOString(), seen: prev.seen, correct: prev.correct, run: prev.run } : undefined, correct);
  await words.updateOne(
    { userId, wordId },
    { $set: { box: next.box, due: new Date(next.due), seen: next.seen, correct: next.correct, run: next.run, lastOp: opId, updatedAt: new Date() } },
    { upsert: true },
  );
  await days.updateOne({ userId, date: day }, { $inc: { wordsAnswered: 1, wordsCorrect: correct ? 1 : 0 } }, { upsert: true });
}

export async function setGoal(userId: string, goal: number) {
  const { settings } = await collections();
  await settings.updateOne({ userId }, { $set: { wordGoal: goal } }, { upsert: true });
}

export async function resetWord(userId: string, wordId: string) {
  const { words } = await collections();
  await words.deleteOne({ userId, wordId });
}

export async function resetAll(userId: string) {
  const { words, days, settings } = await collections();
  await Promise.all([
    words.deleteMany({ userId }),
    settings.deleteOne({ userId }),
    days.updateMany({ userId }, { $set: { wordsAnswered: 0, wordsCorrect: 0 } }),
  ]);
}

const int = (v: unknown, min: number, max: number) => (typeof v === "number" && Number.isInteger(v) && v >= min && v <= max ? v : null);

/** One-off upload of progress a user built up in this browser before it was tied to an account. Ignored if they already have server data. */
export async function importProgress(userId: string, body: unknown) {
  const { words, days, settings } = await collections();
  if ((await words.countDocuments({ userId }, { limit: 1 })) > 0) return false;
  if (!body || typeof body !== "object") return false;
  const { words: w, log, goal } = body as { words?: Record<string, Partial<WordState>>; log?: Record<string, Partial<DayLog>>; goal?: unknown };

  const wordOps = Object.entries(w ?? {}).flatMap(([wordId, s]) => {
    const box = int(s?.box, 1, MAX_BOX);
    const seen = int(s?.seen, 0, 100_000);
    const correct = int(s?.correct, 0, 100_000);
    const run = int(s?.run, 0, 100_000);
    const due = typeof s?.due === "string" ? new Date(s.due) : null;
    if (!isWordId(wordId) || box === null || seen === null || correct === null || run === null || !due || Number.isNaN(due.getTime())) return [];
    return [{ updateOne: { filter: { userId, wordId }, update: { $setOnInsert: { box, due, seen, correct, run, updatedAt: new Date() } }, upsert: true } }];
  });
  const dayOps = Object.entries(log ?? {}).flatMap(([date, d]) => {
    const answered = int(d?.answered, 0, 100_000);
    const correct = int(d?.correct, 0, 100_000);
    if (!DATE.test(date) || answered === null || correct === null) return [];
    return [{ updateOne: { filter: { userId, date }, update: { $setOnInsert: { wordsAnswered: answered, wordsCorrect: correct } }, upsert: true } }];
  });

  if (wordOps.length) await words.bulkWrite(wordOps, { ordered: false });
  if (dayOps.length) await days.bulkWrite(dayOps, { ordered: false });
  const g = int(goal, 1, 500);
  if (g) await settings.updateOne({ userId }, { $set: { wordGoal: g } }, { upsert: true });
  return wordOps.length > 0;
}
