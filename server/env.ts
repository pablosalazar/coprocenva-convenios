import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL is required")
    .refine((url) => url.startsWith("mysql://"), {
      message: "DATABASE_URL must be a MySQL connection string",
    }),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

function createEnv() {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error(
      "Invalid environment variables:",
      parsed.error.flatten().fieldErrors,
    );
    throw new Error("Invalid environment variables");
  }

  return parsed.data;
}

export const env = createEnv();
