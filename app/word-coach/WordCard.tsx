import { plain, topicById, type WordEntry } from "./data";

export default function WordCard({ word, open = false }: { word: WordEntry; open?: boolean }) {
  const topic = topicById[word.topic];
  return (
    <details open={open} className="group rounded-xl border border-line bg-white">
      <summary className="flex cursor-pointer flex-wrap items-center gap-x-3 gap-y-1 p-4">
        <span className="text-lg font-extrabold text-ink">{word.word}</span>
        <span className="text-sm italic text-muted">{word.pos}</span>
        <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-bold text-muted">Band {word.band}+</span>
        <span
          className="ml-auto rounded-full px-2.5 py-0.5 text-xs font-bold"
          style={{ background: `${topic.color}1a`, color: topic.color }}
        >
          {topic.name}
        </span>
      </summary>
      <div className="space-y-3 border-t border-line p-4 text-sm">
        <p className="text-ink">{word.definition}</p>
        <p className="border-l-2 border-brand/40 pl-3 italic text-muted">“{plain(word.example)}”</p>
        <div className="flex flex-wrap gap-4">
          <div>
            <p className="text-xs font-extrabold tracking-wider text-muted">COLLOCATIONS</p>
            <ul className="mt-1 flex flex-wrap gap-1.5">
              {word.collocations.map((c) => (
                <li key={c} className="rounded-md bg-surface px-2 py-1 text-xs text-ink">{plain(c)}</li>
              ))}
            </ul>
          </div>
          {word.synonyms.length > 0 && (
            <div>
              <p className="text-xs font-extrabold tracking-wider text-muted">SYNONYMS</p>
              <ul className="mt-1 flex flex-wrap gap-1.5">
                {word.synonyms.map((s) => (
                  <li key={s} className="rounded-md bg-brand/5 px-2 py-1 text-xs text-brand">{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {word.note && (
          <p className="rounded-lg bg-gold/15 p-3 text-xs text-ink">
            <b>Watch out:</b> {word.note}
          </p>
        )}
      </div>
    </details>
  );
}
