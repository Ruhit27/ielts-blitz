import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeading from "../../PageHeading";
import WordCard from "../../WordCard";
import { topicById, topics, wordsByTopic, type TopicId } from "../../data";

export function generateStaticParams() {
  return topics.map((t) => ({ topic: t.id }));
}

export async function generateMetadata({ params }: PageProps<"/word-coach/packs/[topic]">): Promise<Metadata> {
  const { topic } = await params;
  const found = topics.find((t) => t.id === topic);
  return { title: found ? `${found.name} Pack — Word Coach — IELTS Masters` : "Not found" };
}

export default async function PackPage({ params }: PageProps<"/word-coach/packs/[topic]">) {
  const { topic } = await params;
  const index = topics.findIndex((t) => t.id === topic);
  if (index === -1) notFound();

  const pack = topicById[topic as TopicId];
  const list = wordsByTopic(pack.id);
  const next = topics[(index + 1) % topics.length];

  return (
    <>
      <PageHeading
        crumb={`${pack.name} pack`}
        title={`${pack.name} pack`}
        description={`${list.length} words for essays and speaking answers about ${pack.blurb.toLowerCase()}.`}
      />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border p-5" style={{ background: `${pack.color}0d`, borderColor: `${pack.color}33` }}>
          <span className="grid size-12 shrink-0 place-items-center rounded-xl text-lg font-extrabold text-white" style={{ background: pack.color }}>
            {list.length}
          </span>
          <p className="flex-1 text-sm text-muted">
            Drill only these words. Due words come first, then any you have not met.
          </p>
          <Link
            href={{ pathname: "/word-coach/practice", query: { topic: pack.id } }}
            className="rounded-xl px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: pack.color }}
          >
            Practise this pack
          </Link>
        </div>

        <div className="mt-6 space-y-2">
          {list.map((w) => <WordCard key={w.id} word={w} />)}
        </div>

        <div className="mt-8 flex justify-between border-t border-line pt-6 text-sm font-semibold">
          <Link href="/word-coach" className="text-muted hover:text-brand">← All packs</Link>
          <Link href={`/word-coach/packs/${next.id}`} className="text-brand hover:text-brand-hover">{next.name} pack →</Link>
        </div>
      </div>
    </>
  );
}
