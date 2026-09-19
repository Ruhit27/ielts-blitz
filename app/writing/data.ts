export type WritingPage = { id: string; name: string; description: string; icon: string };

export const writingPages: WritingPage[] = [
  {
    id: "checker",
    name: "Writing Checker",
    description: "Paste your answer and get instant checks on length, structure, linking words and vocabulary variety.",
    icon: "M7 3h7l4 4v14H7V3ZM14 3v4h4M10 12h5M10 16h5",
  },
  {
    id: "band-8-trainer",
    name: "Band 8 Trainer",
    description: "See Band 6 sentences rewritten at Band 8, and learn the technique behind each upgrade.",
    icon: "M4 7h8M4 12h8M4 17h5M18 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  },
  {
    id: "mock-test",
    name: "Mock Test",
    description: "A timed 60-minute Writing test with Task 1 and Task 2, just like exam day.",
    icon: "M6 3h9l3 3v15H6V3ZM9 10h6M9 14h4",
  },
  {
    id: "sample-answers",
    name: "Sample Answers",
    description: "Band 8 model answers for Task 1 and Task 2, with an examiner-style breakdown of why they score well.",
    icon: "M8 3h9v14H8V3ZM5 7v14h9",
  },
  {
    id: "how-writing-is-marked",
    name: "How Writing Is Marked",
    description: "The four marking criteria, what each band looks like, and how the two tasks are weighted.",
    icon: "M5.6 18.4A9 9 0 1 1 18.4 18.4M12 13l4-5",
  },
  {
    id: "history",
    name: "Writing History",
    description: "Every answer you check or submit in a mock test is saved here on this device.",
    icon: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 2",
  },
];

export const task1 = {
  label: "Task 1",
  minutes: 20,
  min: 150,
  prompt:
    "The table below shows the percentage of households with internet access in four countries in 2005 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
  table: {
    head: ["Country", "2005", "2020"],
    rows: [
      ["Japan", "66%", "93%"],
      ["United Kingdom", "70%", "96%"],
      ["Brazil", "14%", "74%"],
      ["Kenya", "3%", "34%"],
    ],
  },
};

export const task2 = {
  label: "Task 2",
  minutes: 40,
  min: 250,
  prompt:
    "Some people believe that university education should be free for all students, while others think students should pay for it. Discuss both views and give your own opinion.",
};
