import { Lucia } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { selectUserSchema, sessions, users } from "@schemas/user";
import { db } from "./db";
import { SelectUser } from "@types";
import { client } from "../client/hono";
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

/**
 * User references SelectUser references selectUserSchema references users (table)
 *
 * users (table) => selectUserSchema => SelectUser => User */

export const getUser = cache(async (): Promise<{ user: SelectUser | null }> => {
  const res = await client.api.auth.me.$get(
    {},
    {
      headers: {
        Cookie: cookies().get("auth-cookie")?.value ?? "",
      },
    },
  );
  if (!res.ok) return { user: null };
  const jsonData = await res.json();

  const user = selectUserSchema.parse(jsonData);
  return { user: user };
});
