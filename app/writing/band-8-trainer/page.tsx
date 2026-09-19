import type { Metadata } from "next";
import PageHeading from "../PageHeading";

export const metadata: Metadata = { title: "Band 8 Trainer — IELTS Masters" };

const lessons = [
  {
    title: "Use precise vocabulary, not general words",
    tip: "Replace “very + adjective” and vague verbs with one exact word. Examiners reward accuracy and natural collocation, not rare words for their own sake.",
    before: "The number of people using the internet went up very much.",
    after: "Internet usage rose dramatically.",
    why: "“Rose dramatically” is a precise verb and adverb pair that replaces the vague “went up very much”.",
  },
  {
    title: "Combine ideas with complex sentences",
    tip: "Band 8 writing uses a mix of simple and complex structures. Join related ideas with relative clauses, participles and subordinators.",
    before: "Some people cannot afford university. They give up their plans. They are talented.",
    after: "Talented students who cannot afford tuition may abandon their ambitions altogether.",
    why: "Three short sentences become one, using a relative clause (“who cannot afford…”) and a precise modal (“may”).",
  },
  {
    title: "Link ideas without listing",
    tip: "Avoid starting every sentence with First, Second, Third. Use reference words and logical links so each sentence grows out of the last.",
    before: "Firstly, fees are high. Secondly, students have debt. Thirdly, they stop studying.",
    after: "High fees leave many graduates in debt, which in turn discourages others from applying at all.",
    why: "“Which in turn” shows cause and effect inside the sentence, so no numbered linker is needed.",
  },
  {
    title: "Be cautious: hedge your claims",
    tip: "Academic writing avoids absolutes. Words like tend to, may, is likely to and a significant proportion of make your ideas sound reasoned, not exaggerated.",
    before: "Free education will solve inequality.",
    after: "Free education is likely to narrow, though not eliminate, the gap between rich and poor students.",
    why: "The hedge (“is likely to”) and the concession (“though not eliminate”) make the claim more credible.",
  },
  {
    title: "Task 1: write a clear overview and compare",
    tip: "Every Task 1 answer needs an overview of the main trends, and figures should be compared, not just listed one by one.",
    before: "Japan was 66% in 2005 and 93% in 2020. The UK was 70% in 2005 and 96% in 2020.",
    after: "Overall, access rose sharply everywhere. The UK and Japan started highest and remained ahead, reaching 96% and 93% respectively.",
    why: "It opens with the overall trend, groups similar countries together and uses “respectively” to save words.",
  },
];

export default function Page() {
  return (
    <>
      <PageHeading crumb="Band 8 Trainer" title="Band 8 Trainer" description="Five techniques that move a good answer to a great one. Read each Band 6 example, then reveal the Band 8 rewrite." />
      <div className="mx-auto max-w-3xl space-y-5 px-4 py-10 sm:px-6">
        {lessons.map((l, i) => (
          <section key={l.title} className="rounded-2xl border border-line bg-white p-5 shadow-[0_4px_16px_rgba(17,24,39,0.06)] sm:p-6">
            <h2 className="flex items-start gap-3 text-lg font-extrabold text-ink">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand text-sm text-white">{i + 1}</span>
              {l.title}
            </h2>
            <p className="mt-3 text-sm text-muted">{l.tip}</p>
            <div className="mt-4 rounded-xl bg-surface p-4 text-sm">
              <p className="text-xs font-extrabold tracking-wider text-muted">BAND 6</p>
              <p className="mt-1 text-ink">{l.before}</p>
            </div>
            <details className="group mt-3">
              <summary className="cursor-pointer text-sm font-semibold text-brand hover:text-brand-hover">Show Band 8 version</summary>
              <div className="mt-3 rounded-xl border border-success/40 bg-success/10 p-4 text-sm">
                <p className="text-xs font-extrabold tracking-wider text-success">BAND 8</p>
                <p className="mt-1 font-medium text-ink">{l.after}</p>
                <p className="mt-2 text-muted"><b className="text-ink">Why it works:</b> {l.why}</p>
              </div>
            </details>
          </section>
        ))}
      </div>
    </>
  );
}
