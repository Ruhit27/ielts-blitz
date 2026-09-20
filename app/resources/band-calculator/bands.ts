export type TestKey = "listening" | "reading-academic" | "reading-general";

/** [minimum raw score out of 40, band]. Highest matching minimum wins. */
const tables: Record<TestKey, [number, number][]> = {
  listening: [
    [39, 9], [37, 8.5], [35, 8], [32, 7.5], [30, 7], [26, 6.5], [23, 6],
    [18, 5.5], [16, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5],
  ],
  "reading-academic": [
    [39, 9], [37, 8.5], [35, 8], [33, 7.5], [30, 7], [27, 6.5], [23, 6],
    [19, 5.5], [15, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5],
  ],
  "reading-general": [
    [40, 9], [39, 8.5], [37, 8], [36, 7.5], [34, 7], [32, 6.5], [30, 6],
    [27, 5.5], [23, 5], [19, 4.5], [15, 4], [12, 3.5], [9, 3], [6, 2.5],
  ],
};

export const testLabels: Record<TestKey, string> = {
  listening: "Listening",
  "reading-academic": "Reading (Academic)",
  "reading-general": "Reading (General Training)",
};

/** Converts a raw score out of 40 into an approximate band score. */
export function rawToBand(test: TestKey, raw: number): number {
  const row = tables[test].find(([min]) => raw >= min);
  return row ? row[1] : 0;
}

/** The raw-score range that produces each band, for the reference table. */
export function bandRanges(test: TestKey): { band: number; range: string }[] {
  const rows = tables[test];
  return rows.map(([min, band], i) => {
    const max = i === 0 ? 40 : rows[i - 1][0] - 1;
    return { band, range: min === max ? `${min}` : `${min}–${max}` };
  });
}

/**
 * The overall band is the mean of the four skills rounded to the nearest half
 * band: .25 rounds up to .5 and .75 rounds up to the next whole band.
 */
export function overallBand(scores: number[]): number {
  const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
  return Math.round(mean * 2) / 2;
}
