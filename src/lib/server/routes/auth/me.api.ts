import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { lucia } from "@server/auth";
import { responseSchema, selectUserSchema } from "@server/schemas";
import { ContextVars } from "@types";
import { authMiddleware } from "../auth.middleware";

const meSpec = createRoute({
  method: 'get',
  path: 'me',
  tags: ['Auth'],
  summary: 'Retrieve authorized user',
  middleware: [authMiddleware],
  responses: {
    200: {
      content: {
        "application/json": {
          schema: selectUserSchema
        },
      },
      description: 'Success',
    },
    401: {
      content: {
        "application/json": {
          schema: responseSchema
        },
      },
      description: 'Unauthorized',
    },

  }
})

const me = new OpenAPIHono<{ Variables: ContextVars }>().openapi(meSpec, async (c) => {
  if (!c.var.user) return c.json({ message: "Session invalid" }, 401)

  const { user } = await lucia.validateSession(c.var.session!.id);

  if (!user) return c.json({ message: "Session invalid" }, 401)

  const data = selectUserSchema.parse(user)
  return c.json(data, 200);
})

export { me }
