import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";

const getHealthcheckSpec = createRoute({
  description: "Healthceck endpoint.",
  tags: ["Greetings"],
  method: "get",
  path: "healthceck",
  responses: {
    200: {
      content: {
        "text/html": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
      description: "Success",
    },
  },
});

const healthceck = new OpenAPIHono().openapi(getHealthcheckSpec, (c) => {
  return c.text("OK", 200);
});

export { healthceck };
