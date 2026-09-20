import type { Metadata } from "next";
import TaskPage from "../TaskPage";
import { task2Content } from "../task-content";

export const metadata: Metadata = {
  title: "IELTS Writing Task 2 — IELTS Masters",
  description: task2Content.description,
};

export default function Page() {
  return <TaskPage task={task2Content} />;
}
