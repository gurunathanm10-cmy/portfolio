import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

// Vercel serverless function export
export default {
  async fetch(request: Request, env: unknown = {}, ctx: unknown = {}) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};

// For local development with Node.js
if (typeof process !== "undefined" && process.env.NODE_ENV === "development") {
  const { createServer } = await import("http");
  const handler = await getServerEntry();

  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url || "", `http://${req.headers.host}`);
      const request = new Request(url.toString(), {
        method: req.method,
        headers: req.headers as any,
        body: req.method !== "GET" && req.method !== "HEAD" ? req : undefined,
      });

      const response = await handler.fetch(request, {}, {});
      const normalizedResponse = await normalizeCatastrophicSsrResponse(response);

      res.statusCode = normalizedResponse.status;
      for (const [key, value] of normalizedResponse.headers) {
        res.setHeader(key, value);
      }

      const body = normalizedResponse.body;
      if (body) {
        const reader = body.getReader();
        const stream = new ReadableStream({
          start(controller) {
            function pump() {
              reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close();
                  res.end();
                  return;
                }
                controller.enqueue(value);
                res.write(Buffer.from(value));
                pump();
              });
            }
            pump();
          },
        });
      } else {
        res.end();
      }
    } catch (error) {
      console.error(error);
      res.statusCode = 500;
      res.setHeader("content-type", "text/html; charset=utf-8");
      res.end(renderErrorPage());
    }
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}
