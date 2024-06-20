import { Lucia, Session, User } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { sessions, users } from "@/schemas/user";
import { db } from "./db";
import { SelectUser } from "@/types/user";
import { cookies } from "next/headers";
import { cache } from "react";

export const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
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
      updatedAt: attrs.updatedAt
    };
  }

});

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: SelectUser;
  }
}

export const createSession = async (userId: string) => {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )
}

export const validateSession = cache(
  async (): Promise<{ session: Session | null; user: User | null }> => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value;

    if (!sessionId) return { session: null, user: null }

    const { session, user } = await lucia.validateSession(sessionId);

    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      )
    }

    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      )

    }
    return { session: session, user: user }
  }
)

export const invalidateSession = async () => {
  const { session } = await validateSession();
  if (!session) return

  await lucia.invalidateSession(session.id)

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )
}
