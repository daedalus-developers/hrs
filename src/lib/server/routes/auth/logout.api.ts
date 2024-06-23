import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { lucia } from "@server/auth";
import { getCookie, setCookie } from "hono/cookie";

const logoutSpec = createRoute({
  method: 'get',
  path: 'logout',
  tags: ['Auth'],
  summary: 'Logout user',
  responses: {
    200: {
      description: 'Success',
    },
  },
})

const logout = new OpenAPIHono().openapi(logoutSpec, async (c) => {
  const sessionId = getCookie(c, lucia.sessionCookieName);

  if (!sessionId) {
    return c.json({});
  }

  await lucia.invalidateSession(sessionId);

  const sessionCookie = lucia.createBlankSessionCookie();
  setCookie(c, sessionCookie.name, sessionCookie.value, {
    ...sessionCookie.attributes,
    sameSite: 'Strict',
  });

  return c.json({})
})

export { logout }
