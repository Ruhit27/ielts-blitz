import type { Metadata } from "next";
import Link from "next/link";
import PageHeading from "../PageHeading";
import { posts } from "../data";

export const metadata: Metadata = {
  title: "IELTS Blog & Guides — IELTS Masters",
  description: "Strategy, grammar and vocabulary guides for every part of the IELTS test.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeading title="Blog & Guides" description="Short, practical guides on strategy, grammar and vocabulary. Read one, then use it in your next practice session." crumbs={[{ label: "Blog & Guides" }]} />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <ul className="grid gap-4 sm:grid-cols-2">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/resources/blog/${p.slug}`} className="block h-full rounded-2xl border border-line bg-white p-5 transition-colors hover:border-brand">
                <div className="flex items-center justify-between text-xs">
                  <span className="rounded-full bg-brand/10 px-2.5 py-0.5 font-bold text-brand">{p.tag}</span>
                  <span className="font-semibold text-muted">{p.minutes} min read</span>
                </div>
                <h2 className="mt-3 font-extrabold text-ink">{p.title}</h2>
                <p className="mt-1.5 text-sm text-muted">{p.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
