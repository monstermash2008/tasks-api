import { defineConfig } from "drizzle-kit";
import "dotenv/config";
import env from "./src/env.js";
export default defineConfig({
    schema: "./src/db/schema.ts",
    out: "./src/db/migrations",
    dialect: "sqlite",
    dbCredentials: {
        url: env.DATABASE_URL,
        token: env.DATABASE_AUTH_TOKEN,
    },
});
