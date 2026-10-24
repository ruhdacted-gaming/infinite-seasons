// Builds the static site into dist/ for Cloudflare Workers static assets.
// The homepage is site/index.html; it shares seasons.js, render.js and cards.css with the
// desktop widget (widget.html). pSEO pages get generated here later.
import { mkdirSync, rmSync, writeFileSync, copyFileSync } from "node:fs";

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist");

copyFileSync("site/index.html", "dist/index.html");
for (const f of ["seasons.js", "render.js", "cards.css"]) copyFileSync(f, `dist/${f}`);
writeFileSync("dist/robots.txt", `User-agent: *\nAllow: /\n`);

console.log("Built dist/");
