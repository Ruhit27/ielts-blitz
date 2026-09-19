import { auth } from "@clerk/nextjs/server";
import { parseProfileInput } from "@/lib/profile";
import { getProfile, saveProfile } from "@/lib/profile-db";

const unauthorized = () => Response.json({ error: "Sign in required." }, { status: 401 });

export async function GET() {
  const { userId } = await auth();
  if (!userId) return unauthorized();
  try {
    return Response.json({ profile: await getProfile(userId) });
  } catch (error) {
    console.error("Profile read failed:", error);
    return Response.json({ error: "Could not load your profile." }, { status: 503 });
  }
}

export async function PUT(request: Request) {
  const { userId } = await auth();
  if (!userId) return unauthorized();

  const input = parseProfileInput(await request.json().catch(() => null));
  if (!input) return Response.json({ error: "Choose a goal band higher than your current level, and a timeframe." }, { status: 400 });

  try {
    return Response.json({ profile: await saveProfile(userId, input) });
  } catch (error) {
    console.error("Profile save failed:", error);
    return Response.json({ error: "Could not save your profile." }, { status: 503 });
  }
}
