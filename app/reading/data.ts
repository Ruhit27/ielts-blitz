export type Difficulty = "Moderate" | "Hard" | "Very Hard";

export type Choice = { key: string; text: string };

export type DemoQuestion = {
  prompt: string;
  /** Overrides the demo-level choices (used by MCQ, where each question has its own options). */
  options?: Choice[];
  /** Accepted answers; text answers are compared case-insensitively. */
  answer: string[];
};

export type Demo = {
  instruction: string;
  input: "radio" | "select" | "text";
  choices?: Choice[];
  /** Steps of a flow diagram; "[n]" marks the blank for question n. */
  diagram?: string[];
  showPassage: boolean;
  questions: DemoQuestion[];
};

export type QuestionType = {
  id: string;
  name: string;
  short: string;
  difficulty: Difficulty;
  demo: Demo;
};

export const passageTitle = "The Rise of Urban Beekeeping";

export const passage = [
  {
    label: "A",
    text: "Over the past decade, beekeeping has moved from the countryside into cities. Rooftop hives now sit on hotels, offices and museums in London, Paris and New York. Supporters argue that cities offer bees a surprisingly rich diet, since parks, gardens and balcony planters bloom across a longer season than monoculture farmland.",
  },
  {
    label: "B",
    text: "Urban honey is often more varied than rural honey. A study by a university team found that city hives produced honey from more than forty plant species, while farm hives relied on fewer than ten. However, researchers warn that pollution can enter the food chain, so regular testing of honey for heavy metals remains essential.",
  },
  {
    label: "C",
    text: "A more serious concern is competition. In some cities, the number of managed hives has grown faster than the supply of flowers, leaving wild pollinators such as solitary bees short of food. Ecologist Dr Maria Lopes argues that cities should plant more flowers before allowing more hives. Her view is difficult to dispute: hives are only as sustainable as the flowers that feed them.",
  },
  {
    label: "D",
    text: "Some councils have responded by introducing registration schemes and limiting the number of hives per square kilometre. Meanwhile, community groups are converting empty plots into wildflower meadows, hoping to support both managed and wild bees.",
  },
];

const tfng: Choice[] = ["True", "False", "Not Given"].map((k) => ({ key: k, text: k }));
const ynng: Choice[] = ["Yes", "No", "Not Given"].map((k) => ({ key: k, text: k }));
const paragraphs: Choice[] = passage.map((p) => ({ key: p.label, text: `Paragraph ${p.label}` }));

export const questionTypes: QuestionType[] = [
  {
    id: "mcq",
    name: "MCQ",
    short: "MC",
    difficulty: "Moderate",
    demo: {
      instruction: "Choose the correct letter, A, B, C or D.",
      input: "radio",
      showPassage: true,
      questions: [
        {
          prompt: "According to paragraph A, why can cities suit bees?",
          options: [
            { key: "A", text: "They have fewer natural predators." },
            { key: "B", text: "Flowers bloom over a longer season." },
            { key: "C", text: "Winters are warmer than in the countryside." },
            { key: "D", text: "There is less rainfall to disturb the hives." },
          ],
          answer: ["B"],
        },
        {
          prompt: "What do researchers recommend about city honey?",
          options: [
            { key: "A", text: "It should be sold at a lower price." },
            { key: "B", text: "It should only come from rooftop hives." },
            { key: "C", text: "It should be tested regularly." },
            { key: "D", text: "It should be mixed with rural honey." },
          ],
          answer: ["C"],
        },
      ],
    },
  },
  {
    id: "tfng",
    name: "T/F/NG",
    short: "TF",
    difficulty: "Hard",
    demo: {
      instruction:
        "Do the following statements agree with the information in the passage? Choose TRUE if it agrees, FALSE if it contradicts, or NOT GIVEN if there is no information.",
      input: "radio",
      choices: tfng,
      showPassage: true,
      questions: [
        { prompt: "City hives produce honey from more plant species than farm hives.", answer: ["True"] },
        { prompt: "Honey from city hives has been proven harmful to people.", answer: ["False"] },
        { prompt: "Rooftop hives produce more honey per hive than rural hives.", answer: ["Not Given"] },
      ],
    },
  },
  {
    id: "ynng",
    name: "Y/N/NG",
    short: "YN",
    difficulty: "Hard",
    demo: {
      instruction:
        "Do the following statements agree with the views of the writer? Choose YES if it agrees, NO if it contradicts, or NOT GIVEN if it is impossible to say.",
      input: "radio",
      choices: ynng,
      showPassage: true,
      questions: [
        { prompt: "Cities should increase their supply of flowers before adding more hives.", answer: ["Yes"] },
        { prompt: "Registration schemes are the best way to protect wild bees.", answer: ["Not Given"] },
        { prompt: "Urban beekeeping harms wild pollinators in every city.", answer: ["No"] },
      ],
    },
  },
  {
    id: "match-headings",
    name: "Match Headings",
    short: "MH",
    difficulty: "Very Hard",
    demo: {
      instruction: "Choose the correct heading for each paragraph from the list of headings below.",
      input: "select",
      choices: [
        { key: "i", text: "A wider variety on the plate" },
        { key: "ii", text: "Bees leave the countryside" },
        { key: "iii", text: "When too many hives become a problem" },
        { key: "iv", text: "Councils and communities respond" },
        { key: "v", text: "The dangers of the honey trade" },
        { key: "vi", text: "Why farms are better for bees" },
      ],
      showPassage: true,
      questions: [
        { prompt: "Paragraph A", answer: ["ii"] },
        { prompt: "Paragraph B", answer: ["i"] },
        { prompt: "Paragraph C", answer: ["iii"] },
        { prompt: "Paragraph D", answer: ["iv"] },
      ],
    },
  },
  {
    id: "match-info",
    name: "Match Info",
    short: "MI",
    difficulty: "Hard",
    demo: {
      instruction: "Which paragraph contains the following information? Choose the correct letter, A–D.",
      input: "select",
      choices: paragraphs,
      showPassage: true,
      questions: [
        { prompt: "a reference to checking honey for contamination", answer: ["B"] },
        { prompt: "a mention of wild bees going without enough food", answer: ["C"] },
        { prompt: "a description of rules set by local authorities", answer: ["D"] },
        { prompt: "a list of cities where rooftop hives can be found", answer: ["A"] },
      ],
    },
  },
  {
    id: "match-features",
    name: "Match Features",
    short: "MF",
    difficulty: "Hard",
    demo: {
      instruction: "Match each statement with the correct person or group, A, B or C.",
      input: "select",
      choices: [
        { key: "A", text: "A university research team" },
        { key: "B", text: "Dr Maria Lopes" },
        { key: "C", text: "Local councils" },
      ],
      showPassage: true,
      questions: [
        { prompt: "Found that city hives use over forty plant species.", answer: ["A"] },
        { prompt: "Believes flowers should be planted before more hives are allowed.", answer: ["B"] },
        { prompt: "Have introduced registration schemes.", answer: ["C"] },
      ],
    },
  },
  {
    id: "match-endings",
    name: "Match Endings",
    short: "ME",
    difficulty: "Hard",
    demo: {
      instruction: "Complete each sentence with the correct ending, A–E.",
      input: "select",
      choices: [
        { key: "A", text: "pollution can enter the food chain." },
        { key: "B", text: "plants flower across a longer season." },
        { key: "C", text: "hive numbers have grown faster than the supply of flowers." },
        { key: "D", text: "all hives have been banned by councils." },
        { key: "E", text: "farm hives rely on many plant species." },
      ],
      showPassage: true,
      questions: [
        { prompt: "Cities can suit bees because", answer: ["B"] },
        { prompt: "Honey needs regular testing because", answer: ["A"] },
        { prompt: "Wild pollinators may go hungry because", answer: ["C"] },
      ],
    },
  },
  {
    id: "sentence-fill",
    name: "Sentence Fill",
    short: "SF",
    difficulty: "Moderate",
    demo: {
      instruction: "Complete the sentences. Write NO MORE THAN TWO WORDS from the passage for each answer.",
      input: "text",
      showPassage: true,
      questions: [
        { prompt: "Rooftop hives can be found on hotels, offices and ___.", answer: ["museums"] },
        { prompt: "Farm hives relied on fewer than ___ plant species.", answer: ["ten"] },
        { prompt: "Community groups are turning empty plots into ___.", answer: ["wildflower meadows"] },
      ],
    },
  },
  {
    id: "summary-fill",
    name: "Summary Fill",
    short: "SU",
    difficulty: "Moderate",
    demo: {
      instruction: "Complete the summary using words from the box.",
      input: "select",
      choices: ["longer", "shorter", "variety", "pollution", "disease", "registration"].map((k) => ({ key: k, text: k })),
      showPassage: true,
      questions: [
        { prompt: "Cities suit bees because plants there bloom for a ___ season.", answer: ["longer"] },
        { prompt: "City honey comes from a greater ___ of plants than farm honey.", answer: ["variety"] },
        { prompt: "However, ___ can enter the food chain, so honey must be tested.", answer: ["pollution"] },
      ],
    },
  },
  {
    id: "diagram-labels",
    name: "Diagram Labels",
    short: "DL",
    difficulty: "Hard",
    demo: {
      instruction:
        "Label the diagram. Worker bees collect nectar and carry it to the hive, where house bees store it in wax cells. Fanning their wings evaporates the water and turns the nectar into honey. Write ONE WORD ONLY for each answer.",
      input: "text",
      diagram: [
        "Worker bees collect [1] from flowers",
        "Nectar is stored in wax [2]",
        "Bees fan their wings to remove [3]",
        "Thickened nectar becomes honey",
      ],
      showPassage: false,
      questions: [
        { prompt: "Blank 1 ___", answer: ["nectar"] },
        { prompt: "Blank 2 ___", answer: ["cells"] },
        { prompt: "Blank 3 ___", answer: ["water"] },
      ],
    },
  },
  {
    id: "short-answer",
    name: "Short Answer",
    short: "SA",
    difficulty: "Moderate",
    demo: {
      instruction: "Answer the questions. Write NO MORE THAN THREE WORDS from the passage for each answer.",
      input: "text",
      showPassage: true,
      questions: [
        { prompt: "Which kind of bee may be short of food in cities?", answer: ["solitary bees", "solitary"] },
        { prompt: "Who says more flowers should be planted first?", answer: ["dr maria lopes", "maria lopes", "lopes"] },
        { prompt: "What can enter the food chain in cities?", answer: ["pollution"] },
      ],
    },
  },
];

export const difficultyDot: Record<Difficulty, string> = {
  Moderate: "bg-reading",
  Hard: "bg-writing",
  "Very Hard": "bg-listening",
};
