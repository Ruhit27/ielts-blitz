import { auth } from "@clerk/nextjs/server";
import { collections } from "@/lib/collections";
import { isValidDay } from "@/lib/progress-db";

/** Counts a finished reading exercise toward the user's daily activity. */
export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Sign in required." }, { status: 401 });
  const b = (await request.json().catch(() => null)) as { kind?: unknown; date?: unknown } | null;
  if (b?.kind !== "reading" || !isValidDay(b.date)) return Response.json({ error: "Invalid activity." }, { status: 400 });
  try {
    const { days } = await collections();
    await days.updateOne({ userId, date: b.date }, { $inc: { reading: 1 } }, { upsert: true });
    return Response.json({ ok: true });
  } catch (e) {
    console.error("Activity request failed:", e);
    return Response.json({ error: "Activity is temporarily unavailable." }, { status: 503 });
  }
}
