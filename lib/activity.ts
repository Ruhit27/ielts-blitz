export type ActivityKind = "reading" | "listening" | "words" | "writing";

/** One thing a user finished, shown in the dashboard's recent activity. */
export type ActivityEvent = {
  id: string;
  kind: ActivityKind;
  title: string;
  detail: string;
  score?: { correct: number; total: number };
  /** XP this completion earned (absent or 0 if it didn't qualify or the daily cap was reached). */
  xp?: number;
  /** ISO time it was completed. */
  at: string;
  /** The user's own calendar day, YYYY-MM-DD. */
  day: string;
};

/** Rough minutes of effort per completion, used for the weekly chart. */
export const minutesFor = (kind: ActivityKind, total = 0) => (kind === "words" ? Math.max(3, Math.round(total * 0.5)) : kind === "reading" || kind === "listening" ? 15 : 40);
