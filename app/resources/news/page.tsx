import type { Metadata } from "next";
import PageHeading from "../PageHeading";
import { news } from "../data";

export const metadata: Metadata = {
  title: "IELTS News — IELTS Masters",
  description: "Latest IELTS test-day updates, result timings and acceptance changes.",
};

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default function NewsPage() {
  return (
    <>
      <PageHeading title="IELTS News" description="Changes to the test, results timings and what centres now expect on test day." crumbs={[{ label: "IELTS News" }]} />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <ul className="space-y-4">
          {news.map((n) => (
            <li key={n.id} className="rounded-2xl border border-line bg-white p-6">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="rounded-full bg-brand/10 px-2.5 py-0.5 font-bold text-brand">{n.tag}</span>
                <time dateTime={n.date} className="font-semibold text-muted">{formatDate(n.date)}</time>
              </div>
              <h2 className="mt-3 text-lg font-extrabold text-ink">{n.title}</h2>
              <p className="mt-2 leading-7 text-muted">{n.summary}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted">
          Always confirm test-day rules with your own centre — availability of One Skill Retake, IELTS Online and computer-delivered testing varies by location.
        </p>
      </div>
    </>
  );
}
