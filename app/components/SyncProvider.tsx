"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { flush } from "@/lib/outbox";
import { setUser } from "@/lib/user-scope";
import { hydrate as hydrateWords, notify as notifyWords } from "../word-coach/progress-store";
import { hydrate as hydrateWriting, notify as notifyWriting } from "../writing/history-store";

/** Ties browser-side data to the signed-in user and keeps it in step with the database. */
export default function SyncProvider({ children }: { children: React.ReactNode }) {
  const { isLoaded, userId } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;
    setUser(userId ?? null);
    notifyWords();
    notifyWriting();
    if (!userId) return;

    let cancelled = false;
    (async () => {
      await flush(); // push anything made offline before reading the server's copy
      if (cancelled) return;
      await Promise.all([hydrateWords(), hydrateWriting()]);
    })();

    const retry = () => void flush();
    window.addEventListener("online", retry);
    return () => {
      cancelled = true;
      window.removeEventListener("online", retry);
    };
  }, [isLoaded, userId]);

  return children;
}
