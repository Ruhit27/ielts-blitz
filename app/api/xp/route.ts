import { auth } from "@clerk/nextjs/server";
import { ensureEntry } from "@/lib/league-db";

/** The signed-in user's XP. Also puts them on the league if they aren't there yet. */
export async function GET() {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Sign in required." }, { status: 401 });
  try {
    return Response.json(await ensureEntry(userId));
  } catch (e) {
    console.error("XP request failed:", e);
    return Response.json({ error: "XP is temporarily unavailable." }, { status: 503 });
  }
}
