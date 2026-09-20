import type { ActivityEvent } from "@/lib/activity";

export const XP_PER_TASK = 10;
/** Most XP a user can earn on one day, so repeating an easy exercise can't farm the league. */
export const DAILY_XP_CAP = 100;
/** A task earns XP when the user scores at least this share of it. */
export const PASS_RATIO = 0.7;
const MIN_WORDS = { 1: 150, 2: 250 } as const;

/** Whether a finished task was done well enough to earn XP. */
export function earnsXp(event: Pick<ActivityEvent, "kind" | "score">, essay?: { task: 1 | 2; words: number }) {
  if (event.kind === "writing") return !!essay && essay.words >= MIN_WORDS[essay.task];
  return !!event.score && event.score.correct / event.score.total >= PASS_RATIO;
}

/** The Monday (UTC) that starts the week containing `date`, as YYYY-MM-DD. Weekly XP resets when this changes. */
export function weekKey(date = new Date()) {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
  return d.toISOString().slice(0, 10);
}
