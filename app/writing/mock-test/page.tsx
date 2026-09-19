import type { Metadata } from "next";
import PageHeading from "../PageHeading";
import MockTest from "./MockTest";

export const metadata: Metadata = { title: "Writing Mock Test — IELTS Masters" };

export default function Page() {
  return (
    <>
      <PageHeading crumb="Mock Test" title="Writing Mock Test" description="A full timed Writing test: Task 1 and Task 2 in 60 minutes." />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <MockTest />
      </div>
    </>
  );
}
