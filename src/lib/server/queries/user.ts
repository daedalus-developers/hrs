import { sql, eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../schema/user";

export const queryEmail = db.select().from(users).where(eq(users.email, sql.placeholder('email')));
