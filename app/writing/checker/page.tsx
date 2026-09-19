import type { Metadata } from "next";
import PageHeading from "../PageHeading";
import WritingChecker from "./WritingChecker";

export const metadata: Metadata = { title: "Writing Checker — IELTS Masters" };

export default function Page() {
  return (
    <>
      <PageHeading crumb="Writing Checker" title="Writing Checker" description="Paste your answer and run instant checks on length, structure, linking words, vocabulary variety and tone." />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <WritingChecker />
      </div>
    </>
  );
}
