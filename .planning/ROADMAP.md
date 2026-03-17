# Roadmap: Personal Blog

**Created:** 2026-03-17
**Core Value:** Publish blog posts easily with a clean, professional reading experience.

---

## Phases

- [ ] **Phase 1: Foundation** - Working Jekyll site with correct configuration and responsive base
- [ ] **Phase 2: Content** - Homepage with posts, individual post pages, about page, first post published
- [ ] **Phase 3: Discoverability** - RSS feed, sitemap, SEO meta tags for all pages

---

## Phase Details

### Phase 1: Foundation
**Goal:** Working Jekyll site with correct configuration that deploys to GitHub Pages without broken links

**Depends on:** Nothing (first phase)

**Requirements:** FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05

**Success Criteria** (what must be TRUE for users when this phase completes):
1. `jekyll serve` renders the site locally without errors
2. Site deploys to GitHub Pages and is accessible at houruxin.github.io
3. All internal links work on GitHub Pages (no 404s from incorrect baseurl)
4. Site displays correctly on mobile devices (text readable, no horizontal scroll, images fit screen)
5. Navigation header and footer appear on all pages via layout inheritance

**Plans:** 3 plans

Plans:
- [ ] 01-foundation-01-PLAN.md — Create _config.yml, Gemfile, Tailwind CSS, and includes (head, header, footer)
- [ ] 01-foundation-02-PLAN.md — Create layout hierarchy (default.html, home.html)
- [ ] 01-foundation-03-PLAN.md — Create 404.html and update index.html

---

### Phase 2: Content
**Goal:** Users can read blog posts from a homepage listing and view individual posts with clean typography

**Depends on:** Phase 1 (layouts and config must exist for posts to render correctly)

**Requirements:** CONT-01, CONT-02, CONT-03, CONT-04, CONT-05

**Success Criteria** (what must be TRUE for users when this phase completes):
1. Homepage displays a list of all published blog posts with titles
2. Individual blog post pages render with clean, readable typography (16px+ font, proper line-height)
3. Each post shows metadata (published date, reading time estimate)
4. About page exists and is accessible at /about/
5. At least one blog post is published and accessible

**Plans:** TBD (decomposed by /gsd:plan-phase)

---

### Phase 3: Discoverability
**Goal:** Readers can find the blog via search engines and subscribe via RSS

**Depends on:** Phase 2 (content must exist for RSS and sitemap to have value)

**Requirements:** DISC-01, DISC-02, DISC-03, DISC-04

**Success Criteria** (what must be TRUE for users when this phase completes):
1. RSS/Atom feed is generated and accessible at /feed.xml
2. Sitemap.xml is generated and accessible for search engine indexing
3. Every page has a unique title tag and meta description
4. Blog posts include Open Graph meta tags for proper social sharing previews

**Plans:** TBD (decomposed by /gsd:plan-phase)

---

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/3 | Planned | - |
| 2. Content | 0/0 | Not started | - |
| 3. Discoverability | 0/0 | Not started | - |

---

## Coverage

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Pending |
| FOUND-02 | Phase 1 | Pending |
| FOUND-03 | Phase 1 | Pending |
| FOUND-04 | Phase 1 | Pending |
| FOUND-05 | Phase 1 | Pending |
| CONT-01 | Phase 2 | Pending |
| CONT-02 | Phase 2 | Pending |
| CONT-03 | Phase 2 | Pending |
| CONT-04 | Phase 2 | Pending |
| CONT-05 | Phase 2 | Pending |
| DISC-01 | Phase 3 | Pending |
| DISC-02 | Phase 3 | Pending |
| DISC-03 | Phase 3 | Pending |
| DISC-04 | Phase 3 | Pending |

**Coverage:** 14/14 v1 requirements mapped (100%)

---

## Notes

**Granularity:** Coarse (3 phases)

**Phase Ordering Rationale:**
- Phase 1 before Phase 2: Configuration and layouts must exist before content can render correctly. Wrong baseurl or permalink structure discovered after publishing requires painful refactors.
- Phase 2 before Phase 3: SEO, RSS, and discoverability features require content to exist. No point generating a sitemap with zero posts.
- Phase 3 is final polish: Once content exists, make it findable.

**Deferred to v2:** Search, categories/tags, pagination, dark mode (see REQUIREMENTS.md v2 section)

---

*Roadmap created: 2026-03-17*
*Ready for planning: yes*
