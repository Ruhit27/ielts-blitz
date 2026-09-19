import { blanked, words as allWords, type TopicId, type WordEntry } from "./data";
import { isDue, type Progress } from "./progress-store";

export type Mode = "meaning" | "recall" | "gap" | "synonym" | "spell";

export const modeInfo: Record<Mode, { name: string; instruction: string }> = {
  meaning: { name: "Meaning", instruction: "What does this word mean?" },
  recall: { name: "Recall", instruction: "Which word fits this definition?" },
  gap: { name: "Gap fill", instruction: "Which word completes the sentence?" },
  synonym: { name: "Synonym", instruction: "Which word is closest in meaning?" },
  spell: { name: "Spelling", instruction: "Type the word that matches this definition." },
};

export type Option = { key: string; label: string };

export type Question = {
  id: string;
  word: WordEntry;
  mode: Mode;
  prompt: string;
  sub?: string;
  hint?: string;
  options: Option[];
  answer: string;
};

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const pick = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];

/** Three other words, preferring the same topic so the choice is genuinely hard. */
function distractors(word: WordEntry, pool: WordEntry[]) {
  const sameTopic = pool.filter((w) => w.id !== word.id && w.topic === word.topic);
  const others = pool.filter((w) => w.id !== word.id && w.topic !== word.topic);
  return [...shuffle(sameTopic), ...shuffle(others)].slice(0, 3);
}

function makeQuestion(word: WordEntry, mode: Mode, pool: WordEntry[]): Question {
  const others = distractors(word, pool);
  const base = { id: `${word.id}-${mode}`, word, mode };

  switch (mode) {
    case "meaning":
      return {
        ...base,
        prompt: word.word,
        sub: word.pos,
        options: shuffle([word, ...others].map((w) => ({ key: w.id, label: w.definition }))),
        answer: word.id,
      };

    case "recall":
      return {
        ...base,
        prompt: word.definition,
        sub: word.pos,
        options: shuffle([word, ...others].map((w) => ({ key: w.id, label: w.word }))),
        answer: word.id,
      };

    case "gap":
      return {
        ...base,
        prompt: blanked(word.example),
        options: shuffle([word, ...others].map((w) => ({ key: w.id, label: w.word }))),
        answer: word.id,
      };

    case "synonym": {
      const correct = pick(word.synonyms);
      const taken = new Set([...word.synonyms, word.word].map((s) => s.toLowerCase()));
      const wrong = shuffle(pool.filter((w) => w.id !== word.id))
        .flatMap((w) => w.synonyms)
        .filter((s) => !taken.has(s.toLowerCase()))
        .slice(0, 3);
      return {
        ...base,
        prompt: word.word,
        sub: word.pos,
        options: shuffle([correct, ...wrong].map((s) => ({ key: s, label: s }))),
        answer: correct,
      };
    }

    case "spell":
      return {
        ...base,
        prompt: word.definition,
        sub: word.pos,
        hint: word.word.replace(/[a-z]/gi, (c, i: number) => (i === 0 ? c : "_")),
        options: [],
        answer: word.word.toLowerCase(),
      };
  }
}

/** Harder drills once a word is familiar. Box 0 means it has never been seen. */
function modeFor(box: number, word: WordEntry): Mode {
  const stages: Mode[][] = [
    ["meaning"],
    ["meaning", "gap"],
    ["recall", "gap"],
    ["recall", "synonym", "gap"],
    ["spell", "synonym", "recall"],
    ["spell", "recall"],
  ];
  const choices = (stages[Math.min(box, stages.length - 1)] ?? ["meaning"]).filter(
    (m) => m !== "synonym" || word.synonyms.length > 0,
  );
  return pick(choices);
}

export type SessionOptions = {
  topic?: TopicId | "all";
  mode?: Mode | "mixed";
  limit?: number;
};

/**
 * Builds a session: words due for review come first, then unseen words.
 * Must run on the client only — it uses Math.random.
 */
export function buildSession(progress: Progress, { topic = "all", mode = "mixed", limit = 15 }: SessionOptions = {}) {
  const pool = topic === "all" ? allWords : allWords.filter((w) => w.topic === topic);
  if (pool.length === 0) return [];

  const due = pool
    .filter((w) => isDue(progress.words[w.id]))
    .sort((a, b) => new Date(progress.words[a.id].due).getTime() - new Date(progress.words[b.id].due).getTime());
  const fresh = shuffle(pool.filter((w) => !progress.words[w.id]));
  const seenButNotDue = shuffle(pool.filter((w) => progress.words[w.id] && !isDue(progress.words[w.id])));

  const queue = [...due, ...fresh, ...seenButNotDue].slice(0, Math.min(limit, pool.length));

  return queue.map((word) => {
    const box = progress.words[word.id]?.box ?? 0;
    const chosen = mode === "mixed" ? modeFor(box, word) : mode;
    const safe = chosen === "synonym" && word.synonyms.length === 0 ? "recall" : chosen;
    return makeQuestion(word, safe, pool.length >= 4 ? pool : allWords);
  });
}
