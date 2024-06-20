import { eq } from "drizzle-orm";
import { db } from "../db";
import { verificationCodes } from "../schema/user";
import { InsertCode } from "@/lib/types/user";

export const insertCode = (code: InsertCode) => db.insert(verificationCodes).values(code);
export const deleteUserCode = (userId: string) => db.delete(verificationCodes).where(eq(verificationCodes.userId, userId)).returning();


