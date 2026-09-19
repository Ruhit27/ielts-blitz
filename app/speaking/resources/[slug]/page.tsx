import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeading from "../../PageHeading";
import { articleBySlug, articles } from "../../data";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/speaking/resources/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = articleBySlug[slug];
  return a ? { title: `${a.title} — IELTS Masters`, description: a.summary } : {};
}

export default async function ArticlePage({ params }: PageProps<"/speaking/resources/[slug]">) {
  const { slug } = await params;
  const article = articleBySlug[slug];
  if (!article) notFound();

  return (
    <>
      <PageHeading title={article.title} description={article.summary} crumbs={[{ label: "Resources", href: "/speaking/resources" }, { label: article.tag }]} />
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold text-muted">{article.minutes} min read</p>
        {article.sections.map((s) => (
          <section key={s.heading} className="mt-8">
            <h2 className="text-xl font-extrabold text-ink">{s.heading}</h2>
            {s.paragraphs.map((p) => (
              <p key={p} className="mt-3 leading-7 text-muted">{p}</p>
            ))}
          </section>
        ))}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-6">
          <p className="font-bold text-ink">Try it with a real examiner.</p>
          <Link href="/speaking/book" className="rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-hover">Book a speaking test</Link>
        </div>
      </article>
    </>
  );
}
