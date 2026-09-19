# 48th State World News — daily update procedure

(Rebranded from "D3vil World News" to "StateForty8" on 2026-09-15, then
again to "48th State" on 2026-09-16 — same repo, same site URL, same
automation, same icon, matching 48th State Sports' own second rebrand
the same day. **Asset filenames still say
"stateforty8" on purpose** — they're icon-only with no baked-in text,
so nothing about their pixel content changed in this second rebrand;
don't rename them, it'd just churn every reference for no visible
benefit. Logo mark is the same Arizona-outline saguaro icon used on the
Sports site, with a red sun ring accent (`--stamp`). **Two colorways,
both required — never use just one**: `stateforty8-mark-light.png`
(near-black lines + `#b3261e` sun, for the default light theme) and
`stateforty8-mark-dark.png` (cream lines + `#e0554a` sun, for the
toggled dark theme) — an earlier version used a single monochrome
asset plus a CSS `invert()` filter for dark mode, but that corrupts the
red sun's color when inverted, so it was replaced with real dual assets
swapped via CSS (`.mascot-light`/`.mascot-dark`, same pattern as the
existing sun/moon toggle icons) — never go back to the filter approach.
Masthead markup, stacked icon-over-wordmark:
`<img class="mascot mascot-light" src="assets/stateforty8-mark-light.png">`
+ `<img class="mascot mascot-dark" src="assets/stateforty8-mark-dark.png">`
+ `<div class="masthead"><span class="accent-char">48TH</span> STATE</div>`
+ `<div class="masthead-sub">WORLD NEWS</div>` — icon pair, then 48TH
STATE (48TH in accent color, STATE in the normal ink color — the accent
always sits on the distinctive/number word, which is why it moved from
FORTY8 to 48TH when the word order flipped), then WORLD NEWS.
Newsletter emails have a fixed (non-toggleable) white background, so
`scripts/send-newsletter.js` always uses the light variant only.
Favicon: `assets/stateforty8-favicon.png`. Linktree (shared with
Sports) is already on the new name at `linktr.ee/48thState` — this repo
was the last piece to catch up.)

**A separate `commentary/` section exists alongside the daily edition,
added 2026-09-19 — this file's procedure does not cover it and the
daily automated routine must never touch it.** It holds occasional
long-form opinion/analysis pieces (first one: "The Fall of the
Empire"), published roughly every one to two weeks, manually, by kamal
working directly with Claude — never by the scheduled cloud routine.
These pieces deliberately carry a point of view and use a distinct
"aged scroll" visual design, unlike the neutral wire-verified voice and
broadsheet look everywhere else on the site. `commentary/index.html` is
the archive listing; each piece is its own `commentary/<slug>.html`.
The daily routine should never create, edit, count, or reference
anything under `commentary/` — it is not one of the five regions, does
not factor into retention, and has its own separate promotion (a
`notice-box` link on the homepage, not a `posts/` entry).

This file is the complete, self-contained procedure for producing one
day's edition, across **five regions**: Americas, Europe, Middle East,
Africa, Asia. Verification matters far more here than on 48th State Sports: a
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

- **Tier 1 — primary.** AP, Reuters, AFP, plus other countries' own
  national wire services — journalistically equivalent, just not
  English-first: **Kyodo News** (Japan), **Yonhap** (South Korea),
  **PTI** and **IANS** (India — two independent national wires, added
  IANS 2026-09-16), **Antara** (Indonesia), **dpa** (Germany), **ANSA**
  (Italy), **EFE** (Spain — also the deepest wire coverage of Latin
  America), **The Canadian Press** (Canada — AP's exclusive domestic
  distributor there), **CNA** (Central News Agency, Taiwan — added
  2026-09-19; government-funded but no documented editorial interference,
  same structural profile as Kyodo/dpa), and **Agência Estado / Broadcast**
  (Brazil — added 2026-09-19; Grupo Estado's wire service, privately owned
  by the Mesquita family since 1970, not state-linked; added given Brazil's
  outsized story volume on this site, e.g. the Moraes/Supreme Court saga),
  **PA Media / Press Association** (UK — added 2026-09-19 after a UK
  government stockpiling-advice story was missed entirely: it was only
  carried by UK regional press republishing wire copy, and there was no
  UK-specific Tier 1 wire on this list to have caught it directly; PA
  Media is privately owned by ~26 national/regional publishers, not
  state-linked, same profile as The Canadian Press), and **Baltic News
  Service / BNS** (Estonia/Latvia/Lithuania — added 2026-09-19; private
  since founding in 1990, owned by Estonia's Postimees Group, partners
  directly with Reuters/AP/AFP).
  Added 2026-09-15 after the Java Sea
  ferry disaster got missed on an Asia pass despite the right search
  query — a national wire in the story's own region often surfaces
  something faster than a generic international search does. Every
  story still needs at least one of these underneath it. If a story
  hasn't reached any wire service yet, it doesn't run — no exceptions,
  no matter how widely a non-wire outlet is reporting it.
- **Tier 2 — corroboration only.** Straight-news wires and desks (BBC
  News, NPR, Al Jazeera's hard-news reporting, DW, Al Arabiya English,
  Arab News) and regional independent press — including, added
  2026-09-15: **The New Humanitarian** (crisis/disaster/displacement
  reporting, often ahead of Tier 1 on under-covered regions),
  **allAfrica.com** (an aggregator of African papers, not a source in
  its own right — cite the underlying paper it's carrying when
  possible), **BenarNews** (Southeast Asia security/politics),
  **Nikkei Asia**, **MercoPress** and **Buenos Aires Times** (South
  America/South Atlantic, English-language), **Mexico News Daily**,
  **The Tico Times** (Costa Rica), **Prensa Libre** (Guatemala/Central
  America), **InSight Crime** (Latin American organized-crime and
  security reporting — note: independent, field-researched, but rated
  left-center leaning by media-bias trackers, so pair its claims with a
  wire source rather than leaning on it alone), and, added 2026-09-16
  for South Asia security/diplomatic stories: **The Tribune (India)**
  and **Business Standard** (established mainstream Indian dailies
  with their own reporting, useful for texture beyond the PTI/IANS
  wire copy on an India/Pakistan story), and, added 2026-09-19:
  **Taipei Times** (Taiwan/cross-strait texture beyond CNA wire copy).
  Also added 2026-09-19, for Africa specifically — most African national
  news agencies are directly state-owned (Nigeria's NAN, Egypt's MENA,
  Morocco's MAP, Algeria's APS, Ethiopia's ENA), so there's no Tier 1
  wire-equivalent option there the way there is in Asia/Europe/Latin
  America; these are independent, privately-run outlets instead, still
  requiring a Tier 1 wire underneath any claim: **Premium Times** (Nigeria
  — investigative, grant/ad-funded, rated left-center leaning, pair with a
  wire source rather than leaning on it alone, same caveat as InSight
  Crime), **Daily Maverick** and **The Continent** (South Africa /
  pan-African weekly, private investigative), and **Nation Media Group /
  The East African** (Kenya — largest private media house in East Africa,
  for Horn/East Africa texture).
  Usable to confirm a Tier 1
  story or add on-the-ground context. **Never** the sole basis for a
  claim — a Tier 2-only story doesn't run yet either.
- **Not credible regardless of "non-mainstream" framing: state-run
  outlets.** RT, Xinhua, CGTN, Press TV, Prensa Latina (Cuba), **Anadolu
  Agency** (Turkey — added 2026-09-19; under direct Presidential
  Directorate control since a 2019 decree, with documented pro-government
  editorial bias — same profile as the others here, not a legitimate wire
  despite being widely cited internationally), **African News Agency /
  ANA** (South Africa — added 2026-09-19; explicitly excluded, not just
  unmentioned: launched in 2015 as SAPA's replacement and looks like a
  legitimate wire, but confirmed to have taken a R20m payment from South
  Africa's State Security Agency to run favorable coverage of then-
  President Zuma — a state-capture case, not a sourcing-quality edge
  case), **Agencia Venezolana de Noticias / AVN** (Venezuela — added
  2026-09-19; self-describes as the "informative organ of the Venezuelan
  State" under Maduro's Ministry of Communication — relevant given how
  often Venezuela shows up on this site), **MTI** (Hungary — added
  2026-09-19; nationalized into the state media conglomerate MTVA under
  the Orbán government since 2015), **Ukrinform** (Ukraine — added
  2026-09-19; Ukraine's state-owned news agency, and a direct party to the
  war it reports on, so not treated as a neutral wire despite the
  temptation given how much Ukraine coverage runs here — use Reuters/
  AP/AFP/dpa for the war itself and treat any Ukrinform claim the way a
  combatant government's own statements are treated, not as independent
  confirmation), and similar state-controlled
  agencies are excluded the same way the
  Denylist excludes CNN/Fox — being outside the Western mainstream
  press doesn't make an outlet independent. A story only they're
  carrying doesn't run; treat their reporting the same as an
  unconfirmed rumor even when it turns out true later.
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
  stays 48th State Sports' beat, not this site's. It's specifically for
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
**Canada is part of this region too and gets skipped just as easily** —
check it explicitly rather than assuming "Americas" coverage caught it;
The Canadian Press (Tier 1, step 2) is the fastest way to check. For
Central/South America specifically, EFE (Tier 1) usually has deeper
wire coverage than AP/Reuters alone, and MercoPress, Buenos Aires
Times, Mexico News Daily, The Tico Times, and InSight Crime (all
Tier 2 — see step 2 for InSight Crime's caveat) are worth a direct
check even when a generic search comes up empty.

**Asia needs the same treatment, added 2026-09-14.** A generic "Asia
Pacific news" search skews heavily toward business/markets coverage
(indices, chip stocks, central-bank-adjacent stories) — the same
failure mode that produced the empty Americas section on 2026-09-12,
just less visible because a market story fills the search results
instead of leaving it obviously blank. Asia-Pacific covers more
countries and more population than any other region on this site.
Every edition, run targeted searches by sub-region rather than one
broad "Asia" query, and check at minimum: China, Japan, the two
Koreas, India, Southeast Asia (Indonesia, Philippines, Myanmar,
Thailand, Vietnam), and the Pacific Islands — not just whichever
country dominates the business-news cycle that day. **Even the right
sub-region query can still miss a real story** — a Java Sea ferry
disaster (129 missing) slipped through on 2026-09-15 despite a
correctly-targeted Southeast Asia search that day. When a sub-region
search comes back with nothing but routine business/politics, also
check that sub-region's own national wire directly (Kyodo News for
Japan, Yonhap for Korea, PTI for India, Antara for Indonesia — see
step 2) rather than trusting one search's results as exhaustive.
**Explicit flag, added 2026-09-19 after kamal noticed the pattern:
this site kept defaulting back to Nepal's floods edition after
edition because it was already-sourced and easy, not because it was
the only real story in a region of ~4.7 billion people.** An ongoing
story with a real new development can still run, but it must not be
the region's only story two editions running — actively check China,
Japan, the Koreas, India, and Southeast Asia sub-regions fresh each
day rather than reaching for the story that's already half-written
from yesterday.

**Africa needs the same treatment, added 2026-09-17.** A generic
"Africa news" search skews toward whichever single country or analysis
piece dominates aggregator results that day, the same failure mode
that hit Americas (2026-09-12) and Asia (2026-09-14, 2026-09-16) —
Africa has 54 countries and this bit hardest of all three on
2026-09-17, when the section ran empty despite a mass-poisoning story
in Nigeria that clearly cleared the bar. Every edition, check at
minimum: West Africa (Nigeria explicitly — it alone has more people
than most other regions' entire country lists), the Sahel/Sudan
conflict zone, East Africa/the Horn (Ethiopia, Somalia, Kenya), the
DRC/Great Lakes conflict, and Southern Africa — not just whichever
country a single broad search happens to surface.

**When a targeted sub-region search still comes up empty, check that
region's daily digest page before concluding nothing happened — one
query, not a fishing expedition, so this doesn't blow the research
budget.** These digests reliably surface the day's real headlines even
when a generic search doesn't, because they're curated by people, not
ranked by generic relevance:
- **Africa**: search `allafrica.com "All of Africa Today" <month day,
  year>` — this is a daily aggregated front page and consistently has
  the day's top story within the first result.
- **Americas**: search `riotimesonline.com "Latin American Pulse" OR
  "Andean Region Briefing" <month day, year>` — same idea, a daily
  regional digest rather than a generic topic search.
- **Southeast Asia** (part of the Asia region): search `bernama.com
  "Top News Headlines" <month day, year>` — BERNAMA (Malaysia's
  national wire, Tier 1) runs a daily regional roundup.
This proved out immediately when tried on 2026-09-17: all three empty
regions (Americas, Africa, Asia) had real, wire-verifiable stories
sitting one digest-page query away.

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
5. **Target two stories per region, added 2026-09-19 at kamal's
   explicit request.** Not a hard floor you pad to hit — every story
   still has to clear both the significance bar (step 3) and the
   two-source verification bar (step 2) — but a region landing at one
   story (or zero) should be the result of genuinely exhausting the
   region's sub-areas, not of stopping the moment the first story was
   found. Include every qualifying story, capped at four per region so
   one heavy-news region doesn't dominate the edition; a quiet day can
   still land under two in a region, but only after real effort (see
   6 below), not by default.
6. **Don't let a single easy, ongoing story become the region's whole
   personality.** Asia in particular has repeatedly defaulted to
   whichever disaster was already running (Nepal's floods ran in
   multiple consecutive editions) because it's the path of least
   resistance — an already-verified, always-available story — while
   ~4.7 billion other people across China, Japan, the two Koreas,
   India, Southeast Asia, and the Pacific went unchecked that day. The
   same risk applies to Americas (an easy Brazil/Mexico headline
   standing in for all of Central and South America) and Africa (one
   country's story standing in for all 54). **Before settling on a
   second story from the same country/story-thread that already ran
   yesterday, check at least one other sub-region you haven't looked at
   yet.** An ongoing story with a genuine new development is fine to
   include, but region coverage should reflect the region's actual
   size — rotate sub-regions in, don't let one crisis carry the section
   day after day just because it's already sourced.
7. **Before writing a region off as empty or stuck at one story, run
   that region's daily digest query (above) if you haven't already.**
   Three of the four times a region has come up empty on this site
   (2026-09-12, -14, -16, -17), a real qualifying story existed and was
   found within one extra query once someone looked — treat "empty" or
   "only one story" as a signal to double-check, not a conclusion to
   accept on the first pass. If the digest query also turns up nothing
   further that clears the bar, the section appears with whatever
   qualifying stories were actually found (down to a single line if
   truly none did: "Nothing met this edition's bar for significance and
   verification today"). Do not lower either bar to fill space, and
   don't run more than one digest query per region — this is a targeted
   check, not a budget-draining search spree.

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

- `<title>`: `Month D, YYYY — 48th State World News`.
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

Same policy as 48th State Sports — keep only the 7 most recent dated posts.

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
(added 2026-09-14, mirrors 48th State Sports' exactly) — it detects a newly
added post in the push and sends it via Kit. **Do not manually re-run
the workflow or call the Kit API directly** — same anti-duplicate
reasoning as Sports' job; test newsletter HTML locally with `node -e
"require('./scripts/send-newsletter.js').buildEmailHtml('posts/<date>.html')"`,
which never touches the live API.

**Audience: sent to the whole Kit account, not just this site's tag
(changed 2026-09-14, kamal's explicit choice).** The broadcast used to
be scoped to the `world-news-subscriber` tag (id 23371637) only via
`subscriber_filter` in `scripts/send-newsletter.js`, matching
48th State Sports' equivalent scoping to `sports-subscriber` (id 23371585).
That got dropped from both scripts the same day because World News
still has no working auto-tag automation (see the gap below) and the
tag filter was silently excluding real subscribers who never got
tagged. Until auto-tagging is fixed, both 48th State Sports and D3vil World
News broadcasts go to every subscriber on the account, sports fans and
world-news readers alike. If the two audiences are ever meant to
diverge again, restore the `subscriber_filter` block (see git history
around 2026-09-14 in this file, or 48th State Sports' equivalent script) in
both scripts together — not just one, or they'll disagree on scope.

**Known gap: new subscribers aren't auto-tagged.** 48th State Sports has a
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
