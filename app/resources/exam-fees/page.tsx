import type { Metadata } from "next";
import PageHeading from "../PageHeading";
import { fees, feesUpdated } from "../data";

export const metadata: Metadata = {
  title: "IELTS Exam Fees by Country — IELTS Masters",
  description: "Indicative IELTS Academic, General Training and UKVI test fees by country.",
};

export default function ExamFeesPage() {
  return (
    <>
      <PageHeading title="Exam Fees" description="What the test costs where you are taking it, for Academic, General Training and IELTS for UKVI." crumbs={[{ label: "Exam Fees" }]} />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <caption className="sr-only">Indicative IELTS test fees by country</caption>
            <thead className="border-b border-line bg-surface text-xs font-extrabold uppercase tracking-[0.12em] text-muted">
              <tr>
                <th scope="col" className="px-5 py-3">Country</th>
                <th scope="col" className="px-5 py-3">Academic</th>
                <th scope="col" className="px-5 py-3">General Training</th>
                <th scope="col" className="px-5 py-3">UKVI</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((f) => (
                <tr key={f.country} className="border-b border-line last:border-0">
                  <th scope="row" className="px-5 py-3.5 font-semibold text-ink">
                    {f.country}
                    <span className="ml-2 text-xs font-medium text-muted">{f.currency}</span>
                  </th>
                  <td className="px-5 py-3.5 text-muted">{f.academic}</td>
                  <td className="px-5 py-3.5 text-muted">{f.general}</td>
                  <td className="px-5 py-3.5 text-muted">{f.ukvi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 rounded-2xl border border-line bg-surface p-6">
          <h2 className="font-extrabold text-ink">Before you book</h2>
          <ul className="mt-3 space-y-1.5 text-sm text-muted">
            <li className="flex gap-2"><span className="text-brand" aria-hidden="true">•</span>Figures are indicative and last reviewed in {feesUpdated}. Test centres set their own prices and change them without notice.</li>
            <li className="flex gap-2"><span className="text-brand" aria-hidden="true">•</span>Computer-delivered and paper-based tests usually cost the same. IELTS for UKVI costs more because of the extra security requirements.</li>
            <li className="flex gap-2"><span className="text-brand" aria-hidden="true">•</span>One Skill Retake, extra Test Report Forms and rescoring (Enquiry on Results) are charged separately.</li>
            <li className="flex gap-2"><span className="text-brand" aria-hidden="true">•</span>Confirm the exact fee with your chosen centre on ielts.org or britishcouncil.org before paying.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
