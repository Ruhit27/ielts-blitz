import { SignInButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import PageHeading from "../PageHeading";
import { listRequests } from "@/lib/speaking-db";
import BookingForm from "./BookingForm";
import RequestList from "./RequestList";

export const metadata: Metadata = { title: "Book a Speaking Test — IELTS Masters" };

const steps = [
  ["Send a request", "Tell us when suits you and how to reach you."],
  ["We confirm", "We reply with the exact time and a meeting link."],
  ["Take the test", "A full 11–14 minute test with an examiner, then feedback on each criterion."],
];

export default async function BookPage() {
  const { userId } = await auth();
  const user = userId ? await currentUser() : null;
  const requests = userId ? await listRequests(userId) : [];
  const open = requests.find((r) => r.active);

  return (
    <>
      <PageHeading
        title="Book a speaking test"
        description="Take a realistic IELTS Speaking test with our team. Request a time and we will confirm it."
        crumbs={[{ label: "Book a test" }]}
      />
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_20rem] lg:px-8">
        <div className="space-y-8">
          {requests.length > 0 && <RequestList requests={requests} />}

          {!userId ? (
            <div className="rounded-2xl border border-line bg-white p-8 text-center">
              <p className="text-lg font-extrabold text-ink">Sign in to request a test</p>
              <p className="mt-1 text-sm text-muted">We use your account so we can find your request and reply to you.</p>
              <SignInButton forceRedirectUrl="/speaking/book">
                <button type="button" className="mt-5 cursor-pointer rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-hover">Sign in</button>
              </SignInButton>
            </div>
          ) : open ? (
            <p className="rounded-2xl border border-line bg-surface p-6 text-sm text-muted">
              You have an open request above. Once it is completed or cancelled you can book another test.
            </p>
          ) : (
            <BookingForm defaults={{ name: user?.fullName ?? "", email: user?.primaryEmailAddress?.emailAddress ?? "" }} />
          )}
        </div>

        <aside className="h-fit rounded-2xl border border-line bg-white p-6">
          <h2 className="text-sm font-extrabold tracking-[0.18em] text-brand">HOW IT WORKS</h2>
          <ol className="mt-4 space-y-4">
            {steps.map(([t, d], i) => (
              <li key={t} className="flex gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand text-xs font-extrabold text-white">{i + 1}</span>
                <span>
                  <span className="block font-bold text-ink">{t}</span>
                  <span className="block text-sm text-muted">{d}</span>
                </span>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </>
  );
}
