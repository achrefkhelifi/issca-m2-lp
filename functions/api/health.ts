import workerHandler, { type Env } from "../../worker/index";

export async function onRequest(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  return workerHandler.fetch(context.request, context.env);
}
