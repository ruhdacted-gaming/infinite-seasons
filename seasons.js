// Season data for the widget and the site. Edit this file when a new season is announced.
// All times are ISO 8601 in UTC ("Z"); pages show them in the reader's local time.
// A date without a time ("2024-05-14") means the exact time isn't known; it's shown as that calendar date.
//
// Per game:
//   publisher    - who announces dates (used in sentences like "Blizzard hasn't announced...")
//   prefix       - how the game's seasons are named in titles and search ("D2R Ladder Season")
//   hubTitle     - <title>/h1 of the game's hub page; {n} is the current season number
//   typicalDays  - fallback season length if fewer than 3 finished seasons are listed
//   seasons      - every announced season, oldest first. Never add a season that hasn't been announced.
// Per season:
//   end          - official end time, or null if not announced
//   endEstimate  - best guess when there is no official end (shown as an estimate, "~")
//   sources      - where the dates come from
//   confidence   - "official" (from the developer), "secondary" (wikis/guide sites only) or "conflicting"
//   research     - internal research notes: conflicts, missing times, why a field is null. Not shown on the site.
window.SEASON_DATA = {
  "verified": "2026-10-28",
  "games": [
    {
      "id": "d2r",
      "game": "Diablo II: Resurrected",
      "tag": "D2R Ladder",
      "publisher": "Blizzard",
      "accent": "#c9a14a",
      "prefix": "D2R Ladder Season",
      "hubTitle": "D2R Ladder Reset: When Does Ladder Season {n} End?",
      "typicalDays": 88,
      "link": "https://news.blizzard.com/en-us/diablo2",
      "seasons": [
        {
          "season": 1,
          "name": null,
          "start": "2022-04-29T00:00:00Z",
          "end": null,
          "patch": "2.4",
          "theme": "First D2R ladder season, launched two weeks after Patch 2.4 brought class balance changes, new runewords and mercenary reworks.",
          "sources": [
            "https://news.blizzard.com/en-us/article/23788293/diablo-ii-resurrected-patch-2-4-ladder-now-live",
            "https://maxroll.gg/d2/news/get-ready-for-ladder-season-1"
          ],
          "confidence": "official",
          "research": "Start: April 28, 2022, 5 PM PDT (Americas); April 29, 2 AM CEST / 9 AM KST. Patch 2.4 went live April 14, 2022. End not published by Blizzard. Secondary sources conflict: Blizzard Watch and vhpg.com say Season 1 ended October 6, 2022, when Season 2 began; aoeah.com says October 3, 2022."
        },
        {
          "season": 2,
          "name": null,
          "start": "2022-10-07T00:00:00Z",
          "end": null,
          "patch": "2.5",
          "theme": "Introduced ladder-only Sunder Charms; Patch 2.5 had added Terror Zones shortly before.",
          "sources": [
            "https://maxroll.gg/d2/news/get-ready-for-ladder-season-2",
            "https://maxroll.gg/d2/news/sunder-charms-in-patch-2-5",
            "https://news.blizzard.com/en-us/diablo2/23827590/diablo-ii-resurrected-patch-2-5-now-live"
          ],
          "confidence": "secondary",
          "research": "The October 6 date is in Blizzard's Patch 2.5 PTR notes; the exact time (October 6, 5 PM PDT; October 7, 2 AM CEST / 9 AM KST) comes from Maxroll only. End not published by Blizzard. aoeah.com lists 'February 15, 2022' (an obvious typo, likely 2023); arpgseasons.com uses the Season 3 start. Left null."
        },
        {
          "season": 3,
          "name": null,
          "start": "2023-02-17T01:00:00Z",
          "end": null,
          "patch": "2.6",
          "theme": "Patch 2.6 added new runewords, including Mosaic, Metamorphosis and Hustle.",
          "sources": [
            "https://tbc.wowhead.com/diablo-2/news/diablo-ii-resurrected-ladder-season-3-tier-lists-now-live-331421",
            "https://maxroll.gg/d2/news/patch-2-6-ptr",
            "https://us.forums.blizzard.com/en/d2r/t/season-3-ladder-reset-timing-update/153229"
          ],
          "confidence": "secondary",
          "research": "Start time (February 16, 2023, 5 PM PST) comes from Wowhead; Maxroll gives the February 16 date. I did not find Blizzard's own Season 3 launch post. Fextralife dates Patch 2.6 as February 17, 2023, a day after the ladder start; not resolved. End not published by Blizzard: aoeah.com says May 2, 2023 (the day Patch 2.7 went live at 10 AM PDT); arpgseasons.com uses the Season 4 start. Left null."
        },
        {
          "season": 4,
          "name": null,
          "start": "2023-05-05T00:00:00Z",
          "end": null,
          "patch": "2.7",
          "theme": "Patch 2.7 added four extra character slots in all online modes and automated chat moderation.",
          "sources": [
            "https://news.blizzard.com/en-gb/diablo2/23938388/diablo-ii-resurrected-ladder-season-4-coming-soon"
          ],
          "confidence": "official",
          "research": "Start: May 4, 2023, 5:00 PM PDT. Patch 2.7 went live May 2, 2023, 10:00 AM PDT. End not published by Blizzard: aoeah.com says September 14, 2023; arpgseasons.com uses the Season 5 start (September 28). Left null."
        },
        {
          "season": 5,
          "name": null,
          "start": "2023-09-28T21:00:00Z",
          "end": null,
          "sources": [
            "https://news.blizzard.com/en-gb/diablo2/23991801/diablo-ii-resurrected-ladder-season-5-coming-soon",
            "https://maxroll.gg/d2/news/d2r-ladder-season-5-coming-soon"
          ],
          "confidence": "official",
          "research": "Start: September 28, 2023, 2:00 PM PDT (11:00 PM CEST, September 29 6:00 AM KST). This is earlier than the usual 5 PM slot, but Blizzard's post and Maxroll agree. No patch launched with the season; Patch 2.7.2 followed mid-season on November 14. End not published by Blizzard: aoeah.com says February 22, 2024; arpgseasons.com uses the Season 6 start. Left null."
        },
        {
          "season": 6,
          "name": null,
          "start": "2024-02-23T01:00:00Z",
          "end": null,
          "theme": "A plain leaderboard reset with no new content.",
          "sources": [
            "https://news.blizzard.com/en-us/diablo2/24061888/diablo-ii-resurrected-ladder-season-6-coming-soon",
            "https://maxroll.gg/d2/news/season-6-starts-feb-22nd"
          ],
          "confidence": "official",
          "research": "Start: February 22, 2024, 5:00 PM PST. The 'no new content' statement comes from Maxroll. End not published by Blizzard: aoeah.com says May 21, 2024, the day Patch 2.7.3 went live at 10 AM PDT; arpgseasons.com uses the Season 7 start. Left null."
        },
        {
          "season": 7,
          "name": null,
          "start": "2024-05-24T00:00:00Z",
          "end": null,
          "patch": "2.7.3",
          "theme": "Patch 2.7.3 lowered the age restriction in Korea to 19; no new gameplay content.",
          "sources": [
            "https://news.blizzard.com/en-us/diablo2/24096018/diablo-ii-resurrected-ladder-season-7-coming-soon"
          ],
          "confidence": "official",
          "research": "Start: May 23, 2024, 5:00 PM PDT. Maxroll mislabels it PST. Patch 2.7.3 went live May 21, 2024, 10:00 AM PDT. End not published by Blizzard: aoeah.com says August 20, 2024, the day Patch 2.7.4 went live; arpgseasons.com uses the Season 8 start. Left null."
        },
        {
          "season": 8,
          "name": null,
          "start": "2024-08-24T00:00:00Z",
          "end": null,
          "patch": "2.7.4",
          "theme": "Patch 2.7.4 brought bug fixes and player-reporting updates.",
          "sources": [
            "https://news.blizzard.com/en-us/diablo2/24111638/diablo-ii-resurrected-ladder-season-8-coming-soon"
          ],
          "confidence": "official",
          "research": "Start: August 23, 2024, 5 PM PDT. Patch 2.7.4 went live August 20. End not published by Blizzard: aoeah.com says December 3, 2024, the day Patch 2.8.0 went live; arpgseasons.com uses the Season 9 start. Left null."
        },
        {
          "season": 9,
          "name": null,
          "start": "2024-12-07T01:00:00Z",
          "end": null,
          "patch": "2.8.0",
          "theme": "Patch 2.8.0 made move directions bindable, allowing WASD movement.",
          "sources": [
            "https://news.blizzard.com/en-us/article/24158875/diablo-ii-resurrected-ladder-season-9-coming-soon",
            "https://maxroll.gg/d2/news/ladder-season-9-on-december-6th"
          ],
          "confidence": "official",
          "research": "Start: December 6, 2024, 5 PM PST. Patch 2.8.0 went live December 3. End not published by Blizzard: aoeah.com says March 7, 2025, the same day Season 10 started; arpgseasons.com agrees, using the Season 10 start. Left null because there is no official source."
        },
        {
          "season": 10,
          "name": null,
          "start": "2025-03-08T01:00:00Z",
          "end": null,
          "sources": [
            "https://news.blizzard.com/en-us/article/24179243/diablo-ii-resurrected-ladder-season-10-coming-soon"
          ],
          "confidence": "official",
          "research": "Start: March 7, 2025, 5 PM PST. Blizzard's post names no patch or new features. End not published by Blizzard: aoeah.com says June 20, 2025, the day Season 11 started. Left null."
        },
        {
          "season": 11,
          "name": null,
          "start": "2025-06-21T00:00:00Z",
          "end": null,
          "sources": [
            "https://news.blizzard.com/en-us/article/24208340/diablo-ii-resurrected-ladder-season-11-coming-soon"
          ],
          "confidence": "official",
          "research": "Start: June 20, 2025, 5:00 PM PDT. Blizzard's post names no patch or new features. End not published by Blizzard: aoeah.com says October 3, 2025, the day Season 12 started. Left null."
        },
        {
          "season": 12,
          "name": null,
          "start": "2025-10-04T00:00:00Z",
          "end": "2026-02-11T17:00:00Z",
          "sources": [
            "https://news.blizzard.com/en-us/article/24226703/diablo-ii-resurrected-ladder-season-12-coming-soon",
            "https://news.blizzard.com/en-us/article/24246296/diablo-ii-resurrected-ladder-season-13-coming-soon"
          ],
          "confidence": "official",
          "research": "Start: October 3, 2025, 5:00 PM PDT. End: February 11, 2026, 9 AM PST, from Blizzard's Season 13 post. The end matches the Reign of the Warlock launch (DiabloBytes dates its patch notes February 11, 2026). Conflicts: seasondex.com gives the start as October 10, 2025, and arpgseasons.com gives the end as February 21, 2026. Both contradict Blizzard."
        },
        {
          "season": 13,
          "name": null,
          "start": "2026-02-21T01:00:00Z",
          "end": null,
          "patch": "3.1.1",
          "theme": "First ladder season after the Reign of the Warlock expansion, which added the Warlock class.",
          "sources": [
            "https://news.blizzard.com/en-us/article/24246296/diablo-ii-resurrected-ladder-season-13-coming-soon",
            "https://diablo2.wiki.fextralife.com/Patch_Notes",
            "https://seasondex.com/d2r"
          ],
          "confidence": "official",
          "research": "Start: February 20, 2026, 5:00 PM PST (Blizzard). Patch 3.1.1 is dated February 20, 2026 by Fextralife, and seasondex lists v3.1.1; this is secondary. The expansion launch patch was 3.1 (February 11), and DiabloBytes calls it '3.0'. Conflicts: a DiabloBytes article says Season 13 launched March 6, 2026, and Blizzard Watch says February 20 at 9 AM Pacific. Both contradict Blizzard. End not published by Blizzard: Patch 3.2 went live May 19, 2026 (mp1st), and Season 14 started May 22. Secondary sites list May 22/23. Left null."
        },
        {
          "season": 14,
          "name": null,
          "start": "2026-05-23T00:00:00Z",
          "end": "2026-08-17T18:00:00Z",
          "patch": "3.2",
          "theme": "Patch 3.2 brought large Warlock changes and Terror Zone changes.",
          "sources": [
            "https://news.blizzard.com/en-us/article/24261478/diablo-ii-resurrected-ladder-season-14-coming-soon",
            "https://news.blizzard.com/en-us/article/24296140/diablo-ii-resurrected-ladder-season-15-coming-soon"
          ],
          "confidence": "official",
          "research": "Start: May 22, 2026, 5:00 PM PDT. Maxroll mislabels it PST. End: Monday, August 17, 2026, 11 AM PDT, from Blizzard's Season 15 post. Patch 3.2 went live May 19, 2026 (mp1st). Conflict: arpgseasons.com says Season 14 ran to September 15, 2026, which is wrong."
        },
        {
          "season": 15,
          "name": null,
          "start": "2026-08-22T00:00:00Z",
          "end": null,
          "patch": "3.3",
          "theme": "Patch 3.3 brought Terror Zone and Colossal Ancients changes plus a set of item adjustments.",
          "note": "No reset date announced. S14 ran May 22 – Aug 17.",
          "sources": [
            "https://news.blizzard.com/en-us/article/24296140/diablo-ii-resurrected-ladder-season-15-coming-soon",
            "https://diablobytes.com/d2-resurrected/seasons/"
          ],
          "confidence": "official",
          "research": "Start: August 21, 2026, 5:00 PM PDT (August 22, 1 AM BST / 2 AM CEST / 8 AM CST / 9 AM KST). Patch 3.3 rolled out Tuesday, August 18. Blizzard has announced no end date. Trackers estimate it: seasondex.com and ggseason.com say about November 28, 2026; aoeah.com says mid-November. arpgseasons.com wrongly shows a different current season, 'Season of Hell's Legacy', starting September 15, 2026."
        }
      ]
    },
    {
      "id": "pd2",
      "game": "Project Diablo 2",
      "tag": "PD2",
      "publisher": "the Project Diablo 2 team",
      "accent": "#4fa3d9",
      "prefix": "Project Diablo 2 Season",
      "hubTitle": "Project Diablo 2 Season {n}: When Does It End?",
      "typicalDays": 180,
      "link": "https://wiki.projectdiablo2.com/wiki/Seasons",
      "seasons": [
        {
          "season": 1,
          "name": "Awakening",
          "start": "2020-11-06",
          "end": "2021-03-12",
          "theme": "PD2's launch season, adding tiered maps, group dungeons, more level 85 areas and a reworked Diablo Clone event.",
          "sources": [
            "https://wiki.projectdiablo2.com/wiki/Seasons",
            "https://wiki.projectdiablo2.com/wiki/Patch:Season_1"
          ],
          "confidence": "secondary",
          "research": "Start date from the wiki only; no start time found. Wiki lists 127 days, one more than start-to-start (it appears to count days inclusively). End is the start of the next season. Per the wiki, the ladder realm actually shuts down a few days earlier, when the closed beta ends and the open beta starts on the main realm."
        },
        {
          "season": 2,
          "name": "Transcendence",
          "start": "2021-03-12",
          "end": "2021-07-23",
          "theme": "Massive crafting overhaul, 9 new maps and the first dungeon, and halved PvP damage.",
          "sources": [
            "https://wiki.projectdiablo2.com/wiki/Seasons",
            "https://wiki.projectdiablo2.com/wiki/Patch:Season_2"
          ],
          "confidence": "secondary",
          "research": "Start date from the wiki only; no start time found (official Reddit patch notes post is linked from the wiki but could not be fetched). End is the start of the next season. Per the wiki, the ladder realm actually shuts down a few days earlier, when the closed beta ends and the open beta starts on the main realm."
        },
        {
          "season": 3,
          "name": "Domination",
          "start": "2021-07-23",
          "end": "2021-12-03",
          "theme": "Rare item and corruption overhauls, map changes, new class-specific unique items and a server-wide announcement system.",
          "sources": [
            "https://wiki.projectdiablo2.com/wiki/Seasons",
            "https://wiki.projectdiablo2.com/wiki/Patch:Season_3"
          ],
          "confidence": "secondary",
          "research": "Start date from the wiki only; no start time found. End is the start of the next season. Per the wiki, the ladder realm actually shuts down a few days earlier, when the closed beta ends and the open beta starts on the main realm."
        },
        {
          "season": 4,
          "name": "Enlightenment",
          "start": "2021-12-03",
          "end": "2022-06-24",
          "theme": "Introduced Rathma, a new uber boss, plus random map events and new maps.",
          "sources": [
            "https://wiki.projectdiablo2.com/wiki/Seasons",
            "https://wiki.projectdiablo2.com/wiki/Patch:Season_4"
          ],
          "confidence": "secondary",
          "research": "Wiki length is 169 days (120+49): the season was replaced by Crafters Race League #1 (began 2022-04-01 10am PST per the wiki, ran to May 6) and then resumed until Season 5. Season 5 was delayed to stagger with D2R ladders. No start time found. End is the start of the next season. Per the wiki, the ladder realm actually shuts down a few days earlier, when the closed beta ends and the open beta starts on the main realm."
        },
        {
          "season": 5,
          "name": "Ascension",
          "start": "2022-06-24",
          "end": "2022-11-25T18:00:00Z",
          "theme": "Added the Uber Ancients boss, a shared stash, an Act 5 mercenary, and non-ladder play.",
          "sources": [
            "https://wiki.projectdiablo2.com/wiki/Seasons",
            "https://wiki.projectdiablo2.com/wiki/Patch:Season_5"
          ],
          "confidence": "secondary",
          "research": "Start date from the wiki only; no start time found. End is the start of the next season. Per the wiki, the ladder realm actually shuts down a few days earlier, when the closed beta ends and the open beta starts on the main realm."
        },
        {
          "season": 6,
          "name": "Fortification",
          "start": "2022-11-25T18:00:00Z",
          "end": "2023-04-28",
          "theme": "Removed the global skill cooldown and added two new maps and new map and corruption mods.",
          "sources": [
            "https://wiki.projectdiablo2.com/wiki/Seasons",
            "https://wiki.projectdiablo2.com/wiki/Patch:Season_6",
            "https://web.archive.org/web/20230417181434/https://www.projectdiablo2.com/"
          ],
          "confidence": "official",
          "research": "Official site: 'will begin on November 25th at 10am PST' (PST in effect, = 18:00 UTC). End is the start of the next season. Per the wiki, the ladder realm actually shuts down a few days earlier, when the closed beta ends and the open beta starts on the main realm."
        },
        {
          "season": 7,
          "name": "Revelation",
          "start": "2023-04-28",
          "end": "2023-09-22T17:00:00Z",
          "theme": "Added difficulty tiers for Diablo Clone and Rathma, stackable maps, two unique maps and new mercenaries.",
          "sources": [
            "https://wiki.projectdiablo2.com/wiki/Seasons",
            "https://wiki.projectdiablo2.com/wiki/Patch:Season_7"
          ],
          "confidence": "secondary",
          "research": "Start date from the wiki only; no start time found (archived site still showed Season 6 text). First season to co-exist with the open beta of the next season. End is the start of the next season. Per the wiki, the ladder realm actually shuts down a few days earlier, when the closed beta ends and the open beta starts on the main realm."
        },
        {
          "season": 8,
          "name": "Depravity",
          "start": "2023-09-22T17:00:00Z",
          "end": "2024-02-09",
          "theme": "Introduced Corrupted Zones, rotating area-level-85 zones with higher worldstone shard drops.",
          "sources": [
            "https://wiki.projectdiablo2.com/wiki/Seasons",
            "https://wiki.projectdiablo2.com/wiki/Patch:Season_8",
            "https://web.archive.org/web/20230920000000/https://www.projectdiablo2.com/",
            "https://www.projectdiablo2.com/news/65148a917361278b17828bc3"
          ],
          "confidence": "official",
          "research": "Official site: 'will begin on September 22nd at 10am PST'; the dev team writes PST year-round, and PDT was in effect, so 10am Pacific = 17:00 UTC. Ladder ended when the Mini Crafters League (Crafters Race League #2) began on 2024-02-09 (10am PST per the wiki's quote of the Reddit post). The league ran 63 days until Season 9; that gap is not part of any season."
        },
        {
          "season": 9,
          "name": "Anarchy",
          "start": "2024-04-12T17:00:00Z",
          "end": "2024-10-25T17:00:00Z",
          "theme": "Map tier shuffle with denser maps, a new dungeon, and permanent summons that persist between games.",
          "sources": [
            "https://wiki.projectdiablo2.com/wiki/Seasons",
            "https://wiki.projectdiablo2.com/wiki/Patch:Season_9",
            "https://www.projectdiablo2.com/news/661a8de069c26555e7611ec3"
          ],
          "confidence": "official",
          "research": "Official news post: 'Season 9 Anarchy will begin Friday 10am PST April 12th'; PDT in effect, so 17:00 UTC. End is the start of the next season. Per the wiki, the ladder realm actually shuts down a few days earlier, when the closed beta ends and the open beta starts on the main realm."
        },
        {
          "season": 10,
          "name": "Desecration",
          "start": "2024-10-25T17:00:00Z",
          "end": "2025-05-16T17:00:00Z",
          "theme": "Introduced Lucion, a new uber boss, plus an Allocated Loot game mode and two new maps.",
          "sources": [
            "https://wiki.projectdiablo2.com/wiki/Seasons",
            "https://wiki.projectdiablo2.com/wiki/Patch:Season_10",
            "https://web.archive.org/web/20241020000000/https://www.projectdiablo2.com/",
            "https://www.projectdiablo2.com/news/671ba616e5fb3be79f1598e8"
          ],
          "confidence": "official",
          "research": "Official site: 'will begin on October 25th at 10am PST'; PDT in effect, so 17:00 UTC. Lucion was disabled on non-ladder during the first part of the season. End is the start of the next season. Per the wiki, the ladder realm actually shuts down a few days earlier, when the closed beta ends and the open beta starts on the main realm."
        },
        {
          "season": 11,
          "name": "Prosperity",
          "start": "2025-05-16T17:00:00Z",
          "end": "2025-11-28T18:00:00Z",
          "theme": "Shared stash and gold in single player, a materials stash tab, and new unique maps.",
          "sources": [
            "https://wiki.projectdiablo2.com/wiki/Seasons",
            "https://wiki.projectdiablo2.com/wiki/Patch:Season_11",
            "https://web.archive.org/web/20250512000000/https://www.projectdiablo2.com/",
            "https://www.projectdiablo2.com/news/682c9a1f843a1aeb51b8ee67"
          ],
          "confidence": "official",
          "research": "Official site: 'will begin on May 16th at 10am PST'; PDT in effect, so 17:00 UTC. End is the start of the next season. Per the wiki, the ladder realm actually shuts down a few days earlier, when the closed beta ends and the open beta starts on the main realm."
        },
        {
          "season": 12,
          "name": "Suffering",
          "start": "2025-11-28T18:00:00Z",
          "end": "2026-04-24T17:00:00Z",
          "theme": "Added stash search, three-portal tier 0 uber fights, and the City of Ureh unique map.",
          "sources": [
            "https://wiki.projectdiablo2.com/wiki/Seasons",
            "https://wiki.projectdiablo2.com/wiki/Patch:Season_12",
            "https://web.archive.org/web/20251115000000/https://www.projectdiablo2.com/",
            "https://www.projectdiablo2.com/news/6928d801adbfe010922c7b4f"
          ],
          "confidence": "official",
          "research": "Official site: 'will begin on Nov 28th at 10am PST' (PST in effect, = 18:00 UTC). End is the start of the next season. Per the wiki, the ladder realm actually shuts down a few days earlier, when the closed beta ends and the open beta starts on the main realm."
        },
        {
          "season": 13,
          "name": "Betrayal",
          "start": "2026-04-24T17:00:00Z",
          "end": "2026-10-23T17:00:00Z",
          "theme": "Added the Corrupted Heroes Invasion map event, two unique maps, and a critical strike rework.",
          "sources": [
            "https://wiki.projectdiablo2.com/wiki/Seasons",
            "https://wiki.projectdiablo2.com/wiki/Patch:Season_13",
            "https://web.archive.org/web/20260420000000/https://www.projectdiablo2.com/",
            "https://www.projectdiablo2.com/news/69eae6327bb43338eb53be99"
          ],
          "confidence": "official",
          "research": "Official site: 'will begin on Apr 24th at 10am PST'; PDT in effect, so 17:00 UTC. End is the start of the next season. Per the wiki, the ladder realm actually shuts down a few days earlier, when the closed beta ends and the open beta starts on the main realm."
        },
        {
          "season": 14,
          "name": "Alliance",
          "start": "2026-10-23T17:00:00Z",
          "end": null,
          "theme": "Introduced guilds with upgradeable Guild Halls, plus global chat.",
          "note": "Seasons run 4–6 months. S13 ran Apr 24 – Oct 23.",
          "sources": [
            "https://wiki.projectdiablo2.com/wiki/Seasons",
            "https://wiki.projectdiablo2.com/wiki/Patch:Season_14",
            "https://www.projectdiablo2.com/",
            "https://www.projectdiablo2.com/news/6adacfefa9def04d275a1486"
          ],
          "confidence": "official",
          "research": "Current season. Official site: 'will begin on Oct 23rd at 10am PST'; PDT in effect (DST ends Nov 1, 2026), so 17:00 UTC. If 'PST' were taken literally it would be 18:00 UTC; the team uses 'PST' year-round. No end date announced."
        }
      ]
    },
    {
      "id": "d3",
      "game": "Diablo III",
      "tag": "D3",
      "publisher": "Blizzard",
      "accent": "#d9534f",
      "prefix": "Diablo 3 Season",
      "hubTitle": "Diablo 3 Season {n}: When Does It End?",
      "typicalDays": 93,
      "link": "https://news.blizzard.com/en-us/diablo3",
      "seasons": [
        {
          "season": 1,
          "name": null,
          "start": "2014-08-30T01:00:00Z",
          "end": "2015-02-04T00:00:00Z",
          "patch": "2.1.0",
          "theme": "The first season, introduced with patch 2.1.0 alongside seasonal leaderboards and season-exclusive legendaries.",
          "sources": [
            "https://diablo.fandom.com/wiki/Season",
            "https://us.battle.net/forums/en/d3/topic/14058735855",
            "https://us.battle.net/d3/en/blog/17152343",
            "https://www.engadget.com/2014-08-28-diablo-season-1-launches-friday-august-29.html"
          ],
          "confidence": "official",
          "research": "Americas start 6:00 PM PDT Aug 29; end 4:00 PM PST Feb 3 (Blizzard forum schedule, via fandom and press). Regions launched staggered."
        },
        {
          "season": 2,
          "name": null,
          "start": "2015-02-14T02:00:00Z",
          "end": "2015-04-06T04:00:00Z",
          "patch": "2.1.2",
          "theme": "New season-exclusive legendaries, conquests and banner rewards.",
          "sources": [
            "https://diablo.fandom.com/wiki/Season",
            "https://us.battle.net/d3/en/blog/16607841",
            "https://us.battle.net/d3/en/blog/18313042",
            "https://cinemablend.com/games/Diablo-3-Season-2-Start-Date-Announced-69783.html"
          ],
          "confidence": "official",
          "research": "Americas start 6:00 PM PST; end 9:00 PM PDT Apr 5 (Blizzard posts as reported by fandom and press). Shortest season (~7 weeks)."
        },
        {
          "season": 3,
          "name": null,
          "start": "2015-04-11T01:00:00Z",
          "end": "2015-08-24T00:00:00Z",
          "patch": "2.2.0",
          "theme": "Launched with patch 2.2.0 with new season-exclusive legendaries and the first seasonal pennant.",
          "sources": [
            "https://diablo.fandom.com/wiki/Season",
            "https://us.battle.net/d3/en/blog/21534734",
            "https://us.battle.net/d3/en/blog/19842943",
            "https://games.softpedia.com/blog/Diablo-3-Season-2-Ends-on-April-5-Season-3-Starts-on-April-10-476397.shtml"
          ],
          "confidence": "official",
          "research": "Americas start 6:00 PM PDT (one press report said 10 PM Pacific; Blizzard's forum schedule and other reports say 6 PM). End 5:00 PM PDT."
        },
        {
          "season": 4,
          "name": null,
          "start": "2015-08-29T00:00:00Z",
          "end": "2015-12-31T01:00:00Z",
          "patch": "2.3.0",
          "theme": "Introduced the Season Journey for tracking seasonal progress.",
          "sources": [
            "https://diablo.fandom.com/wiki/Season",
            "https://us.battle.net/d3/en/blog/19824753",
            "https://us.battle.net/d3/en/blog/19975528"
          ],
          "confidence": "official",
          "research": "First season with 5:00 PM start and end times. Times per fandom: Season 4 onward starts and ends at 5:00 PM Pacific (Americas)."
        },
        {
          "season": 5,
          "name": null,
          "start": "2016-01-16T01:00:00Z",
          "end": "2016-04-16T00:00:00Z",
          "patch": "2.4.0",
          "theme": "Introduced Haedrig's Gift free class sets and Season Rebirth; first bonus stash tab reward.",
          "sources": [
            "https://diablo.fandom.com/wiki/Season",
            "https://us.battle.net/d3/en/blog/19993877",
            "https://us.battle.net/d3/en/blog/20077425"
          ],
          "confidence": "official",
          "research": "Times per fandom: Season 4 onward starts and ends at 5:00 PM Pacific (Americas)."
        },
        {
          "season": 6,
          "name": null,
          "start": "2016-04-30T00:00:00Z",
          "end": "2016-07-23T00:00:00Z",
          "patch": "2.4.1",
          "sources": [
            "https://diablo.fandom.com/wiki/Season",
            "https://us.battle.net/d3/en/blog/20099645",
            "https://us.battle.net/d3/en/blog/20167107"
          ],
          "confidence": "official",
          "research": "Times per fandom: Season 4 onward starts and ends at 5:00 PM Pacific (Americas)."
        },
        {
          "season": 7,
          "name": null,
          "start": "2016-08-06T00:00:00Z",
          "end": "2016-10-15T00:00:00Z",
          "patch": "2.4.2",
          "sources": [
            "https://diablo.fandom.com/wiki/Season",
            "https://us.battle.net/d3/en/blog/20187365",
            "https://us.battle.net/d3/en/blog/20275888"
          ],
          "confidence": "official",
          "research": "Times per fandom: Season 4 onward starts and ends at 5:00 PM Pacific (Americas)."
        },
        {
          "season": 8,
          "name": null,
          "start": "2016-10-22T00:00:00Z",
          "end": "2016-12-31T01:00:00Z",
          "theme": "First season launched without a new patch; only conquests and rewards rotated.",
          "sources": [
            "https://diablo.fandom.com/wiki/Season",
            "https://us.battle.net/d3/en/blog/20324040",
            "https://us.battle.net/d3/en/blog/20405165"
          ],
          "confidence": "official",
          "research": "No new patch at launch (game was on 2.4.2). Times per fandom: Season 4 onward starts and ends at 5:00 PM Pacific (Americas)."
        },
        {
          "season": 9,
          "name": null,
          "start": "2017-01-07T01:00:00Z",
          "end": "2017-03-18T00:00:00Z",
          "patch": "2.4.3",
          "sources": [
            "https://diablo.fandom.com/wiki/Season",
            "https://us.battle.net/d3/en/blog/20407576",
            "https://us.battle.net/d3/en/blog/20570422"
          ],
          "confidence": "official",
          "research": "Times per fandom: Season 4 onward starts and ends at 5:00 PM Pacific (Americas)."
        },
        {
          "season": 10,
          "name": null,
          "start": "2017-04-01T00:00:00Z",
          "end": "2017-06-24T00:00:00Z",
          "patch": "2.5.0",
          "theme": "First season available on consoles.",
          "sources": [
            "https://diablo.fandom.com/wiki/Season",
            "https://us.battle.net/d3/en/blog/20631435",
            "https://us.battle.net/d3/en/blog/20845156"
          ],
          "confidence": "official",
          "research": "Times per fandom: Season 4 onward starts and ends at 5:00 PM Pacific (Americas)."
        },
        {
          "season": 11,
          "name": null,
          "start": "2017-07-21T00:00:00Z",
          "end": "2017-10-21T00:00:00Z",
          "patch": "2.6.0",
          "theme": "First season with the Necromancer class from Rise of the Necromancer.",
          "sources": [
            "https://diablo.fandom.com/wiki/Season",
            "https://us.battle.net/d3/en/blog/20845160",
            "https://us.battle.net/d3/en/blog/21097429"
          ],
          "confidence": "official",
          "research": "Started on a Thursday instead of Friday. End 5:00 PM PDT Oct 20 per Blizzard. Start time assumed 5:00 PM PDT from fandom's 5 PM convention; EU started 5:00 PM CEST."
        },
        {
          "season": 12,
          "name": null,
          "start": "2017-11-10T01:00:00Z",
          "end": "2018-02-12T01:00:00Z",
          "patch": "2.6.1",
          "sources": [
            "https://diablo.fandom.com/wiki/Season",
            "https://us.battle.net/d3/en/blog/21160657",
            "https://us.diablo3.com/en/blog/21492188",
            "https://mp1st.com/news/diablo-3-season-12-stat-date-announced"
          ],
          "confidence": "official",
          "research": "Started Thursday, Nov 9 at 5:00 PM PST. Times per fandom: Season 4 onward starts and ends at 5:00 PM Pacific (Americas)."
        },
        {
          "season": 13,
          "name": null,
          "start": "2018-02-24T01:00:00Z",
          "end": "2018-06-04T00:00:00Z",
          "sources": [
            "https://diablo.fandom.com/wiki/Season",
            "https://us.battle.net/d3/en/blog/21534734",
            "https://us.diablo3.com/en/blog/21791946"
          ],
          "confidence": "official",
          "research": "Launched without a new patch. Times per fandom: Season 4 onward starts and ends at 5:00 PM Pacific (Americas)."
        },
        {
          "season": 14,
          "name": "Season of Greed",
          "start": "2018-06-16T00:00:00Z",
          "end": "2018-09-17T00:00:00Z",
          "theme": "First themed season: Treasure Goblin spawns were doubled.",
          "sources": [
            "https://diablo.fandom.com/wiki/Season",
            "https://us.battle.net/d3/en/blog/21839180",
            "https://us.diablo3.com/en/blog/22312196"
          ],
          "confidence": "official",
          "research": "Name per fandom; Blizzard's announcement was titled 'Season 14 First Look: Themed Seasons'. Launch patch not sourced. Times per fandom: Season 4 onward starts and ends at 5:00 PM Pacific (Americas)."
        },
        {
          "season": 15,
          "name": "Boon of the Horadrim",
          "start": "2018-09-22T00:00:00Z",
          "end": "2019-01-07T01:00:00Z",
          "theme": "Horadric Caches from bounties were doubled.",
          "sources": [
            "https://diablo.fandom.com/wiki/Season",
            "https://us.diablo3.com/en/blog/22493264",
            "https://us.battle.net/forums/en/d3/topic/20770676889"
          ],
          "confidence": "official",
          "research": "Originally scheduled to end Dec 16, 2018; extended to Jan 6, 2019. Launch patch not sourced. Times per fandom: Season 4 onward starts and ends at 5:00 PM Pacific (Americas)."
        },
        {
          "season": 16,
          "name": "Season of Grandeur",
          "start": "2019-01-19T01:00:00Z",
          "end": "2019-05-13T00:00:00Z",
          "patch": "2.6.4",
          "theme": "All seasonal players gained the Ring of Royal Grandeur legendary power.",
          "sources": [
            "https://diablo.fandom.com/wiki/Season",
            "https://us.diablo3.com/en/blog/22820656",
            "https://us.battle.net/forums/en/d3/topic/20771057397"
          ],
          "confidence": "official",
          "research": "Originally scheduled to end Mar 17, 2019; extended 8 weeks to May 12. Times per fandom: Season 4 onward starts and ends at 5:00 PM Pacific (Americas)."
        },
        {
          "season": 17,
          "name": "Season of Nightmares",
          "start": "2019-05-18T00:00:00Z",
          "end": "2019-08-19T00:00:00Z",
          "patch": "2.6.5",
          "theme": "Seasonal buff based on Legacy of Nightmares: big damage bonus per equipped Ancient item with no set bonuses active.",
          "sources": [
            "https://diablo.fandom.com/wiki/Season",
            "https://us.diablo3.com/en/blog/22976066",
            "https://us.forums.blizzard.com/en/d3/t/season-17-ends-august-18/1088"
          ],
          "confidence": "official",
          "research": "First season with no end date announced up front; Blizzard committed to at least two weeks' notice. Times per fandom: Season 4 onward starts and ends at 5:00 PM Pacific (Americas)."
        },
        {
          "season": 18,
          "name": "Season of the Triune",
          "start": "2019-08-24T00:00:00Z",
          "end": "2019-11-11T01:00:00Z",
          "patch": "2.6.6",
          "theme": "Triune's Will: hits can spawn circles granting damage, resource-cost or cooldown bonuses.",
          "sources": [
            "https://diablo.fandom.com/wiki/Season",
            "https://us.diablo3.com/en/blog/23093786",
            "https://us.forums.blizzard.com/en/d3/t/season-18-ends-11-10/5055"
          ],
          "confidence": "official",
          "research": "Times per fandom: Season 4 onward starts and ends at 5:00 PM Pacific (Americas)."
        },
        {
          "season": 19,
          "name": "Season of Eternal Conflict",
          "start": "2019-11-23T01:00:00Z",
          "end": "2020-03-02T01:00:00Z",
          "patch": "2.6.7",
          "theme": "Pandemonium-style killstreak buffs that trigger chaotic battlefield effects.",
          "sources": [
            "https://diablo.fandom.com/wiki/Season",
            "https://us.diablo3.com/en/blog/23220970",
            "https://twitter.com/Diablo/status/1228406672860663808"
          ],
          "confidence": "official",
          "research": "Times per fandom: Season 4 onward starts and ends at 5:00 PM Pacific (Americas)."
        },
        {
          "season": 20,
          "name": "Season of the Forbidden Archives",
          "start": "2020-03-14T00:00:00Z",
          "end": "2020-06-22T00:00:00Z",
          "patch": "2.6.8",
          "theme": "Kanai's Cube's three slots could hold legendary powers of any type (weapon, armor or jewelry).",
          "sources": [
            "https://diablo.fandom.com/wiki/Season",
            "https://us.diablo3.com/en/blog/23319442",
            "https://us.forums.blizzard.com/en/d3/t/season-20-ends-june-21st/18056"
          ],
          "confidence": "official",
          "research": "Name per fandom; Blizzard's launch post was titled 'Season 20 Now Live'. Times per fandom: Season 4 onward starts and ends at 5:00 PM Pacific (Americas)."
        },
        {
          "season": 21,
          "name": "Trials of Tempests",
          "start": "2020-07-04T00:00:00Z",
          "end": "2020-11-09T01:00:00Z",
          "patch": "2.6.9",
          "theme": "Characters periodically channel an elemental power that is unleashed into the environment.",
          "sources": [
            "https://diablo.fandom.com/wiki/Season",
            "https://us.diablo3.com/en/blog/23428368",
            "https://us.forums.blizzard.com/en/d3/t/season-21-trials-of-tempests-end-dates/23661"
          ],
          "confidence": "official",
          "research": "Times per fandom: Season 4 onward starts and ends at 5:00 PM Pacific (Americas)."
        },
        {
          "season": 22,
          "name": "Shades of the Nephalem",
          "start": "2020-11-21T01:00:00Z",
          "end": "2021-03-29T00:00:00Z",
          "patch": "2.6.10",
          "theme": "Shadows of the Past: activating a shrine or pylon summons a shadow clone of your class; Kanai's Cube gets a fourth slot.",
          "sources": [
            "https://diablo.fandom.com/wiki/Season",
            "https://us.diablo3.com/en-us/blog/23548757",
            "https://us.forums.blizzard.com/en/d3/t/season-22-shades-of-the-nephalem-end-dates/28900"
          ],
          "confidence": "official",
          "research": "Times per fandom: Season 4 onward starts and ends at 5:00 PM Pacific (Americas)."
        },
        {
          "season": 23,
          "name": "The Disciples of Sanctuary",
          "start": "2021-04-03T00:00:00Z",
          "end": "2021-07-19T00:00:00Z",
          "patch": "2.7.0",
          "theme": "Launched with the follower revamp, which gave followers 14 gear slots and Emanate powers.",
          "sources": [
            "https://diablo.fandom.com/wiki/Season",
            "https://us.diablo3.com/en-us/blog/23647866",
            "https://us.forums.blizzard.com/en/d3/t/season-23-the-disciples-of-sanctuary-end-dates/36084"
          ],
          "confidence": "official",
          "research": "Times per fandom: Season 4 onward starts and ends at 5:00 PM Pacific (Americas)."
        },
        {
          "season": 24,
          "name": "Ethereal Memory",
          "start": "2021-07-24T00:00:00Z",
          "end": "2021-12-06T01:00:00Z",
          "patch": "2.7.1",
          "theme": "Ethereals: seasonal weapons that roll a random class weapon legendary power and class passive.",
          "sources": [
            "https://diablo.fandom.com/wiki/Season",
            "https://us.diablo3.com/en-us/blog/23695733",
            "https://us.forums.blizzard.com/en/d3/t/season-24-ethereal-memory-end-dates/47878"
          ],
          "confidence": "official",
          "research": "Times per fandom: Season 4 onward starts and ends at 5:00 PM Pacific (Americas)."
        },
        {
          "season": 25,
          "name": "The Lords of Hell",
          "start": "2021-12-11T01:00:00Z",
          "end": "2022-04-11T00:00:00Z",
          "patch": "2.7.2",
          "theme": "Soul Shards: socketable powers of the Prime and Lesser Evils, upgraded with Hellforge Embers.",
          "sources": [
            "https://diablo.fandom.com/wiki/Season",
            "https://us.diablo3.com/en-us/blog/23746130",
            "https://us.forums.blizzard.com/en/d3/t/season-25-the-lords-of-hell-end-dates/50248"
          ],
          "confidence": "official",
          "research": "Times per fandom: Season 4 onward starts and ends at 5:00 PM Pacific (Americas)."
        },
        {
          "season": 26,
          "name": "The Fall of the Nephalem",
          "start": "2022-04-16T00:00:00Z",
          "end": "2022-08-22T00:00:00Z",
          "patch": "2.7.3",
          "theme": "Echoing Nightmares: a wave-survival event entered with a seasonal item.",
          "sources": [
            "https://diablo.fandom.com/wiki/Season",
            "https://us.diablo3.blizzard.com/en-us/blog/23785083",
            "https://us.forums.blizzard.com/en/d3/t/season-26-the-fall-of-the-nephalem-ending-soon/53614"
          ],
          "confidence": "official",
          "research": "Times per fandom: Season 4 onward starts and ends at 5:00 PM Pacific (Americas)."
        },
        {
          "season": 27,
          "name": "Light's Calling",
          "start": "2022-08-27T00:00:00Z",
          "end": "2023-02-20T01:00:00Z",
          "patch": "2.7.4",
          "theme": "Angelic Crucibles: sanctify a legendary item to perfect Ancient stats plus one of three class-specific powers.",
          "sources": [
            "https://diablo.fandom.com/wiki/Season",
            "https://us.diablo3.blizzard.com/en-us/blog/23816414",
            "https://us.forums.blizzard.com/en/d3/t/season-27-lights-calling-ending-soon/56871"
          ],
          "confidence": "official",
          "research": "Times per fandom: Season 4 onward starts and ends at 5:00 PM Pacific (Americas)."
        },
        {
          "season": 28,
          "name": "Rites of Sanctuary",
          "start": "2023-02-25T01:00:00Z",
          "end": "2023-09-11T00:00:00Z",
          "patch": "2.7.5",
          "theme": "Introduced the Altar of Rites, a seasonal progression altar unlocked with materials and choices.",
          "sources": [
            "https://diablo.fandom.com/wiki/Season",
            "https://us.diablo3.blizzard.com/en-us/blog/23897180",
            "https://us.forums.blizzard.com/en/d3/t/season-28-rites-of-sanctuary-ending-soon-notice/61444"
          ],
          "confidence": "official",
          "research": "End Sep 10 at 5:00 PM PDT per Blizzard forum notice (Aug 28, 2023). Dexerto reported Aug 20, 2023, which is wrong. Longest D3 season (~28 weeks)."
        },
        {
          "season": 29,
          "name": "Visions of Enmity",
          "start": "2023-09-16T00:00:00Z",
          "end": "2024-01-07",
          "patch": "2.7.6",
          "theme": "Visions of Enmity: random portals to high-density monster areas; also introduced Solo Self-Found mode.",
          "sources": [
            "https://diablo.fandom.com/wiki/Season",
            "https://us.diablo3.blizzard.com/en-us/blog/23999068",
            "https://blizzardwatch.com/2023/12/04/diablo-3-season-29-end/"
          ],
          "confidence": "secondary",
          "research": "Start 5:00 PM PDT is official. End date (Sunday, Jan 7, 2024) is from BlizzardWatch and fandom; no Blizzard post found. Last season with an original theme."
        },
        {
          "season": 30,
          "name": "The Lords of Hell",
          "start": "2024-01-13T01:00:00Z",
          "end": "2024-04-08T00:00:00Z",
          "patch": "2.7.7",
          "theme": "Returning Soul Shards theme from Season 25; Altar of Rites and Visions of Enmity became permanent seasonal features.",
          "sources": [
            "https://diablo.fandom.com/wiki/Season",
            "https://news.blizzard.com/en-us/diablo3/24046224/season-30-the-lords-of-hell-now-live",
            "https://blizzardwatch.com/2024/01/22/diablo-3-season-30-end/",
            "https://d3guides.de/de/seasons"
          ],
          "confidence": "conflicting",
          "research": "Start is official. End Sunday, Apr 7, 2024 at 5 PM Pacific per BlizzardWatch and fandom; d3guides lists Mar 31, 2024. No Blizzard post found for the end. First season to remix past themes."
        },
        {
          "season": 31,
          "name": "Season of the Forbidden Archives",
          "start": "2024-04-13T00:00:00Z",
          "end": "2024-07-07",
          "theme": "Returning Forbidden Archives theme from Season 20: Kanai's Cube slots accept legendary powers of any type.",
          "sources": [
            "https://news.blizzard.com/en-us/article/24078323",
            "https://diablo.fandom.com/wiki/Season",
            "https://blizzardwatch.com/2024/04/26/diablo-3-season-31-end/",
            "https://d3guides.de/de/seasons"
          ],
          "confidence": "conflicting",
          "research": "Start 5:00 PM PDT is official. End Jul 7, 2024 per BlizzardWatch and fandom; d3guides lists Jun 30, 2024. No Blizzard post found for the end. Blizzard's season page lists patch 2.7.7 only; no new patch at launch."
        },
        {
          "season": 32,
          "name": "Ethereal Memory",
          "start": "2024-07-13T00:00:00Z",
          "end": "2024-10-20",
          "theme": "Returning Ethereals theme from Season 24.",
          "sources": [
            "https://news.blizzard.com/en-us/article/24104599",
            "https://blizzardwatch.com/2024/10/16/diablo-3-season-32-end/",
            "https://www.gamewatcher.com/news/diablo-3-season-33-start-end-dates",
            "https://d3guides.de/de/seasons"
          ],
          "confidence": "conflicting",
          "research": "Start 5:00 PM PDT is official. End Oct 20, 2024 per BlizzardWatch, GameWatcher and fandom; d3guides lists Oct 6, 2024. Launch patch not sourced."
        },
        {
          "season": 33,
          "name": "Shades of the Nephalem",
          "start": "2024-10-26T00:00:00Z",
          "end": "2025-01-20T01:00:00Z",
          "patch": "2.7.8",
          "theme": "Returning Shadows of the Past theme from Season 22: shrine/pylon shadow clones and a fourth Kanai's Cube slot.",
          "sources": [
            "https://us.forums.blizzard.com/en/d3/t/season-33-shades-of-the-nephalem-%E2%80%93-has-concluded/64375/1",
            "https://blizzardwatch.com/2025/01/14/diablo-3-season-33-end/",
            "https://icy-veins.com/forums/topic/81515-diablo-iii-patch-278-preview-what-to-expect-in-season-33",
            "https://d3guides.de/de/seasons"
          ],
          "confidence": "secondary",
          "research": "Start Oct 25 at 5:00 PM PDT is official (delayed two weeks to avoid D4's Vessel of Hatred). End Jan 19, 2025 per BlizzardWatch citing Blizzard's Season 34 preview; the season accidentally ended early in early January and was restored. GameWatcher reported Feb 4, 2025; d3guides lists Oct 18, 2024 for the start, contradicting Blizzard. End time 5 PM PST assumed from the usual schedule. Patch 2.7.8 per Icy Veins' PTR preview."
        },
        {
          "season": 34,
          "name": "Light's Calling",
          "start": "2025-02-01T01:00:00Z",
          "end": "2025-06-01",
          "theme": "Returning Angelic Crucibles theme from Season 27.",
          "sources": [
            "https://news.blizzard.com/en-us/article/24166297",
            "https://news.blizzard.com/en-us/article/24191146/season-35-eternal-conflict-now-live",
            "https://d3guides.de/de/seasons"
          ],
          "confidence": "official",
          "research": "Start Jan 31 at 5:00 PM PST (delayed from Jan 24). End Jun 1 per Blizzard's Season 35 post; no time given. d3guides lists May 4, 2025 for the end, contradicting Blizzard. Launch patch not sourced."
        },
        {
          "season": 35,
          "name": "Eternal Conflict",
          "start": "2025-06-07T00:00:00Z",
          "end": "2025-09-07",
          "theme": "Returning Season 19 theme: Pandemonium killstreak stacks with battlefield effects at kill milestones.",
          "sources": [
            "https://news.blizzard.com/en-us/article/24191146/season-35-eternal-conflict-now-live",
            "https://blizzardwatch.com/2025/09/11/diablo-3-season-35-end-season-36-start/",
            "https://d3guides.de/de/seasons"
          ],
          "confidence": "secondary",
          "research": "Start Jun 6 at 5:00 PM PDT is official. End Sunday, Sep 7, 2025 per BlizzardWatch (13 weeks 2 days); no Blizzard post found. d3guides lists May 16 to Aug 17, 2025, which contradicts Blizzard's start date. Launch patch not sourced."
        },
        {
          "season": 36,
          "name": "The Lords of Hell",
          "start": "2025-09-13T00:00:00Z",
          "end": "2025-11-30",
          "theme": "Returning Soul Shards theme from Season 25.",
          "sources": [
            "https://news.blizzard.com/en-us/article/24231417/season-36-the-lords-of-hell-preview",
            "https://blizzardwatch.com/2025/11/13/diablo-3-season-36-end-date/",
            "https://d3guides.de/de/seasons"
          ],
          "confidence": "official",
          "research": "Start Sep 12 at 5:00 PM PDT is official. End Sunday, Nov 30, 2025 per a Blizzard blog post quoted by BlizzardWatch; no time given. d3guides lists Aug 29 for the start, contradicting Blizzard. Launch patch not sourced."
        },
        {
          "season": 37,
          "name": "The Forbidden Archives",
          "start": "2025-12-06T01:00:00Z",
          "end": "2026-03-22",
          "theme": "Returning Forbidden Archives theme: Kanai's Cube slots accept legendary powers of any type.",
          "sources": [
            "https://news.blizzard.com/en-us/article/24243442/season-37-the-forbidden-archives-now-live",
            "https://blizzardwatch.com/2026/01/30/diablo-3-season-37-end-season-38-start",
            "https://d3guides.de/de/seasons"
          ],
          "confidence": "conflicting",
          "research": "Start Dec 5 at 5:00 PM PST is official. End Sunday, Mar 22, 2026 per BlizzardWatch, which says Blizzard confirmed it; d3guides lists Mar 15, 2026. BlizzardWatch had earlier estimated Mar 1. Launch patch not sourced."
        },
        {
          "season": 38,
          "name": "Ethereal Memory",
          "start": "2026-03-28T00:00:00Z",
          "end": "2026-06-21",
          "theme": "Returning Ethereals theme from Season 24.",
          "sources": [
            "https://news.blizzard.com/en-us/article/24262572/38",
            "https://blizzardwatch.com/2026/06/24/diablo-3-season-39-shades-nephalem/",
            "https://d3guides.de/de/seasons"
          ],
          "confidence": "secondary",
          "research": "Start Mar 27 at 5:00 PM PDT is official. End Jun 21, 2026 per BlizzardWatch (ended without prior announcement) and d3guides; Blizzard's page only says 'Has Concluded'. Launch patch not sourced."
        },
        {
          "season": 39,
          "name": "Shades of the Nephalem",
          "start": "2026-06-27T00:00:00Z",
          "end": "2026-09-28T00:00:00Z",
          "theme": "Returning Shadows of the Past theme: shrine/pylon shadow clones and a fourth Kanai's Cube slot.",
          "sources": [
            "https://news.blizzard.com/en-us/article/24287549/season-39-shades-of-the-nephalem-now-live",
            "https://news.blizzard.com/en-us/article/24301510",
            "https://d3guides.de/de/seasons"
          ],
          "confidence": "official",
          "research": "Start Jun 26 at 5:00 PM PDT and end Sep 27 at 5:00 PM PDT are both from Blizzard. DiabloBytes' next-season page says Jun 20, which is wrong. Launch patch not sourced."
        },
        {
          "season": 40,
          "name": "Light's Calling",
          "start": "2026-10-03T00:00:00Z",
          "end": null,
          "theme": "Returning Angelic Crucibles theme from Season 27: imbue a legendary with one of three random class-specific powers.",
          "note": "Angelic Crucibles theme. End not announced.",
          "sources": [
            "https://news.blizzard.com/en-us/article/24301510",
            "https://d3guides.de/de/season-40"
          ],
          "confidence": "official",
          "research": "Current season. Start Oct 2 at 5:00 PM PDT per Blizzard's preview. No end date announced. Launch patch not stated by Blizzard; d3guides cites game data version 2.8.0, but that is not confirmed as the launch patch."
        }
      ]
    },
    {
      "id": "d4",
      "game": "Diablo IV",
      "tag": "D4",
      "publisher": "Blizzard",
      "accent": "#b33a3a",
      "prefix": "Diablo 4 Season",
      "hubTitle": "Diablo 4 Season {n}: When Does It End and When Is the Next Season?",
      "typicalDays": 77,
      "link": "https://news.blizzard.com/en-us/diablo4",
      "seasons": [
        {
          "season": 1,
          "name": "Season of the Malignant",
          "start": "2023-07-20T17:00:00Z",
          "end": "2023-10-17",
          "patch": "1.1.0",
          "theme": "Players capture Malignant Hearts from Malignant Monsters and socket them for build-altering powers.",
          "sources": [
            "https://news.blizzard.com/en-us/article/23967322/malignance-runs-rampant-in-the-first-season-of-diablo-iv",
            "https://news.blizzard.com/en-us/article/23976339/season-of-the-malignant-now-live",
            "https://vaultalts.com/diablo-4/guides/season-history-every-season-and-date",
            "https://ggseason.com/blog/diablo-4-all-seasons-dates/"
          ],
          "confidence": "secondary",
          "research": "Start is official (Blizzard: July 20, 10 a.m. PDT). No official post found stating the end. The end date comes from secondary lists (vaultalts, ggseason, Destructoid) and equals the Season 2 start date. Patch 1.1.0 is from vaultalts. It went live a couple of days before the season started."
        },
        {
          "season": 2,
          "name": "Season of Blood",
          "start": "2023-10-17",
          "end": "2024-01-23",
          "patch": "1.2.0",
          "theme": "Players gain Vampiric Powers, with a new questline and five additional endgame bosses.",
          "sources": [
            "https://news.blizzard.com/en-us/article/23989476/season-of-blood-is-dripping-into-sanctuary",
            "https://news.blizzard.com/en-us/article/24092662/diablo-iv-patch-notes-1-0-1-2",
            "https://www.icy-veins.com/d4/news/diablo-4-season-2-start-time-delayed/",
            "https://vaultalts.com/diablo-4/guides/season-history-every-season-and-date"
          ],
          "confidence": "secondary",
          "research": "Start date is official. Only the date is used, because the scheduled 10 a.m. PT start was delayed by a few hours for technical issues (Icy Veins) and I found no source for the actual go-live time. No official post found stating the end. The end date comes from secondary lists and equals the Season 3 start date."
        },
        {
          "season": 3,
          "name": "Season of the Construct",
          "start": "2024-01-23T18:00:00Z",
          "end": "2024-05-14",
          "patch": "1.3.0",
          "theme": "Players get a customizable Seneschal construct companion and a new Vaults dungeon type.",
          "sources": [
            "https://news.blizzard.com/en-us/article/24053482/unearth-a-looming-threat-in-season-of-the-construct",
            "https://news.blizzard.com/en-us/article/24140806/diablo-iv-patch-notes-1-3-1-5",
            "https://blizzardwatch.com/2024/03/20/diablo-4-season-3-end-may/",
            "https://vaultalts.com/diablo-4/guides/season-history-every-season-and-date"
          ],
          "confidence": "conflicting",
          "research": "Start is official (Blizzard: January 23, 10 a.m. PST). The original in-game end date was April 16, 2024. In the Season 4 PTR campfire chat, Blizzard extended the season to May 14, 2024 (reported by BlizzardWatch; the Blizzard transcript was not found). ggseason and Fextralife still list April 16, which is stale. ggseason also claims a 28-day off-season gap, which is wrong. A Wowhead report of April 26 was speculation."
        },
        {
          "season": 4,
          "name": "Loot Reborn",
          "start": "2024-05-14T17:00:00Z",
          "end": "2024-08-06",
          "patch": "1.4.0",
          "theme": "Itemization was overhauled, and the Tempering and Masterworking crafting systems were added.",
          "sources": [
            "https://news.blizzard.com/en-us/article/24077223/galvanize-your-legend-in-season-4-loot-reborn",
            "https://news.blizzard.com/en-us/article/24140806/diablo-iv-patch-notes-1-3-1-5",
            "https://vaultalts.com/diablo-4/guides/season-history-every-season-and-date"
          ],
          "confidence": "secondary",
          "research": "Blizzard's official title is \"Season 4: Loot Reborn\". The name has no \"Season of\" form, and ggseason's \"Season of Loot Reborn\" is wrong. The numbering is normal, with no skip or renumbering. Start is official (May 14, 10 a.m. PT). No official post found stating the end. The end date comes from secondary lists and equals the Season 5 start date."
        },
        {
          "season": 5,
          "name": "Season of the Infernal Hordes",
          "start": "2024-08-06T17:00:00Z",
          "end": "2024-10-07",
          "patch": "1.5.0",
          "theme": "This season added the Infernal Hordes, a wave-based endgame mode entered with Infernal Compasses.",
          "sources": [
            "https://news.blizzard.com/en-us/article/24119591/slay-endless-demons-in-season-of-the-infernal-hordes",
            "https://news.blizzard.com/en-us/diablo4/24123440/diablo-iv-1-5-0-patch-notes",
            "https://vaultalts.com/diablo-4/guides/season-history-every-season-and-date",
            "https://ggseason.com/blog/diablo-4-all-seasons-dates/"
          ],
          "confidence": "secondary",
          "research": "Start is official (August 6, 10 a.m. PT). Patch 1.5.0 is dated August 6, 2024. No official post found stating the end. The end date comes from secondary lists. vaultalts gives Oct 7, which is the Pacific date of the Season 6 start (Oct 7, 4 p.m. PDT). ggseason gives Oct 8, the UTC or European date."
        },
        {
          "season": 6,
          "name": "Season of Hatred Rising",
          "start": "2024-10-07T23:00:00Z",
          "end": "2025-01-21",
          "patch": "2.0.2",
          "theme": "Players hunt giant Realmwalkers and enter Seething Realms; the season launched with the Vessel of Hatred expansion.",
          "sources": [
            "https://news.blizzard.com/en-us/article/24140803/conquer-colossal-foes-in-season-of-hatred-rising",
            "https://news.blizzard.com/en-us/article/24140808/diablo-iv-patch-notes-2-0",
            "https://vaultalts.com/diablo-4/guides/season-history-every-season-and-date"
          ],
          "confidence": "secondary",
          "research": "Start is official (October 7, 4 p.m. PDT, with Vessel of Hatred). That is October 8 in UTC, which is why many sites list Oct 8. 2.0.2 (Build #58474, October 7, 2024) is the first live build in Blizzard's 2.0 patch notes. No official post found stating the end. The end date comes from secondary lists and equals the Season 7 start date."
        },
        {
          "season": 7,
          "name": "Season of Witchcraft",
          "start": "2025-01-21T18:00:00Z",
          "end": "2025-04-29",
          "patch": "2.1.0",
          "theme": "Players unlock Witchcraft Powers through a seasonal questline and Headrotten hunts for Coven favor.",
          "sources": [
            "https://news.blizzard.com/en-us/article/24167111/master-the-occult-in-season-of-witchcraft",
            "https://news.blizzard.com/en-us/article/24171214/diablo-iv-patch-notes",
            "https://vaultalts.com/diablo-4/guides/season-history-every-season-and-date"
          ],
          "confidence": "secondary",
          "research": "Start is official (January 21, 10 a.m. PST). Patch 2.1.0 (Build #61313) is dated January 21, 2025. No official post found stating the end. The end date comes from secondary lists and equals the Season 8 start date."
        },
        {
          "season": 8,
          "name": "Belial's Return",
          "start": "2025-04-29T17:00:00Z",
          "end": "2025-07-01",
          "patch": "2.2.0",
          "theme": "Players absorb Boss Powers from defeated bosses and equip them as Main and Modifier effects.",
          "sources": [
            "https://news.blizzard.com/en-us/article/24189530/combat-deception-in-season-8-belials-return",
            "https://maxroll.gg/d4/news/diablo-4-2-2-0-patch-notes",
            "https://vaultalts.com/diablo-4/guides/season-history-every-season-and-date"
          ],
          "confidence": "secondary",
          "research": "Blizzard's official title is \"Season 8: Belial's Return\". Start is official (April 29, 10 a.m. PDT). Patch 2.2.0 is from Maxroll and vaultalts. No official post found stating the end. The end date comes from secondary lists and equals the Season 9 start date."
        },
        {
          "season": 9,
          "name": "Sins of the Horadrim",
          "start": "2025-07-01",
          "end": "2025-09-23",
          "patch": "2.3.0",
          "theme": "Horadric Spellcraft lets players combine Catalysts, Infusions and Arcana into custom spells.",
          "sources": [
            "https://news.blizzard.com/en-us/article/24215863/purge-the-sins-of-the-horadrim",
            "https://news.blizzard.com/en-us/article/24215257/earn-season-9-sins-of-the-horadrim-twitch-drops",
            "https://vaultalts.com/diablo-4/guides/season-history-every-season-and-date"
          ],
          "confidence": "secondary",
          "research": "Blizzard's official title is \"Season 9: Sins of the Horadrim\". The start date and patch 2.3.0 are official. The season post gives no launch time. Only the Twitch drops (10 a.m. PDT) and the shop (12 p.m. PDT) are timed, so only the date is used. Deltia's Gaming gives 10 a.m. PDT. No official post found stating the end. The end date comes from secondary lists and equals the Season 10 start date."
        },
        {
          "season": 10,
          "name": "Season of Infernal Chaos",
          "start": "2025-09-23",
          "end": "2025-12-11",
          "patch": "2.4.0",
          "theme": "Players hunt Chaos Armor to unlock Chaos Perks that reshape skills, and seal Chaos Rifts to level them.",
          "sources": [
            "https://news.blizzard.com/en-us/article/24226702/rally-against-hell-in-season-of-infernal-chaos",
            "https://www.icy-veins.com/d4/news/diablo-4-season-10-season-of-infernal-chaos-release-times/",
            "https://vaultalts.com/diablo-4/guides/season-history-every-season-and-date"
          ],
          "confidence": "secondary",
          "research": "The start date is official. Blizzard's post gives no season launch time. Icy Veins and esports.gg give 10 a.m. PDT, but only the date is used. Patch 2.4.0 was tested on the PTR and is listed by vaultalts. No official post found stating the end. The end date comes from secondary lists. It is the Pacific date of the Season 11 start (Dec 11, 8:30 p.m. PST). In UTC that is Dec 12."
        },
        {
          "season": 11,
          "name": "Season of Divine Intervention",
          "start": "2025-12-12T04:30:00Z",
          "end": "2026-03-11",
          "patch": "2.5.0",
          "theme": "Azmodan's Lesser Evils invade Sanctuary, and the angel Hadriel grants Divine Gifts to resist them.",
          "sources": [
            "https://news.blizzard.com/en-us/article/24244465/vanquish-the-lesser-evils-in-season-of-divine-intervention",
            "https://blizzardwatch.com/2025/12/12/diablo-4-season-11-start/",
            "https://vaultalts.com/diablo-4/guides/season-history-every-season-and-date"
          ],
          "confidence": "secondary",
          "research": "Start is official: December 11, 8:30 p.m. PST, an unusual evening launch timed to The Game Awards, where Lord of Hatred was announced. That is December 12 in UTC, and ggseason's Dec 11 is the Pacific date. Patch 2.5.0 is listed by vaultalts and referenced in Blizzard's post. No official post found stating the end. The end date comes from secondary lists and equals the Season 12 start date."
        },
        {
          "season": 12,
          "name": "Season of Slaughter",
          "start": "2026-03-11T17:00:00Z",
          "end": "2026-04-27",
          "patch": "2.6.0",
          "theme": "Players transform into The Butcher and build Killstreaks for experience and seasonal reputation.",
          "sources": [
            "https://news.blizzard.com/en-us/article/24244648/become-the-butcher-in-season-of-slaughter",
            "https://news.blizzard.com/en-gb/article/24266869/diablo-iv-patch-notes-2-6",
            "https://vaultalts.com/diablo-4/guides/season-history-every-season-and-date"
          ],
          "confidence": "secondary",
          "research": "Start and patch are official (March 11, 10 a.m. PT; patch 2.6.0). US DST began March 8, 2026, so the start is PDT, which is 17:00 UTC. No official post found stating the end. The end date comes from secondary lists. vaultalts gives Apr 27, the Pacific date of the Season 13 start. ggseason gives Apr 28, the UTC date. At 48 days, this is the shortest D4 season."
        },
        {
          "season": 13,
          "name": "Season of Reckoning",
          "start": "2026-04-27T23:30:00Z",
          "end": "2026-06-30",
          "patch": "3.0.1",
          "theme": "This expansion-launch season, released with Lord of Hatred, had no seasonal story or mechanic; it centered on Season Rank, Season Blessings and the return of the Tower and Leaderboards.",
          "sources": [
            "https://news.blizzard.com/en-us/article/24267729/prepare-for-the-reckoning-lord-of-hatred-draws-near",
            "https://news.blizzard.com/en-us/article/24271857/diablo-iv-patch-notes-3-0",
            "https://news.blizzard.com/en-us/article/24268702/hunt-the-death-cult-in-season-of-death-awakening",
            "https://vaultalts.com/diablo-4/guides/season-history-every-season-and-date"
          ],
          "confidence": "secondary",
          "research": "Start is official: April 27, 2026, 4:30 p.m. PDT. The Lord of Hatred rollout began at 4:00 p.m. PDT. In UTC that is April 28, which is the date ggseason uses. Blizzard's Reckoning post gives no season number. It is Season 13 because Blizzard calls the next season, Death Awakening, \"Season 14\", so no number was skipped. 3.0.0 was the pre-download build. 3.0.1 (Build #71566, April 27, 2026) is the first live build in Blizzard's 3.0 patch notes. No official post found stating the end. The end date comes from secondary lists and equals the Season 14 start date."
        },
        {
          "season": 14,
          "name": "Season of Death Awakening",
          "start": "2026-06-30T17:00:00Z",
          "end": "2026-09-15",
          "patch": "3.1.0",
          "theme": "Pandemonium Ruptures open rifts that spawn monsters and loot, with bigger rewards the longer they stay open.",
          "sources": [
            "https://news.blizzard.com/en-us/article/24268702/hunt-the-death-cult-in-season-of-death-awakening",
            "https://vaultalts.com/diablo-4/guides/season-history-every-season-and-date",
            "https://ggseason.com/blog/diablo-4-all-seasons-dates/"
          ],
          "confidence": "secondary",
          "research": "Start and patch are official (June 30, 2026, 10:00 a.m. PDT; patch 3.1.0). No official post found stating the end. The end date comes from secondary lists and equals the Season 15 start date. ggseason gives the end time as 17:00 UTC. That is wrong, because Season 15 began at 9:30 a.m. PDT (16:30 UTC)."
        },
        {
          "season": 15,
          "name": "Season of Hell's Legacy",
          "start": "2026-09-15T16:30:00Z",
          "end": null,
          "endEstimate": "2026-12-01T17:00:00Z",
          "patch": "3.2.1",
          "theme": "Players collect Splinters of Evil from echoes of Diablo, Baal and Mephisto to gain a Prime Evil's Iconic Power, for Diablo's 30th anniversary.",
          "note": "S16 start of Dec 1 is from in-game data, not confirmed.",
          "events": [
            {
              "label": "S16 PTR (PC)",
              "start": "2026-10-27T17:00:00Z",
              "end": "2026-11-03T18:00:00Z"
            }
          ],
          "sources": [
            "https://news.blizzard.com/en-us/article/24301509/diablos-next-era-revealed-at-blizzcon-2026-opening-ceremonies-recap",
            "https://news.blizzard.com/en-us/article/24295394/celebrate-30-years-of-diablo-in-season-of-hell-s-legacy",
            "https://news.blizzard.com/en-us/article/24302578/the-3-3-0-ptr-what-you-need-to-know",
            "https://d4guides.gg/en/news/diablo-4-season-15-season-of-hell-s-legacy-start-date-content-and-rewards"
          ],
          "confidence": "official",
          "research": "Blizzard's BlizzCon 2026 recap says the season \"begins rolling out on September 15, 9:30 a.m. PT\", which is 16:30 UTC. ggseason's 10:00 a.m. PT (17:00 UTC) is wrong. Patch 3.2.1 is Build #73552, dated September 15, 2026. Blizzard has announced no end date. The Season 16 PTR (3.3.0, PC only) runs October 27, 10 a.m. PDT, to November 3, 10 a.m. PST. In-game and datamined data suggests Season 16 starts December 1, 2026. That is an estimate and not official. ggseason estimates December 2."
        }
      ]
    }
  ]
};
