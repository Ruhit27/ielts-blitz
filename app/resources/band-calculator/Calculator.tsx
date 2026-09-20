"use client";

import { useState } from "react";
import { bandRanges, overallBand, rawToBand, testLabels, type TestKey } from "./bands";

const field = "mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-brand";
const label = "text-sm font-bold text-ink";

const skills = ["Listening", "Reading", "Writing", "Speaking"] as const;

/** Every valid band a skill can be awarded, 0 to 9 in half steps. */
const bandOptions = Array.from({ length: 19 }, (_, i) => i / 2);

function BandDisplay({ value, caption }: { value: number; caption: string }) {
  return (
    <div className="rounded-2xl bg-ink p-6 text-center text-white">
      <p className="text-xs font-extrabold tracking-[0.18em] text-white/60">{caption}</p>
      <p className="mt-2 text-5xl font-extrabold tabular-nums">{value.toFixed(1)}</p>
    </div>
  );
}

function RawScoreCalculator() {
  const [test, setTest] = useState<TestKey>("listening");
  const [raw, setRaw] = useState(30);
  const band = rawToBand(test, raw);

  return (
    <section aria-labelledby="raw" className="rounded-2xl border border-line bg-white p-6">
      <h2 id="raw" className="text-xl font-extrabold text-ink">Raw score → band</h2>
      <p className="mt-1.5 text-sm text-muted">Enter how many of the 40 questions you answered correctly.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="test">Test</label>
          <select id="test" className={field} value={test} onChange={(e) => setTest(e.target.value as TestKey)}>
            {(Object.keys(testLabels) as TestKey[]).map((k) => (
              <option key={k} value={k}>{testLabels[k]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="raw-score">Correct answers (0–40)</label>
          <input
            id="raw-score"
            type="number"
            min={0}
            max={40}
            value={raw}
            onChange={(e) => setRaw(Math.min(40, Math.max(0, Number(e.target.value) || 0)))}
            className={field}
          />
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <input
            type="range"
            min={0}
            max={40}
            value={raw}
            onChange={(e) => setRaw(Number(e.target.value))}
            aria-label="Correct answers"
            className="w-full accent-[var(--color-brand)]"
          />
          <p className="mt-2 text-sm text-muted">
            {raw} correct out of 40 in {testLabels[test]} is approximately{" "}
            <span className="font-bold text-ink">Band {band.toFixed(1)}</span>.
          </p>
        </div>
        <div className="sm:w-44">
          <BandDisplay value={band} caption="ESTIMATED BAND" />
        </div>
      </div>

      <details className="mt-6 rounded-xl border border-line bg-surface p-4">
        <summary className="cursor-pointer text-sm font-bold text-ink">Full conversion table for {testLabels[test]}</summary>
        <ul className="mt-3 grid gap-1.5 text-sm text-muted sm:grid-cols-2">
          {bandRanges(test).map((r) => (
            <li key={r.band} className="flex justify-between gap-4 tabular-nums">
              <span>{r.range} correct</span>
              <span className="font-semibold text-ink">Band {r.band.toFixed(1)}</span>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}

function OverallCalculator() {
  const [scores, setScores] = useState<number[]>([6.5, 6, 6, 6.5]);
  const overall = overallBand(scores);

  return (
    <section aria-labelledby="overall" className="mt-8 rounded-2xl border border-line bg-white p-6">
      <h2 id="overall" className="text-xl font-extrabold text-ink">Overall band score</h2>
      <p className="mt-1.5 text-sm text-muted">The average of your four skills, rounded to the nearest half band.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        {skills.map((skill, i) => (
          <div key={skill}>
            <label className={label} htmlFor={`skill-${skill}`}>{skill}</label>
            <select
              id={`skill-${skill}`}
              className={field}
              value={scores[i]}
              onChange={(e) => setScores(scores.map((s, j) => (j === i ? Number(e.target.value) : s)))}
            >
              {bandOptions.map((b) => (
                <option key={b} value={b}>{b.toFixed(1)}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="mt-6 sm:w-44">
        <BandDisplay value={overall} caption="OVERALL BAND" />
      </div>

      <p className="mt-4 text-sm text-muted">
        An average ending in .25 rounds up to the next half band, and .75 rounds up to the next whole band. Anything lower rounds down.
      </p>
    </section>
  );
}

export default function Calculator() {
  return (
    <>
      <RawScoreCalculator />
      <OverallCalculator />
    </>
  );
}
