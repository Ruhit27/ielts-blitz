import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeading from "../../PageHeading";
import { postBySlug, posts } from "../../data";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/resources/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = postBySlug[slug];
  return p ? { title: `${p.title} — IELTS Masters`, description: p.summary } : {};
}

export default async function PostPage({ params }: PageProps<"/resources/blog/[slug]">) {
  const { slug } = await params;
  const post = postBySlug[slug];
  if (!post) notFound();

  return (
    <>
      <PageHeading title={post.title} description={post.summary} crumbs={[{ label: "Blog & Guides", href: "/resources/blog" }, { label: post.tag }]} />
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold text-muted">{post.minutes} min read</p>
        {post.sections.map((s) => (
          <section key={s.heading} className="mt-8">
            <h2 className="text-xl font-extrabold text-ink">{s.heading}</h2>
            {s.paragraphs.map((p) => (
              <p key={p} className="mt-3 leading-7 text-muted">{p}</p>
            ))}
          </section>
        ))}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-6">
          <p className="font-bold text-ink">Put it into practice.</p>
          <Link href="/resources/study-tips" className="rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-hover">Browse study tips</Link>
        </div>
      </article>
    </>
  );
}
