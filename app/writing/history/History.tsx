"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import { clearHistory, EMPTY, parse, readRaw, subscribe } from "../history-store";

export default function History() {
  const raw = useSyncExternalStore(subscribe, readRaw, () => EMPTY);
  const entries = useMemo(() => parse(raw), [raw]);

  if (entries.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line p-10 text-center">
        <p className="font-bold text-ink">No writing saved yet</p>
        <p className="mt-1 text-sm text-muted">Run the Writing Checker or finish a mock test and it will show up here.</p>
        <div className="mt-5 flex justify-center gap-3">
          <Link href="/writing/checker" className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover">Open checker</Link>
          <Link href="/writing/mock-test" className="rounded-xl border border-line px-5 py-2.5 text-sm font-semibold text-ink hover:border-brand hover:text-brand">Take mock test</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">{entries.length} saved to your account</p>
        <button onClick={clearHistory} className="text-sm font-semibold text-muted hover:text-brand">Clear history</button>
      </div>
      <ul className="mt-4 space-y-3">
        {entries.map((e) => (
          <li key={e.id} className="rounded-xl border border-line bg-white p-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-bold text-brand">{e.source}</span>
              <span className="font-bold text-ink">Task {e.task}</span>
              <span className="text-muted">{e.words} words</span>
              <span className="text-muted">{e.note}</span>
              <time dateTime={e.date} className="ml-auto text-xs text-muted">{new Date(e.date).toLocaleString()}</time>
            </div>
            {e.snippet && <p className="mt-2 line-clamp-2 text-sm text-muted">“{e.snippet}…”</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
