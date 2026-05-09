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

async function sendNodeResponse(res: any, response: Response) {
  res.statusCode = response.status;
  response.headers.forEach((value, name) => {
    res.setHeader(name, value);
  });

  const body = response.body;
  if (!body) {
    res.end();
    return;
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  res.end(buffer);
}

export default async function handler(req: any, res: any) {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const request = new Request(url.toString(), {
      method: req.method,
      headers: req.headers as any,
      body: req.method !== "GET" && req.method !== "HEAD" ? req : undefined,
    });

    const response = await handleRequest(request);
    await sendNodeResponse(res, response);
  } catch (error) {
    console.error(error);
    const response = brandedErrorResponse();
    await sendNodeResponse(res, response);
  }
}
