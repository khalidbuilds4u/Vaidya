import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

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

  // For direct PostgreSQL connections, use the driver adapter
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
