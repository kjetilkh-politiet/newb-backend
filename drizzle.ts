import * as schema from "./schema";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "newb",
  password: "Bombe656..",
  port: 3306,
});

export const db = drizzle(connection, { schema, mode: "default" });
