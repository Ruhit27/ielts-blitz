import type { Metadata } from "next";
import Link from "next/link";
import PageHeading from "./PageHeading";

export const metadata: Metadata = {
  title: "IELTS Speaking — IELTS Masters",
  description: "Learn how the Speaking test works, then book a live speaking test with our team.",
};

const parts = [
  { title: "Part 1", time: "4–5 min", text: "Interview on familiar topics: home, work, studies, hobbies." },
  { title: "Part 2", time: "3–4 min", text: "Cue card. One minute to prepare, up to two minutes to speak." },
  { title: "Part 3", time: "4–5 min", text: "Discussion of abstract ideas linked to your Part 2 topic." },
];

const cards = [
  { href: "/speaking/resources", title: "Speaking resources", text: "Video lessons and short articles on every part of the test.", cta: "Browse resources" },
  { href: "/speaking/book", title: "Book a speaking test", text: "Request a live test with our team. Pick a time and we will confirm it.", cta: "Request a test" },
];

export default function SpeakingPage() {
  return (
    <>
      <PageHeading title="IELTS Speaking" description="A one-to-one conversation of 11 to 14 minutes. Learn the format, then practise it live with us." />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <ul className="grid gap-4 sm:grid-cols-3">
          {parts.map((p) => (
            <li key={p.title} className="rounded-2xl border border-line bg-white p-5 shadow-[0_4px_16px_rgba(17,24,39,0.06)]">
              <div className="flex items-baseline justify-between">
                <h2 className="text-lg font-extrabold text-ink">{p.title}</h2>
                <span className="text-xs font-bold text-brand">{p.time}</span>
              </div>
              <p className="mt-2 text-sm text-muted">{p.text}</p>
            </li>
          ))}
        </ul>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {cards.map((c) => (
            <li key={c.href}>
              <Link href={c.href} className="block h-full rounded-2xl border border-line bg-white p-6 transition-colors hover:border-brand">
                <h2 className="text-xl font-extrabold text-ink">{c.title}</h2>
                <p className="mt-2 text-muted">{c.text}</p>
                <p className="mt-4 text-sm font-bold text-brand">{c.cta} →</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
