# Phase 3: Discoverability - Context

**Gathered:** 2026-03-17
**Status:** Ready for planning

---

<domain>
## Phase Boundary

Phase 3 delivers discoverability features: RSS feed for subscribers, sitemap for search engines, and SEO meta tags for better search/social sharing.

**In scope:**
- RSS/Atom feed generation (jekyll-feed plugin)
- Sitemap generation (jekyll-sitemap plugin)
- Unique title tags for all pages
- Meta descriptions for all pages
- Open Graph tags for social sharing

**Out of scope (deferred to v2+):**
- Custom analytics integration
- Schema.org structured data
- Rich snippets optimization

</domain>

<decisions>
## Implementation Decisions

### SEO Include Structure
- **Create:** `_includes/seo.html` as a reusable include
- **Include in:** `_includes/head.html` to apply site-wide
- **Benefits:** Single source of truth, easy to maintain

### Title Format
- **Posts/Pages:** `{{ page.title }} | {{ site.title }}`
- **Homepage:** `{{ site.title }}` (no suffix needed)

### Meta Description
- **Source:** `page.description` from front matter
- **Fallback:** `site.description` for homepage
- **SEO best practice:** 150-160 characters

### Open Graph Tags
- **Required:** og:title, og:description, og:url, og:type, og:site_name
- **Optional:** og:image (can defer default image creation)
- **Type:** "article" for posts, "website" for pages

### Twitter Cards
- **Include:** Yes, alongside OG tags
- **Card type:** `summary_large_image`

### Default OG Image
- **Phase 3:** Skip default image (requires graphic design)
- **Future:** Add `/assets/og-image.jpg` in v2

### Front Matter Updates
- Update `index.html` with description
- Update `about.md` with description
- Future posts should include description (documented, not enforced)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase Context
- `.planning/ROADMAP.md` — Phase 3 goal and success criteria
- `.planning/REQUIREMENTS.md` — DISC-01 through DISC-04 requirements
- `.planning/phases/03-discoverability/03-RESEARCH.md` — Jekyll plugin patterns

### Phase 1 Decisions (Inheritance)
- `.planning/phases/01-foundation/01-foundation-CONTEXT.md` — head.html structure to extend
- `_includes/head.html` — Current head.html to modify

</canonical_refs>

<specifics>
## Specific Ideas

- SEO include should check for page.title/page.description before falling back to site defaults
- Use Liquid conditionals to set og:type based on layout
- Sitemap and RSS are automatic once plugins are confirmed in Gemfile
- Test feeds at /feed.xml and /sitemap.xml after build

</specifics>

<deferred>
## Deferred Ideas

- Default Open Graph image (`/assets/og-image.jpg`)
- Schema.org structured data (JSON-LD)
- Twitter handle in Twitter Card tags
- Pinterest Rich Pins verification

</deferred>

---

*Phase: 03-discoverability*
*Context gathered: 2026-03-17*
