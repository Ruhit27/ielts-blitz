import type { Choice, Difficulty, Demo } from "../reading/data";

export type Line = { speaker: string; text: string };

export type ListeningType = {
  id: string;
  name: string;
  short: string;
  section: string;
  difficulty: Difficulty;
  summary: string;
  tips: string[];
  traps: string[];
  demo: Demo;
  /** The practice audio. It is read aloud by the browser's voice, and shown as a transcript after checking. */
  script: Line[];
};

const floors: Choice[] = [
  { key: "A", text: "Basement" },
  { key: "B", text: "Ground floor" },
  { key: "C", text: "First floor" },
  { key: "D", text: "Second floor" },
];

export const listeningTypes: ListeningType[] = [
  {
    id: "form-completion",
    name: "Form completion",
    short: "FC",
    section: "Usually Section 1",
    difficulty: "Moderate",
    summary: "Fill the gaps in a form, such as a booking or enquiry, while a caller gives details.",
    tips: [
      "Use the 30 seconds before the audio to read the form and predict the kind of answer each gap needs: a name, a date, a number.",
      "Answers follow the order of the form, so keep your eyes on the next gap while you listen.",
      "Names are usually spelled out. Write them letter by letter, and check that capital letters and hyphens are right.",
      "Respect the word limit. “No more than two words” means an answer of three words loses the mark.",
    ],
    traps: [
      "The speaker often corrects themselves (“Tuesday, sorry, Thursday”). The final version is the answer.",
      "Numbers that sound alike, such as 15 and 50, are a common trap. Listen for the stress on the syllable.",
    ],
    script: [
      { speaker: "Receptionist", text: "Riverside Community Centre, how can I help you?" },
      { speaker: "Caller", text: "Hello, I'd like to book a place on the beginners' photography workshop, please." },
      { speaker: "Receptionist", text: "Of course. Could I take your surname first?" },
      { speaker: "Caller", text: "It's Hargreaves. That's H, A, R, G, R, E, A, V, E, S." },
      { speaker: "Receptionist", text: "Thank you. The workshop runs on the fourteenth of March, and it starts at half past nine." },
      { speaker: "Caller", text: "Lovely. And how much does it cost?" },
      { speaker: "Receptionist", text: "It's thirty-five pounds, and that includes the use of a camera." },
      { speaker: "Caller", text: "That sounds good. Is there anything I should bring?" },
      { speaker: "Receptionist", text: "Just a notebook and comfortable shoes, because we spend the morning walking around the park." },
    ],
    demo: {
      instruction: "Complete the booking form. Write NO MORE THAN TWO WORDS OR A NUMBER for each answer.",
      input: "text",
      showPassage: false,
      questions: [
        { prompt: "Surname: ______", answer: ["Hargreaves"] },
        { prompt: "Date of workshop: ______ March", answer: ["14", "14th", "fourteenth"] },
        { prompt: "Start time: ______", answer: ["9.30", "9:30", "09:30", "9.30am", "9:30am", "half past nine"] },
        { prompt: "Fee: £______", answer: ["35", "£35", "thirty-five", "thirty five"] },
        { prompt: "Bring a notebook and comfortable ______", answer: ["shoes"] },
      ],
    },
  },
  {
    id: "multiple-choice",
    name: "Multiple choice",
    short: "MC",
    section: "Sections 1–4",
    difficulty: "Hard",
    summary: "Choose the correct answer from A, B or C. All three options are usually mentioned in the audio.",
    tips: [
      "Underline the key idea in each question and option before the audio starts, so you know what to listen for.",
      "Expect all the options to be mentioned. You are listening for which one matches what the question asks.",
      "Questions follow the order of the audio. If you miss one, move on rather than losing the next.",
      "Words in the options are often paraphrased in the recording, so listen for meaning, not identical words.",
    ],
    traps: [
      "A speaker may reject an idea before accepting another. Wait for the final decision.",
      "Do not choose an option just because you heard its exact words. That is often the distractor.",
    ],
    script: [
      { speaker: "Maya", text: "Have you finished the slides on wind power yet?" },
      { speaker: "Tom", text: "Nearly. I thought I'd be done by Tuesday, but the data took much longer to find than I expected." },
      { speaker: "Maya", text: "We only have ten minutes, so I think we should cut the section on history completely." },
      { speaker: "Tom", text: "I'd rather keep a short version. Our tutor said context matters. Two slides at most?" },
      { speaker: "Maya", text: "Fair enough. Two slides it is. Where shall we practise? The library?" },
      { speaker: "Tom", text: "The group rooms there are booked all week, so let's use the seminar room after class on Thursday." },
      { speaker: "Maya", text: "Good. One thing still worries me, though. The ending feels flat." },
      { speaker: "Tom", text: "What if we finish by asking the audience a question?" },
      { speaker: "Maya", text: "Yes, that would get people talking. Let's do that." },
    ],
    demo: {
      instruction: "Choose the correct letter, A, B or C.",
      input: "radio",
      showPassage: false,
      questions: [
        { prompt: "Why is Tom behind with his slides?", options: [{ key: "A", text: "He lost his notes." }, { key: "B", text: "The data was hard to find." }, { key: "C", text: "He was ill." }], answer: ["B"] },
        { prompt: "What do they decide about the history section?", options: [{ key: "A", text: "Remove it completely." }, { key: "B", text: "Keep it to two slides." }, { key: "C", text: "Move it to the end." }], answer: ["B"] },
        { prompt: "Where will they practise?", options: [{ key: "A", text: "In the library." }, { key: "B", text: "In the seminar room." }, { key: "C", text: "At Maya's home." }], answer: ["B"] },
        { prompt: "How will they improve the ending?", options: [{ key: "A", text: "Add a summary chart." }, { key: "B", text: "Ask the audience a question." }, { key: "C", text: "Show a short video." }], answer: ["B"] },
      ],
    },
  },
  {
    id: "matching",
    name: "Matching",
    short: "MT",
    section: "Sections 2–4",
    difficulty: "Hard",
    summary: "Match items (places, people, opinions) to a list of options as the speaker moves through them.",
    tips: [
      "Read the list of options first and get familiar with them, because you will see them once and hear them fast.",
      "Items are in the order they are spoken, but the options are not. Do not expect A, B, C in sequence.",
      "The same option can sometimes be used more than once. Check the instructions.",
      "Cross out nothing until the speaker has fully moved on. Later comments can change the meaning.",
    ],
    traps: [
      "Speakers often mention several options for one item. Choose the one that is directly linked to it.",
    ],
    script: [
      { speaker: "Guide", text: "Welcome to Oakfield Community Centre. You'll find the café right by the entrance, on the ground floor." },
      { speaker: "Guide", text: "If you want somewhere quiet to read, the library is one floor up." },
      { speaker: "Guide", text: "The gym is downstairs, in the basement, and it's open from six every morning." },
      { speaker: "Guide", text: "Finally, our art studio is right at the top of the building, on the second floor." },
    ],
    demo: {
      instruction: "Which floor is each place on? Choose the correct letter, A to D.",
      input: "select",
      choices: floors,
      showPassage: false,
      questions: [
        { prompt: "Café", answer: ["B"] },
        { prompt: "Library", answer: ["C"] },
        { prompt: "Gym", answer: ["A"] },
        { prompt: "Art studio", answer: ["D"] },
      ],
    },
  },
  {
    id: "sentence-completion",
    name: "Sentence completion",
    short: "SC",
    section: "Sections 2–4",
    difficulty: "Hard",
    summary: "Finish sentences with words from the recording, often from a lecture or talk.",
    tips: [
      "Read each sentence and decide what type of word is missing (a noun, a number, an adjective) before you listen.",
      "The sentences paraphrase the audio, so listen for the idea, then take the exact word from what you hear.",
      "Check that your answer fits grammatically: read the full sentence back in your head.",
      "Spelling counts. Write words you hear clearly, and know the spelling of common topic words.",
    ],
    traps: [
      "The word you need often comes right after a signpost like “in particular” or “what matters most is”.",
    ],
    script: [
      { speaker: "Lecturer", text: "Today I want to talk about sleep, and why it matters so much for learning." },
      { speaker: "Lecturer", text: "Most adults need between seven and nine hours of sleep each night." },
      { speaker: "Lecturer", text: "During deep sleep, the body repairs its muscles, and the brain organises what we have learned during the day." },
      { speaker: "Lecturer", text: "Looking at a screen just before bed reduces the level of a hormone called melatonin, which makes it harder to fall asleep." },
      { speaker: "Lecturer", text: "Finally, experts recommend keeping the bedroom cool, as a lower temperature helps us sleep more deeply." },
    ],
    demo: {
      instruction: "Complete the sentences. Write ONE WORD OR A NUMBER for each answer.",
      input: "text",
      showPassage: false,
      questions: [
        { prompt: "Most adults need between seven and ______ hours of sleep.", answer: ["nine", "9"] },
        { prompt: "During deep sleep, the body repairs its ______.", answer: ["muscles"] },
        { prompt: "Screens before bed reduce a hormone called ______.", answer: ["melatonin"] },
        { prompt: "Experts recommend keeping the bedroom ______.", answer: ["cool"] },
      ],
    },
  },
  {
    id: "short-answer",
    name: "Short answer",
    short: "SA",
    section: "Sections 2–4",
    difficulty: "Moderate",
    summary: "Answer questions directly, in a few words, using what you hear.",
    tips: [
      "Look at the question word (who, where, when, what) to know what kind of answer to expect.",
      "Keep answers short and take the exact words from the recording.",
      "Obey the word limit. Extra words can cost the mark even if the answer is right.",
      "Write down what you hear immediately, then check spelling as you review.",
    ],
    traps: [
      "Numbers and days come with extra details. Make sure you record the one the question asks about.",
    ],
    script: [
      { speaker: "Announcer", text: "Here is some important information about the new recycling scheme in our area." },
      { speaker: "Announcer", text: "Collections take place every Wednesday morning, so please put your boxes out the night before." },
      { speaker: "Announcer", text: "Paper and card go in the blue box, and glass goes in the green box. Please rinse all containers first." },
      { speaker: "Announcer", text: "Batteries cannot go in either box. Please take them to the library, where there is a special collection point." },
      { speaker: "Announcer", text: "To get reminders, download our new app, which is called BinDay." },
    ],
    demo: {
      instruction: "Answer the questions. Write NO MORE THAN TWO WORDS for each answer.",
      input: "text",
      showPassage: false,
      questions: [
        { prompt: "On which day are collections?", answer: ["Wednesday"] },
        { prompt: "What colour is the box for glass?", answer: ["green"] },
        { prompt: "Where should batteries be taken?", answer: ["library", "the library"] },
        { prompt: "What is the reminder app called?", answer: ["BinDay", "Bin Day"] },
      ],
    },
  },
];

export const sections = [
  { n: 1, title: "Everyday conversation", text: "Two speakers, usually a booking or enquiry. The easiest section, with details like names, dates and numbers." },
  { n: 2, title: "Talk on a familiar topic", text: "One speaker giving information, such as a tour or announcement. Often includes maps or plans." },
  { n: 3, title: "Academic discussion", text: "Two to four speakers, such as students and a tutor discussing coursework. Opinions and agreement matter." },
  { n: 4, title: "Academic lecture", text: "One speaker on an academic subject. The hardest section, with no break in the middle." },
];

export const generalTips = [
  { title: "Use the preview time", text: "You get time before each section to read the questions. Use it to predict answers and spot the key words." },
  { title: "The audio plays once", text: "There is no rewind. Keep moving, and if you miss an answer, let it go and focus on the next question." },
  { title: "Follow the order", text: "Answers appear in the same order as the questions in almost every task, so use the questions as a map." },
  { title: "Listen for paraphrase", text: "The recording rarely uses the exact words in the question. Practise recognising the same idea in different words." },
  { title: "Check spelling and grammar", text: "A misspelled or wrongly formed answer is marked wrong. Singular versus plural can decide a mark." },
  { title: "Never leave a blank", text: "There is no penalty for wrong answers, so always write your best guess." },
];

export const typeById = Object.fromEntries(listeningTypes.map((t) => [t.id, t])) as Record<string, ListeningType>;
