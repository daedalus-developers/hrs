import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";

const hello = new OpenAPIHono();

const route = createRoute({
  description: "Description of Hello endpoint.",
  tags: ["Greetings"],
  method: "get",
  path: "/hello",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
      description: "Success",
    },
  },
});

hello.openapi(route, (c) => {
  return c.json({ message: "Hello from Next.js" }, 200);
});

export { hello };
