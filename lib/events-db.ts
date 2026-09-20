import "server-only";
import { collections } from "@/lib/collections";
import type { ActivityEvent, ActivityKind } from "@/lib/activity";
import { addXp } from "@/lib/league-db";
import { DAILY_XP_CAP, earnsXp, XP_PER_TASK } from "@/lib/xp";

const KEEP = 200;
const KINDS: ActivityKind[] = ["reading", "listening", "words", "writing"];

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const count = (v: unknown) => (typeof v === "number" && Number.isInteger(v) && v >= 0 && v <= 1000 ? v : null);

/** Returns a cleaned event, or null if the body isn't a valid completion. */
export function parseEvent(body: unknown, day: string): ActivityEvent | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  const id = str(b.id, 64);
  const title = str(b.title, 80);
  if (!id || !title || !KINDS.includes(b.kind as ActivityKind)) return null;

  const event: ActivityEvent = { id, kind: b.kind as ActivityKind, title, detail: str(b.detail, 120), at: new Date().toISOString(), day };
  if (b.correct !== undefined || b.total !== undefined) {
    const correct = count(b.correct);
    const total = count(b.total);
    if (correct === null || total === null || total === 0 || correct > total) return null;
    event.score = { correct, total };
  }
  return event;
}

/**
 * Stores a completion once (a retried id is ignored), bumps that day's counter and, if the task
 * was done well, awards XP. `essay` carries a writing entry's task and length, which decide its XP.
 */
export async function recordEvent(userId: string, event: ActivityEvent, essay?: { task: 1 | 2; words: number }) {
  const { events, days } = await collections();
  const res = await events.updateOne({ userId, id: event.id }, { $setOnInsert: event }, { upsert: true });
  if (res.upsertedCount === 0) return;

  const counter = event.kind === "words" ? { wordSessions: 1 } : event.kind === "reading" ? { reading: 1 } : event.kind === "listening" ? { listening: 1 } : { essays: 1 };
  let awarded = 0;
  if (earnsXp(event, essay)) {
    try {
      // The filter only matches while today's XP is under the cap; past it the upsert collides
      // with the day's existing document (duplicate key) and the task simply earns nothing.
      await days.updateOne({ userId, date: event.day, xp: { $not: { $gte: DAILY_XP_CAP } } }, { $inc: { ...counter, xp: XP_PER_TASK } }, { upsert: true });
      awarded = XP_PER_TASK;
    } catch (e) {
      if ((e as { code?: number }).code !== 11000) throw e;
    }
  }
  if (awarded) {
    await Promise.all([addXp(userId, awarded), events.updateOne({ userId, id: event.id }, { $set: { xp: awarded } })]);
  } else {
    await days.updateOne({ userId, date: event.day }, { $inc: counter }, { upsert: true });
  }

  const cutoff = await events.find({ userId }, { projection: { at: 1 } }).sort({ at: -1 }).skip(KEEP).limit(1).next();
  if (cutoff) await events.deleteMany({ userId, at: { $lte: cutoff.at } });
}

export async function recentEvents(userId: string, limit = 6): Promise<ActivityEvent[]> {
  const { events } = await collections();
  return events.find({ userId }, { projection: { _id: 0, userId: 0 } }).sort({ at: -1 }).limit(limit).toArray();
}
