import { DEFAULT_GOAL, INTERVALS, MAX_BOX, nextState, type WordState } from "@/lib/leitner";
import { enqueue, hasPending } from "@/lib/outbox";
import { getUser, isResolved, scoped } from "@/lib/user-scope";

export { DEFAULT_GOAL, INTERVALS, MAX_BOX, type WordState };

export type DayLog = { answered: number; correct: number };

export type Progress = {
  words: Record<string, WordState>;
  log: Record<string, DayLog>;
  goal: number;
};

const KEY = "ielts-word-coach";
const EVENT = "word-coach-change";
export const EMPTY = "{}";

const blank = (): Progress => ({ words: {}, log: {}, goal: DEFAULT_GOAL });

export function readRaw(): string {
  if (!isResolved()) return EMPTY;
  try {
    return localStorage.getItem(scoped(KEY)) ?? EMPTY;
  } catch {
    return EMPTY;
  }
}

export function parse(raw: string): Progress {
  try {
    const v = JSON.parse(raw) as Partial<Progress>;
    return {
      words: v && typeof v.words === "object" && v.words ? v.words : {},
      log: v && typeof v.log === "object" && v.log ? v.log : {},
      goal: typeof v?.goal === "number" && v.goal > 0 ? v.goal : DEFAULT_GOAL,
    };
  } catch {
    return blank();
  }
}

function write(p: Progress) {
  try {
    localStorage.setItem(scoped(KEY), JSON.stringify(p));
  } catch {
    /* storage unavailable: progress simply isn't kept */
  }
  notify();
}

export const notify = () => window.dispatchEvent(new Event(EVENT));

export const today = (d: Date = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export function recordAnswer(wordId: string, correct: boolean) {
  const p = parse(readRaw());
  p.words[wordId] = nextState(p.words[wordId], correct);

  const key = today();
  const day = p.log[key] ?? { answered: 0, correct: 0 };
  p.log[key] = { answered: day.answered + 1, correct: day.correct + (correct ? 1 : 0) };

  write(p);
  enqueue({ method: "POST", url: "/api/progress", body: { wordId, correct, date: key, opId: crypto.randomUUID() } });
}

export function setGoal(goal: number) {
  const p = parse(readRaw());
  p.goal = goal;
  write(p);
  enqueue({ method: "PUT", url: "/api/progress", body: { goal } });
}

export function resetWord(wordId: string) {
  const p = parse(readRaw());
  delete p.words[wordId];
  write(p);
  enqueue({ method: "DELETE", url: `/api/progress?wordId=${encodeURIComponent(wordId)}` });
}

export function resetAll() {
  write(blank());
  enqueue({ method: "DELETE", url: "/api/progress" });
}

/**
 * Pulls this user's saved progress from the server into the local cache. Progress made
 * before signing in (stored under the unscoped key) is uploaded once, if the account is empty.
 */
export async function hydrate() {
  if (!getUser() || hasPending()) return; // unsent changes would be overwritten
  try {
    const res = await fetch("/api/progress");
    if (!res.ok) return;
    let server = parse(JSON.stringify(await res.json()));

    if (Object.keys(server.words).length === 0) {
      const local = parse(localStorage.getItem(KEY) ?? EMPTY);
      if (Object.keys(local.words).length > 0) {
        const up = await fetch("/api/progress/import", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(local),
        });
        if (!up.ok) return;
        server = local;
        localStorage.removeItem(KEY);
      }
    }
    write(server);
  } catch {
    /* offline: keep showing the local cache */
  }
}

export function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENT, cb);
  };
}

// ─── Derived values ────────────────────────────────────────────────────────

export type Status = "new" | "learning" | "review" | "mastered";

export function statusOf(state: WordState | undefined): Status {
  if (!state) return "new";
  if (state.box >= MAX_BOX) return "mastered";
  return state.box >= 3 ? "review" : "learning";
}

export const statusLabel: Record<Status, string> = {
  new: "Not started",
  learning: "Learning",
  review: "Reviewing",
  mastered: "Mastered",
};

export const isDue = (state: WordState | undefined, now = Date.now()) =>
  !!state && state.box < MAX_BOX && new Date(state.due).getTime() <= now;

/** Consecutive days of practice, counting back from today (or yesterday). */
export function streakOf(log: Progress["log"]) {
  const days = new Set(Object.keys(log).filter((d) => log[d].answered > 0));
  if (days.size === 0) return 0;

  const cursor = new Date();
  if (!days.has(today(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!days.has(today(cursor))) return 0;
  }

  let streak = 0;
  while (days.has(today(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/** The last `n` days, oldest first, for the activity chart. */
export function recentDays(log: Progress["log"], n = 7) {
  const out: { date: string; label: string; answered: number; correct: number }[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = today(d);
    const entry = log[key] ?? { answered: 0, correct: 0 };
    out.push({ date: key, label: d.toLocaleDateString(undefined, { weekday: "narrow" }), ...entry });
  }
  return out;
}

export function summarise(p: Progress, allIds: string[]) {
  const counts: Record<Status, number> = { new: 0, learning: 0, review: 0, mastered: 0 };
  let seen = 0;
  let correct = 0;
  for (const id of allIds) {
    const s = p.words[id];
    counts[statusOf(s)] += 1;
    seen += s?.seen ?? 0;
    correct += s?.correct ?? 0;
  }
  const due = allIds.filter((id) => isDue(p.words[id])).length;
  const answeredToday = p.log[today()]?.answered ?? 0;
  return {
    counts,
    due,
    seen,
    correct,
    accuracy: seen ? Math.round((correct / seen) * 100) : 0,
    started: allIds.length - counts.new,
    answeredToday,
    streak: streakOf(p.log),
  };
}
