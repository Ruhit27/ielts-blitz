import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Header from "../components/Header";
import { getProfile } from "@/lib/profile-db";
import OnboardingForm from "./OnboardingForm";

export default async function OnboardingPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const profile = await getProfile(userId);

  return (
    <>
      <Header />
      <main className="flex-1 bg-surface px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-extrabold tracking-[0.18em] text-brand">{profile ? "UPDATE YOUR PLAN" : "WELCOME"}</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {profile ? "Adjust your goal" : "Let's build your study plan"}
          </h1>
          <p className="mt-3 text-muted">Three quick questions so your dashboard fits your goal and your timeline.</p>
          <OnboardingForm
            initial={profile ? { goalBand: profile.goalBand, currentBand: profile.currentBand, timeframeMonths: profile.timeframeMonths } : null}
          />
        </div>
      </main>
    </>
  );
}
