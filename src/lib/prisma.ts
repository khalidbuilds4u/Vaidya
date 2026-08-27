import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  let connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    if (process.env.NODE_ENV === "production") {
      // Fallback for Vercel build step if env vars aren't loaded yet
      connectionString = "postgresql://postgres:dummy@localhost:5432/dummy";
    } else {
      throw new Error("DATABASE_URL is not set");
    }
  }

  // For Prisma Postgres (prisma+postgres:// URLs), use the accelerateUrl
  if (connectionString.startsWith("prisma+postgres://")) {
    return new PrismaClient({
      accelerateUrl: connectionString,
    });
  }

  // Strip Prisma-specific query parameters from the URL before passing to pg.Pool
  // because the pg library will pass them to the Postgres server, which will reject them.
  let pgConnectionString = connectionString;
  
  // Auto-correct invalid Supabase pooler hostnames if the user accidentally replaced 'aws' with their project name
  pgConnectionString = pgConnectionString.replace(
    /tourism2026-0-([a-z0-9-]+)\.pooler\.supabase\.com/,
    'aws-0-$1.pooler.supabase.com'
  );

  try {
    const url = new URL(pgConnectionString);
    url.searchParams.delete("pgbouncer");
    url.searchParams.delete("connection_limit");
    url.searchParams.delete("pool_timeout");
    pgConnectionString = url.toString();
  } catch (e) {
    // Ignore URL parsing errors
  }

  // For direct PostgreSQL connections, use the pg Pool.
  // Increase max to allow concurrent Next.js Server Components to fetch without queuing
  const pool = new Pool({ 
    connectionString: pgConnectionString, 
    max: 20,
    ssl: { rejectUnauthorized: false } // Required for Supabase transaction pooler
  });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
