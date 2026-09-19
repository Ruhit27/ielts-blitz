export type Check = { id: string; label: string; pass: boolean; detail: string };

const LINKERS = [
  "however", "moreover", "furthermore", "in addition", "therefore", "consequently", "nevertheless",
  "although", "whereas", "while", "overall", "in conclusion", "for example", "for instance",
  "as a result", "on the other hand", "in contrast", "despite", "in summary", "firstly", "secondly", "finally",
];

const STOP = new Set(
  "the a an and or but of to in on at for with by from as is are was were be been it its this that these those they their them he she his her we our you your i not no can could may might will would should have has had do does did so if than then there which who whom what when where while also more most very".split(" "),
);

export function wordList(text: string) {
  return text.toLowerCase().match(/[a-z]+(?:['’-][a-z]+)*/g) ?? [];
}

export const countWords = (text: string) => wordList(text).length;

export function analyze(text: string, task: 1 | 2): { words: number; checks: Check[] } {
  const words = wordList(text);
  const n = words.length;
  const lower = text.toLowerCase();
  const min = task === 1 ? 150 : 250;

  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim()).length;
  const wantParas = task === 1 ? 3 : 4;

  const linkers = LINKERS.filter((l) => new RegExp(`\\b${l}\\b`).test(lower));

  const ttr = n ? new Set(words).size / n : 0;

  const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length;
  const avg = sentences ? n / sentences : 0;

  const contractions = lower.match(/\b\w+n['’]t\b|['’](ll|re|ve|d|m)\b/g) ?? [];

  const freq = new Map<string, number>();
  for (const w of words) if (!STOP.has(w) && w.length > 3) freq.set(w, (freq.get(w) ?? 0) + 1);
  const [topWord, topCount] = [...freq.entries()].sort((a, b) => b[1] - a[1])[0] ?? ["", 0];

  const closing =
    task === 1
      ? /\boverall\b|in summary/.test(lower)
      : /in conclusion|to conclude|to sum up|in summary|overall/.test(lower);

  const checks: Check[] = [
    { id: "length", label: "Meets minimum length", pass: n >= min, detail: `${n} words (minimum ${min})` },
    { id: "paras", label: "Clear paragraphing", pass: paragraphs >= wantParas, detail: `${paragraphs} paragraph${paragraphs === 1 ? "" : "s"} (aim for ${wantParas}+, separated by a blank line)` },
    { id: "closing", label: task === 1 ? "Includes an overview" : "Includes a conclusion", pass: closing, detail: task === 1 ? "Look for “Overall, …” after your introduction" : "Look for “In conclusion, …” at the end" },
    { id: "linkers", label: "Uses linking words", pass: linkers.length >= 3, detail: linkers.length ? `${linkers.length} found: ${linkers.slice(0, 5).join(", ")}` : "None found. Try however, moreover, whereas…" },
    { id: "variety", label: "Varied vocabulary", pass: n >= 50 && ttr >= 0.45, detail: n ? `${Math.round(ttr * 100)}% of your words are different (aim for 45%+)` : "No text yet" },
    { id: "sentences", label: "Sentence length", pass: avg >= 12 && avg <= 28, detail: sentences ? `Average ${avg.toFixed(1)} words per sentence (aim for 12–28)` : "No sentences yet" },
    { id: "formal", label: "Formal tone", pass: contractions.length === 0, detail: contractions.length ? `Contractions found: ${contractions.slice(0, 3).join(", ")}` : "No contractions" },
    { id: "repeat", label: "Avoids repetition", pass: topCount < 6, detail: topCount >= 6 ? `“${topWord}” appears ${topCount} times. Try synonyms.` : "No word is overused" },
  ];

  return { words: n, checks };
}
