# Season research run

You were started by the T3 webhook that `.github/workflows/watch.yml` calls when one or more games are due for a check. The webhook body lists the games, why each is due, and any open `season-watch` issues (new official posts).

Accuracy is the whole product. A wrong date is far worse than a stale one. When in doubt, leave the data alone and say so in the PR or issue.

## 1. Workspace

Work only in the bot worktree, `D:/Dev/infinite-seasons-bot`, never in the main checkout (the user may be working there).

Only one run at a time. If `D:/Dev/infinite-seasons-bot.lock` exists and is less than 6 hours old, another run is in progress. Stop and say so. Otherwise write the current time into the lock file, and delete it when you finish, however the run ends.

```sh
cd D:/Dev
git -C infinite-seasons worktree add --detach ../infinite-seasons-bot origin/main 2>/dev/null
cd D:/Dev/infinite-seasons-bot
git fetch origin
```

If `git status --porcelain` shows changes, an earlier run crashed. Save them with `git diff > ../infinite-seasons-bot-<YYYY-MM-DD>.patch`, mention the patch in your final reply, and then clean up:

```sh
git checkout --detach origin/main && git reset --hard origin/main && git clean -fd
```

`gh` lives at `$LOCALAPPDATA/Programs/gh/bin/gh.exe` if it isn't on PATH. If `gh auth status` says you're not logged in, give it the repo's stored git credential for this shell:

```sh
export GH_TOKEN=$(printf "protocol=https\nhost=github.com\nusername=supiriority\n\n" | git credential fill | sed -n 's/^password=//p')
```

If `gh pr list --state open --search "head:data/"` shows a PR from an earlier run, check it out and continue from step 5 instead of starting over.

## 2. Research each due game

Follow `research/BRIEF.md`. Only research what can have changed:

- the current season's end date
- the next season: start, name, patch, theme, and whether it has been announced at all
- a season that recently ended

Read the posts in the game's open `season-watch` issues (`gh issue view N`) first. Then check one or two of the sources in `CLAUDE.md` to confirm. Don't re-research old seasons.

For each game:

1. Edit `research/<game>.json`: change only what the sources support, and set `"checked"` to today's date.
2. Run `node research/merge.mjs <game>`.
3. In `seasons.js`, update the current season's hand-set fields if needed:
   - Remove `endEstimate` once an official `end` exists.
   - Update `note` and `events` (PTRs and the like) to match announcements.
   - Datamined or rumoured dates go in `note` or `endEstimate`, never in `end`.

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
git switch -c data/<YYYY-MM-DD>-<games>
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

Delete the lock file. Your final reply goes back to the user. Keep it to a few lines:

- what changed, with old → new dates
- the PR link, if there is one
- anything left open
