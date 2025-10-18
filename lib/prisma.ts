import { PrismaClient } from "@prisma/client";

declare global {
  // prevent multiple instances in dev
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "info", "warn", "error"] : ["error"],
    // Add connection timeout for Vercel deployment
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV === "development") global.prisma = prisma;
