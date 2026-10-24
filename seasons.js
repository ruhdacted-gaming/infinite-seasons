// Season data for the widget. Edit this file when a new season is announced.
// All times are ISO 8601 in UTC ("Z"); the widget shows them in your local time.
//   end          - official end time, or null if not announced
//   endEstimate  - your best guess when there is no official end (shown as "est.")
//   typicalDays  - used to estimate the end if both end and endEstimate are null
window.SEASON_DATA = {
  verified: "2026-10-24",
  games: [
    {
      id: "d2r",
      game: "Diablo II: Resurrected",
      tag: "D2R Ladder",
      accent: "#c9a14a",
      season: 15,
      name: "Patch 3.3 Ladder",
      start: "2026-08-22T00:00:00Z", // Aug 21, 5:00 PM PDT
      end: null,
      endEstimate: null,
      typicalDays: 88,
      note: "No reset date announced. S14 ran May 22 – Aug 17.",
      link: "https://news.blizzard.com/en-us/diablo2",
    },
    {
      id: "pd2",
      game: "Project Diablo 2",
      tag: "PD2",
      accent: "#4fa3d9",
      season: 14,
      name: "Alliance",
      start: "2026-10-23T17:00:00Z", // Oct 23, 10:00 AM Pacific
      end: null,
      endEstimate: null,
      typicalDays: 180,
      note: "Seasons run 4–6 months. S13 ran Apr 24 – Oct 23.",
      link: "https://wiki.projectdiablo2.com/wiki/Seasons",
    },
    {
      id: "d3",
      game: "Diablo III",
      tag: "D3",
      accent: "#d9534f",
      season: 40,
      name: "Light's Calling",
      start: "2026-10-03T00:00:00Z", // Oct 2, 5:00 PM PDT (Americas)
      end: null,
      endEstimate: null,
      typicalDays: 93,
      note: "Angelic Crucibles theme. End not announced.",
      link: "https://news.blizzard.com/en-us/diablo3",
    },
    {
      id: "d4",
      game: "Diablo IV",
      tag: "D4",
      accent: "#b33a3a",
      season: 15,
      name: "Season of Hell's Legacy",
      start: "2026-09-15T16:30:00Z", // Sep 15, 9:30 AM PDT
      end: null,
      endEstimate: "2026-12-01T17:00:00Z",
      typicalDays: 77,
      note: "S16 start of Dec 1 is from in-game data, not confirmed.",
      events: [
        { label: "S16 PTR (PC)", start: "2026-10-27T17:00:00Z", end: "2026-11-03T18:00:00Z" },
      ],
      link: "https://news.blizzard.com/en-us/diablo4",
    },
  ],
};
