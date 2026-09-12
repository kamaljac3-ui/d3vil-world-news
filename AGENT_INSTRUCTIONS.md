# D3vil World News — daily update procedure

This file is the complete, self-contained procedure for producing one
day's edition. It is a pilot: **two regions only** (Americas, Europe) —
do not add Middle East & Africa or Asia-Pacific until this procedure has
run cleanly for a while. Verification matters far more here than on
D3vil Sports: a wrong score is embarrassing, a wrong casualty count or
misattributed quote is a real credibility and liability problem. When in
doubt, cut the story rather than run it thin.

## 1. Figure out "today"

Run `date -u +%Y-%m-%d` (UTC). If `posts/<date>.html` already exists,
stop — today's edition is already done, do not duplicate it.

## 2. Source tiers (non-negotiable)

- **Tier 1 — primary.** AP, Reuters, AFP. Every story needs at least one
  of these underneath it. If a story hasn't reached a wire service yet,
  it doesn't run — no exceptions, no matter how widely a non-wire outlet
  is reporting it.
- **Tier 2 — corroboration only.** Straight-news wires and desks (BBC
  News, NPR, Al Jazeera's hard-news reporting, DW) and regional
  independent press. Usable to confirm a Tier 1 story or add on-the-ground
  context. **Never** the sole basis for a claim — a Tier 2-only story
  doesn't run yet either.
- **Denylist.** CNN, NBC/MSNBC, Fox, and similar cable/network
  commentary-driven outlets. Don't cite them, don't use them even as a
  tiebreaker. (They mostly repackage the same wire copy anyway — if the
  story's real, AP/Reuters/AFP will have it.)
- **Two-source rule for anything specific.** Any casualty count, quote,
  attribution, or contested claim needs 2+ independent Tier-1/2 sources
  actually agreeing on the number/wording before it's stated as settled
  fact. If sources disagree or it's still developing, say so in the story
  itself (e.g. "Reuters reports at least 12 dead; AP has not yet
  confirmed a figure") rather than picking one number and presenting it
  as certain.
- **No motive/intent speculation.** Report what happened and what was
  directly quoted/reported. Don't infer why someone acted unless a source
  states it explicitly and it's attributed to them, not asserted as fact.

## 3. Gather material, per region

Cover both, in this order: **Americas, Europe**.

For each region:

1. Check AP, Reuters, and AFP's world/region news feeds directly — not
   just a generic search, which tends to surface aggregator copy rather
   than the wire's own reporting.
2. Search a direct, date-anchored query too: `"<region>" news "<today's
   date>"` — a generic topic search skews toward whatever's most-linked,
   which is often days old.
3. **Freshness bar:** same principle as sports, higher stakes here — a
   story is only current if the underlying event happened in the last
   24-48 hours, or there's a genuine new development on an ongoing
   story (a fresh casualty update, a new statement, an escalation). A
   recycled explainer on an old event doesn't count as today's news.
4. **Verify the date, not just the sourcing.** Multiple outlets agreeing
   proves a story is real, not that it's current — a well-corroborated
   story can still be a year stale. If you can reach the actual article,
   check its dateline. Don't infer recency from a headline or snippet
   alone.
5. From everything gathered, pick the 3-5 most substantial, verified
   stories per region — the ones that actually matter, not just
   whatever's most search-engine-visible. It's fine for a region to run
   with 1-2 stories on a genuinely quiet day; don't pad with marginal
   items to hit a number.
6. If nothing in a region clears the two-source bar that day, the section
   still appears (for the jump-nav anchor) with a single line: "Nothing
   met this edition's verification bar today." Do not lower the bar to
   fill space.

## 4. Write it up — rules (non-negotiable)

- Every story in your own original words — 2-3 sentences on what
  happened and why it matters. Never copy sentences from a source.
- At most one short quote per story, under 15 words, attributed by name.
- Paraphrase headlines rather than reproducing a distinctive one verbatim.
- Link every source actually used — if two sources corroborate a story,
  cite both.
- Neutral, factual voice throughout. No editorializing, no loaded framing
  of one side of a conflict/dispute, no adjectives implying a verdict the
  sources themselves haven't reached.

## 5. Build today's post page

Copy an existing `posts/<date>.html` as a structural template once one
exists (until then, build from `index.html`'s head/theme-toggle
boilerplate). Keep: the same `<head>` font links, the theme-toggle
`<script>` and button, the `.top-rule` div, and a `.jump-nav` with two
anchors (Americas, Europe). Use two `<section class="region-section"
id="americas">` / `id="europe">` blocks, each containing that region's
`.story` divs:

```html
<div class="story">
  <h3>Short original headline</h3>
  <p>2-3 sentence original summary.</p>
  <p class="src">Sources: <a href="https://...">AP</a>, <a href="https://...">Reuters</a></p>
</div>
```

For a still-developing story, add a line inside the paragraph or as its
own line: `<span class="unconfirmed">Not yet independently confirmed.</span>`

- `<title>`: `Month D, YYYY — D3vil World News`.
- Meta description: one sentence on the edition's lead story.
- `.post-header .date` / `<h1>`: human-readable date and an actual
  headline for the day's lead story (not "Daily Edition").

## 6. Add the entry to the homepage

Insert a new `.post-card` right after `<!-- POSTS:START -->` in
`index.html` (newest first):

```html
<a class="post-card" href="posts/<date>.html">
  <div class="date">Month D, YYYY</div>
  <h2>Same headline as the post page</h2>
  <p>One-sentence teaser across both regions.</p>
</a>
```

Leave earlier cards in place — pruning happens in step 8.

## 7. Update the "latest" alias

```
cp posts/<date>.html posts/latest.html
```
(PowerShell: `Copy-Item posts/<date>.html posts/latest.html -Force`.)

## 8. Enforce 7-day retention

Same policy as D3vil Sports — keep only the 7 most recent dated posts.

```
ls posts/*.html | grep -v 'posts/latest.html' | sort | head -n -7
```

For each file that comes back: `git rm posts/<date>.html`, and remove its
matching `.post-card` block from `index.html`. If there are 7 or fewer
dated posts total, skip this step.

## 9. Commit and push

```
git add index.html posts/
git commit -m "Add <date> edition"
git push
```

Pushing to `main` triggers the GitHub Pages deployment
(`.github/workflows/deploy.yml`). **There is no newsletter or audio job
on this repo yet** — don't send an email or generate audio; those aren't
wired in until this pipeline has run reliably for a while.

## 10. If something fails

If a wire feed is unreachable or nothing clears the two-source bar for a
region, don't block the whole edition — use the "nothing met the
verification bar" line for that region and continue. Always commit and
push whatever was successfully verified. When genuinely unsure whether a
story clears the bar, leave it out — the cost of a missed story is much
lower than the cost of a wrong one here.
