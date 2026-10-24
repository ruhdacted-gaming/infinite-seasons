# Season history research brief

This data feeds infiniteseasons.com, a season-date tracker that publishes one page per season. Accuracy is the whole product. A wrong date is far worse than a missing one.

Write only your own output file, `research/<game>.json`. Do not create or edit any other file.

## Sources

- Use web search and fetch the pages. Do not rely on memory alone.
- Prefer official announcements. Use secondary sources to fill gaps.
- If sources disagree, use the official one and record the conflict in `notes`.

## Rules

- **Never guess or interpolate a date.** If you can't source a date, use null and explain why in `notes`.
- **Times.** If a source gives an exact time, use a full UTC ISO string such as `"2025-05-22T00:00:00Z"`. Convert Pacific time correctly: PDT is UTC-7, PST is UTC-8. If only the date is known, use `"YYYY-MM-DD"`, the date in US Pacific time.
- **Current season.** Include it with `end: null` unless an end date has been officially announced. Datamined or rumoured dates go in `notes`, never in `end`.
- **Unannounced seasons.** Never include them. If the next season's start date has been officially announced, include that season.
- **`name`.** Use the official season name or subtitle, or null if there isn't one.
- **`patch`.** Use the patch or version the season launched with, or null.
- **`theme`.** One short factual sentence about the season's headline mechanic or features. Use null if you can't source it.
- **`confidence`.** Set it to:
  - `official` if the dates come from the developer.
  - `secondary` if they come only from wikis or guide sites.
  - `conflicting` if sources disagree.
- **Effort.** Be efficient. Find one or two good list pages (a wiki season list, a guide site's season table) and spot-check them against official posts. Don't fetch an official post for every season.

## Output

Write valid JSON with exactly this shape, oldest season first:

```json
{
  "game": "<id>",
  "checked": "2026-10-24",
  "seasons": [
    {
      "season": 1,
      "name": null,
      "start": "2022-04-28T17:00:00Z",
      "end": "2022-10-13",
      "patch": "2.4",
      "theme": "One factual sentence.",
      "sources": ["https://..."],
      "confidence": "official",
      "notes": ""
    }
  ]
}
```

## Final reply

When you're done, reply with:

- the number of seasons
- which fields are null or low-confidence
- any conflicts you found
- whether the project's existing data for the current season (given in your task) is correct

Keep the reply under 200 words.
