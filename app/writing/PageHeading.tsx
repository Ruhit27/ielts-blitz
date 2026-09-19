import Link from "next/link";

export default function PageHeading({ title, description, crumb }: { title: string; description: string; crumb?: string }) {
  return (
    <div className="bg-surface">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {crumb && (
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted">
            <Link href="/writing" className="font-medium hover:text-brand">Writing</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-ink">{crumb}</span>
          </nav>
        )}
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">{description}</p>
      </div>
    </div>
  );
}
