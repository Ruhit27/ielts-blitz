import { auth } from "@clerk/nextjs/server";
import { importProgress } from "@/lib/progress-db";

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Sign in required." }, { status: 401 });
  try {
    const imported = await importProgress(userId, await request.json().catch(() => null));
    return Response.json({ ok: true, imported });
  } catch (e) {
    console.error("Progress import failed:", e);
    return Response.json({ error: "Progress is temporarily unavailable." }, { status: 503 });
  }
}
