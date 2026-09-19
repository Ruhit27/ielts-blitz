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
    { day: "Wed", title: "Writing Task 2", detail: "Plan, write and check one essay", minutes: m, href: "/writing/checker" },
    { day: "Thu", title: "Reading drills", detail: "Timed set: True/False/Not Given and headings", minutes: m, href: "/reading" },
    { day: "Fri", title: heavyWriting ? "Band 8 trainer" : "Sample answers", detail: heavyWriting ? "Upgrade weak sentences to higher-band ones" : "Study a high-band model and note its patterns", minutes: Math.round(m * 0.75), href: heavyWriting ? "/writing/band-8-trainer" : "/writing/sample-answers" },
    { day: "Sat", title: "Mock test", detail: "Full timed writing mock, then review marks", minutes: m + 20, href: "/writing/mock-test" },
    { day: "Sun", title: "Review", detail: "Re-drill mistakes and revisit your history", minutes: Math.round(m / 2), href: "/writing/history" },
  ];
}
