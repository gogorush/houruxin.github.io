# Phase 2: Content - Context

**Gathered:** 2026-03-17
**Status:** Ready for planning

---

<domain>
## Phase Boundary

Phase 2 delivers the core content experience: homepage with blog post listings, individual post pages with clean typography, and an about page. Users can read published posts and understand the site author.

**In scope:**
- Post listing on homepage
- Individual post rendering with typography
- Post metadata (date, reading time)
- About page
- First blog post publication

**Out of scope (deferred to Phase 3+):**
- RSS/Atom feeds
- Sitemap generation
- SEO meta tags
- Categories/tags
- Pagination
- Search

</domain>

<decisions>
## Implementation Decisions

### Post Layout Structure
- **Layout:** `_layouts/post.html` extending `default.html`
- **Sections:** Title, metadata (date + reading time), content, optional footer
- **Typography:** Body 16px+, line-height 1.6+, max-width for readability

### Homepage Style
- **Simple list:** Post titles as links, show date below title
- **No excerpts in Phase 2** - keep it minimal
- Uses `site.posts` loop (no pagination until 15+ posts)

### Reading Time
- **Show:** Yes, displayed alongside date
- **Format:** "X min read"
- **Calculation:** word count / 200

### About Page
- **Location:** `about.md` in root
- **Permalink:** `/about/`
- **Layout:** Use `default.html` directly (or create `page.html` layout)
- **Content:** Basic intro about site author (placeholder for now)

### First Post
- **Topic:** Welcome/introduction post
- **Title:** "Welcome" or similar
- **Content:** Brief intro to the blog purpose

### Technical Consistency (from Phase 1)
- All internal links use `{{ '/path' | relative_url }}` filter
- Tailwind CSS v4 via CDN for styling
- Responsive containers for mobile/desktop

### Claude's Discretion

The following are implementation details left to planner discretion:
- Exact HTML structure for post listing
- Specific Tailwind utility classes for typography
- About page content (placeholder is fine)
- First post slug and exact content

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase Context
- `.planning/ROADMAP.md` — Phase 2 goal and success criteria
- `.planning/REQUIREMENTS.md` — CONT-01 through CONT-05 requirements
- `.planning/phases/02-content/02-RESEARCH.md` — Jekyll patterns and validation requirements

### Phase 1 Decisions (Inheritance)
- `.planning/phases/01-foundation/01-foundation-CONTEXT.md` — Config, baseurl, Tailwind, relative_url patterns

</canonical_refs>

<specifics>
## Specific Ideas

- Homepage should list posts in reverse chronological order (newest first) - Jekyll default
- Post URLs should follow permalink structure: `/posts/:title/`
- Reading time can use Liquid: `{% assign words = content | number_of_words %}{% assign read_time = words | divided_by: 200 %}`
- Typography should prioritize readability: adequate line-height, max-width container

</specifics>

<deferred>
## Deferred Ideas

- Categories/tags for organizing posts (v2 NAV-01)
- Pagination on homepage (v2 NAV-02)
- Related posts section (v2 ENH-01)
- Dark mode toggle (v2 ENH-02)
- Author bio card (v2 ENH-03)

</deferred>

---

*Phase: 02-content*
*Context gathered: 2026-03-17*
