import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "mysql",
  schema: "./schema.ts",
  out: "./drizzle",
  dbCredentials: {
    host: "localhost",
    user: "root",
    database: "newb",
    password: "Bombe656..",
    port: 3306,
  },
});
