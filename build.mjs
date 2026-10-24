// Builds the static site into dist/ for Cloudflare Workers static assets.
// Pages: / (all games), /{game} (hub), /{game}/season-{n} (one per announced season), /{game}/history.
// Season data comes from seasons.js; render.js is shared with the browser and the desktop widget.
import { mkdirSync, readFileSync, rmSync, writeFileSync, copyFileSync } from "node:fs";
import { dirname } from "node:path";
import * as pages from "./site/pages.mjs";

// Load seasons.js and render.js the way a browser would, with dates pre-rendered in Pacific time
// (how Blizzard and PD2 announce). live.js re-renders them in the reader's zone.
globalThis.window = { SEASONS_TZ: "America/Los_Angeles" };
for (const f of ["seasons.js", "render.js"]) new Function("window", readFileSync(f, "utf8"))(globalThis.window);
const data = window.SEASON_DATA, S = window.Seasons;
pages.init(S);

const now = Date.now();
rmSync("dist", { recursive: true, force: true });
const urls = [];

// path "/" -> dist/index.html, "/d2r" -> dist/d2r.html (served at /d2r by Workers assets).
function page(path, html, { sitemap = true } = {}) {
  const file = path === "/" ? "dist/index.html" : `dist${path}.html`;
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  if (sitemap) urls.push(pages.SITE + path);
}

page("/", pages.home(data, now));
for (const g of data.games) {
  page(`/${g.id}`, pages.hub(data, g, now));
  page(`/${g.id}/history`, pages.history(data, g, now));
  g.seasons.forEach((s, i) => page(`/${g.id}/season-${s.season}`, pages.season(data, g, i, now)));
}
page("/404", pages.notFound(data), { sitemap: false });

// The browser only needs each game's previous, current and next season, plus the typical length.
const slim = {
  verified: data.verified,
  games: data.games.map(g => {
    const v = S.view(g, now), i = g.seasons.findIndex(s => s.season === v.season);
    const { hubTitle, ...rest } = g;
    const keep = ({ season, name, start, end, endEstimate, note, events }) => ({ season, name, start, end, endEstimate, note, events });
    return { ...rest, typicalDays: S.typicalDays(g), seasons: g.seasons.slice(Math.max(0, i - 1), i + 2).map(keep) };
  }),
};
writeFileSync("dist/seasons.js", `window.SEASON_DATA = ${JSON.stringify(slim)};\n`);
for (const f of ["render.js", "cards.css"]) copyFileSync(f, `dist/${f}`);
for (const f of ["site.css", "live.js"]) copyFileSync(`site/${f}`, `dist/${f}`);

writeFileSync("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u}</loc><lastmod>${data.verified}</lastmod></url>`).join("\n")}
</urlset>
`);
writeFileSync("dist/robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${pages.SITE}/sitemap.xml\n`);

console.log(`Built ${urls.length} pages into dist/`);
