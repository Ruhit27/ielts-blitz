export type IconName = "book" | "scroll" | "calculator" | "fees" | "news";

export type ResourceSection = {
  href: string;
  name: string;
  detail: string;
  icon: IconName;
};

export const resourceSections: ResourceSection[] = [
  { href: "/resources/blog", name: "Blog & Guides", detail: "Strategy, grammar & vocabulary", icon: "book" },
  { href: "/resources/study-tips", name: "Study Tips", detail: "Tactics for every question type", icon: "scroll" },
  { href: "/resources/band-calculator", name: "Band Calculator", detail: "Raw score → IELTS band", icon: "calculator" },
  { href: "/resources/exam-fees", name: "Exam Fees", detail: "Test fees by country", icon: "fees" },
  { href: "/resources/news", name: "IELTS News", detail: "Latest test-day updates", icon: "news" },
];

/* ------------------------------------------------------------------ blog */

export type Post = {
  slug: string;
  title: string;
  summary: string;
  minutes: number;
  tag: "Strategy" | "Grammar" | "Vocabulary";
  sections: { heading: string; paragraphs: string[] }[];
};

export const posts: Post[] = [
  {
    slug: "plan-a-task-2-essay",
    title: "Plan a Task 2 essay in five minutes",
    summary: "A repeatable planning routine that fixes your structure before you write a single sentence.",
    minutes: 5,
    tag: "Strategy",
    sections: [
      {
        heading: "Read the question twice",
        paragraphs: [
          "Most low Task Response scores come from answering a slightly different question. Read the prompt once for the topic and once for the instruction: discuss both views, agree or disagree, causes and solutions, advantages and disadvantages. Underline the instruction words and keep them visible while you plan.",
          "If the question has two parts, your plan needs two body paragraphs — one for each part. Nothing else is required to satisfy the task.",
        ],
      },
      {
        heading: "Two ideas, two examples",
        paragraphs: [
          "Write down one main idea per body paragraph and one concrete example to support it. An example can be a study, a country, a workplace situation or a personal observation — examiners do not check whether it is true, only whether it develops the idea.",
          "Resist adding a third idea. A 250-word essay does not have room to develop three points, and half-developed ideas cost you marks under Coherence and Cohesion.",
        ],
      },
      {
        heading: "Decide your position before you write",
        paragraphs: [
          "Your introduction has to state a position, and the conclusion has to repeat it. If you decide the position in the plan, both paragraphs write themselves in under two minutes and your essay stays consistent from start to finish.",
          "Spend five minutes planning, forty writing, and five checking. The plan is what makes the last five minutes worth having.",
        ],
      },
    ],
  },
  {
    slug: "complex-sentences-that-score",
    title: "Complex sentences that actually raise your band",
    summary: "Four sentence patterns that show grammatical range without risking accuracy.",
    minutes: 6,
    tag: "Grammar",
    sections: [
      {
        heading: "Range beats length",
        paragraphs: [
          "Grammatical Range and Accuracy rewards a variety of structures used correctly. A long sentence that loses its subject scores lower than two clean sentences. Aim for a mix: some short, some complex, all correct.",
        ],
      },
      {
        heading: "Four patterns worth memorising",
        paragraphs: [
          "Relative clause: \"Students who commute long distances often struggle to attend evening classes.\" Use it to add detail without a second sentence.",
          "Conditional: \"If governments subsidised public transport, congestion would fall considerably.\" Perfect for solutions paragraphs.",
          "Concessive clause: \"Although remote work reduces commuting, it can weaken team relationships.\" This is the fastest way to show a balanced view.",
          "Participle clause: \"Faced with rising costs, many families delay buying a home.\" Use it once or twice, not in every paragraph.",
        ],
      },
      {
        heading: "Check the three usual errors",
        paragraphs: [
          "In your last five minutes, check only three things: subject-verb agreement, articles before singular countable nouns, and whether every sentence has a main verb. These three account for most of the errors that pull an essay from Band 7 to Band 6.",
        ],
      },
    ],
  },
  {
    slug: "topic-vocabulary-without-memorising",
    title: "Build topic vocabulary without memorising word lists",
    summary: "How to collect words that you will actually use on test day.",
    minutes: 5,
    tag: "Vocabulary",
    sections: [
      {
        heading: "Collect collocations, not single words",
        paragraphs: [
          "Examiners reward natural word combinations. \"Heavy traffic\", \"a significant rise\", \"address an issue\" and \"a growing concern\" are worth more than a rare synonym used incorrectly. When you meet a new word, record the two or three words that sit next to it.",
        ],
      },
      {
        heading: "Work from the common topics",
        paragraphs: [
          "Task 2 topics repeat: education, environment, technology, health, work, crime, government spending and globalisation. Build one page per topic with ten collocations, and you will have enough language for almost any prompt.",
          "The Word Coach packs in this app are organised the same way, so you can drill a topic and then write about it the same day.",
        ],
      },
      {
        heading: "Use a word three times before you trust it",
        paragraphs: [
          "A word is yours once you have used it in three different sentences of your own. Until then, it is a word you recognise, not a word you can produce under time pressure.",
        ],
      },
    ],
  },
  {
    slug: "reading-time-management",
    title: "Finish the Reading test with time to spare",
    summary: "Why running out of time is a strategy problem, not a speed problem.",
    minutes: 4,
    tag: "Strategy",
    sections: [
      {
        heading: "Twenty minutes per passage, no exceptions",
        paragraphs: [
          "Three passages, sixty minutes, forty questions. Give each passage twenty minutes and move on when the time is up, even if two answers are missing. The third passage is not harder than the first — but it is worth the same marks, and candidates who overrun lose them all.",
        ],
      },
      {
        heading: "Read the questions first",
        paragraphs: [
          "Skim the passage for thirty seconds to get the shape of it, then read the question set. Most question types follow the order of the text, so you can work through the passage once rather than searching it repeatedly.",
        ],
      },
      {
        heading: "Transfer answers as you go",
        paragraphs: [
          "In the paper test there is no extra transfer time for Reading. Write answers straight onto the answer sheet as you finish each question set, and check spelling — a correct answer spelled wrongly scores zero.",
        ],
      },
    ],
  },
];

export const postBySlug: Record<string, Post> = Object.fromEntries(posts.map((p) => [p.slug, p]));

/* ------------------------------------------------------------- study tips */

export type TipGroup = {
  id: string;
  skill: string;
  blurb: string;
  tips: { name: string; tactic: string }[];
};

export const tipGroups: TipGroup[] = [
  {
    id: "reading",
    skill: "Reading",
    blurb: "Sixty minutes, three passages, forty questions, no transfer time.",
    tips: [
      { name: "True / False / Not Given", tactic: "Decide between False and Not Given by asking whether the passage contradicts the statement. If it simply never mentions it, the answer is Not Given." },
      { name: "Matching headings", tactic: "Read the first and last sentence of each paragraph first. Headings describe the main idea, not a detail that appears somewhere in the middle." },
      { name: "Sentence completion", tactic: "Check the word limit and the grammar of the gap before you search. Knowing you need a plural noun eliminates most candidates instantly." },
      { name: "Matching information", tactic: "This type does not follow the order of the text, so leave it until last and use the paragraphs you have already read." },
    ],
  },
  {
    id: "listening",
    skill: "Listening",
    blurb: "Four sections, thirty minutes, one hearing only.",
    tips: [
      { name: "Form completion", tactic: "Predict the answer type in the gap — a number, a name, a date — during the preparation seconds. Spelling of names is usually spelled out for you." },
      { name: "Multiple choice", tactic: "All options are usually mentioned. Listen for the one the speaker confirms, not the one you hear first." },
      { name: "Map and plan labelling", tactic: "Find the starting point and the compass direction before the audio starts, then track the speaker's route with your pen." },
      { name: "Section 4 lecture", tactic: "There is no break in the middle of Section 4. If you lose your place, skip ahead to the next question rather than searching backwards." },
    ],
  },
  {
    id: "writing",
    skill: "Writing",
    blurb: "Sixty minutes for two tasks. Task 2 counts twice as much.",
    tips: [
      { name: "Task 1 Academic", tactic: "Open with one sentence that paraphrases the prompt, then give an overview of the two biggest trends before any numbers." },
      { name: "Task 1 General", tactic: "Match the tone to the reader. A letter to a friend and a letter to a manager should not share an opening line." },
      { name: "Task 2 introduction", tactic: "Two sentences is enough: paraphrase the question, then state your position. Background sentences waste words you need later." },
      { name: "Word count", tactic: "Under-length answers are penalised. Learn roughly how many of your own lines make 150 and 250 words so you never have to count." },
    ],
  },
  {
    id: "speaking",
    skill: "Speaking",
    blurb: "Eleven to fourteen minutes with one examiner, recorded.",
    tips: [
      { name: "Part 1", tactic: "Answer, then add one reason or example. Two or three sentences per question is the right length — memorised speeches are obvious and penalised." },
      { name: "Part 2 preparation", tactic: "Use the full minute to note four keywords, one per bullet point, not full sentences. You will speak more naturally from keywords." },
      { name: "Part 2 timing", tactic: "Aim to still be speaking when the examiner stops you. Stopping early at forty seconds costs you fluency marks." },
      { name: "Part 3", tactic: "Give a general answer, then narrow it with \"for instance\". Abstract questions reward developed opinions, not quick ones." },
    ],
  },
];

/* ------------------------------------------------------------- exam fees */

export type Fee = {
  country: string;
  currency: string;
  academic: string;
  general: string;
  ukvi: string;
};

/**
 * Indicative fees only — test centres set their own prices and change them
 * without notice. Update `feesUpdated` whenever this table is refreshed.
 */
export const feesUpdated = "September 2026";

export const fees: Fee[] = [
  { country: "United Kingdom", currency: "GBP", academic: "£220", general: "£220", ukvi: "£255" },
  { country: "United States", currency: "USD", academic: "$275", general: "$275", ukvi: "$310" },
  { country: "Australia", currency: "AUD", academic: "A$450", general: "A$450", ukvi: "A$465" },
  { country: "Canada", currency: "CAD", academic: "C$345", general: "C$345", ukvi: "C$360" },
  { country: "India", currency: "INR", academic: "₹18,000", general: "₹18,000", ukvi: "₹19,500" },
  { country: "Bangladesh", currency: "BDT", academic: "৳22,500", general: "৳22,500", ukvi: "৳25,500" },
  { country: "Pakistan", currency: "PKR", academic: "₨59,000", general: "₨59,000", ukvi: "₨68,000" },
  { country: "Nigeria", currency: "NGN", academic: "₦260,000", general: "₦260,000", ukvi: "₦300,000" },
  { country: "United Arab Emirates", currency: "AED", academic: "AED 1,250", general: "AED 1,250", ukvi: "AED 1,430" },
  { country: "Philippines", currency: "PHP", academic: "₱14,500", general: "₱14,500", ukvi: "₱16,500" },
];

/* ------------------------------------------------------------------ news */

export type NewsItem = {
  id: string;
  date: string;
  title: string;
  summary: string;
  tag: string;
};

export const news: NewsItem[] = [
  {
    id: "one-skill-retake",
    date: "2026-08-14",
    title: "One Skill Retake available in more countries",
    summary: "If you are unhappy with one section, you can retake just that skill within 60 days of your original test instead of sitting the whole exam again. Availability depends on your test centre, so confirm before you book.",
    tag: "Test options",
  },
  {
    id: "computer-delivered-results",
    date: "2026-07-02",
    title: "Computer-delivered results in one to three days",
    summary: "Computer-delivered IELTS now returns results in as little as one day at most centres, against thirteen days for the paper test. The test content and band descriptors are identical.",
    tag: "Results",
  },
  {
    id: "ielts-online",
    date: "2026-05-20",
    title: "IELTS Online accepted by more universities",
    summary: "IELTS Online — taken at home with live remote proctoring — is accepted by a growing list of universities for Academic purposes. It is not accepted for UK visa applications, which still require IELTS for UKVI at an approved centre.",
    tag: "Acceptance",
  },
  {
    id: "id-requirements",
    date: "2026-03-11",
    title: "Reminder: bring the same ID you booked with",
    summary: "Your passport or national ID must match the document used at booking, and it must be valid on test day. Candidates turned away for mismatched ID are not refunded.",
    tag: "Test day",
  },
];
