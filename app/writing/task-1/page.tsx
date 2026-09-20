import type { Metadata } from "next";
import TaskPage from "../TaskPage";
import { task1Content } from "../task-content";

export const metadata: Metadata = {
  title: "IELTS Writing Task 1 — IELTS Masters",
  description: task1Content.description,
};

export default function Page() {
  return <TaskPage task={task1Content} />;
}
