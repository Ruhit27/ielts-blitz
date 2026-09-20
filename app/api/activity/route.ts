import { auth } from "@clerk/nextjs/server";
import { parseEvent, recordEvent } from "@/lib/events-db";
import { isValidDay } from "@/lib/progress-db";

/** Records something the user finished (a reading or listening set, or a Word Coach session). Writing is recorded with the essay itself. */
export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Sign in required." }, { status: 401 });

  const b = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const event = b && isValidDay(b.date) && (b.kind === "reading" || b.kind === "listening" || b.kind === "words") ? parseEvent(b, b.date) : null;
  if (!event) return Response.json({ error: "Invalid activity." }, { status: 400 });

  try {
    await recordEvent(userId, event);
    return Response.json({ ok: true });
  } catch (e) {
    console.error("Activity request failed:", e);
    return Response.json({ error: "Activity is temporarily unavailable." }, { status: 503 });
  }
}
