import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { listeningTypes, typeById } from "../data";
import ListeningDrill from "../ListeningDrill";

export function generateStaticParams() {
  return listeningTypes.map((t) => ({ type: t.id }));
}

export async function generateMetadata({ params }: PageProps<"/listening/[type]">): Promise<Metadata> {
  const { type } = await params;
  const t = typeById[type];
  return { title: t ? `${t.name} — IELTS Listening — IELTS Masters` : "Not found" };
}

export default async function ListeningTypePage({ params }: PageProps<"/listening/[type]">) {
  const { type } = await params;
  const index = listeningTypes.findIndex((t) => t.id === type);
  if (index === -1) notFound();
  const t = listeningTypes[index];
  const prev = listeningTypes[index - 1];
  const next = listeningTypes[index + 1];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/listening" className="font-medium hover:text-brand">Listening</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-ink">{t.name}</span>
      </nav>

      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink">{t.name}</h1>
      <p className="mt-2 text-muted">{t.summary} <span className="font-semibold">{t.section}.</span></p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <section className="rounded-2xl border border-line bg-white p-5">
          <h2 className="text-sm font-extrabold tracking-[0.18em] text-brand">HOW TO APPROACH IT</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {t.tips.map((x) => <li key={x} className="flex gap-2"><span className="text-brand" aria-hidden="true">•</span>{x}</li>)}
          </ul>
        </section>
        <section className="rounded-2xl border border-line bg-white p-5">
          <h2 className="text-sm font-extrabold tracking-[0.18em] text-brand">WATCH OUT FOR</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {t.traps.map((x) => <li key={x} className="flex gap-2"><span className="text-brand" aria-hidden="true">•</span>{x}</li>)}
          </ul>
        </section>
      </div>

      <h2 className="mt-10 text-sm font-extrabold tracking-[0.18em] text-brand">TRY IT</h2>
      <div className="mt-3 rounded-2xl border border-line bg-white p-5 shadow-[0_4px_16px_rgba(17,24,39,0.06)] sm:p-7">
        <ListeningDrill type={t} />
      </div>

      <div className="mt-6 flex justify-between gap-4 text-sm font-semibold">
        {prev ? <Link href={`/listening/${prev.id}`} className="text-brand hover:text-brand-hover">← {prev.name}</Link> : <span />}
        {next && <Link href={`/listening/${next.id}`} className="text-brand hover:text-brand-hover">{next.name} →</Link>}
      </div>
    </div>
  );
}
