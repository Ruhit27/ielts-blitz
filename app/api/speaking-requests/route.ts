import { auth } from "@clerk/nextjs/server";
import { parseSpeakingInput } from "@/lib/speaking";
import { cancelRequest, createRequest, listRequests } from "@/lib/speaking-db";

const unauthorized = () => Response.json({ error: "Sign in required." }, { status: 401 });
const failed = (error: unknown) => {
  console.error("Speaking request failed:", error);
  return Response.json({ error: "Booking is temporarily unavailable. Please try again." }, { status: 503 });
};

export async function GET() {
  const { userId } = await auth();
  if (!userId) return unauthorized();
  try {
    return Response.json({ requests: await listRequests(userId) });
  } catch (e) {
    return failed(e);
  }
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return unauthorized();
  const input = parseSpeakingInput(await request.json().catch(() => null));
  if (typeof input === "string") return Response.json({ error: input }, { status: 400 });
  try {
    const created = await createRequest(userId, input);
    if (!created) return Response.json({ error: "You already have an open request. Cancel it or wait for our reply before sending another." }, { status: 409 });
    return Response.json({ request: created }, { status: 201 });
  } catch (e) {
    return failed(e);
  }
}

/** Cancels the user's own pending request. */
export async function DELETE(request: Request) {
  const { userId } = await auth();
  if (!userId) return unauthorized();
  const id = new URL(request.url).searchParams.get("id");
  if (!id || id.length > 64) return Response.json({ error: "Missing request id." }, { status: 400 });
  try {
    const ok = await cancelRequest(userId, id);
    return ok ? Response.json({ ok: true }) : Response.json({ error: "That request can no longer be cancelled." }, { status: 409 });
  } catch (e) {
    return failed(e);
  }
}
