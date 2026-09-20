import type { Metadata } from "next";
import PageHeading from "../PageHeading";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "IELTS Band Score Calculator — IELTS Masters",
  description: "Convert a raw Listening or Reading score out of 40 into an IELTS band, and work out your overall band score.",
};

export default function BandCalculatorPage() {
  return (
    <>
      <PageHeading title="Band Calculator" description="Turn a raw Listening or Reading score into a band, then combine all four skills into your overall band score." crumbs={[{ label: "Band Calculator" }]} />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Calculator />
        <p className="mt-8 text-sm text-muted">
          Conversions are the commonly published guideline tables. Real tests are equated for difficulty, so the official boundaries move slightly from one version to the next — treat the result as an estimate, not a guarantee.
        </p>
      </div>
    </>
  );
}
