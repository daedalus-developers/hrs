import { Lucia, User } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { sessions, users } from "@schemas/user";
import { db } from "./db";
import { SelectUser } from "@types";
import { cookies } from "next/headers";
import { cache } from "react";

export const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attrs) => {
    return {
      id: attrs.id,
      lastName: attrs.lastName,
      firstName: attrs.firstName,
      email: attrs.email,
      emailVerified: attrs.emailVerified,
      role: attrs.role,
      createdAt: attrs.createdAt,
      updatedAt: attrs.updatedAt,
    };
  },
});

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: SelectUser;
  }
}

export const getUser = cache(
  async (): Promise<{ user: User | null }> => {

    const sessionId = cookies().get(lucia.sessionCookieName)?.value;

    if (!sessionId) return { user: null };

    const { user } = await lucia.validateSession(sessionId);

    return { user: user };
  },
);
