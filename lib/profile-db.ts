import "server-only";
import { collections } from "@/lib/collections";
import type { Profile, ProfileInput } from "@/lib/profile";

export async function getProfile(userId: string): Promise<Profile | null> {
  const { profiles } = await collections();
  return profiles.findOne({ userId }, { projection: { _id: 0 } });
}

export async function saveProfile(userId: string, input: ProfileInput): Promise<Profile> {
  const { profiles } = await collections();
  const now = new Date();
  const examDate = new Date(now);
  examDate.setMonth(examDate.getMonth() + input.timeframeMonths);
  await profiles.updateOne(
    { userId },
    {
      $set: { ...input, examDate: examDate.toISOString(), updatedAt: now.toISOString() },
      $setOnInsert: { createdAt: now.toISOString() },
    },
    { upsert: true },
  );
  return (await getProfile(userId))!;
}
