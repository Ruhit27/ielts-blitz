"use client";

import { useMemo, useSyncExternalStore } from "react";
import { EMPTY, parse, readRaw, subscribe } from "./progress-store";

/** Reads saved progress without breaking server rendering. */
export function useProgress() {
  const raw = useSyncExternalStore(subscribe, readRaw, () => EMPTY);
  return useMemo(() => parse(raw), [raw]);
}
