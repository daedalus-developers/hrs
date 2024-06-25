import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { ContextVars } from "@types";
import { lucia } from "@server/auth";

export const authMiddleware = createMiddleware<{ Variables: ContextVars }>(async (c, next) => {

  console.log("AT AUTH MIDDLEWARE \n")
  console.log(c)
  const sessionId = getCookie(c, lucia.sessionCookieName) ?? null

  if (!sessionId) {
    c.set("user", null)
    c.set("session", null)
    return next()
  }
  const { session, user } = await lucia.validateSession(sessionId);
  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie()
    c.header('Set-Cookie', sessionCookie.serialize(), { append: true });
  }
  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    c.header('Set-Cookie', sessionCookie.serialize(), { append: true });
  }

  c.set("user", user)
  c.set("session", session)
  return next();
})
