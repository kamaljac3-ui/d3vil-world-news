// Sends today's edition as a Kit (ConvertKit) broadcast, styled as a
// black/white/gray broadsheet digest matching the site's own look.
// Runs in CI only — see .github/workflows/deploy.yml. Needs KIT_API_KEY and
// POST_FILE (e.g. "posts/2026-09-14.html") set in the environment.
//
// Uses only Node's built-in fetch/fs (no npm install step needed in CI).
// Deliberately avoids Google Fonts / flexbox / CSS variables / gradients —
// email clients (Outlook especially) strip or mangle all of those. Georgia
// is a web-safe serif that renders consistently everywhere and gives the
// newspaper feel without relying on a web font load.
//
// IMPORTANT: as of 2026-09-14 this broadcast is sent to the WHOLE Kit
// account (no subscriber_filter), not just a "world-news-subscriber" tag —
// see the note above main()'s broadcast body for why. Briefly: there is no
// Kit automation auto-tagging new World News signups (the account's plan
// caps Visual Automations at 1, already used by Sports, and the older
// Rules feature is also plan-gated), so tag-scoping was silently excluding
// real subscribers. D3vil Sports' script made the same change the same
// day. Revisit once auto-tagging is fixed or the two lists are meant to
// diverge again.

const fs = require("fs");

const SITE_URL = "https://kamaljac3-ui.github.io/d3vil-world-news";

const REGION_META = {
  americas: "AMERICAS",
  europe: "EUROPE",
  "middle-east": "MIDDLE EAST",
  africa: "AFRICA",
  asia: "ASIA",
};

const REGION_ORDER = ["americas", "europe", "middle-east", "africa", "asia"];

function stripTags(s) {
  return s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function extract(html, regex, label, postFile) {
  const m = html.match(regex);
  if (!m) throw new Error(`Could not find ${label} in ${postFile}`);
  return m[1].trim();
}

function extractRegionLead(html, regionId) {
  const sectionRe = new RegExp(
    `<section class="region-section" id="${regionId}">([\\s\\S]*?)<\\/section>`
  );
  const sectionMatch = html.match(sectionRe);
  if (!sectionMatch) return null;
  // Regions with nothing that day use a bare <p> with no <h3> — skip those.
  const storyMatch = sectionMatch[1].match(/<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/);
  if (!storyMatch) return null;
  return {
    headline: stripTags(storyMatch[1]),
    summary: stripTags(storyMatch[2]),
  };
}

function buildEmailHtml(postFile) {
  const html = fs.readFileSync(postFile, "utf8");

  const headline = stripTags(extract(html, /<h1>([\s\S]*?)<\/h1>/, "headline", postFile));
  const dateLabel = stripTags(
    extract(html, /class="post-header">[\s\S]*?class="date">([\s\S]*?)<\/div>/, "date", postFile)
  );
  const description = extract(
    html,
    /<meta name="description" content="([\s\S]*?)">/,
    "meta description",
    postFile
  );

  const postUrl = `${SITE_URL}/${postFile.replace(/\\/g, "/")}`;

  const featured = REGION_ORDER.map((id) => {
    const story = extractRegionLead(html, id);
    if (!story) return null;
    return Object.assign({}, story, { label: REGION_META[id] });
  }).filter(Boolean);

  const storyRows = featured
    .map(
      (s) => `
      <tr>
        <td width="6" style="width:6px; background:#111111; font-size:0; line-height:0;">&nbsp;</td>
        <td style="padding:0 0 0 14px;">
          <div style="font-family:Georgia,'Times New Roman',serif; font-size:11px; font-weight:bold; letter-spacing:1.5px; color:#b3261e; text-transform:uppercase; margin:0 0 4px;">${s.label}</div>
          <div style="font-family:Georgia,'Times New Roman',serif; font-size:17px; font-weight:bold; color:#111111; margin:0 0 6px; line-height:1.3;">${s.headline}</div>
          <div style="font-family:Georgia,'Times New Roman',serif; font-size:14px; line-height:1.55; color:#6e6e6e; margin:0;">${s.summary}</div>
        </td>
      </tr>
      <tr><td colspan="2" style="height:20px; line-height:20px; font-size:0;">&nbsp;</td></tr>`
    )
    .join("");

  const html_out = `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;">
  <tr>
    <td align="center" style="padding:28px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

        <!-- Masthead -->
        <tr>
          <td>
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td width="52" style="vertical-align:middle;">
                  <img src="${SITE_URL}/assets/devil-mascot.png" width="44" alt="" style="display:block; border:0; filter:grayscale(1);">
                </td>
                <td style="vertical-align:middle; padding-left:10px;">
                  <span style="font-family:Georgia,'Times New Roman',serif; font-size:30px; font-weight:bold; color:#111111; letter-spacing:-0.5px;">D<span style="color:#b3261e;">3</span>VIL WORLD NEWS</span>
                </td>
              </tr>
            </table>
            <div style="border-top:3px double #121212; margin-top:12px; padding-top:8px; font-family:'Courier New',monospace; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#6e6e6e;">
              Wire-Verified Daily Dispatch &nbsp;&bull;&nbsp; ${dateLabel}
            </div>
          </td>
        </tr>

        <tr><td style="height:24px; line-height:24px; font-size:0;">&nbsp;</td></tr>

        <!-- Lead story -->
        <tr>
          <td>
            <div style="font-family:Georgia,'Times New Roman',serif; font-size:26px; line-height:1.28; font-weight:bold; color:#111111; margin:0 0 12px;">${headline}</div>
            <div style="font-family:Georgia,'Times New Roman',serif; font-size:16px; line-height:1.6; color:#333333; margin:0 0 18px;">${description}</div>
            <a href="${postUrl}" style="display:inline-block; padding:11px 22px; background:#111111; color:#ffffff; text-decoration:none; font-family:Georgia,'Times New Roman',serif; font-weight:bold; font-size:14px;">Read the Full Edition &rarr;</a>
          </td>
        </tr>

        <tr><td style="height:26px; line-height:26px; font-size:0;">&nbsp;</td></tr>
        <tr><td style="border-top:1px solid #cccccc;">&nbsp;</td></tr>
        <tr><td style="height:22px; line-height:22px; font-size:0;">&nbsp;</td></tr>

        <!-- Also in today's edition -->
        <tr>
          <td style="font-family:'Courier New',monospace; font-size:12px; font-weight:bold; letter-spacing:2px; text-transform:uppercase; color:#6e6e6e; padding-bottom:16px;">
            Also In Today's Edition
          </td>
        </tr>
        <tr>
          <td>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              ${storyRows}
            </table>
          </td>
        </tr>

        <tr><td style="border-top:1px solid #cccccc;">&nbsp;</td></tr>
        <tr><td style="height:18px; line-height:18px; font-size:0;">&nbsp;</td></tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="font-family:Georgia,'Times New Roman',serif; font-size:11px; letter-spacing:0.5px; color:#6e6e6e; line-height:1.7;">
            D3VIL WORLD NEWS is an AI-assisted synthesis of wire reporting (AP, Reuters, AFP),<br>
            cross-checked before publication. Not staffed by human reporters.
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>`.trim();

  return { emailHtml: html_out, headline, description, postUrl };
}

async function main() {
  const postFile = process.env.POST_FILE;
  const apiKey = process.env.KIT_API_KEY;
  if (!postFile) throw new Error("POST_FILE not set");
  if (!apiKey) throw new Error("KIT_API_KEY not set");

  const { emailHtml, headline, description } = buildEmailHtml(postFile);

  const res = await fetch("https://api.kit.com/v4/broadcasts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": apiKey,
    },
    body: JSON.stringify({
      subject: `D3vil World News — ${headline}`,
      preview_text: description.slice(0, 140),
      content: emailHtml,
      description: `Auto-sent for ${postFile}`,
      public: false,
      send_at: new Date().toISOString(),
      // DELIBERATELY UNSCOPED (whole account) as of 2026-09-14, by kamal's
      // explicit choice — see the matching note in D3vil Sports'
      // send-newsletter.js and AGENT_INSTRUCTIONS.md's newsletter section.
      // Short version: this site still has no working auto-tag automation
      // (Kit's 1-Visual-Automation plan cap already used by Sports), so
      // tag-scoping was silently excluding real World News subscribers.
      // Both sites now send to everyone on the account until that's fixed.
    }),
  });

  const body = await res.text();
  if (!res.ok) {
    throw new Error(`Kit API error ${res.status}: ${body}`);
  }
  console.log("Broadcast created:", body);
}

module.exports = { buildEmailHtml };

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
