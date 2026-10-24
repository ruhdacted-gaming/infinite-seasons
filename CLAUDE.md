# Infinite Seasons

Tracks seasons for games that run them: current season, start date, end date (official or estimated), live status, countdowns. Started as a Windows desktop widget for four Diablo games. The plan is to grow it into a programmatic-SEO static site at infiniteseasons.com.

## Current state

- `seasons.js`: the single source of season data (`window.SEASON_DATA`). Times are UTC ISO strings. `end: null` means not announced. The widget then uses `endEstimate`, or `start + typicalDays`, and labels the result as an estimate.
- `widget.html`: the widget itself, a self-contained page. It loads `seasons.js` with a `<script>` tag, not fetch, so it works from `file://`.
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

The site will be static and hosted on Cloudflare Workers with static assets (`wrangler` with `assets.directory`). The domain infiniteseasons.com is to be bought and attached there.

## Git

Commit to this repo as `heyitisj@gmail.com` and push as GitHub user `supiriority`. Both are set in this repo's local git config (`user.email` and `credential.https://github.com.username`). The machine's global git identity is a different account, so don't change the global config.
