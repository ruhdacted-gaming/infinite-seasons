// Builds the static site into dist/ for Cloudflare Workers static assets.
// For now the site is the widget page plus seasons.js; pSEO pages get generated here later.
import { mkdirSync, readFileSync, rmSync, writeFileSync, copyFileSync } from "node:fs";

const SITE = "https://infiniteseasons.com";

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist");

const index = readFileSync("widget.html", "utf8")
  .replace("<title>Diablo Seasons</title>", [
    "<title>Diablo Season Countdowns: D2R, PD2, Diablo III, Diablo IV | Infinite Seasons</title>",
    '<meta name="description" content="Current season, start date, end date and live countdown for the D2R ladder, Project Diablo 2, Diablo III and Diablo IV. Estimated dates are marked as estimates.">',
    `<link rel="canonical" href="${SITE}/">`,
  ].join("\n"));
writeFileSync("dist/index.html", index);
copyFileSync("seasons.js", "dist/seasons.js");
writeFileSync("dist/robots.txt", `User-agent: *\nAllow: /\n`);

console.log("Built dist/");
