export type HistoryEntry = {
  id: string;
  date: string;
  source: "Checker" | "Mock test";
  task: 1 | 2;
  words: number;
  note: string;
  snippet: string;
};

import { enqueue, hasPending } from "@/lib/outbox";
import { getUser, isResolved, scoped } from "@/lib/user-scope";

const KEY = "ielts-writing-history";
const EVENT = "writing-history-change";
export const EMPTY = "[]";

export function readRaw(): string {
  if (!isResolved()) return EMPTY;
  try {
    return localStorage.getItem(scoped(KEY)) ?? EMPTY;
  } catch {
    return EMPTY;
  }
}

export function parse(raw: string): HistoryEntry[] {
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

function write(entries: HistoryEntry[]) {
  try {
    localStorage.setItem(scoped(KEY), JSON.stringify(entries.slice(0, 100)));
  } catch {
    /* storage unavailable: history simply isn't kept */
  }
  window.dispatchEvent(new Event(EVENT));
}

const dayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export function addEntries(entries: HistoryEntry[]) {
  write([...entries, ...parse(readRaw())]);
  enqueue({ method: "POST", url: "/api/writing-history", body: { entries, day: dayKey() } });
}

export function clearHistory() {
  write([]);
  enqueue({ method: "DELETE", url: "/api/writing-history" });
}

export const notify = () => window.dispatchEvent(new Event(EVENT));

/** Loads this user's saved writing from the server. Entries saved before signing in are uploaded once, if the account is empty. */
export async function hydrate() {
  if (!getUser() || hasPending()) return;
  try {
    const res = await fetch("/api/writing-history");
    if (!res.ok) return;
    let entries: HistoryEntry[] = (await res.json()).entries ?? [];

    if (entries.length === 0) {
      const local = parse(localStorage.getItem(KEY) ?? EMPTY);
      if (local.length > 0) {
        for (let i = 0; i < local.length; i += 10) {
          const up = await fetch("/api/writing-history", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ entries: local.slice(i, i + 10) }),
          });
          if (!up.ok) return;
        }
        entries = local;
        localStorage.removeItem(KEY);
      }
    }
    write(entries);
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
