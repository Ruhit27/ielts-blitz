import type { Metadata } from "next";
import Link from "next/link";
import PageHeading from "../PageHeading";
import { articles, videos } from "../data";

export const metadata: Metadata = { title: "Speaking Resources — IELTS Masters" };

export default function ResourcesPage() {
  return (
    <>
      <PageHeading title="Speaking resources" description="Watch a lesson, read a guide, then book a live test when you are ready." crumbs={[{ label: "Resources" }]} />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-sm font-extrabold tracking-[0.18em] text-brand">VIDEO LESSONS</h2>
        <ul className="mt-5 grid gap-5 sm:grid-cols-2">
          {videos.map((v) => (
            <li key={v.id} className="overflow-hidden rounded-2xl border border-line bg-white">
              {v.youtubeId ? (
                <iframe
                  className="aspect-video w-full"
                  src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}`}
                  title={v.title}
                  loading="lazy"
                  allow="accelerometer; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="grid aspect-video place-items-center bg-surface text-center">
                  <div>
                    <span className="mx-auto grid size-12 place-items-center rounded-full bg-white text-brand shadow-sm" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                    </span>
                    <p className="mt-2 text-xs font-extrabold tracking-[0.14em] text-muted">COMING SOON</p>
                  </div>
                </div>
              )}
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-extrabold text-ink">{v.title}</h3>
                  <span className="shrink-0 text-xs font-semibold text-muted">{v.duration}</span>
                </div>
                <p className="mt-1.5 text-sm text-muted">{v.description}</p>
              </div>
            </li>
          ))}
        </ul>

        <h2 className="mt-14 text-sm font-extrabold tracking-[0.18em] text-brand">ARTICLES</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {articles.map((a) => (
            <li key={a.slug}>
              <Link href={`/speaking/resources/${a.slug}`} className="block h-full rounded-2xl border border-line bg-white p-5 transition-colors hover:border-brand">
                <div className="flex items-center justify-between text-xs">
                  <span className="rounded-full bg-brand/10 px-2.5 py-0.5 font-bold text-brand">{a.tag}</span>
                  <span className="font-semibold text-muted">{a.minutes} min read</span>
                </div>
                <h3 className="mt-3 font-extrabold text-ink">{a.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{a.summary}</p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-ink p-6 text-white">
          <div>
            <p className="text-lg font-extrabold">Ready to practise with a real examiner?</p>
            <p className="mt-1 text-sm text-white/70">Book a live speaking test with our team.</p>
          </div>
          <Link href="/speaking/book" className="rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-hover">Book a speaking test</Link>
        </div>
      </div>
    </>
  );
}
