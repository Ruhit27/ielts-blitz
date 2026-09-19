import "server-only";
import { collections } from "@/lib/collections";
import type { SpeakingInput, SpeakingRequest } from "@/lib/speaking";

const projection = { _id: 0, userId: 0 } as const;

export async function listRequests(userId: string): Promise<SpeakingRequest[]> {
  const { speaking } = await collections();
  return speaking.find({ userId }, { projection }).sort({ createdAt: -1 }).limit(20).toArray();
}

/** Returns null when the user already has an open request. */
export async function createRequest(userId: string, input: SpeakingInput): Promise<SpeakingRequest | null> {
  const { speaking } = await collections();
  const doc: SpeakingRequest = { ...input, id: crypto.randomUUID(), status: "requested", active: true, createdAt: new Date().toISOString() };
  try {
    await speaking.insertOne({ ...doc, userId });
    return doc;
  } catch (e) {
    if ((e as { code?: number }).code === 11000) return null;
    throw e;
  }
}

/** Only a still-pending request can be cancelled by the user. */
export async function cancelRequest(userId: string, id: string) {
  const { speaking } = await collections();
  const res = await speaking.updateOne({ userId, id, status: "requested" }, { $set: { status: "cancelled", active: false } });
  return res.modifiedCount === 1;
}
