# Season research run

You were started by the T3 webhook that `.github/workflows/watch.yml` calls when one or more games are due for a check. The webhook body lists the games, why each is due, and any open `season-watch` issues (new official posts).

Accuracy is the whole product. A wrong date is far worse than a stale one. When in doubt, leave the data alone and say so in the PR or issue.

## 1. Workspace

You run on Jay's Mac mini. Work only in the bot worktree, `~/Dev/supiriority/infinite-seasons-bot`, never in the main checkout `~/Dev/supiriority/infinite-seasons` (Jay may be working there).

Only one run at a time. The lock is a directory (`mkdir` is atomic so two runs cannot both acquire it). If it exists and is less than 6 hours old, another run is in progress: stop and say so. An older one is stale: replace it. Delete the lock directory when you finish, however the run ends (`rm -rf ~/Dev/supiriority/infinite-seasons-bot.lock`).

```sh
LOCK=~/Dev/supiriority/infinite-seasons-bot.lock
if ! mkdir "$LOCK" 2>/dev/null; then
  STARTED=$(cat "$LOCK/started" 2>/dev/null || stat -f %m "$LOCK")
  [ $(( $(date +%s) - STARTED )) -lt 21600 ] && { echo "locked since $(date -u -r "$STARTED" +%FT%TZ)"; exit 1; }
  rm -rf "$LOCK" && mkdir "$LOCK" || { echo "another run took the stale lock"; exit 1; }
fi
date +%s > "$LOCK/started"
```

```sh
BOT=~/Dev/supiriority/infinite-seasons-bot
cd ~/Dev/supiriority/infinite-seasons && git fetch origin --prune || exit 1
[ -e "$BOT" ] || git worktree add --detach "$BOT" origin/main || exit 1
cd "$BOT" && [ "$(git rev-parse --show-toplevel)" = "$(pwd -P)" ] || exit 1   # really inside the bot worktree
git config user.email   # must be heyitisj@gmail.com; pushes go over SSH as supiriority
```

If any of these fails, stop (and delete the lock). Never go on with a failed fetch, and never run the commands below anywhere but the bot worktree.

T3 may start each run in its own worktree under `~/.t3/worktrees/` on a `t3/...` branch. Remove the ones earlier runs left, but only when they are clean and hold nothing that isn't on `origin/main`. Keep your own (the one `pwd` was in when you started) and anything dirty; list dirty ones in your final reply.

```sh
git worktree list
# for each other ~/.t3/worktrees/... entry on a t3/ branch:
git -C <path> status --porcelain        # must be empty
git log --oneline origin/main..<branch> # must be empty
git worktree remove <path> && git branch -D <branch>
```

An earlier run that crashed can leave uncommitted changes, or a commit it never pushed. Keep both on a `recovery/` branch, then move the worktree to the `origin/main` you just fetched. Do this on every run: an earlier run leaves the worktree on an old commit or a merged `data/` branch, and researching from there would make the step 3 push fail as non-fast-forward.

```sh
if [ -n "$(git status --porcelain)" ]; then
  git add -A && git commit -qm "Leftovers from a crashed run" || exit 1
fi
if [ -z "$(git branch -r --contains HEAD)" ]; then   # HEAD is on no remote branch
  REC=recovery/$(date -u +%Y%m%dT%H%M%SZ)
  git branch "$REC" || exit 1
  echo "saved $REC"
fi
git checkout --detach origin/main || exit 1
git status --porcelain                              # must be empty
[ "$(git rev-parse HEAD)" = "$(git rev-parse origin/main)" ] || exit 1
```

Mention a saved `recovery/` branch in your final reply. Don't push or delete it.

`~/.local/bin/gh` is the fleet wrapper on PATH; it automatically authenticates `ruhdacted-gaming` repos with the `supiriority` token. Never run `gh auth switch`.

If `gh pr list --state open --search "head:data/"` shows a PR from an earlier run, continue it from step 5 instead of starting over. Only continue a PR from this repo into `main` whose branch starts with `data/`. Start from exactly what is published, so the review covers what will be merged:

```sh
git fetch origin <branch> && git checkout -B <branch> FETCH_HEAD || exit 1
[ "$(git rev-parse HEAD)" = "$(gh pr view <N> --json headRefOid -q .headRefOid)" ] || exit 1
```

If this run saved a `recovery/` branch, look at `git diff HEAD <recovery branch>`: it may hold a review fix the crashed run never pushed. Re-apply what is still needed, commit and push it before the next review round.

## 2. Research each due game

Follow `research/BRIEF.md`. Only research what can have changed:

- the current season's end date
- the next season: start, name, patch, theme, and whether it has been announced at all
- a season that recently ended

Read the posts in the game's open `season-watch` issues (`gh issue view N`) first. Then check one or two of the sources in `CLAUDE.md` to confirm. Don't re-research old seasons.

PD2's news page (projectdiablo2.com/news) only renders with JavaScript, so read its posts from the API instead: `curl -fsSg 'https://api.projectdiablo2.com/social/article?$limit=10&$sort[created_at]=-1'` returns each post's `title`, `content` and `updated_at`. Go by `updated_at`; the list isn't strictly in date order.

For each game:

1. Edit `research/<game>.json`: change only what the sources support, and set `"checked"` to today's date.
2. Run `node research/merge.mjs <game>`.
3. In `seasons.js`, update the current season's hand-set fields if needed:
   - Remove `endEstimate` once an official `end` exists.
   - Update `note` and `events` (PTRs and the like) to match announcements.
   - Datamined or rumoured dates go in `note` or `endEstimate`, never in `end`.

### WoW Forever (`wow-forever`)

WoW Forever is a roadmap game: `research/wow-forever.json` has `milestones`, not seasons. Follow the "Roadmap games" section of `research/BRIEF.md`. Only research what can have changed:

- the next dated milestone: is the date unchanged, and has Blizzard now given a time?
- every milestone that has only a `window`: has Blizzard announced a date? If so, set `start` and set `window` to null.
- new items Blizzard has added to the roadmap, and items it has dropped or moved to another window.

Start with the `season-watch` issue posts. Then check Blizzard's WoW news (news.blizzard.com/en-us/world-of-warcraft) for posts about WoW Forever, and the roadmap in the newest roadmap post. warcraft.wiki.gg/wiki/World_of_Warcraft:_Forever is a cross-check only.

Then run `node research/merge.mjs wow-forever`. If you added a milestone that deserves its own page (a dated content drop people will search for), add `page`, `pageTitle` and `summary` to it in `seasons.js`. Copy them from an existing milestone. Never write a date into `pageTitle` or `summary`; `check.mjs` rejects it. Never rename an `id`, because it is the page URL.

A window turning into a date, a date moving, or a milestone being added or removed counts as "dates changed" (step 4). Otherwise it's a no-change re-check (step 3).

Then set `verified` in `seasons.js` to today and run `npm run build`. It runs `scripts/check.mjs` first and must pass.

Stage only the data files, never `git add -A` or `commit -a`:

```sh
git add seasons.js research/<game>.json ...
git status --porcelain   # nothing else may be modified
```

## 3. Nothing changed

If the only changes are `checked` and `verified`, push them straight to main:

```sh
git commit -m "Re-check <games>: no date changes" -m "Closes #N, closes #M"
git push origin HEAD:main
```

The push deploys the site. You're done; skip to step 6.

## 4. Dates changed: open a PR

```sh
git switch -C data/<YYYY-MM-DD>-<games>   # -C: an earlier merged run today may have left the name behind
git commit -m "<Game>: <what changed>"
git push -u origin HEAD
gh pr create --fill-first --body "<body>"
```

Write a PR body that lists:

- each changed field, as old value → new value, with its source URL and confidence
- anything you couldn't confirm
- `Closes #N` for each `season-watch` issue handled

Register the PR with T3's `link_pull_request`.

## 5. GPT review loop

Ask GPT to review the PR with T3 `delegate_task`:

- `target: { providerInstanceId: "codex", model: <the newest GPT model in orchestrator_capabilities> }`
- `mode: "wait"`
- a new `clientRequestId` for each round

The prompt needs:

- the PR number and `gh pr diff <N>`
- that it must only read: no file edits, commits, pushes or PR changes
- `research/BRIEF.md` and the "Data accuracy" section of `CLAUDE.md`
- the instruction to open every cited source and confirm that each changed date, time and timezone conversion matches it
- the instruction to reply `APPROVE`, or else a numbered list of required fixes
- every earlier round's findings and your responses

Before each round, record the PR's head commit: `gh pr view <N> --json headRefOid -q .headRefOid`. An approval only covers that commit.

After each round:

- Post GPT's verdict on the PR with `gh pr comment`.
- If GPT asked for fixes, fix them, push, and run another round.
- If GPT asked for something you believe is wrong, explain why in the next round's prompt.

When GPT replies `APPROVE`, merge exactly the commit it reviewed:

```sh
gh pr merge <N> --squash --delete-branch --match-head-commit <reviewed sha>
```

If the merge is refused because the head moved, run another review round. The merge deploys the site.

Stop and leave the PR open, without merging, in either case:

- After 3 rounds without approval. Comment the unresolved objections on the PR.
- If Codex can't run, for example because its login expired. Comment why on the PR.

## 6. Finish

Delete the lock directory (`rm -rf ~/Dev/supiriority/infinite-seasons-bot.lock`). Your final reply goes back to the user. Keep it to a few lines:

- what changed, with old → new dates
- the PR link, if there is one
- anything left open
