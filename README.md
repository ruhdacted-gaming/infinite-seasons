# Infinite Seasons

Season tracker for Diablo games: start dates, end dates (official or estimated), live status and countdowns.

Currently tracked:

- Diablo II: Resurrected ladder
- Project Diablo 2
- Diablo III
- Diablo IV

## Desktop widget

Run `Diablo Seasons.cmd` (Windows). It opens `widget.html` as a small standalone Edge window. You can also open `widget.html` in any browser.

## Updating dates

All season data lives in `seasons.js`. Times are UTC. When a season is announced:

1. Update that game's `season`, `name`, `start`, and `end` (or `endEstimate`).
2. Bump `verified` at the top to today's date.

When `end` is `null`, the widget estimates the end date from `endEstimate`, or from `start + typicalDays` if `endEstimate` is also `null`. Estimated dates are shown with a `~`.

## Website

The site at https://infiniteseasons.com is built from the same files and runs on Cloudflare Workers.

```
npm install
npm run dev      # local preview
npm run deploy   # build to dist/ and deploy
```
