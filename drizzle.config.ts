import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./db/schemas/*.ts",
    out: "./db/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.AUTH_DRIZZLE_URL!,
    },
});