import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

// Prefer explicit runtime value
const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString }, { schema: "qwixx" });

export const db = new PrismaClient({ adapter });
