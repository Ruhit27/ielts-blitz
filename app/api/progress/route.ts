import { auth } from "@clerk/nextjs/server";
import { isValidDay, isWordId, loadProgress, recordAnswer, resetAll, resetWord, setGoal } from "@/lib/progress-db";

const unauthorized = () => Response.json({ error: "Sign in required." }, { status: 401 });
const bad = (error: string) => Response.json({ error }, { status: 400 });
const failed = (error: unknown) => {
  console.error("Progress request failed:", error);
  return Response.json({ error: "Progress is temporarily unavailable." }, { status: 503 });
};

export async function GET() {
  const { userId } = await auth();
  if (!userId) return unauthorized();
  try {
    return Response.json(await loadProgress(userId));
  } catch (e) {
    return failed(e);
  }
}

/** Records one answer. `opId` makes a retried request harmless. */
export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return unauthorized();
  const b = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!b || !isWordId(b.wordId) || typeof b.correct !== "boolean" || !isValidDay(b.date) || typeof b.opId !== "string" || b.opId.length > 64) {
    return bad("Invalid answer.");
  }
  try {
    await recordAnswer(userId, b.wordId, b.correct, b.date, b.opId);
    return Response.json({ ok: true });
  } catch (e) {
    return failed(e);
  }
}

export async function PUT(request: Request) {
  const { userId } = await auth();
  if (!userId) return unauthorized();
  const b = (await request.json().catch(() => null)) as { goal?: unknown } | null;
  if (typeof b?.goal !== "number" || !Number.isInteger(b.goal) || b.goal < 1 || b.goal > 500) return bad("Invalid goal.");
  try {
    await setGoal(userId, b.goal);
    return Response.json({ ok: true });
  } catch (e) {
    return failed(e);
  }
}

/** With ?wordId= resets one word; without it, all Word Coach progress. */
export async function DELETE(request: Request) {
  const { userId } = await auth();
  if (!userId) return unauthorized();
  const wordId = new URL(request.url).searchParams.get("wordId");
  if (wordId !== null && !isWordId(wordId)) return bad("Unknown word.");
  try {
    if (wordId) await resetWord(userId, wordId);
    else await resetAll(userId);
    return Response.json({ ok: true });
  } catch (e) {
    return failed(e);
  }
}
