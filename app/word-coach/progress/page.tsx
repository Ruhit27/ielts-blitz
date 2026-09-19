import type { Metadata } from "next";
import PageHeading from "../PageHeading";
import ProgressView from "./ProgressView";

export const metadata: Metadata = { title: "My Progress — Word Coach — IELTS Masters" };

export default function ProgressPage() {
  return (
    <>
      <PageHeading
        crumb="My Progress"
        title="My Progress"
        description="Every word you have met, the box it sits in and when it comes back. Saved in this browser only."
      />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <ProgressView />
      </div>
    </>
  );
}
