// Single Prisma instance; in dev we cache it on global to avoid multiple clients across hot reloads.

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";
import { withOptimize } from "@prisma/extension-optimize";

const prismaClientSingleton = () => {
  // Use fallback so module load (e.g. during build) does not throw; first query will fail if DATABASE_URL is missing at runtime.
  const connectionString =
    process.env.DATABASE_URL ?? "postgresql://localhost:5432/placeholder";
  const adapter = new PrismaPg({ connectionString });
  const client = new PrismaClient({ adapter });
  return client.$extends(
    withOptimize({ apiKey: process.env.OPTIMIZE_API_KEY ?? "" })
  );
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;
export * from "./generated/prisma/client";

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
