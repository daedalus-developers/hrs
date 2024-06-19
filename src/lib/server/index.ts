import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { hello } from "./routes/hello";
import { healthceck } from "./routes/healthcheck";
import { time } from "./routes/time";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { showRoutes } from "hono/dev";

const app = new OpenAPIHono()
  .doc("/api/docs", {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Hotel Reservation System API",
    },
  })
  .get("/api/docs/ui", swaggerUI({ url: "/api/docs", spec: "spec" }))
  .use(
    "*",
    cors({
      origin: ["http://localhost:3000"],
      maxAge: 600,
      credentials: true,
    }),
  )
  .use("/api/*", prettyJSON())
  .use("/api/*", logger())
  .notFound((c) => c.json({ message: "Not Found", ok: false }, 404))
  .route("/api", hello)
  .route("/api", healthceck)
  .route("/api", time);

showRoutes(app);

export type AppType = typeof app;

export { app };
