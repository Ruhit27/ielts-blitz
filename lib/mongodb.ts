import { MongoClient } from "mongodb";

function connectionString() {
  const direct = process.env.MONGODB_URI;
  if (direct) return direct;

  const { MONGODB_USERNAME: user, MONGODB_PASSWORD: pass, MONGODB_HOST: host } = process.env;
  if (user && pass && host) {
    // Encoded so special characters in the password can't break the URI.
    return `mongodb+srv://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${host}/?retryWrites=true&w=majority`;
  }

  throw new Error(
    "MongoDB is not configured. Set MONGODB_URI, or MONGODB_USERNAME, MONGODB_PASSWORD and MONGODB_HOST in .env.local.",
  );
}

// Cached on globalThis so dev hot-reloads reuse one connection instead of opening a new one each time.
const globalForMongo = globalThis as typeof globalThis & { _mongoClient?: Promise<MongoClient> };

export function getClient(): Promise<MongoClient> {
  if (!globalForMongo._mongoClient) {
    const promise = new MongoClient(connectionString(), { maxPoolSize: 10, maxIdleTimeMS: 60_000 }).connect();
    // A failed attempt must not be cached, or every later call would fail too.
    promise.catch(() => {
      globalForMongo._mongoClient = undefined;
    });
    globalForMongo._mongoClient = promise;
  }
  return globalForMongo._mongoClient;
}

export async function getDb() {
  const client = await getClient();
  return client.db(process.env.MONGODB_DB ?? "ielts-masters");
}
