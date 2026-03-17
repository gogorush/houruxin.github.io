# Phase 1 Context: Foundation

**Created:** 2026-03-17
**Phase Goal:** Working Jekyll site with correct configuration that deploys to GitHub Pages without broken links

---

## Phase Boundary

**From ROADMAP.md:**
- **Requirements:** FOUND-01 through FOUND-05
- **Success Criteria:**
  1. `jekyll serve` renders the site locally without errors
  2. Site deploys to GitHub Pages and is accessible at houruxin.github.io
  3. All internal links work on GitHub Pages (no 404s from incorrect baseurl)
  4. Site displays correctly on mobile devices (text readable, no horizontal scroll, images fit screen)
  5. Navigation header and footer appear on all pages via layout inheritance

---

## Implementation Decisions

### Decision 1: Jekyll Configuration
**Decision:** Use Jekyll 4.4.1 with minimal config for GitHub Pages native support.

**Rationale:** Only SSG with zero build workflow requirement—GitHub renders on push.

**Locked values for `_config.yml`:**
- `title`: "Hou Ruxin's Blog"
- `description`: "Personal blog about technology and life"
- `url`: "https://houruxin.github.io"
- `baseurl`: "" (empty for user site)
- `permalink`: /posts/:title/ (set before first post)
- `markdown`: kramdown
- `highlighter`: rouge

### Decision 2: Layout Hierarchy
**Decision:** Three-level layout inheritance pattern.

**Structure:**
1. `_layouts/default.html` - Full HTML structure with `<head>`, header, footer
2. `_layouts/home.html` - Homepage (post listing), extends default
3. `_layouts/post.html` - Individual blog posts, extends default
4. `_layouts/page.html` - Static pages (About), extends default

**Includes:**
- `_includes/head.html` - Meta tags, viewport, CSS links
- `_includes/header.html` - Site header with navigation
- `_includes/footer.html` - Site footer with copyright

### Decision 3: Responsive Design
**Decision:** Tailwind CSS v4.2.1 via CDN for Phase 1.

**Rationale:** Zero-config setup, 10x faster than v3, built-in responsive utilities. CDN avoids build step complexity for Phase 1.

**Mobile requirements:**
- Viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1">`
- Container with `max-w-7xl mx-auto px-4` for responsive centering
- Images with `max-w-full` to prevent overflow

### Decision 4: Link Safety
**Decision:** All internal links use `{{ '/path' | relative_url }}` filter.

**Applies to:**
- Navigation links
- CSS/JS asset paths
- Image sources
- Cross-page links

**Why:** Prevents 404s when deploying to GitHub Pages.

### Decision 5: Required Files
**Decision:** Create these files in Wave 1:

| File | Purpose |
|------|---------|
| `_config.yml` | Site configuration |
| `_layouts/default.html` | Base layout |
| `_layouts/home.html` | Homepage layout |
| `_includes/head.html` | Head content |
| `_includes/header.html` | Header navigation |
| `_includes/footer.html` | Footer |
| `assets/css/main.css` | Tailwind CSS entry point |
| `404.html` | Custom 404 page |
| `Gemfile` | Jekyll dependency |
| `index.html` | Homepage (updated) |

---

## Canonical References

- ROADMAP.md: Phase 1 section (success criteria)
- REQUIREMENTS.md: FOUND-01 through FOUND-05
- .planning/research/SUMMARY.md: Jekyll stack recommendation
- .planning/phases/01-foundation/01-foundation-RESEARCH.md: Detailed implementation patterns

---

## Existing Code Insights

**Current state:** Greenfield with starter files
- `index.html` - Contains "Hello World" placeholder
- `README.md` - Contains "houruxin.github.io" placeholder
- `.planning/` - Complete GSD documentation structure

**No existing:**
- `_config.yml`
- `_layouts/` directory
- `_includes/` directory
- `_posts/` directory
- `assets/` directory

---

## Deferred to Later Phases

**Phase 2:**
- Blog post content and layouts
- About page
- Homepage post listing

**Phase 3:**
- RSS feed (jekyll-feed plugin)
- Sitemap (jekyll-sitemap plugin)
- SEO/Open Graph meta tags

**Out of Scope (v2+):**
- Comments system
- Newsletter integration
- Search functionality
- Categories/tags
- Dark mode

---

*Context captured: 2026-03-17*
*Ready for planning: yes*
