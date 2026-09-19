export type Video = {
  id: string;
  title: string;
  description: string;
  duration: string;
  /** YouTube video id. Leave empty until the video is ready and the card shows "Coming soon". */
  youtubeId: string;
};

export const videos: Video[] = [
  { id: "format", title: "The Speaking test in 10 minutes", description: "All three parts, timings, and what the examiner is scoring.", duration: "10 min", youtubeId: "" },
  { id: "part-1", title: "Part 1: sounding natural on familiar topics", description: "Answer home, work, study and hobby questions without sounding rehearsed.", duration: "8 min", youtubeId: "" },
  { id: "part-2", title: "Part 2: speaking for two minutes", description: "Use the one-minute preparation time and never run out of things to say.", duration: "12 min", youtubeId: "" },
  { id: "part-3", title: "Part 3: giving developed opinions", description: "Move from short answers to explained, balanced ideas.", duration: "11 min", youtubeId: "" },
];

export type Article = {
  slug: string;
  title: string;
  summary: string;
  minutes: number;
  tag: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const articles: Article[] = [
  {
    slug: "test-format",
    title: "How the IELTS Speaking test works",
    summary: "The three parts, how long each lasts and what you are marked on.",
    minutes: 4,
    tag: "Basics",
    sections: [
      {
        heading: "Three parts, 11 to 14 minutes",
        paragraphs: [
          "The test is a face-to-face conversation with one examiner, and it is recorded. Part 1 is a short interview of four to five minutes about familiar topics such as your home, work or studies. In Part 2 you receive a cue card, prepare for one minute, then speak for up to two minutes. Part 3 is a discussion of about four to five minutes that develops the Part 2 topic into more abstract ideas.",
        ],
      },
      {
        heading: "The four marking criteria",
        paragraphs: [
          "Each criterion carries equal weight. Fluency and Coherence measures how smoothly and logically you speak. Lexical Resource looks at the range and precision of your vocabulary. Grammatical Range and Accuracy rewards varied structures used correctly. Pronunciation covers clarity, stress, rhythm and intonation.",
          "Your overall Speaking band is the average of the four, rounded to the nearest half band. That is why a weakness in one area can be balanced by strength in another.",
        ],
      },
      {
        heading: "What examiners do not mark",
        paragraphs: [
          "You are not marked on your ideas being true or clever, and you do not need a particular accent. Making up an answer is completely fine if you cannot think of a real one. What matters is how well you communicate.",
        ],
      },
    ],
  },
  {
    slug: "part-1-answers",
    title: "Part 1: give answers that are long enough",
    summary: "A simple pattern that turns one-word replies into natural two- or three-sentence answers.",
    minutes: 4,
    tag: "Part 1",
    sections: [
      {
        heading: "The most common mistake",
        paragraphs: [
          "Many candidates answer “Do you like cooking?” with “Yes.” The examiner cannot assess your language from one word. Aim for two or three sentences, roughly ten to twenty seconds per answer.",
        ],
      },
      {
        heading: "Answer, reason, example",
        paragraphs: [
          "Start with a direct answer, add a reason, then give a short example or detail. “Yes, I do, mainly because it helps me relax after work. Last weekend I tried making fresh pasta for the first time, and it turned out better than I expected.”",
          "You do not need to do this every time. If the question is simple, a quick answer with one extension is enough, and the examiner will move on.",
        ],
      },
      {
        heading: "Do not memorise scripts",
        paragraphs: [
          "Examiners are trained to spot memorised answers, and they can lower your Fluency mark for them. Prepare ideas and useful phrases, not full paragraphs.",
        ],
      },
    ],
  },
  {
    slug: "part-2-cue-card",
    title: "Part 2: how to use your one minute",
    summary: "Plan a two-minute talk with a simple past, present and future structure.",
    minutes: 5,
    tag: "Part 2",
    sections: [
      {
        heading: "Use the notes paper",
        paragraphs: [
          "You get a pencil and paper and exactly one minute. Do not write sentences. Write four to six keywords, one for each bullet on the card, plus one detail such as a name, a place or a feeling.",
        ],
      },
      {
        heading: "Follow the bullets in order",
        paragraphs: [
          "The card gives you a structure, so use it. Spend about twenty seconds on the first bullet, then move on. If you finish early, the final prompt (“explain why…”) is where you can add the most detail. It is the best place to show off vocabulary and complex grammar.",
        ],
      },
      {
        heading: "If you run out of things to say",
        paragraphs: [
          "Talk about how you felt, what you would change, or how the situation looks now compared with then. Adding “looking back…” or “these days…” buys you a whole extra sentence. The examiner will stop you at two minutes, so do not worry about finishing.",
        ],
      },
    ],
  },
  {
    slug: "part-3-discussion",
    title: "Part 3: explaining and comparing ideas",
    summary: "Turn a plain opinion into a developed answer that reaches Band 7 and above.",
    minutes: 5,
    tag: "Part 3",
    sections: [
      {
        heading: "What changes in Part 3",
        paragraphs: [
          "The questions are about society, trends and the future, not about you. Examiners want to hear you give opinions, compare, speculate and justify.",
        ],
      },
      {
        heading: "A four-step pattern",
        paragraphs: [
          "State your view, explain why, give an example, then consider the other side. For instance: “I think public transport should be cheaper. It would persuade more people to leave their cars at home. In my city, the metro is quicker than driving but expensive, so many commuters do not use it. That said, cheaper fares would have to be paid for somehow, probably through taxes.”",
        ],
      },
      {
        heading: "Useful language",
        paragraphs: [
          "For speculation use “would” and “might”. For comparison try “whereas” and “on the other hand”. For hedging, “it tends to be” and “in many cases” sound natural. Use them where they fit, not in every sentence.",
        ],
      },
    ],
  },
  {
    slug: "fluency",
    title: "Fluency: pausing, fillers and self-correction",
    summary: "Why a natural pause is fine, and how to recover when you make a mistake.",
    minutes: 4,
    tag: "Skills",
    sections: [
      {
        heading: "Fluency is not speed",
        paragraphs: [
          "Fluent does not mean fast. Examiners look for speech that flows without long hesitation searching for words. Short natural pauses are normal, even for native speakers.",
        ],
      },
      {
        heading: "Fillers that help, and ones that hurt",
        paragraphs: [
          "Phrases like “well”, “let me think” and “to be honest” give you thinking time and sound natural. Repeating “um” and “like” constantly does not. Pick two or three phrases you like and practise using them.",
        ],
      },
      {
        heading: "Correct yourself calmly",
        paragraphs: [
          "If you notice a mistake, correct it once and carry on: “She go… goes to work early.” Self-correction shows control of grammar. Do not stop and apologise, because that costs more fluency than the mistake itself.",
        ],
      },
    ],
  },
  {
    slug: "pronunciation",
    title: "Pronunciation: what actually affects your band",
    summary: "Stress, rhythm and intonation matter more than an accent.",
    minutes: 4,
    tag: "Skills",
    sections: [
      {
        heading: "Clear beats perfect",
        paragraphs: [
          "You will not lose marks for having an accent. You lose marks when the examiner has to work to understand you. Focus on being clear and easy to follow.",
        ],
      },
      {
        heading: "Word and sentence stress",
        paragraphs: [
          "English gives stress to the important words in a sentence, usually the nouns, main verbs and adjectives, and glides over small words. Saying every word with equal force makes speech sound flat and harder to follow. Record yourself and listen for which words stand out.",
        ],
      },
      {
        heading: "Intonation and chunking",
        paragraphs: [
          "Vary your pitch to show interest and to mark the end of ideas. Group words into short meaningful chunks with a tiny pause between them, rather than reading in a single stream. Shadowing a short clip of a native speaker for five minutes a day is one of the fastest ways to improve.",
        ],
      },
    ],
  },
];

export const articleBySlug = Object.fromEntries(articles.map((a) => [a.slug, a])) as Record<string, Article>;

export const speakingPages = [
  { href: "/speaking/resources", name: "Resources", detail: "Videos and articles" },
  { href: "/speaking/book", name: "Book a speaking test", detail: "Live test with our team" },
];
