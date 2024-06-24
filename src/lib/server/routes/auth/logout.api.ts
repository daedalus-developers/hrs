import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { lucia } from "@server/auth";
import { ContextVars } from "@types";
import { authMiddleware } from "../auth.middleware";

const logoutSpec = createRoute({
  method: 'get',
  path: 'logout',
  tags: ['Auth'],
  summary: 'Logout user',
  middleware: [authMiddleware],
  responses: {
    200: {
      description: 'Success',
    },
    401: {
      description: 'Unauthorized'
    }
  },
})

const logout = new OpenAPIHono<{ Variables: ContextVars }>().openapi(logoutSpec, async (c) => {
  if (!c.var.session) return c.json({ message: "Session invalid" }, 401)

  await lucia.invalidateSession(c.var.session.id);

  c.set("user", null);
  c.set("session", null);

  return c.json({})
})

export { logout }
