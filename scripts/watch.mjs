// Daily season watcher. Runs in GitHub Actions; no AI.
// 1. Looks for new official posts (Blizzard news, PD2 news, PD2 wiki Seasons page edits)
//    and files each game's new ones as a `season-watch` issue.
// 2. Decides which games are due for a research run: new posts, a season change within
//    3 weeks, or more than a week since the last check (research/<game>.json "checked").
// 3. If any are due and T3_WEBHOOK_URL is set, calls the T3 webhook on the gaming PC, which
//    starts the research agent (automation/RUNBOOK.md).
// Without GITHUB_TOKEN it only prints what it found and writes nothing: `node scripts/watch.mjs`.
import { readFileSync } from "node:fs";

const window = {};
for (const f of ["seasons.js", "render.js"]) new Function("window", readFileSync(f, "utf8"))(window);
const data = window.SEASON_DATA, S = window.Seasons;
const now = Date.now(), DAY = S.DAY;
const { GITHUB_TOKEN, GITHUB_REPOSITORY, T3_WEBHOOK_URL, RUN_URL } = process.env;

const LOOKBACK = 14 * DAY; // posts older than this are history, not news
const NEAR = 21 * DAY;     // season change this close: re-check every 2 days instead of weekly
const UA = { "user-agent": "infiniteseasons.com season watcher (+https://infiniteseasons.com)" };
const BLIZZARD = { d4: "diablo-4", d3: "diablo-3", d2r: "diablo-2-resurrected" };
const RELEVANT = /season|ladder|ptr|patch|conclud|live|date/i;

async function getJSON(url, opts = {}) {
  const r = await fetch(url, { ...opts, headers: { ...UA, ...opts.headers } });
  if (!r.ok) throw new Error(`${r.status} ${url}: ${(await r.text()).slice(0, 200)}`);
  return r.json();
}

// Each source returns posts as { game, key, at, title, url }. The key changes when a post is edited.
const sources = {
  ...Object.fromEntries(Object.entries(BLIZZARD).map(([id, seg]) => [`Blizzard news (${id})`, async () => {
    // A game's feed also carries other games' posts; keep only its own.
    const j = await getJSON(`https://news.blizzard.com/en-us/api/feed/${seg}?offset=0`);
    return j.contentItems.map(c => c.properties)
      .filter(p => p.cxpProduct?.segment === seg && RELEVANT.test(p.title))
      .map(p => ({ game: id, key: `${p.newsUrl}#${p.lastUpdated}`, at: Date.parse(p.lastUpdated), title: p.title, url: p.newsUrl }));
  }])),
  "PD2 news": async () => {
    const j = await getJSON("https://api.projectdiablo2.com/social/article?$limit=10&$sort[created_at]=-1&$select[]=title&$select[]=updated_at");
    return j.data.map(a => {
      const url = `https://www.projectdiablo2.com/news/${a._id}`;
      return { game: "pd2", key: `${url}#${a.updated_at}`, at: Date.parse(a.updated_at), title: a.title, url };
    });
  },
  "PD2 wiki": async () => {
    const j = await getJSON("https://wiki.projectdiablo2.com/w/api.php?action=query&prop=revisions&titles=Seasons&rvprop=timestamp|ids&format=json");
    const rev = Object.values(j.query.pages)[0].revisions[0];
    return [{ game: "pd2", key: `pd2wiki#${rev.revid}`, at: Date.parse(rev.timestamp), title: "Seasons page edited",
      url: `https://wiki.projectdiablo2.com/w/index.php?title=Seasons&diff=${rev.revid}&oldid=${rev.parentid}` }];
  },
};

const github = (path, opts = {}) => getJSON(`https://api.github.com/repos/${GITHUB_REPOSITORY}${path}`, {
  ...opts,
  body: opts.body && JSON.stringify(opts.body),
  headers: { authorization: `Bearer ${GITHUB_TOKEN}`, accept: "application/vnd.github+json" },
});

// Fetch every source; a broken one fails the job at the end (so GitHub emails) but doesn't stop the rest.
const failed = [], posts = [];
for (const [name, fn] of Object.entries(sources)) {
  try { posts.push(...(await fn()).filter(p => now - p.at < LOOKBACK)); }
  catch (e) { failed.push(`${name}: ${e.message}`); }
}

// Issues are the watcher's memory: each post key is recorded in an issue body.
const issues = [];
for (let page = 1; GITHUB_TOKEN; page++) {
  const batch = await github(`/issues?labels=season-watch&state=all&per_page=100&page=${page}`);
  issues.push(...batch);
  if (batch.length < 100) break;
}
const seen = new Set(issues.flatMap(i => [...(i.body || "").matchAll(/<!-- watch:(\S+) -->/g)].map(m => m[1])));
const open = {}; // game id -> open issue numbers
for (const i of issues) if (i.state === "open") for (const l of i.labels) (open[l.name] ||= []).push(i.number);

for (const g of data.games) {
  const fresh = posts.filter(p => p.game === g.id && !seen.has(p.key));
  if (!fresh.length) continue;
  const body = fresh.map(p => `- [${p.title}](${p.url}), ${new Date(p.at).toISOString().slice(0, 16).replace("T", " ")} UTC <!-- watch:${p.key} -->`).join("\n");
  console.log(`New ${g.id} posts:\n${body}`);
  if (!GITHUB_TOKEN) continue;
  const issue = await github("/issues", { method: "POST", body: {
    title: `${g.name}: new posts to check`,
    body: `New or edited posts that may change season dates. The research agent checks them and closes this issue.\n\n${body}`,
    labels: ["season-watch", g.id],
  } });
  (open[g.id] ||= []).push(issue.number);
}

// Which games need a research run, and why.
const due = data.games.map(g => {
  const checked = S.parseT(JSON.parse(readFileSync(`research/${g.id}.json`, "utf8")).checked);
  // A missing or broken "checked" date counts as never checked.
  const age = checked <= now ? Math.floor((now - checked) / DAY) : Infinity;
  const v = S.view(g, now), end = S.endOf(v);
  const change = Math.min(end ? end.t : Infinity, v.next ? S.parseT(v.next.start) : Infinity);
  const reasons = [];
  if (open[g.id]) reasons.push(`new posts in ${open[g.id].map(n => `#${n}`).join(", ")}`);
  if (change - now < NEAR && age >= 2) reasons.push(`season change due around ${new Date(change).toISOString().slice(0, 10)}`);
  if (age >= 7) reasons.push(age === Infinity ? "no valid checked date" : `last checked ${age} days ago`);
  return { id: g.id, name: g.name, reasons, issues: open[g.id] || [] };
}).filter(g => g.reasons.length);

console.log(due.length ? `Due:\n${due.map(g => `- ${g.id}: ${g.reasons.join("; ")}`).join("\n")}` : "Nothing due.");

if (due.length && T3_WEBHOOK_URL && GITHUB_TOKEN) {
  const r = await fetch(T3_WEBHOOK_URL, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ games: due, run: RUN_URL }) });
  console.log(`T3 webhook: ${r.status}`);
  if (!r.ok) failed.push(`T3 webhook: ${r.status}`);
}

if (failed.length) {
  console.error(`Failed:\n  ${failed.join("\n  ")}`);
  process.exitCode = 1;
}
