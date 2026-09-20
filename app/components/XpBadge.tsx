"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { XP_EVENT } from "@/lib/outbox";

/** The user's XP beside their profile button. Shows "+N" briefly when a finished task earns more. */
export default function XpBadge() {
  const [xp, setXp] = useState<number | null>(null);
  const [gain, setGain] = useState(0);
  const last = useRef<number | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/xp");
        if (!res.ok || cancelled) return;
        const next: number = (await res.json()).xp;
        if (last.current !== null && next > last.current) {
          setGain(next - last.current);
          clearTimeout(timer);
          timer = setTimeout(() => setGain(0), 3500);
        }
        last.current = next;
        setXp(next);
      } catch {
        /* offline: keep the last value */
      }
    }

    void load();
    window.addEventListener(XP_EVENT, load);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      window.removeEventListener(XP_EVENT, load);
    };
  }, []);

  if (xp === null) return <span className="h-9 w-20" aria-hidden="true" />;

  return (
    <Link
      href="/league"
      aria-label={`${xp} XP. Open the league`}
      className="relative flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1.5 text-sm font-extrabold text-amber-800 transition-colors hover:bg-gold/25"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 2 4 14h6l-1 8 9-12h-6z" /></svg>
      {xp.toLocaleString()} XP
      {gain > 0 && (
        <span role="status" className="absolute -bottom-6 right-0 rounded-full bg-success px-2 py-0.5 text-xs font-bold text-white shadow">+{gain} XP</span>
      )}
    </Link>
  );
}
