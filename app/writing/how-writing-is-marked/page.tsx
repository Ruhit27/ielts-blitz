import type { Metadata } from "next";
import PageHeading from "../PageHeading";

export const metadata: Metadata = { title: "How Writing Is Marked — IELTS Masters" };

const criteria = [
  {
    name: "Task Achievement / Response",
    short: "Task 1: Task Achievement · Task 2: Task Response",
    what: "Did you answer the question fully? Task 1 needs an overview and accurate key data. Task 2 needs a clear position developed with relevant ideas.",
    bands: [
      ["6", "Addresses the task but some parts are more fully covered than others; some details are inaccurate or irrelevant."],
      ["7", "Covers all requirements. A clear overview (Task 1) or a clear position (Task 2) is present; ideas could be extended further."],
      ["8", "Covers all requirements sufficiently and appropriately, with well-developed, relevant ideas."],
    ],
  },
  {
    name: "Coherence and Cohesion",
    short: "Organisation and linking",
    what: "Is the writing logically organised, with clear paragraphs and natural linking between ideas?",
    bands: [
      ["6", "Arranges information coherently with an overall progression; linking is sometimes faulty or mechanical."],
      ["7", "Logical organisation with a clear central topic in each paragraph; a range of linking devices, with some over- or under-use."],
      ["8", "Sequences information and ideas logically; manages all aspects of cohesion well; paragraphing is sufficient and appropriate."],
    ],
  },
  {
    name: "Lexical Resource",
    short: "Vocabulary",
    what: "Range, precision and naturalness of vocabulary, including collocation and spelling.",
    bands: [
      ["6", "Adequate range for the task; attempts less common words with some inaccuracy; errors rarely stop understanding."],
      ["7", "Sufficient range for flexibility and precision; some less common items with awareness of style and collocation; a few errors."],
      ["8", "Wide range used fluently and flexibly; skilfully uses uncommon items with only occasional inaccuracies."],
    ],
  },
  {
    name: "Grammatical Range and Accuracy",
    short: "Grammar",
    what: "The variety of sentence structures and how accurately you use them.",
    bands: [
      ["6", "Mix of simple and complex sentences; some errors in grammar and punctuation but they rarely reduce clarity."],
      ["7", "A variety of complex structures; frequent error-free sentences; good control with a few errors."],
      ["8", "Wide range of structures; the majority of sentences are error-free; only occasional non-systematic errors."],
    ],
  },
];

const rules = [
  ["Each criterion is worth 25%", "The four criteria are equally weighted when the task score is decided."],
  ["Task 2 counts twice as much as Task 1", "Your Writing band gives Task 2 double the weight, so protect your 40 minutes for the essay."],
  ["Under-length answers are penalised", "Fewer than 150 words (Task 1) or 250 words (Task 2) limits your Task Achievement/Response score. Writing far more than the minimum does not earn extra marks."],
  ["Memorised or off-topic answers score low", "Answers that don't address the question, or that are memorised, cannot score well however accurate the language is."],
];

export default function Page() {
  return (
    <>
      <PageHeading crumb="How Writing Is Marked" title="How Writing Is Marked" description="Examiners score each task against four criteria. Here is what they look for at Band 6, 7 and 8. Summarised in our own words from the public band descriptors." />
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:px-6">
        <section aria-labelledby="rules" className="grid gap-3 sm:grid-cols-2">
          <h2 id="rules" className="sr-only">Key rules</h2>
          {rules.map(([t, d]) => (
            <div key={t} className="rounded-xl border border-line bg-white p-4">
              <p className="font-bold text-ink">{t}</p>
              <p className="mt-1 text-sm text-muted">{d}</p>
            </div>
          ))}
        </section>

        {criteria.map((c, i) => (
          <section key={c.name} className="rounded-2xl border border-line bg-white p-5 shadow-[0_4px_16px_rgba(17,24,39,0.06)] sm:p-6">
            <p className="text-xs font-extrabold tracking-[0.18em] text-brand">CRITERION {i + 1}</p>
            <h2 className="mt-1 text-xl font-extrabold text-ink">{c.name}</h2>
            <p className="text-sm text-muted">{c.short}</p>
            <p className="mt-3 text-ink">{c.what}</p>
            <dl className="mt-4 divide-y divide-line">
              {c.bands.map(([b, d]) => (
                <div key={b} className="flex gap-4 py-3">
                  <dt className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface text-sm font-extrabold text-ink">
                    <span className="sr-only">Band </span>{b}
                  </dt>
                  <dd className="text-sm text-muted">{d}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
        <p className="text-sm text-muted">Bands can be awarded in half steps, and your overall Writing band is rounded to the nearest half band.</p>
      </div>
    </>
  );
}
