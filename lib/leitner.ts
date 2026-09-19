export type WordState = {
  /** Leitner box: 1 = just learned, 5 = mastered. */
  box: number;
  /** ISO date-time when the word is next due for review. */
  due: string;
  seen: number;
  correct: number;
  /** Consecutive correct answers. */
  run: number;
};

export const DEFAULT_GOAL = 15;
/** Days until the next review, indexed by Leitner box. */
export const INTERVALS = [0, 0, 1, 3, 7, 21];
export const MAX_BOX = 5;

/** Shared by the browser (optimistic update) and the server (the record that counts). */
export function nextState(prev: WordState | undefined, correct: boolean, now = new Date()): WordState {
  const box = correct ? Math.min(MAX_BOX, (prev?.box ?? 0) + 1) : 1;
  return {
    box,
    due: new Date(now.getTime() + (INTERVALS[box] ?? 0) * 86_400_000).toISOString(),
    seen: (prev?.seen ?? 0) + 1,
    correct: (prev?.correct ?? 0) + (correct ? 1 : 0),
    run: correct ? (prev?.run ?? 0) + 1 : 0,
  };
}
