import "server-only";
import type { Collection } from "mongodb";
import { getDb } from "@/lib/mongodb";
import type { Profile } from "@/lib/profile";
import type { SpeakingRequest } from "@/lib/speaking";
import type { HistoryEntry } from "@/app/writing/history-store";

/** One document per user per word, so a review is a single small upsert however many users there are. */
export type WordDoc = {
  userId: string;
  wordId: string;
  box: number;
  due: Date;
  seen: number;
  correct: number;
  run: number;
  /** Id of the last answer applied, so a retried request can't count twice. */
  lastOp?: string;
  updatedAt: Date;
};

/** One document per user per calendar day (the user's own day, as YYYY-MM-DD). */
export type DayDoc = {
  userId: string;
  date: string;
  wordsAnswered: number;
  wordsCorrect: number;
  essays: number;
  reading: number;
};

export type EntryDoc = HistoryEntry & { userId: string };
export type SettingsDoc = { userId: string; wordGoal: number };

export type Collections = {
  profiles: Collection<Profile>;
  words: Collection<WordDoc>;
  days: Collection<DayDoc>;
  entries: Collection<EntryDoc>;
  settings: Collection<SettingsDoc>;
  speaking: Collection<SpeakingRequest & { userId: string }>;
};

// Every query is scoped by userId, so each collection leads with it in its index.
let indexesReady: Promise<void> | null = null;

export async function collections(): Promise<Collections> {
  const db = await getDb();
  const c: Collections = {
    profiles: db.collection("profiles"),
    words: db.collection("word_progress"),
    days: db.collection("activity_days"),
    entries: db.collection("writing_entries"),
    settings: db.collection("word_settings"),
    speaking: db.collection("speaking_requests"),
  };

  if (!indexesReady) {
    indexesReady = Promise.all([
      c.profiles.createIndex({ userId: 1 }, { unique: true }),
      c.words.createIndex({ userId: 1, wordId: 1 }, { unique: true }),
      c.words.createIndex({ userId: 1, due: 1 }),
      c.days.createIndex({ userId: 1, date: -1 }, { unique: true }),
      c.entries.createIndex({ userId: 1, id: 1 }, { unique: true }),
      c.entries.createIndex({ userId: 1, date: -1 }),
      c.settings.createIndex({ userId: 1 }, { unique: true }),
      c.speaking.createIndex({ userId: 1, createdAt: -1 }),
      // Lets staff list the queue by status, oldest first.
      c.speaking.createIndex({ status: 1, createdAt: 1 }),
      // At most one open request per user, enforced by the database so two quick clicks can't both succeed.
      c.speaking.createIndex({ userId: 1 }, { unique: true, partialFilterExpression: { active: true } }),
    ]).then(() => undefined);
    // A failed attempt must not be cached, or indexes would never be built.
    indexesReady.catch(() => {
      indexesReady = null;
    });
  }
  await indexesReady;
  return c;
}
