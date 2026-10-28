# Infinite Seasons

Tracks seasons for games that run them: current season, start date, end date (official or estimated), live status, countdowns. Started as a Windows desktop widget for four Diablo games. The plan is to grow it into a programmatic-SEO static site at infiniteseasons.com.

## Current state

- `seasons.js`: the single source of season data (`window.SEASON_DATA`). Each game has a `seasons` list with every announced season, oldest first. The current season is the latest one that has started.
  - Times are UTC ISO strings. A date-only string means the exact time isn't known.
  - `end: null` means no end date was announced. The site then uses `endEstimate`, or else the start date plus the median length of the last 6 finished seasons (falling back to `typicalDays`). Either way the result is labelled as an estimate.
  - The header comment documents every field.
- `research/`: the source research behind the season history.
  - `BRIEF.md` holds the research rules.
  - `<game>.json` holds raw findings with sources and notes.
  - `merge.mjs` merges a game's JSON into `seasons.js`.
- `render.js` and `cards.css`: the card and countdown rendering and the card styles, shared by the widget and the site. Estimate handling (`~`, orange end date, dashed bar) lives here.
- `widget.html`: the desktop widget page. It loads `seasons.js` and `render.js` with `<script>` tags, not fetch, so it works from `file://`.
- `site/pages.mjs`: the page templates. Every sentence that states a date is generated from the data. `site/site.css` holds the page styles. `site/live.js` keeps countdowns live and shows dates in the reader's time zone.
- `Diablo Seasons.cmd`: opens the widget as an Edge `--app` window with its own profile dir, so the window size is respected.

Tracked games: D2R ladder, Project Diablo 2, Diablo III, Diablo IV.

## Data accuracy

Accuracy is what makes or breaks this project. Keep these rules:

- Never present an estimate as official. Estimates are shown with `~` and an orange end date. Datamined dates count as estimates.
- Update `verified` whenever dates are re-checked.
- Sources used so far: Blizzard news (news.blizzard.com), the PD2 wiki Seasons page (wiki.projectdiablo2.com/wiki/Seasons), diablobytes.com, d3guides.de, d4guides.gg. Competitors that already rank: arpg-timeline.com, ggseason.com, timesaver.gg.

## Site plan (pSEO, levelsio-style)

US search volume from Ubersuggest, checked 2026-10-24:

| Keyword | Volume | Difficulty |
|---|---|---|
| d2r ladder reset | 1.9k | 21 |
| diablo 4 next season | 1.3k | 59 |
| d2r ladder reset season N | 40–390 each | ~16 |
| project diablo 2 season N | 90–390 each | ~31 |
| when does season end overwatch | 1.9k | 25 |
| when does season end league of legends | 1.9k | 22 |
| when does the marvel rivals season end | 1.0k | 5 |
| fortnite season end date | 720 | 23 |
| poe 2 next league | 590 | 17 |

Season-numbered keywords keep their traffic long after the season ends, so every new season adds a new long-term page.

Page templates, all generated from the season data:

1. `/{game}`: hub page with the current season, live countdown, end date, next season. Targets "when does X season end".
2. `/{game}/season-{n}`: permanent page per season with dates, length, patch, theme, and links to the previous and next season.
3. `/{game}/history`: all seasons in one table with a chart of season lengths. This page explains how the estimates are calculated.
4. `/ending-soon`, `/this-week`: pages covering all games.
5. Per-game `.ics` calendar feeds.
6. An embeddable countdown (OBS overlay or iframe) with a credit link back to the site, for backlinks.

Avoid thin near-duplicate pages, such as one page per timezone. Use a timezone switcher instead. Don't create pages for seasons that haven't been announced.

Rollout: ARPGs first (the Diablo games, PoE 1/2, Last Epoch). Then Marvel Rivals, Overwatch, Fortnite, LoL.

## Hosting

The site is static, hosted on Cloudflare Workers with static assets, on the Cloudflare account for ruhdacted@gmail.com. The domain infiniteseasons.com is registered at Porkbun, with its nameservers pointed at Cloudflare.

- `build.mjs` pre-renders every page into `dist/` (gitignored), so crawlers see the dates in the HTML. Pre-rendered dates use Pacific time, and `live.js` then switches them to the reader's zone. The build writes:
  - `/`, `/{game}`, `/{game}/history` and one `/{game}/season-{n}` page per announced season
  - `404.html`, `sitemap.xml` and `robots.txt`
  - a slim `seasons.js` holding only the previous, current and next seasons
- The Worker is assets-only: it has no script, so asset requests are free and don't count toward the Workers request limit. Two settings in the Cloudflare dashboard, not in the repo, handle canonical URLs:
  - **Always Use HTTPS** (SSL/TLS > Edge Certificates) redirects http to https.
  - A **Redirect Rule** (Rules > Redirect Rules) 301-redirects `www.infiniteseasons.com/*` to the apex domain and keeps the path and query string. The `www` custom domain stays in `wrangler.jsonc` so the hostname resolves and the rule can run.
- `wrangler.jsonc` holds the Worker config and the custom-domain routes.
- `npm run deploy` builds and deploys. `wrangler login` must be done with the ruhdacted@gmail.com Cloudflare account.
- `npm run build` runs `scripts/check.mjs` first. It checks the data for impossible dates, gaps, overlaps, odd lengths and missing sources. A failing check blocks every build and deploy.

## Automation

- **Deploy** (`.github/workflows/deploy.yml`) runs on every push to main, and daily at 00:30 and 17:30 UTC so pages roll over to new seasons. It needs the `CLOUDFLARE_API_TOKEN` repo secret.
- **Watch** (`.github/workflows/watch.yml` and `scripts/watch.mjs`) runs daily at 19:00 UTC and uses no AI.
  - It polls Blizzard's news feed API and the PD2 news API (the PD2 wiki blocks GitHub's servers), and files new posts as `season-watch` issues.
  - A game is due for research when it has open `season-watch` issues, when a season change is within 21 days and the last check was 2 or more days ago, or when the last check was 7 or more days ago. The last check is the `checked` field in `research/<game>.json`.
  - When a game is due, it POSTs to the T3 webhook stored in the `T3_WEBHOOK_URL` secret.
- **Research run**: the webhook starts the T3 scheduled task "Season research run" on the user's always-on gaming PC. Each run is a fresh Claude Opus thread that follows `automation/RUNBOOK.md`.
  - It works in the `D:/Dev/infinite-seasons-bot` worktree.
  - If nothing changed, it pushes the `checked` and `verified` bump to main.
  - If dates changed, it opens a PR, has GPT (Codex) review it until it approves, and then merges. The user doesn't review data PRs for now.
- `gh` is installed at `%LOCALAPPDATA%\Programs\gh\bin` and isn't logged in. The runbook takes `GH_TOKEN` from the repo's stored git credential.

## Search Console

The property is the domain property `sc-domain:infiniteseasons.com`. `scripts/gsc.mjs` reads it through the Search Console API: search queries, pages and countries, the index status of every sitemap URL, and sitemap submission. Usage is at the top of the file.

- It signs in as a Google Cloud service account. The account's JSON key lives outside the repo at `~/.config/infinite-seasons/gsc-key.json`, or wherever `GSC_KEY_FILE` points. Never commit it or print it.
- The service account is a "Full" user on the property, so it can submit sitemaps but can't add users or delete the property.

## Git

Commit to this repo as `heyitisj@gmail.com` and push as GitHub user `supiriority`. Both are set in this repo's local git config (`user.email` and `credential.https://github.com.username`). The machine's global git identity is a different account, so don't change the global config.
