"use client";

import { useMemo, useState } from "react";
import { topics, words, type TopicId } from "../data";
import { statusLabel, statusOf, type Status } from "../progress-store";
import { useProgress } from "../useProgress";
import WordCard from "../WordCard";

const statuses: (Status | "any")[] = ["any", "new", "learning", "review", "mastered"];

export default function Library() {
  const progress = useProgress();
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<TopicId | "any">("any");
  const [band, setBand] = useState<"any" | "6" | "7" | "8">("any");
  const [status, setStatus] = useState<Status | "any">("any");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return words.filter((w) => {
      if (topic !== "any" && w.topic !== topic) return false;
      if (band !== "any" && String(w.band) !== band) return false;
      if (status !== "any" && statusOf(progress.words[w.id]) !== status) return false;
      if (!q) return true;
      return (
        w.word.toLowerCase().includes(q) ||
        w.definition.toLowerCase().includes(q) ||
        w.synonyms.some((s) => s.toLowerCase().includes(q)) ||
        w.collocations.some((c) => c.toLowerCase().includes(q))
      );
    });
  }, [query, topic, band, status, progress]);

  const field = "rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand";

  return (
    <div>
      <div className="rounded-2xl border border-line bg-white p-4 shadow-[0_4px_16px_rgba(17,24,39,0.06)]">
        <label htmlFor="search" className="sr-only">Search words</label>
        <input
          id="search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a word, meaning, synonym or collocation…"
          className="w-full rounded-xl border border-line px-4 py-3 text-ink outline-none focus:border-brand"
        />
        <div className="mt-3 flex flex-wrap gap-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-muted">
            Topic
            <select value={topic} onChange={(e) => setTopic(e.target.value as TopicId | "any")} className={field}>
              <option value="any">All</option>
              {topics.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold text-muted">
            Level
            <select value={band} onChange={(e) => setBand(e.target.value as "any" | "6" | "7" | "8")} className={field}>
              <option value="any">All</option>
              <option value="6">Band 6+</option>
              <option value="7">Band 7+</option>
              <option value="8">Band 8+</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold text-muted">
            Status
            <select value={status} onChange={(e) => setStatus(e.target.value as Status | "any")} className={field}>
              {statuses.map((s) => <option key={s} value={s}>{s === "any" ? "All" : statusLabel[s]}</option>)}
            </select>
          </label>
        </div>
      </div>

      <p className="mt-5 text-sm font-semibold text-muted" aria-live="polite">
        {results.length} word{results.length === 1 ? "" : "s"}
      </p>

      <div className="mt-3 space-y-2">
        {results.map((w) => <WordCard key={w.id} word={w} />)}
        {results.length === 0 && (
          <p className="rounded-xl border border-dashed border-line p-10 text-center text-muted">
            No words match those filters.
          </p>
        )}
      </div>
    </div>
  );
}
