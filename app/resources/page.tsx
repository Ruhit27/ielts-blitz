import type { Metadata } from "next";
import Link from "next/link";
import PageHeading from "./PageHeading";
import ResourceIcon from "./ResourceIcon";
import { news, posts, resourceSections, tipGroups } from "./data";

export const metadata: Metadata = {
  title: "IELTS Resources — IELTS Masters",
  description: "Guides, study tips, a band score calculator, test fees by country and the latest IELTS news.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHeading title="Resources" description="Everything around the practice: guides to read, tactics to apply, a calculator for your raw scores, what the test costs and what has changed." />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <ul className="grid gap-4 sm:grid-cols-2">
          {resourceSections.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="group flex h-full gap-4 rounded-2xl border border-line bg-white p-5 transition-shadow hover:shadow-md">
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <ResourceIcon name={s.icon} />
                </span>
                <span>
                  <span className="block font-semibold text-ink group-hover:text-brand">{s.name}</span>
                  <span className="mt-0.5 block text-sm text-muted">{s.detail}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="mt-14 text-sm font-extrabold tracking-[0.18em] text-brand">LATEST GUIDES</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {posts.slice(0, 2).map((p) => (
            <li key={p.slug}>
              <Link href={`/resources/blog/${p.slug}`} className="block h-full rounded-2xl border border-line bg-white p-5 transition-colors hover:border-brand">
                <div className="flex items-center justify-between text-xs">
                  <span className="rounded-full bg-brand/10 px-2.5 py-0.5 font-bold text-brand">{p.tag}</span>
                  <span className="font-semibold text-muted">{p.minutes} min read</span>
                </div>
                <h3 className="mt-3 font-extrabold text-ink">{p.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{p.summary}</p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-5">
            <h2 className="font-extrabold text-ink">Tactics by skill</h2>
            <p className="mt-1.5 text-sm text-muted">{tipGroups.length} skills, {tipGroups.reduce((n, g) => n + g.tips.length, 0)} question-type tactics.</p>
            <Link href="/resources/study-tips" className="mt-4 inline-block text-sm font-bold text-brand">Open study tips →</Link>
          </div>
          <div className="rounded-2xl border border-line bg-white p-5">
            <h2 className="font-extrabold text-ink">Latest update</h2>
            <p className="mt-1.5 text-sm text-muted">{news[0].title}</p>
            <Link href="/resources/news" className="mt-4 inline-block text-sm font-bold text-brand">Read IELTS news →</Link>
          </div>
        </div>
      </div>
    </>
  );
}
