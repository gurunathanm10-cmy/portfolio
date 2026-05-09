import "../src/lib/error-capture";
import { consumeLastCapturedError } from "../src/lib/error-capture";
import { renderErrorPage } from "../src/lib/error-page";
import { handleRequest } from "../src/server";

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export default async function handler(request: Request): Promise<Response> {
  try {
    return await handleRequest(request);
  } catch (error) {
    console.error(error);
    return brandedErrorResponse();
  }
}
