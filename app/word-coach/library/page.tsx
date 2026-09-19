import type { Metadata } from "next";
import PageHeading from "../PageHeading";
import Library from "./Library";
import { words } from "../data";

export const metadata: Metadata = { title: "Word Library — IELTS Masters" };

export default function LibraryPage() {
  return (
    <>
      <PageHeading
        crumb="Word Library"
        title="Word Library"
        description={`All ${words.length} words with definitions, examples, collocations and synonyms. Search by meaning as well as by spelling.`}
      />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <Library />
      </div>
    </>
  );
}
