import type { Metadata } from "next";
import Link from "next/link";
import PageHeading from "../PageHeading";
import Session from "./Session";
import { topicById, type TopicId } from "../data";
import { modeInfo, type Mode } from "../session";
import { DEFAULT_GOAL } from "../progress-store";

export const metadata: Metadata = { title: "Practice — Word Coach — IELTS Masters" };

const isTopic = (v: string | undefined): v is TopicId => !!v && v in topicById;
const isMode = (v: string | undefined): v is Mode => !!v && v in modeInfo;

export default async function PracticePage({ searchParams }: PageProps<"/word-coach/practice">) {
  const sp = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

  const topicParam = one(sp.topic);
  const modeParam = one(sp.mode);
  const limitParam = Number(one(sp.limit));

  const topic: TopicId | "all" = isTopic(topicParam) ? topicParam : "all";
  const mode: Mode | "mixed" = isMode(modeParam) ? modeParam : "mixed";
  const limit = Number.isFinite(limitParam) && limitParam > 0 ? Math.min(50, Math.round(limitParam)) : DEFAULT_GOAL;

  return (
    <>
      <PageHeading
        crumb="Practice"
        title={topic === "all" ? "Daily practice" : `${topicById[topic].name} pack`}
        description={
          mode === "mixed"
            ? "Words due for review come first, then new ones. The drill type adapts to how well you know each word."
            : `${modeInfo[mode].name} drill only. ${modeInfo[mode].instruction}`
        }
      />
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <Session topic={topic} mode={mode} limit={limit} />
        <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-line pt-6 text-sm">
          <span className="font-semibold text-muted">Drill one type:</span>
          {(Object.keys(modeInfo) as Mode[]).map((m) => (
            <Link
              key={m}
              href={{ pathname: "/word-coach/practice", query: { ...(topic !== "all" && { topic }), mode: m } }}
              className={`rounded-lg px-3 py-1.5 font-semibold transition-colors ${
                mode === m ? "bg-brand text-white" : "bg-surface text-muted hover:text-brand"
              }`}
            >
              {modeInfo[m].name}
            </Link>
          ))}
          {mode !== "mixed" && (
            <Link
              href={{ pathname: "/word-coach/practice", query: { ...(topic !== "all" && { topic }) } }}
              className="rounded-lg bg-surface px-3 py-1.5 font-semibold text-muted hover:text-brand"
            >
              Mixed
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
