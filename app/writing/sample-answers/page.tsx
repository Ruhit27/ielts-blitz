import type { Metadata } from "next";
import PageHeading from "../PageHeading";
import PromptBlock from "../PromptBlock";
import { countWords } from "../analyze";

export const metadata: Metadata = { title: "Sample Answers — IELTS Masters" };

const answers = [
  {
    task: 1 as const,
    text: `The table compares the proportion of households with internet access in four countries in 2005 and 2020.

Overall, internet access rose sharply in every country over the period, with the most dramatic growth occurring in the countries that started from the lowest base. By 2020, Japan and the United Kingdom had achieved near-universal coverage.

In 2005, the United Kingdom led with 70% of households connected, closely followed by Japan at 66%. Brazil and Kenya lagged far behind, at 14% and 3% respectively.

By 2020, Japan had climbed by 27 percentage points to 93%, while the United Kingdom reached 96%. Brazil experienced a fivefold increase, reaching 74%, whereas Kenya, despite a more than tenfold rise, remained the least connected country at 34%. Consequently, the gap between the most and least connected countries narrowed from 67 to 62 percentage points.`,
    notes: [
      ["Task Achievement", "Clear overview in the second paragraph; key figures selected and compared, not just listed; accurate data throughout."],
      ["Coherence & Cohesion", "One paragraph per purpose (introduction, overview, 2005, 2020). Reference words and “whereas”, “consequently” link ideas naturally."],
      ["Lexical Resource", "Precise data language: “lagged far behind”, “near-universal coverage”, “fivefold increase”, “percentage points”."],
      ["Grammar", "A mix of complex sentences, participle phrases and concessions (“despite a more than tenfold rise”) with no errors."],
    ],
  },
  {
    task: 2 as const,
    text: `Whether higher education should be funded by the state or by students themselves is a contentious issue. While I acknowledge the appeal of tuition-free universities, I believe a fairer system is one in which students contribute, provided that support is available for those who cannot afford it.

Advocates of free education argue that it promotes equality of opportunity. When tuition fees are high, talented students from poorer families may abandon their ambitions or graduate with debts that shape their careers for decades. Countries such as Germany, which charge minimal fees, also tend to see a broader cross-section of society in their lecture halls, and the economy benefits from a larger pool of skilled workers.

Nevertheless, there are convincing reasons for asking students to pay. Universities need substantial funding to maintain laboratories, libraries and qualified staff, and if this burden falls entirely on taxpayers, other public services such as healthcare may suffer. Moreover, graduates typically earn more than non-graduates, so it seems reasonable that those who gain most from a degree should share its cost.

In my view, the best solution is a hybrid model in which fees are moderate and repayable only once a graduate's income reaches a reasonable threshold, alongside generous grants for low-income families. This preserves access while keeping universities financially sound.

In conclusion, although free education has clear social benefits, a shared-cost system with strong safeguards offers a more sustainable balance.`,
    notes: [
      ["Task Response", "Both views are discussed and a clear opinion is stated in the introduction, developed in paragraph 4 and repeated in the conclusion."],
      ["Coherence & Cohesion", "Logical paragraphing, one central idea each; linkers such as “Nevertheless” and “Moreover” are used sparingly and accurately."],
      ["Lexical Resource", "Natural, flexible vocabulary: “contentious”, “cross-section of society”, “financially sound”, “repayable”, “safeguards”."],
      ["Grammar", "Wide range: relative clauses, conditionals, passive voice, participle phrases, all accurate."],
    ],
  },
];

export default function Page() {
  return (
    <>
      <PageHeading crumb="Sample Answers" title="Sample Answers" description="Band 8 model answers written for this site, with a breakdown against the four marking criteria." />
      <div className="mx-auto max-w-3xl space-y-12 px-4 py-10 sm:px-6">
        {answers.map((a) => (
          <article key={a.task} aria-labelledby={`t${a.task}`}>
            <h2 id={`t${a.task}`} className="text-2xl font-extrabold text-ink">
              Task {a.task} <span className="ml-2 rounded-full bg-success/10 px-3 py-1 align-middle text-xs font-bold text-success">Band 8 model</span>
            </h2>
            <div className="mt-4"><PromptBlock task={a.task} /></div>
            <div className="mt-4 rounded-2xl border border-line bg-white p-5 shadow-[0_4px_16px_rgba(17,24,39,0.06)]">
              <div className="space-y-4 text-[15px] leading-relaxed text-ink">
                {a.text.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <p className="mt-4 border-t border-line pt-3 text-xs font-semibold text-muted">{countWords(a.text)} words</p>
            </div>
            <h3 className="mt-6 text-sm font-extrabold tracking-[0.18em] text-brand">WHY IT SCORES WELL</h3>
            <dl className="mt-3 grid gap-3 sm:grid-cols-2">
              {a.notes.map(([k, v]) => (
                <div key={k} className="rounded-xl bg-surface p-4">
                  <dt className="text-sm font-bold text-ink">{k}</dt>
                  <dd className="mt-1 text-sm text-muted">{v}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </>
  );
}
