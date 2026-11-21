import { createHmac } from "node:crypto";

/** Computes lowercase hex HMAC-SHA256 over exact UTF-8 payload bytes for T3 verifyWebhookSignature. */
export function signWebhookBody(rawBody, secret) {
  return createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
}

/** Sends a signed JSON POST to the T3 webhook, rejecting missing config, non-HTTPS URLs, redirects, and non-2xx. */
export async function postSignedWebhook({ url, secret, payload, fetchImpl = fetch, timeoutMs = 60_000 }) {
  if (!url || !secret) return { ok: false, error: "T3 webhook: T3_WEBHOOK_URL or T3_WEBHOOK_SECRET is not set" };
  if (!url.startsWith("https://")) return { ok: false, error: "T3 webhook: T3_WEBHOOK_URL must use https://" };
  const body = JSON.stringify(payload);
  const sig = signWebhookBody(body, secret);
  try {
    const r = await fetchImpl(url, {
      method: "POST",
      redirect: "error",
      signal: AbortSignal.timeout(timeoutMs),
      headers: { "content-type": "application/json", "x-t3-signature": `sha256=${sig}` },
      body,
    });
    return r.ok ? { ok: true, status: r.status } : { ok: false, status: r.status, error: `T3 webhook: ${r.status}` };
  } catch (err) {
    const msg = err instanceof Error ? (err.cause instanceof Error && err.cause.message ? `${err.message}: ${err.cause.message}` : err.message) : String(err);
    return { ok: false, error: `T3 webhook: ${msg}` };
  }
}
