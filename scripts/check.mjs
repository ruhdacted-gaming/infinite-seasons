// Sanity checks for seasons.js. Run before every deploy; exits 1 on any error.
// Catches the mistakes an automated update could make: bad dates, gaps, overlaps, missing sources.
import { readFileSync, readdirSync } from "node:fs";

const window = {};
for (const f of ["seasons.js", "render.js"]) new Function("window", readFileSync(f, "utf8"))(window);
const data = window.SEASON_DATA, S = window.Seasons;

const errors = [];
const bad = (where, msg) => errors.push(`${where}: ${msg}`);
// A UTC ISO date or time that round-trips, so impossible dates like Feb 30 fail.
const valid = s => {
  if (s == null) return true;
  const m = /^(\d{4}-\d{2}-\d{2})(?:T(\d{2}:\d{2})(:\d{2})?(\.\d+)?Z)?$/.exec(s);
  if (!m || isNaN(S.parseT(s))) return false;
  const iso = new Date(S.parseT(s)).toISOString();
  return iso.slice(0, 10) === m[1] && (!m[2] || iso.slice(11, 16) === m[2]);
};
const CONFIDENCE = ["official", "secondary", "conflicting"];

if (!/^\d{4}-\d{2}-\d{2}$/.test(data.verified) || !valid(data.verified) || S.parseT(data.verified) > Date.now() + S.DAY) bad("verified", `bad date ${data.verified}`);

// Every researched game must still be there, once, with seasons.
const ids = data.games.map(g => g.id);
for (const f of readdirSync("research").filter(f => f.endsWith(".json"))) {
  const id = f.slice(0, -5);
  if (ids.filter(x => x === id).length !== 1) bad(id, `appears ${ids.filter(x => x === id).length} times in seasons.js`);
}
for (const g of data.games) {
  if (!g.seasons?.length) bad(g.id, "has no seasons");
  (g.seasons || []).forEach((s, i) => {
    const at = `${g.id} S${s.season}`, prev = g.seasons[i - 1];
    for (const k of ["start", "end", "endEstimate"]) if (!valid(s[k])) bad(at, `${k} is not a UTC ISO date: ${s[k]}`);
    if (!s.start) bad(at, "missing start");
    if (prev && s.season !== prev.season + 1) bad(at, `follows S${prev.season}`);
    if (prev && S.parseT(s.start) <= S.parseT(prev.start)) bad(at, "starts before the previous season");
    // Ends and starts can share a day; anything more is an overlap.
    if (prev?.end && S.parseT(s.start) < S.parseT(prev.end) - S.DAY) bad(at, `starts before S${prev.season} ends`);
    const len = S.lengthDays(s);
    if (len != null && (len < 14 || len > 400)) bad(at, `length ${len} days`);
    if (s.end && s.endEstimate) bad(at, "has both end and endEstimate");
    if (s.endEstimate) {
      const est = Math.round((S.parseT(s.endEstimate) - S.parseT(s.start)) / S.DAY);
      if (!(est >= 14 && est <= 400)) bad(at, `endEstimate is ${est} days after start`);
    }
    if (!CONFIDENCE.includes(s.confidence)) bad(at, `confidence "${s.confidence}"`);
    if (!s.sources?.length || !s.sources.every(u => /^https:\/\//.test(u))) bad(at, "needs https sources");
    for (const e of s.events || []) if (!e.label || !valid(e.start) || !valid(e.end)) bad(at, `bad event ${JSON.stringify(e)}`);
  });
}

if (errors.length) {
  console.error(`seasons.js has ${errors.length} problem(s):\n  ` + errors.join("\n  "));
  process.exit(1);
}
console.log(`seasons.js OK: ${data.games.map(g => `${g.id} ${g.seasons.length}`).join(", ")}`);
