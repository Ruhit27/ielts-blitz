import type { Metadata } from "next";
import PageHeading from "../PageHeading";
import History from "./History";

export const metadata: Metadata = { title: "Writing History — IELTS Masters" };

export default function Page() {
  return (
    <>
      <PageHeading crumb="Writing History" title="Writing History" description="Your recent checks and mock tests, saved privately in this browser." />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <History />
      </div>
    </>
  );
}
