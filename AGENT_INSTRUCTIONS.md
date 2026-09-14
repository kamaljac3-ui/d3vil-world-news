# D3vil World News — daily update procedure

This file is the complete, self-contained procedure for producing one
day's edition, across **five regions**: Americas, Europe, Middle East,
Africa, Asia. Verification matters far more here than on D3vil Sports: a
wrong score is embarrassing, a wrong casualty count or misattributed
quote is a real credibility and liability problem. When in doubt, cut
the story rather than run it thin — it's fine, even expected, for a
region to come up short, or entirely empty, on a genuinely quiet day
(see step 4.6). This site runs on two independent gates, and a story
needs to clear **both** before it's included: the source-tier rules in
step 2, and the significance bar in step 3.

## 1. Figure out "today"

Run `date -u +%Y-%m-%d` (UTC). If `posts/<date>.html` already exists,
stop — today's edition is already done, do not duplicate it.

## 2. Source tiers (non-negotiable)

- **Tier 1 — primary.** AP, Reuters, AFP. Every story needs at least one
  of these underneath it. If a story hasn't reached a wire service yet,
  it doesn't run — no exceptions, no matter how widely a non-wire outlet
  is reporting it.
- **Tier 2 — corroboration only.** Straight-news wires and desks (BBC
  News, NPR, Al Jazeera's hard-news reporting, DW, Al Arabiya English,
  Arab News) and regional independent press. Usable to confirm a Tier 1
  story or add on-the-ground context. **Never** the sole basis for a
  claim — a Tier 2-only story doesn't run yet either.
- **Preference on Middle East sourcing.** For anything touching
  Israel/Lebanon/Gaza, prefer Tier 1 wires and pan-Arab desks (Al
  Jazeera, Al Arabiya, Arab News) over Israeli outlets (Times of Israel,
  Haaretz, Jerusalem Post) when a claim is covered by both — this is a
  deliberate editorial choice, not a sourcing-quality judgment. Israeli
  outlets aren't banned and can still corroborate a claim if nothing
  else does, but they shouldn't be the visible citation when an
  alternative exists.
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
- **Practical note: WebFetch does not work in the scheduled cloud
  routine's environment, for almost any news domain — not just AP and
  Reuters.** Confirmed 2026-09-13: the automated run's own connectivity
  test found aljazeera.com, arabnews.com, bbc.com, dw.com, npr.org,
  abcnews.com, thehill.com, kathmandupost.com — even google.com and
  example.com as controls — all returned `EGRESS_BLOCKED`/403 from that
  sandbox's network proxy. This is a stronger restriction than an
  earlier version of this note suggested (which only called out AP/
  Reuters specifically) — in the cloud routine, treat WebFetch as
  unusable for sourcing, full stop. **Do not spend any budget trying it
  or re-trying it "just in case"** — on 2026-09-13 the routine burned
  several minutes and a meaningful chunk of its rate-limit budget
  attempting WebFetch verification calls that failed one after another,
  then hit its session limit before it had written or pushed anything at
  all, so the entire edition silently never happened. Rely entirely on
  WebSearch result snippets — they do surface and quote wire
  attribution directly ("Reuters reports...", "...told The Associated
  Press", a URL path like `/wireStory/` or `ap-international`) — and
  treat that as sufficient to satisfy Tier 1, without a WebFetch
  double-check step. Once every region has reported candidates back,
  go straight to compiling and writing — an extra verification pass is
  not worth risking the whole edition over.

## 3. Significance bar — what actually counts as a story

This site is not trying to cover everything that happened — it's trying
to cover what actually matters. Passing the source-tier bar in step 2
makes a claim safe to publish; it does not make it worth publishing.
Apply this bar per story, per region, before it even gets to sourcing.
This bar was deliberately widened from an earlier, stricter draft after
finding that five regions with only mass-casualty/war/leadership-change
stories left most regions blank most days — the categories below,
especially the "recurring beats" one, are the fix, not a loophole.

**Qualifies — leadership & state:**
- A head of state or government loses power: election defeat,
  resignation, ouster, coup, impeachment, assassination.
- A notable national election in a major country, even without an
  incumbent losing.
- Legal or criminal proceedings against a sitting or former head of
  state, head of government, or similarly major national figure.
- A ruling or vote that changes a country's leadership, government, or
  constitutional order (a court removing a president, an election
  voided, a snap dissolution of parliament).

**Qualifies — violence & conflict:**
- Mass-casualty violence with a real reported toll — an attack, massacre,
  bombing, or armed clash with a meaningful death toll, or a smaller but
  clearly escalatory attack (e.g. on a capital, a government target, a
  peacekeeping force).
- Significant civil unrest or protest with real casualties or major
  disruption (a capital shut down, a government building stormed) —
  doesn't require a mass-casualty threshold on its own.
- War: a new offensive, a ceasefire, a major battlefield shift, or a
  war's outbreak.

**Qualifies — state relations & economy:**
- A material rupture between states: trade suspended, diplomatic
  relations severed or downgraded, new sanctions imposed, an ambassador
  expelled, a border closed.
- A major central bank decision or economic shock with broad
  international significance (not a routine data print).
- A significant advance or setback in a major ongoing negotiation —
  peace talks, a major trade deal — even without final resolution.

**Always qualifies — recurring global beats (these don't need to hit the
categories above; they're legitimate world news on their own terms):**
- A landmark, round-number anniversary of a globally significant historic
  event (a 25th, 50th, etc.) with an official national or international
  commemoration — found missing from this list during the first real run
  (2026-09-12) when the 25th anniversary of 9/11 fell on the edition's
  own coverage day and got skipped for not fitting any other category.
  Cite the event's own official source (a memorial institution, a
  government commemoration page) alongside a Tier 1/2 news outlet where
  one exists — an official program page is a legitimate primary source
  for describing what the ceremony itself is and when it happens.
- A natural disaster hitting with major real impact — a hurricane,
  typhoon, earthquake, or tsunami that has actually made landfall/struck
  with casualties or significant displacement, not a forecast or
  warning.
- A global summit or multilateral proceeding — a climate summit (COP),
  G7/G20, a UN General Assembly session, a WHO assembly, a major trade
  bloc negotiation. Cover real developments, disagreements, or
  announcements from these; they don't need a single tidy "concrete
  outcome" the way an ordinary diplomatic visit would.
- A major international sporting event with genuine cross-border/
  geopolitical reach — a World Cup, the Olympics, a continental
  championship, a host country's preparations or controversies. This is
  **not** routine domestic league coverage (NFL, NBA, EPL, etc.) — that
  stays D3vil Sports' beat, not this site's. It's specifically for
  events that are themselves world news.

**Still does not qualify — leave these out even if wire-sourced and
true:**
- A routine bilateral visit or photo-op with no summit-level
  significance and no real development to report.
- Ordinary court rulings, legislative votes, or policy announcements
  below head-of-state/major-figure scale.
- Routine economic data releases (GDP prints, inflation figures) absent
  an actual shock.
- Isolated local crime, or small protests without real disruption or
  casualties.
- Celebrity, royal, or human-interest stories.
- Speculative "could happen" pieces — analysis of what a leader might do
  — rather than something that already happened.

A story must clear this bar **and** the sourcing rules in step 2 to run.
With the "recurring beats" category, a genuinely blank region should be
rare — there's almost always a summit, disaster, or major international
sporting storyline somewhere most days. If a region still comes up
empty after checking all of the above, see step 4.6.

## 4. Gather material, per region

Cover all five, in this order: **Americas, Europe, Middle East, Africa,
Asia**. (Middle East and Africa are kept separate rather than combined —
lumping them together tends to under-cover one or the other. "Asia"
here means all of Asia-Pacific: East Asia, South Asia, Southeast Asia,
and Oceania.)

**Americas means all of it, deliberately.** A generic "Americas news"
search skews heavily toward the US and, to a lesser extent, Canada —
this produced an Americas section with nothing in it on 2026-09-12,
even though the same day had two genuinely significant, easily-findable
stories in Chile and Argentina once someone actually looked. Central
and South America together cover more countries than any other region
on this site — an empty or US-only Americas section is far more likely
to be a research gap than an actually quiet day. Every edition, run
targeted searches for Central America and South America specifically
(not just a broad "Americas" query), and check at minimum: Mexico,
Brazil, Argentina, Colombia, and whichever other countries have an
ongoing major storyline (elections, unrest, disputes, disasters).

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
5. Include every story from that region that clears **both** the
   significance bar (step 3) and the two-source verification bar
   (step 2) — don't cap at a fixed count, and don't pad with marginal
   items to hit one. A heavy-news day might produce four qualifying
   stories in one region; a quiet day might produce zero across several
   regions. Both outcomes are correct.
6. If nothing in a region clears both bars that day, the section still
   appears (for the jump-nav anchor) with a single line: "Nothing met
   this edition's bar for significance and verification today." Do not
   lower either bar to fill space.

## 5. Write it up — rules (non-negotiable)

- Every story in your own original words — 2-3 sentences on what
  happened and why it matters. Never copy sentences from a source.
- At most one short quote per story, under 15 words, attributed by name.
- Paraphrase headlines rather than reproducing a distinctive one verbatim.
- Link every source actually used — if two sources corroborate a story,
  cite both.
- Neutral, factual voice throughout. No editorializing, no loaded framing
  of one side of a conflict/dispute, no adjectives implying a verdict the
  sources themselves haven't reached.

## 6. Build today's post page

Copy an existing `posts/<date>.html` as a structural template once one
exists (until then, build from `index.html`'s head/theme-toggle
boilerplate). Keep: the same `<head>` font links, the theme-toggle
`<script>` and button, the `.top-rule` div, and a `.jump-nav` with five
anchors (Americas, Europe, Middle East, Africa, Asia). Use five
`<section class="region-section" id="...">` blocks — ids `americas`,
`europe`, `middle-east`, `africa`, `asia`, in that order — each
containing that region's `.story` divs:

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

## 7. Add the entry to the homepage

Insert a new `.post-card` right after `<!-- POSTS:START -->` in
`index.html` (newest first):

```html
<a class="post-card" href="posts/<date>.html">
  <div class="date">Month D, YYYY</div>
  <h2>Same headline as the post page</h2>
  <p>One-sentence teaser spanning the day's most important regions.</p>
</a>
```

Leave earlier cards in place — pruning happens in step 9.

## 8. Update the "latest" alias

```
cp posts/<date>.html posts/latest.html
```
(PowerShell: `Copy-Item posts/<date>.html posts/latest.html -Force`.)

## 9. Enforce 7-day retention

Same policy as D3vil Sports — keep only the 7 most recent dated posts.

```
ls posts/*.html | grep -v 'posts/latest.html' | sort | head -n -7
```

For each file that comes back: `git rm posts/<date>.html`, and remove its
matching `.post-card` block from `index.html`. If there are 7 or fewer
dated posts total, skip this step.

## 10. Commit and push

```
git add index.html posts/
git commit -m "Add <date> edition"
git push
```

Pushing to `main` triggers the GitHub Pages deployment
(`.github/workflows/deploy.yml`), which also runs a `newsletter` job
(added 2026-09-14, mirrors D3vil Sports' exactly) — it detects a newly
added post in the push and sends it via Kit. **Do not manually re-run
the workflow or call the Kit API directly** — same anti-duplicate
reasoning as Sports' job; test newsletter HTML locally with `node -e
"require('./scripts/send-newsletter.js').buildEmailHtml('posts/<date>.html')"`,
which never touches the live API.

**Audience: sent to the whole Kit account, not just this site's tag
(changed 2026-09-14, kamal's explicit choice).** The broadcast used to
be scoped to the `world-news-subscriber` tag (id 23371637) only via
`subscriber_filter` in `scripts/send-newsletter.js`, matching
D3vil Sports' equivalent scoping to `sports-subscriber` (id 23371585).
That got dropped from both scripts the same day because World News
still has no working auto-tag automation (see the gap below) and the
tag filter was silently excluding real subscribers who never got
tagged. Until auto-tagging is fixed, both D3vil Sports and D3vil World
News broadcasts go to every subscriber on the account, sports fans and
world-news readers alike. If the two audiences are ever meant to
diverge again, restore the `subscriber_filter` block (see git history
around 2026-09-14 in this file, or D3vil Sports' equivalent script) in
both scripts together — not just one, or they'll disagree on scope.

**Known gap: new subscribers aren't auto-tagged.** D3vil Sports has a
Kit Visual Automation that auto-tags new signups, but the account's
plan caps Visual Automations at 1 (already used by Sports) and the
older Rules feature is also plan-gated — so there's currently no
automated way to tag new `world-news-subscriber` signups. This no
longer affects who *receives* the newsletter (see above — everyone
gets it regardless of tag for now), but the tags are still useful for
manually auditing/segmenting the list later, so keep tagging new World
News signups by hand when you notice them until the plan is upgraded
or a workaround exists. There is still no audio recap job —
explicitly out of scope for this site.

## 11. If something fails

If a wire feed is unreachable or nothing clears both bars for a region,
don't block the whole edition — use the "nothing met this edition's bar"
line for that region and continue. Always commit and push whatever was
successfully verified. When genuinely unsure whether a story clears
either bar, leave it out — the cost of a missed story is much lower than
the cost of a wrong or trivial one here.
