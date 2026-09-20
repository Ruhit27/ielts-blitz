export const BANDS = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9] as const;
export const MONTH_OPTIONS = [1, 2, 3] as const;

export type Profile = {
  userId: string;
  goalBand: number;
  currentBand: number;
  timeframeMonths: number;
  /** ISO date-time the exam is expected, derived from the timeframe when it was set. */
  examDate: string;
  createdAt: string;
  updatedAt: string;
};

export type ProfileInput = Pick<Profile, "goalBand" | "currentBand" | "timeframeMonths">;

/** Returns cleaned input, or null when any field is missing or out of range. */
export function parseProfileInput(body: unknown): ProfileInput | null {
  if (!body || typeof body !== "object") return null;
  const { goalBand, currentBand, timeframeMonths } = body as Record<string, unknown>;
  if (typeof goalBand !== "number" || typeof currentBand !== "number" || typeof timeframeMonths !== "number") return null;
  if (goalBand < 4 || goalBand > 9 || goalBand % 0.5 !== 0) return null;
  if (currentBand < 3 || currentBand > 8.5 || currentBand % 0.5 !== 0) return null;
  if (!(MONTH_OPTIONS as readonly number[]).includes(timeframeMonths)) return null;
  if (goalBand <= currentBand) return null;
  return { goalBand, currentBand, timeframeMonths };
}

export const daysUntil = (iso: string, now = Date.now()) => Math.max(0, Math.ceil((new Date(iso).getTime() - now) / 86_400_000));

export type Pace = "comfortable" | "focused" | "intense";

/** How hard the goal is, judged by bands to gain per month left. */
export function paceOf(gap: number, days: number): { pace: Pace; perMonth: number } {
  const perMonth = gap / Math.max(days / 30, 0.25);
  return { pace: perMonth <= 0.5 ? "comfortable" : perMonth <= 1 ? "focused" : "intense", perMonth };
}

export const dailyMinutes = (pace: Pace) => ({ comfortable: 30, focused: 60, intense: 90 })[pace];

export type PlanItem = { day: string; title: string; detail: string; minutes: number; href: string };

/** A seven-day rotation over the sections that exist today, sized to the pace. */
export function weeklyPlan(pace: Pace, gap: number): PlanItem[] {
  const m = dailyMinutes(pace);
  const heavyWriting = gap >= 1.5;
  return [
    { day: "Mon", title: "Reading drills", detail: "Two passages on your weakest question type", minutes: m, href: "/reading" },
    { day: "Tue", title: "Word Coach", detail: "Clear today's due words, then learn new ones", minutes: Math.round(m / 2), href: "/word-coach/practice" },
    { day: "Wed", title: "Writing Task 2", detail: "Plan and write one essay, then compare it with a model", minutes: m, href: "/writing/task-2" },
    { day: "Thu", title: "Listening practice", detail: "Play a drill, then check your answers and read the transcript", minutes: m, href: "/listening" },
    { day: "Fri", title: "Writing Task 1", detail: heavyWriting ? "Study a model report and note its overview and data language" : "Write one report from a chart, table or process", minutes: Math.round(m * 0.75), href: "/writing/task-1" },
    { day: "Sat", title: "Timed writing", detail: "Task 1 in 20 minutes, then Task 2 in 40", minutes: m + 20, href: "/writing/task-2" },
    { day: "Sun", title: "Review", detail: "Re-drill weak words and reread your model answers", minutes: Math.round(m / 2), href: "/word-coach/progress" },
  ];
}
