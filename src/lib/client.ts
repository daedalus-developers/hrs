import { hc } from "hono/client";
import type { AppType } from "./server";

const { api } = hc<AppType>("http://localhost:3000");

type GetClientOptions = {
  fetch?: typeof globalThis.fetch;
  path?: string;
};

/**
 * @description getClient is a wrapper around hc that sets the base URL to http://localhost:3000 and the fetch function to globalThis.fetch.
 * @link https://hono.dev/guides/rpc
 * @param fetch - custom fetch function like fetch from sveltekit load function
 * @param token - JWT token
 */
function getClient({
  fetch = globalThis.fetch,
  path = "http://localhost:3000",
}: GetClientOptions = {}) {
  return hc<AppType>(path, { fetch });
}

export { type AppType, api, getClient };
