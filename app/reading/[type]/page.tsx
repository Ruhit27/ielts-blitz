import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import { questionTypes } from "../data";
import QuestionDemo from "../QuestionDemo";

export function generateStaticParams() {
  return questionTypes.map((t) => ({ type: t.id }));
}

export async function generateMetadata({ params }: PageProps<"/reading/[type]">): Promise<Metadata> {
  const { type } = await params;
  const found = questionTypes.find((t) => t.id === type);
  return { title: found ? `${found.name} Questions — IELTS Reading — IELTS Masters` : "Not found" };
}

export default async function QuestionTypePage({ params }: PageProps<"/reading/[type]">) {
  const { type } = await params;
  const index = questionTypes.findIndex((t) => t.id === type);
  if (index === -1) notFound();

  const current = questionTypes[index];
  const prev = questionTypes[index - 1];
  const next = questionTypes[index + 1];

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <Link href="/reading" className="font-medium hover:text-brand">Reading</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-ink">{current.name}</span>
          </nav>

          <div className="mt-6 rounded-2xl border border-line bg-white p-5 shadow-[0_4px_16px_rgba(17,24,39,0.06)] sm:p-7">
            <QuestionDemo type={current} />
          </div>

          <div className="mt-6 flex justify-between gap-4 text-sm font-semibold">
            {prev ? (
              <Link href={`/reading/${prev.id}`} className="text-brand hover:text-brand-hover">← {prev.name}</Link>
            ) : <span />}
            {next && (
              <Link href={`/reading/${next.id}`} className="text-brand hover:text-brand-hover">{next.name} →</Link>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
