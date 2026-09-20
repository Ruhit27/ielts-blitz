export type WritingTask = { id: "task-1" | "task-2"; name: string; description: string; icon: string };

export const writingTasks: WritingTask[] = [
  {
    id: "task-1",
    name: "Task 1",
    description: "Describe a chart, table, graph, map or process in 150 words. Overviews, data language and model reports.",
    icon: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  },
  {
    id: "task-2",
    name: "Task 2",
    description: "Write a 250-word essay. The five essay types, planning, paragraphing and Band 8 model answers.",
    icon: "M7 3h7l4 4v14H7V3ZM14 3v4h4M10 12h5M10 16h5",
  },
];
