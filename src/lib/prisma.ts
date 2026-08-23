import { PrismaClient } from "@prisma/client";

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

  return new PrismaClient({
    datasources: {
      db: {
        url: connectionString
      }
    }
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
