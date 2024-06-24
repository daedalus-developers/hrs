import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { hello } from "./routes/hello";
import { healthceck } from "./routes/healthcheck";
import { time } from "./routes/time";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { showRoutes } from "hono/dev";
import { ContextVars } from "@types";
import { auth } from "./routes/auth";


const app = new OpenAPIHono<{ Variables: ContextVars }>()
  .doc("/api/docs", {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Hotel Reservation System API",
    },
  })
  .use(
    "*",
    cors({
      origin: ["http://localhost:3000"],
      maxAge: 600,
      credentials: true,
    })
  )
  .get("/api/docs/ui", swaggerUI({ url: "/api/docs", spec: "spec" }))
  .use("/api/*", prettyJSON())
  .use("/api/*", logger())
  .notFound((c) => c.json({ message: "Not Found", ok: false }, 404))
  .route("/api", hello)
  .route("/api", healthceck)
  .route("/api", time)
  .route("/api/auth", auth)

showRoutes(app);

export type AppType = typeof app;

export { app };
