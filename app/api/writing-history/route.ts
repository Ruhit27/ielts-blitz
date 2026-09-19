import { auth } from "@clerk/nextjs/server";
import { isValidDay } from "@/lib/progress-db";
import { addEntries, clearEntries, listEntries } from "@/lib/writing-db";

const unauthorized = () => Response.json({ error: "Sign in required." }, { status: 401 });
const failed = (error: unknown) => {
  console.error("Writing history request failed:", error);
  return Response.json({ error: "Writing history is temporarily unavailable." }, { status: 503 });
};

export async function GET() {
  const { userId } = await auth();
  if (!userId) return unauthorized();
  try {
    return Response.json({ entries: await listEntries(userId) });
  } catch (e) {
    return failed(e);
  }
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return unauthorized();
  const b = (await request.json().catch(() => null)) as { entries?: unknown; day?: unknown } | null;
  if (!Array.isArray(b?.entries) || b.entries.length > 10) return Response.json({ error: "Invalid entries." }, { status: 400 });
  // `day` is optional: omitted when re-uploading old entries that shouldn't count as today's activity.
  if (b.day !== undefined && !isValidDay(b.day)) return Response.json({ error: "Invalid day." }, { status: 400 });
  try {
    return Response.json({ ok: true, added: await addEntries(userId, b.entries, (b.day as string | undefined) ?? null) });
  } catch (e) {
    return failed(e);
  }
}

export async function DELETE() {
  const { userId } = await auth();
  if (!userId) return unauthorized();
  try {
    await clearEntries(userId);
    return Response.json({ ok: true });
  } catch (e) {
    return failed(e);
  }
}
