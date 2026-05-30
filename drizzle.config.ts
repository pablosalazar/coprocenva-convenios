import "dotenv/config";

import { defineConfig } from "drizzle-kit";

import { env } from "./server/env";

export default defineConfig({
  out: "./drizzle/migrations",
  schema: "./server/db/schema.ts",
  dialect: "mysql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
