import { getUser, scoped } from "@/lib/user-scope";

/** A change waiting to reach the server. Kept in localStorage so it survives being offline or closing the tab. */
type Op = { method: "POST" | "PUT" | "DELETE"; url: string; body?: unknown };

const KEY = "ielts-outbox";
let flushing = false;

function read(): Op[] {
  try {
    const v = JSON.parse(localStorage.getItem(scoped(KEY)) ?? "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

function save(ops: Op[]) {
  try {
    localStorage.setItem(scoped(KEY), JSON.stringify(ops.slice(-500)));
  } catch {
    /* storage unavailable: the change is still applied locally */
  }
}

export const hasPending = () => read().length > 0;

/** Sends queued changes in order, stopping at the first one that should be retried later. */
export async function flush() {
  if (flushing || !getUser()) return;
  flushing = true;
  try {
    while (read().length > 0) {
      const op = read()[0];
      let res: Response;
      try {
        res = await fetch(op.url, {
          method: op.method,
          headers: op.body === undefined ? undefined : { "Content-Type": "application/json" },
          body: op.body === undefined ? undefined : JSON.stringify(op.body),
        });
      } catch {
        break; // offline
      }
      if (res.status >= 500 || res.status === 429 || res.status === 401) break;
      // Anything else (success, or a rejection that retrying can't fix) is done with.
      save(read().slice(1));
    }
  } finally {
    flushing = false;
  }
}

export function enqueue(op: Op) {
  if (!getUser()) return;
  save([...read(), op]);
  void flush();
}
