import { InsertUser } from "@/lib/types/user";
import { users } from "../schema/user";
import { db } from "../db";

export const insertUser = (user: InsertUser) => db.insert(users).values(user);
