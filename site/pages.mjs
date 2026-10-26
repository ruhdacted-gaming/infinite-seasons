// HTML templates for the static site. build.mjs calls these with the season data.
// Every sentence that states a date is generated from seasons.js, so the copy can't drift from the data.

export const SITE = "https://infiniteseasons.com";

// `S` is window.Seasons from render.js, loaded by build.mjs with the display zone fixed to Pacific.
let S;
export function init(seasons) { S = seasons; }

const esc = s => S.esc(s);

// A date the reader's browser re-renders in their own zone (live.js). Calendar-only dates stay as-is.
function when(s) {
  return s ? `<time datetime="${esc(s)}"${S.isDateOnly(s) ? "" : " data-local"}>${S.fmtDay(s)}</time>` : "";
}

const seasonPath = (g, s) => `/${g.id}/season-${s.season}`;
const seasonLabel = (g, s) => `${g.prefix} ${s.season}`;
const days = n => `${n} day${n === 1 ? "" : "s"}`;

// End-date phrase for prose. Estimates always carry "~" and <em>.
function endPhrase(g, v) {
  const end = S.endOf(v);
  if (!end) return "No end date has been announced.";
  if (!end.est) return `It ${end.t < Date.now() ? "ended" : "ends"} on ${when(v.end)}.`;
  const date = `<em>~${S.fmtDate.format(end.t)}</em>`;
  if (v.endEstimate) return `${cap(g.publisher)} hasn't announced an end date. Our estimate is ${date}: ${esc(v.note || "")}`;
  return `${cap(g.publisher)} hasn't announced an end date. ${estimateBasis(g, v)}, so we estimate it ends around ${date}.`;
}

function estimateBasis(g, v) {
  const finished = (g.seasons || []).filter(s => S.lengthDays(s) != null).length;
  return finished >= 3
    ? `Recent seasons have lasted ${days(v.typicalDays)} (the median of the last ${Math.min(6, finished)} finished seasons)`
    : `Seasons usually last about ${days(v.typicalDays)}`;
}

const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const notPublished = g => `<span title="${esc(cap(g.publisher))} didn't publish an exact end date">Not published</span>`;

// ---------- layout ----------

export function layout({ title, description, path, body, game, crumbs, data, noindex }) {
  const url = SITE + path;
  const ld = crumbs ? `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: crumbs.map(([name, p], i) => ({ "@type": "ListItem", position: i + 1, name, item: SITE + p })),
  })}</script>` : "";
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`}
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Infinite Seasons">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta name="theme-color" content="#0d0b0a">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%230d0b0a'/%3E%3Ctext x='16' y='23' font-family='Georgia,serif' font-size='22' font-weight='700' text-anchor='middle' fill='%23d8b56a'%3E%E2%88%9E%3C/text%3E%3C/svg%3E">
<link rel="stylesheet" href="/cards.css">
<link rel="stylesheet" href="/site.css">
${ld}
</head>
<body>
<header class="site-header">
  <div class="wrap">
    <a class="wordmark" href="/">Infinite <span>Seasons</span></a>
    <nav aria-label="Games">${data.games.map(g =>
      `<a href="/${g.id}" style="--accent:${esc(g.accent)}"${game && game.id === g.id ? ' aria-current="page"' : ""}>${esc(g.tag)}</a>`).join("")}</nav>
  </div>
</header>
<main class="wrap">
${crumbs ? `<nav class="crumbs" aria-label="Breadcrumb">${crumbs.map(([name, p], i) =>
  i === crumbs.length - 1 ? esc(name) : `<a href="${p}">${esc(name)}</a> › `).join("")}</nav>` : ""}
${body}
</main>
${footer(data, game)}
<script src="/seasons.js"></script>
<script src="/render.js"></script>
<script src="/live.js"></script>
</body>
</html>
`;
}

function footer(data, game) {
  const games = game ? [game] : data.games;
  const links = games.filter(g => g.link).map(g =>
    `<a href="${esc(g.link)}" target="_blank" rel="noopener">${esc(g.tag)} (${esc(S.hostOf(g.link))})</a>`).join(" · ");
  return `<footer class="site-footer">
  <div class="wrap">
    <p class="checked" id="checked" data-verified="${esc(data.verified)}" hidden></p>
    <p>How end dates work: if the developer has announced an end date, that date is shown. If not, we show an estimate marked <em>~</em> in orange: either a date reported but not yet confirmed (for example from in-game data), or the start date plus the median length of that game's recent seasons. Estimates are never official. Dates are shown in your local time zone.</p>
    <p class="sources">Sources: ${links}</p>
    <p class="fine">Infinite Seasons is an independent fan project and is not affiliated with Blizzard Entertainment or the Project Diablo 2 team. Data checked ${S.fmtDay(data.verified)}.</p>
  </div>
</footer>`;
}

// Cards are pre-rendered for crawlers and re-rendered live by live.js.
function cards(games, now, href, extraClass = "") {
  return `<section class="cards ${extraClass}" data-cards="${games.map(g => g.id).join(",")}" data-href="${href}" aria-label="Current seasons">${
    games.map(g => S.card(g, now, { headingTag: "h2", href: hrefFn(href) })).join("")}</section>`;
}
const hrefFn = tpl => g => tpl.replace("{id}", g.id).replace("{n}", g.season);

function seasonTable(g, list, now) {
  const cur = S.view(g, now);
  return `<div class="table-wrap"><table class="seasons">
<thead><tr><th>Season</th><th>Name</th><th>Start</th><th>End</th><th class="num">Length</th></tr></thead>
<tbody>${list.map(s => {
    const len = S.lengthDays(s);
    const isCur = s.season === cur.season;
    const end = s.end ? when(s.end) : isCur ? (() => {
      const e = S.endOf({ ...s, typicalDays: cur.typicalDays });
      return e ? `<em>~${S.fmtDate.format(e.t)}</em>` : "TBA";
    })() : S.parseT(s.start) <= now ? notPublished(g) : "TBA";
    const lenCell = len != null ? days(len) : isCur && S.parseT(s.start) <= now
      ? `${days(Math.floor((now - S.parseT(s.start)) / S.DAY) + 1)} so far` : "";
    return `<tr${isCur ? ' class="current"' : ""}><td><a href="${seasonPath(g, s)}">Season ${s.season}</a></td><td class="name">${esc(s.name || "")}</td><td>${when(s.start)}</td><td>${end}</td><td class="num">${lenCell}</td></tr>`;
  }).join("\n")}</tbody></table></div>`;
}

function sourcesList(urls) {
  urls = [...new Set(urls || [])];
  if (!urls.length) return "";
  return `<section class="block"><h2>Sources</h2><ul class="sources-list">${urls.map(u =>
    `<li><a href="${esc(u)}" target="_blank" rel="noopener">${esc(u)}</a></li>`).join("")}</ul></section>`;
}

// ---------- pages ----------

export function home(data, now) {
  return layout({
    data, path: "/",
    title: "Diablo Season Countdowns: D2R, PD2, Diablo III, Diablo IV | Infinite Seasons",
    description: "Current season, start date, end date and live countdown for the D2R ladder, Project Diablo 2, Diablo III and Diablo IV. Estimated dates are marked as estimates.",
    body: `<section class="hero">
    <h1>When does the current Diablo season end?</h1>
    <p>Live countdowns for the Diablo II: Resurrected ladder, Project Diablo&nbsp;2, Diablo&nbsp;III and Diablo&nbsp;IV. Estimates are marked <em>~</em> in orange; every other date is confirmed.</p>
    <p class="meta">Data checked ${S.fmtDay(data.verified)}</p>
  </section>
  ${cards(data.games, now, "/{id}")}`,
  });
}

export function hub(data, g, now) {
  const v = S.view(g, now);
  const n = v.season;
  const title = g.hubTitle.replace("{n}", n);
  const recent = [...g.seasons].reverse().slice(0, 6);
  const nextN = n + 1;
  const nextText = v.next
    ? `<p>${esc(seasonLabel(g, v.next))}${v.next.name ? ` (${esc(v.next.name)})` : ""} has been announced and starts on ${when(v.next.start)}.</p>`
    : `<p>${esc(g.prefix)} ${nextN} has not been announced yet. We add it as soon as ${esc(g.publisher)} confirms a date.</p>${gapSentence(g)}`;
  return layout({
    data, game: g, path: `/${g.id}`,
    crumbs: [["Home", "/"], [g.tag, `/${g.id}`]],
    title: `${title} | Infinite Seasons`,
    description: `${seasonLabel(g, v)}${v.name ? ` (${v.name})` : ""} start date, end date and live countdown, plus every past ${g.game} season.`,
    body: `<header class="page-head">
    <h1>${esc(title)}</h1>
    <p>${esc(seasonLabel(g, v))}${v.name ? ` (${esc(v.name)})` : ""} started on ${when(v.start)}. ${endPhrase(g, v)}</p>
  </header>
  ${cards([g], now, "/{id}/season-{n}", "single-card")}
  <section class="block prose"><h2>Next season</h2>${nextText}</section>
  <section class="block"><h2>Recent seasons</h2>${seasonTable(g, recent, now)}
    <p class="more"><a href="/${g.id}/history">All ${g.seasons.length} seasons, with a chart of season lengths →</a></p></section>
  ${sourcesList(v.sources)}`,
  });
}

// "New seasons usually start N days after the previous one ends", if the data supports it.
function gapSentence(g) {
  const gaps = [];
  for (let i = 1; i < g.seasons.length; i++) {
    const a = g.seasons[i - 1], b = g.seasons[i];
    if (a.end && b.start) gaps.push(Math.round((S.parseT(b.start) - S.parseT(a.end)) / S.DAY));
  }
  const recent = gaps.slice(-6);
  if (recent.length < 3) return "";
  const m = S.median(recent);
  return `<p>${m <= 0
    ? "Recently, each new season has started as soon as the previous one ended."
    : `Recently, new seasons have started a median of ${days(m)} after the previous one ended.`}</p>`;
}

// Search snippet with the actual dates, worded for the season's state. Estimates carry "~" here too.
function seasonDescription(g, s, v, { label, isCur, started, len }) {
  const full = label + (s.name ? ` (${s.name})` : ""), start = S.fmtDay(s.start);
  const extra = s.theme ? " Dates, length and what's new." : " Dates and length.";
  if (!started) return `${full} starts on ${start}. Countdown and start time in your time zone.`;
  if (len != null) return `${full} ran from ${start} to ${S.fmtDay(s.end)}, lasting ${days(len)}.${extra}`;
  if (!isCur) return `${full} started on ${start}. ${cap(g.publisher)} didn't publish an exact end date.${extra}`;
  const end = S.endOf(v);
  const ends = !end ? "No end date has been announced yet."
    : end.est ? `No end date announced yet; estimated end ~${S.fmtDate.format(end.t)}.`
    : `It ends on ${S.fmtDay(v.end)}.`;
  return `${full} started on ${start}. ${ends} Live countdown${s.theme ? " and what's new" : ""}.`;
}

export function season(data, g, i, now) {
  const s = g.seasons[i];
  const prev = g.seasons[i - 1], next = g.seasons[i + 1];
  const v = S.view(g, now);
  const isCur = s.season === v.season;
  const started = S.parseT(s.start) <= now;
  const len = S.lengthDays(s);
  const typical = v.typicalDays;
  const label = seasonLabel(g, s);
  const named = label + (s.name ? `: ${s.name}` : "");

  let lede;
  if (!started) lede = `${esc(label)} starts on ${when(s.start)}.`;
  else if (len != null) lede = `${esc(label)} started on ${when(s.start)} and ended on ${when(s.end)}, lasting ${days(len)}.`;
  else if (!isCur) lede = `${esc(label)} started on ${when(s.start)}. ${cap(esc(g.publisher))} didn't publish an exact end date${next ? `; ${esc(seasonLabel(g, next))} started on ${when(next.start)}` : ""}.`;
  else lede = `${esc(label)} started on ${when(s.start)}. ${endPhrase(g, v)}`;

  let compare = "";
  if (len != null && typical) {
    const d = len - typical;
    compare = `<p>That is ${d === 0 ? "exactly the" : `${days(Math.abs(d))} ${d > 0 ? "longer than the" : "shorter than the"}`} median length of recent ${esc(g.game)} seasons (${days(typical)}).</p>`;
  }

  const endCell = s.end ? when(s.end) : isCur ? (() => {
    const e = S.endOf(v);
    return e ? `<em>~${S.fmtDate.format(e.t)}</em> (estimate)` : "Not announced";
  })() : started ? notPublished(g) : "Not announced";
  const lenCell = len != null ? days(len)
    : isCur ? `${days(Math.floor((now - S.parseT(s.start)) / S.DAY) + 1)} so far`
    : started ? "Unknown" : "Not started";

  const rows = [
    ["Start", when(s.start)], ["End", endCell], ["Length", lenCell],
    s.patch && ["Patch", esc(s.patch)], s.theme && ["Theme", esc(s.theme)],
  ].filter(Boolean);

  return layout({
    data, game: g, path: seasonPath(g, s),
    crumbs: [["Home", "/"], [g.tag, `/${g.id}`], [`Season ${s.season}`, seasonPath(g, s)]],
    title: `${label}${s.name ? ` (${s.name})` : ""}: Start and End Date | Infinite Seasons`,
    description: seasonDescription(g, s, v, { label, isCur, started, len }),
    body: `<header class="page-head">
    <h1>${esc(named)}</h1>
    <p>${lede}</p>
  </header>
  ${isCur || !started ? cards([g], now, "/{id}", "single-card") : ""}
  <section class="block"><h2>Dates</h2><dl class="facts">${rows.map(([k, val]) => `<dt>${k}</dt><dd>${val}</dd>`).join("")}</dl></section>
  ${compare || s.note ? `<section class="block prose">${compare}${s.note && !isCur ? `<p>${esc(s.note)}</p>` : ""}</section>` : ""}
  <nav class="pager" aria-label="Other seasons">
    ${prev ? `<a href="${seasonPath(g, prev)}"><small>← Previous</small>Season ${prev.season}${prev.name ? `: ${esc(prev.name)}` : ""}</a>` : "<span></span>"}
    ${next ? `<a href="${seasonPath(g, next)}" style="text-align:right"><small>Next →</small>Season ${next.season}${next.name ? `: ${esc(next.name)}` : ""}</a>` : `<a href="/${g.id}" style="text-align:right"><small>Next →</small>Current season and countdown</a>`}
  </nav>
  <p class="more"><a href="/${g.id}/history">All ${esc(g.game)} seasons →</a></p>
  ${sourcesList(s.sources)}`,
  });
}

export function history(data, g, now) {
  const v = S.view(g, now);
  const done = g.seasons.filter(s => S.lengthDays(s) != null);
  const lens = done.map(S.lengthDays);
  const shortest = done[lens.indexOf(Math.min(...lens))], longest = done[lens.indexOf(Math.max(...lens))];
  const facts = done.length >= 3
    ? ` Finished seasons lasted a median of ${days(S.median(lens))}. The shortest was Season ${shortest.season} (${days(S.lengthDays(shortest))}) and the longest was Season ${longest.season} (${days(S.lengthDays(longest))}).`
    : "";
  return layout({
    data, game: g, path: `/${g.id}/history`,
    crumbs: [["Home", "/"], [g.tag, `/${g.id}`], ["History", `/${g.id}/history`]],
    title: `${g.prefix} History: Every Start and End Date | Infinite Seasons`,
    description: `Start date, end date and length of every ${g.prefix.toLowerCase()} from Season ${g.seasons[0].season} to Season ${v.season}.`,
    body: `<header class="page-head">
    <h1>${esc(g.prefix)} history</h1>
    <p>${g.seasons.length} seasons since ${when(g.seasons[0].start)}.${facts}</p>
  </header>
  ${done.length >= 3 ? `<section class="block"><h2>Season length</h2>${chart(g, now)}</section>` : ""}
  <section class="block"><h2>All seasons</h2>${seasonTable(g, [...g.seasons].reverse(), now)}</section>
  <section class="block prose"><h2>How we estimate end dates</h2>
    <p>When ${esc(g.publisher)} hasn't announced an end date, we estimate it as the start date plus the median length of the last six finished seasons${v.typicalDays ? ` (currently ${days(v.typicalDays)})` : ""}. If a date has been reported but not confirmed, for example from in-game data, we show that instead. Either way the date is marked <em>~</em> and shown in orange until it is official.</p>
  </section>
  ${sourcesList(g.seasons.flatMap(s => s.sources || []))}`,
  });
}

// Column chart of season lengths. Static SVG: one series in the game's accent, 4px rounded tops,
// square at the baseline, hairline gridlines, text in text colours, a <title> tooltip per column.
// The ongoing season is drawn as an outline ("so far"). The table below is the accessible view.
function chart(g, now) {
  const v = S.view(g, now);
  const items = g.seasons.filter(s => S.lengthDays(s) != null || s.season === v.season && S.parseT(s.start) <= now).map(s => {
    const len = S.lengthDays(s);
    return { s, len: len != null ? len : Math.floor((now - S.parseT(s.start)) / S.DAY) + 1, live: len == null };
  });
  // R leaves room for the median label to the right of the plot, clear of the columns.
  const W = 760, H = 260, L = 36, R = 64, T = 12, B = 28;
  const max = Math.max(...items.map(d => d.len));
  const step = max > 200 ? 100 : max > 100 ? 50 : 25;
  const top = Math.ceil(max / step) * step;
  const y = d => T + (H - T - B) * (1 - d / top);
  const band = (W - L - R) / items.length;
  const bw = Math.min(24, band - 2);
  const r = Math.min(4, bw / 2);
  const ticks = [];
  for (let t = 0; t <= top; t += step) ticks.push(t);
  const labelEvery = Math.ceil(items.length / 20);
  const median = S.median(items.filter(d => !d.live).map(d => d.len));

  const cols = items.map((d, i) => {
    const x = L + band * i + (band - bw) / 2, y0 = y(0), y1 = y(d.len);
    const path = `M${x},${y0}V${y1 + r}a${r},${r} 0 0 1 ${r},${-r}h${bw - 2 * r}a${r},${r} 0 0 1 ${r},${r}V${y0}Z`;
    const tip = `Season ${d.s.season}${d.s.name ? ` (${d.s.name})` : ""}: ${d.live ? `${days(d.len)} so far` : days(d.len)}`;
    const label = i % labelEvery === 0 || i === items.length - 1
      ? `<text x="${x + bw / 2}" y="${H - B + 16}" text-anchor="middle">${d.s.season}</text>` : "";
    return `<g><title>${esc(tip)}</title><rect x="${L + band * i}" y="${T}" width="${band}" height="${H - T - B}" fill="transparent"/>` +
      (d.live
        ? `<path d="${path}" fill="none" stroke="${esc(g.accent)}" stroke-width="1.5" stroke-dasharray="4 3"/>`
        : `<path d="${path}" fill="${esc(g.accent)}"/>`) + `${label}</g>`;
  }).join("");

  return `<figure class="chart">
<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Length in days of each ${esc(g.prefix.toLowerCase())}; the table below lists every value.">
<g font-size="11" fill="#9a8c7a" font-family="Segoe UI, system-ui, sans-serif">
${ticks.map(t => `<line x1="${L}" x2="${W - R}" y1="${y(t)}" y2="${y(t)}" stroke="#2c241c" stroke-width="1"/><text x="${L - 6}" y="${y(t) + 4}" text-anchor="end">${t}</text>`).join("")}
${median ? `<line x1="${L}" x2="${W - R}" y1="${y(median)}" y2="${y(median)}" stroke="#cfc3b2" stroke-width="1" opacity=".6"/><text x="${W - R + 6}" y="${y(median) - 2}" fill="#cfc3b2">median</text><text x="${W - R + 6}" y="${y(median) + 11}" fill="#cfc3b2">${median} days</text>` : ""}
${cols}
</g>
</svg>
<figcaption>Days per season, by season number. ${items.some(d => d.live) ? `The outlined column is the current season so far.` : ""} Hover a column for details.</figcaption>
</figure>`;
}

export function notFound(data) {
  return layout({
    data, path: "/404", noindex: true,
    title: "Page not found | Infinite Seasons",
    description: "This page doesn't exist.",
    body: `<header class="page-head"><h1>Page not found</h1>
    <p>That page doesn't exist. Try one of the games: ${data.games.map(g => `<a href="/${g.id}">${esc(g.game)}</a>`).join(", ")}.</p></header>`,
  });
}
