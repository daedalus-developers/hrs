import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import Hono from "hono";
import { streamSSE } from "hono/streaming";

// TODO: Generate open api spec

const getTimeSpec = createRoute({
  description: "Server time endpoint.",
  tags: ["Time"],
  method: "get",
  path: "time",
  responses: {
    200: {
      content: {
        "appication/octet-stream": {
          schema: z.any(),
        },
      },
      description: "Success",
    },
  },
});

const time = new OpenAPIHono().get("/time", async (c) => {
  return streamSSE(c, async (stream) => {
    while (true) {
      const message = `${new Date().toISOString()}`;
      await stream.writeSSE({
        data: message,
        event: "current-time",
        id: "current-time",
      });
      await stream.sleep(1000);
    }
  });
});

export { time };
