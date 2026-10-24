// One-off: merge research/<game>.json season histories into seasons.js.
// Keeps each game's settings and the current season's hand-set fields (endEstimate, note, events).
// Usage: node research/merge.mjs d2r pd2 d3 d4
import { readFileSync, writeFileSync } from "node:fs";

const src = readFileSync("seasons.js", "utf8");
const header = src.slice(0, src.indexOf("window.SEASON_DATA"));
const window = {};
new Function("window", src)(window);
const data = window.SEASON_DATA;

for (const id of process.argv.slice(2)) {
  const g = data.games.find(x => x.id === id);
  const research = JSON.parse(readFileSync(`research/${id}.json`, "utf8"));
  const old = Object.fromEntries(g.seasons.map(s => [s.season, s]));
  g.seasons = research.seasons.map(r => {
    const keep = old[r.season] || {};
    const s = {
      season: r.season,
      name: r.name ?? null,
      start: r.start,
      end: r.end ?? null,
    };
    if (keep.endEstimate) s.endEstimate = keep.endEstimate;
    if (r.patch) s.patch = r.patch;
    if (r.theme) s.theme = r.theme;
    if (keep.note) s.note = keep.note;
    if (keep.events) s.events = keep.events;
    s.sources = r.sources || [];
    s.confidence = r.confidence;
    if (r.notes) s.research = r.notes;
    return s;
  });
  console.log(`${id}: ${g.seasons.length} seasons`);
}

writeFileSync("seasons.js", header + "window.SEASON_DATA = " + JSON.stringify(data, null, 2) + ";\n");
