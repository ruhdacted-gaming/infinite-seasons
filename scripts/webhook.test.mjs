import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";
import { postSignedWebhook, signWebhookBody } from "./webhook.mjs";

test("postSignedWebhook signs exact outbound UTF-8 bytes and passes redirect:error", async () => {
  const secret = "test-secret-0123456789abcdef";
  const payload = { games: [{ id: "d4", reasons: ["due — café"] }], run: "https://github.com/o/r/actions/runs/1" };
  let seen;
  const res = await postSignedWebhook({
    url: "https://relay.example.com/hooks/test",
    secret,
    payload,
    fetchImpl: async (url, init) => {
      seen = { url, init };
      return new Response("accepted", { status: 202 });
    },
  });
  assert.deepEqual(res, { ok: true, status: 202 });
  assert.equal(seen.init.method, "POST");
  assert.equal(seen.init.redirect, "error");
  assert.ok(seen.init.signal);
  const expected = createHmac("sha256", Buffer.from(secret, "utf8")).update(Buffer.from(seen.init.body, "utf8")).digest("hex");
  assert.equal(seen.init.headers["x-t3-signature"], `sha256=${expected}`);
  assert.equal(signWebhookBody(seen.init.body, secret), expected);
});

test("postSignedWebhook rejects missing config, http URLs, and non-2xx responses", async () => {
  assert.equal((await postSignedWebhook({ url: "", secret: "s", payload: {} })).ok, false);
  assert.equal((await postSignedWebhook({ url: "https://example.com", secret: "", payload: {} })).ok, false);
  assert.equal((await postSignedWebhook({ url: "http://example.com", secret: "s", payload: {} })).ok, false);
  const fail = await postSignedWebhook({
    url: "https://example.com/hook",
    secret: "s",
    payload: {},
    fetchImpl: async () => new Response("unauthorized", { status: 401 }),
  });
  assert.deepEqual(fail, { ok: false, status: 401, error: "T3 webhook: 401" });
});

test("signWebhookBody matches pinned OpenSSL vector and postSignedWebhook includes fetch cause", async () => {
  // Independently verified with: printf '{"a":"café"}\n' | openssl dgst -sha256 -hmac "s" -hex
  assert.equal(signWebhookBody("{\"a\":\"café\"}\n", "s"), "992b8a35ac36c6a91bb17e1491596ded732bf0b8d6eaa3499113bb6c90b631f9");
  const fail = await postSignedWebhook({
    url: "https://example.com/hook",
    secret: "s",
    payload: {},
    fetchImpl: async () => { throw new TypeError("fetch failed", { cause: new Error("unexpected redirect") }); },
  });
  assert.equal(fail.ok, false);
  assert.match(fail.error, /unexpected redirect/);
});
