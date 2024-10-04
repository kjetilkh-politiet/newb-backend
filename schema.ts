import { serial, text, mysqlTable } from "drizzle-orm/mysql-core";
export const user = mysqlTable("user", {
	id: serial("id"),
	email: text("email"),
	firstName: text("first_name"),
	lastName: text("last_name"),
});
