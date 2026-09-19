import { getDb } from "@/lib/mongodb";

/** Confirms the database is reachable. Returns no credentials or connection details. */
export async function GET() {
  try {
    const db = await getDb();
    await db.command({ ping: 1 });
    return Response.json({ ok: true, database: db.databaseName });
  } catch (error) {
    console.error("MongoDB check failed:", error);
    const notConfigured = error instanceof Error && error.message.startsWith("MongoDB is not configured");
    return Response.json(
      { ok: false, error: notConfigured ? "MongoDB is not configured. Add MONGODB_HOST to .env.local." : "Could not connect to MongoDB." },
      { status: 503 },
    );
  }
}
