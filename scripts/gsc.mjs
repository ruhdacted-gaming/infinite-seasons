// Google Search Console from the command line, through a service account. No dependencies.
//   node scripts/gsc.mjs [queries|pages|countries] [days]   search traffic (default: queries, 28 days)
//   node scripts/gsc.mjs inspect [url...]                    index status (default: every sitemap URL)
//   node scripts/gsc.mjs sitemaps                            list submitted sitemaps
//   node scripts/gsc.mjs submit                              submit /sitemap.xml
// The key is a service-account JSON file kept outside the repo, at GSC_KEY_FILE or
// ~/.config/infinite-seasons/gsc-key.json. The service account must be a user on the property.
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { sign } from "node:crypto";

const SITE = "sc-domain:infiniteseasons.com", ORIGIN = "https://infiniteseasons.com";
const KEY_FILE = process.env.GSC_KEY_FILE || join(homedir(), ".config", "infinite-seasons", "gsc-key.json");
const API = "https://searchconsole.googleapis.com";
const site = encodeURIComponent(SITE);

const COMMANDS = ["queries", "pages", "countries", "inspect", "sitemaps", "submit"];
const [cmd = "queries", ...args] = process.argv.slice(2);
if (!COMMANDS.includes(cmd)) { console.error(`Unknown command "${cmd}". See the top of scripts/gsc.mjs.`); process.exit(1); }

let key;
try { key = JSON.parse(readFileSync(KEY_FILE, "utf8")); }
catch { console.error(`No service-account key at ${KEY_FILE}. See "Search Console" in CLAUDE.md.`); process.exit(1); }

// Service-account OAuth: a signed JWT exchanged for an access token.
const b64 = x => Buffer.from(typeof x === "string" ? x : JSON.stringify(x)).toString("base64url");
const iat = Math.floor(Date.now() / 1000);
const unsigned = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({
  iss: key.client_email, scope: "https://www.googleapis.com/auth/webmasters",
  aud: "https://oauth2.googleapis.com/token", iat, exp: iat + 3600,
})}`;
const jwt = `${unsigned}.${sign("RSA-SHA256", Buffer.from(unsigned), key.private_key).toString("base64url")}`;
// Errors set the exit code instead of exiting: process.exit right after fetch crashes Node on Windows.
run().catch(e => { console.error(e.message); process.exitCode = 1; });

async function run() {
  const tok = await (await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: jwt }),
  })).json();
  if (!tok.access_token) throw new Error(`Token request failed: ${JSON.stringify(tok)}`);

  async function api(path, { method = "GET", body } = {}) {
    const r = await fetch(API + path, {
      method, body: body && JSON.stringify(body),
      headers: { authorization: `Bearer ${tok.access_token}`, "content-type": "application/json" },
    });
    const text = await r.text();
    if (!r.ok) throw new Error(`${r.status} ${path}: ${text.slice(0, 300)}`);
    return text ? JSON.parse(text) : {};
  }

  const day = d => new Date(Date.now() - d * 864e5).toISOString().slice(0, 10);

  if (["queries", "pages", "countries"].includes(cmd)) {
    const days = Number(args[0]) || 28, dim = { queries: "query", pages: "page", countries: "country" }[cmd];
    // dataState "all" includes the last day or two, which Search Console otherwise holds back.
    const { rows = [] } = await api(`/webmasters/v3/sites/${site}/searchAnalytics/query`, { method: "POST", body: {
      startDate: day(days), endDate: day(0), dimensions: [dim], rowLimit: 50, dataState: "all",
    } });
    console.log(`${cmd}, last ${days} days: ${rows.length} rows`);
    console.table(rows.map(r => ({
      [dim]: r.keys[0].replace(ORIGIN, ""), clicks: r.clicks, impressions: r.impressions,
      ctr: `${(r.ctr * 100).toFixed(1)}%`, position: +r.position.toFixed(1),
    })));
  } else if (cmd === "inspect") {
    const urls = args.length ? args.map(u => u.startsWith("http") ? u : ORIGIN + u)
      : [...(await (await fetch(`${ORIGIN}/sitemap.xml`)).text()).matchAll(/<loc>([^<]+)/g)].map(m => m[1]);
    const out = [];
    for (const url of urls) {
      const { inspectionResult: { indexStatusResult: s } } = await api("/v1/urlInspection/index:inspect", {
        method: "POST", body: { inspectionUrl: url, siteUrl: SITE },
      });
      out.push({ url: url.replace(ORIGIN, "") || "/", verdict: s.verdict, coverage: s.coverageState, lastCrawl: s.lastCrawlTime?.slice(0, 10) || "" });
    }
    console.table(out);
  } else if (cmd === "sitemaps") {
    const { sitemap = [] } = await api(`/webmasters/v3/sites/${site}/sitemaps`);
    console.table(sitemap.map(s => ({
      path: s.path, submitted: s.lastSubmitted?.slice(0, 10), downloaded: s.lastDownloaded?.slice(0, 10),
      urls: s.contents?.[0]?.submitted, errors: s.errors, warnings: s.warnings, pending: s.isPending,
    })));
  } else {
    await api(`/webmasters/v3/sites/${site}/sitemaps/${encodeURIComponent(`${ORIGIN}/sitemap.xml`)}`, { method: "PUT" });
    console.log(`Submitted ${ORIGIN}/sitemap.xml`);
  }
}
