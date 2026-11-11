// Merge research/<game>.json into seasons.js.
// Season games: keeps each game's settings and the current season's hand-set fields (endEstimate, note, events).
// Roadmap games (research has "milestones"): keeps each milestone's site-only fields (page, pageTitle, summary).
// Usage: node research/merge.mjs d2r pd2 d3 d4 wow-forever
import { readFileSync, writeFileSync } from "node:fs";

const src = readFileSync("seasons.js", "utf8");
const header = src.slice(0, src.indexOf("window.SEASON_DATA"));
const window = {};
new Function("window", src)(window);
const data = window.SEASON_DATA;

function mergeSeasons(g, research) {
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
  return `${g.seasons.length} seasons`;
}

function mergeMilestones(g, research) {
  const old = Object.fromEntries((g.milestones || []).map(m => [m.id, m]));
  g.milestones = research.milestones.map(r => {
    const keep = old[r.id] || {};
    const m = { id: r.id, title: r.title, start: r.start ?? null };
    if (r.end) m.end = r.end;
    // An announced date replaces the roadmap window.
    if (!m.start && r.window) m.window = r.window;
    if (r.contents?.length) m.contents = r.contents;
    for (const k of ["page", "pageTitle", "summary"]) if (keep[k] != null) m[k] = keep[k];
    m.sources = r.sources || [];
    m.confidence = r.confidence;
    if (r.notes) m.research = r.notes;
    return m;
  });
  return `${g.milestones.length} milestones`;
}

for (const id of process.argv.slice(2)) {
  const g = data.games.find(x => x.id === id);
  if (!g) throw new Error(`${id} is not in seasons.js; add the game's settings there first`);
  const research = JSON.parse(readFileSync(`research/${id}.json`, "utf8"));
  console.log(`${id}: ${research.milestones ? mergeMilestones(g, research) : mergeSeasons(g, research)}`);
}

writeFileSync("seasons.js", header + "window.SEASON_DATA = " + JSON.stringify(data, null, 2) + ";\n");
