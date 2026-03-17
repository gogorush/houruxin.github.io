# Project Research Summary

**Project:** houruxin.github.io
**Domain:** Personal Blog (GitHub Pages / Static Site)
**Researched:** 2026-03-17
**Confidence:** HIGH

## Executive Summary

This is a personal blog hosted on GitHub Pages. The research reveals that Jekyll is the only SSG with native GitHub Pages support, meaning zero build configuration is required—GitHub renders Jekyll directly on push. This makes Jekyll 4.4.1 the clear recommendation over alternatives like Astro or Hugo, which require GitHub Actions workflows and add deployment complexity.

The recommended approach is minimalist: Jekyll for content rendering, Tailwind CSS v4.2.1 for styling (optional, adds modern utility-first workflow), and disciplined scope management to avoid the common pitfall of overbuilding before publishing. The architecture follows Jekyll's conventional structure with `_posts/` for content, `_layouts/` for templates, and `_includes/` for reusable components.

Key risks include: (1) broken links from incorrect `baseurl` configuration—mitigate by testing deployment immediately; (2) mobile responsiveness failures—mitigate by testing on real devices before launch; (3) permalink regrets—mitigate by setting `permalink:` in `_config.yml` before publishing any posts; (4) overscoping—mitigate by explicit MVP definition and shipping with only core features.

## Key Findings

### Recommended Stack

**Core technology: Jekyll 4.4.1** — the only SSG with native GitHub Pages support. No build step required, GitHub builds automatically on push.

| Technology | Purpose | Why Recommended |
|------------|---------|-----------------|
| **Jekyll 4.4.1** | Static site generator | Native GitHub Pages support — zero config deployment |
| **Liquid** | Template language | Built into Jekyll, simple syntax for blogs |
| **Tailwind CSS v4.2.1** | Styling (optional) | 10x faster than v3, single CSS file output, zero-config |
| **Bundler** | Ruby dependency management | Ensures consistent gem versions across environments |

**Critical version requirements:**
- Jekyll 4.4.1+ (not 3.x—missing features, slower)
- Tailwind CSS 4.x (not v3—10x performance improvement)
- Ruby 3.0+ (GitHub Pages runs Ruby 3.1)

### Expected Features

**Must have (table stakes):**
- Blog post pages — core purpose, Jekyll provides via `_posts/`
- Homepage with post listing — discoverability via `site.posts` loop
- About page — author credibility, static page at `/about/`
- Responsive design — >50% mobile traffic, CSS media queries required
- RSS/Atom feed — `jekyll-feed` plugin generates `/feed.xml`
- Clean typography — 16px+ font, 1.5-1.7 line-height, ~70 char max width
- Fast page loads — static HTML should load <1s
- Permalink structure — stable URLs for sharing
- GitHub Pages deployment — free hosting, HTTPS, automatic on git push

**Should have (differentiators):**
- Categories/tags — organizational browsing (add when 10+ posts)
- Search — client-side via Lunr.js/Pagefind (add when 20+ posts)
- Pagination — prevents endless scroll (add when 15+ posts)
- Related posts section — keeps readers engaged
- Author bio/byline — personalizes content
- Reading time estimate — "5 min read" UX touch
- Dark mode toggle — accessibility, user preference
- Social sharing links — Twitter, LinkedIn share URLs
- Sitemap.xml — SEO benefit, `jekyll-sitemap` plugin

**Defer (v2+):**
- Comments system — adds backend complexity, contradicts "simple, fast"
- Newsletter integration — requires email service, GDPR compliance
- User authentication — no accounts needed for read-only blog
- Multiple authors — personal blog = one author
- Custom theme builder — theme customization is a separate product

### Architecture Approach

Jekyll uses a file-based architecture where content (Markdown) is rendered through templates (Liquid) at build time. The system has four layers: Content (`_posts/`, `_data/`), Template (`_layouts/`, `_includes/`), Build (Jekyll engine), and Output (`_site/` deployed to GitHub Pages).

**Major components:**
1. **`_posts/`** — Markdown blog posts with front matter (YYYY-MM-DD-title.md)
2. **`_layouts/`** — Template hierarchy (default.html, post.html, home.html, page.html)
3. **`_includes/`** — Reusable HTML fragments (header.html, footer.html, head.html)
4. **`_sass/`** — SCSS partials for modular styling
5. **`_data/`** — Structured YAML data (navigation.yml, social links)
6. **`_config.yml`** — Site configuration (title, description, plugins, permalink structure)
7. **`assets/`** — Compiled CSS, JavaScript, images

**Key patterns:**
- Layout inheritance: `post.html` extends `default.html` via front matter
- Data files: Navigation stored in `_data/navigation.yml`, looped in header/footer
- DRY includes: Common elements written once, included everywhere

### Critical Pitfalls

1. **Local links work locally but break on GitHub Pages** — Hardcoded paths like `/about` work in `jekyll serve` but break when site lives at `houruxin.github.io/blog/`. **Prevention:** Always use `{{ '/path' | relative_url }}` helper, set `baseurl` correctly in `_config.yml`.

2. **Overscoping the first blog** — Spending weeks building search, tags, comments before publishing a single post. **Prevention:** Ship with only homepage, post listing, individual post view, about page. Everything else requires a published post to justify.

3. **Ignoring mobile responsiveness** — Text tiny, images overflow on mobile. 50%+ readers abandon. **Prevention:** Start mobile-first or use proven responsive theme. Test on actual phone, not just browser dev tools.

4. **Permalink structure regrets** — Default `/YYYY/MM/DD/title.html` feels wrong after publishing, but changing breaks all shared links (SEO disaster). **Prevention:** Set `permalink: /posts/:title/` or `permalink: /:title/` in `_config.yml` before first post.

5. **Publishing without SEO fundamentals** — Posts don't appear in search, missing meta tags. **Prevention:** Every post must have `title` and `description` front matter. Add `<title>` and `<meta name="description">` to layout. Generate sitemap.xml.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation
**Rationale:** Establishes the core structure that everything else depends on. Getting `_config.yml` and layouts correct first prevents costly refactors later (especially permalinks, baseurl).

**Delivers:**
- Working Jekyll site with correct configuration
- Base layout template with header, footer, navigation
- Responsive CSS foundation
- Verified GitHub Pages deployment

**Addresses features:** Responsive design, GitHub Pages deployment
**Avoids pitfalls:** Broken links (use `relative_url`), permalink regrets (set structure now), mobile broken (test on device), overscoping (explicit MVP definition)

### Phase 2: Content Foundation
**Rationale:** With structure in place, add the actual content types. Posts are the core value—everything else is enhancement.

**Delivers:**
- Homepage with post listing (iterates `site.posts`)
- Individual post template with typography, byline, date
- About page
- First blog posts published

**Addresses features:** Blog posts, homepage listing, about page, clean typography, permalinks
**Uses stack:** Jekyll 4.4.1, Liquid templates
**Implements architecture:** `_posts/` collection, `home.html` and `post.html` layouts, layout inheritance

### Phase 3: Polish & Discoverability
**Rationale:** Once content exists, improve how readers find and consume it. Add features that matter when you have 5+ posts.

**Delivers:**
- RSS feed (`jekyll-feed` plugin)
- Sitemap.xml (`jekyll-sitemap` plugin)
- SEO meta tags on all pages
- Related posts section or recent posts widget
- Reading time estimates
- Social sharing links

**Addresses features:** RSS feed, sitemap, SEO, related posts, reading time, social sharing
**Avoids pitfalls:** Missing SEO (baked into post template now)

### Phase 4: Enhancements (Defer Until Content Exists)
**Rationale:** These features only provide value once you have substantial content. Don't build until you have 10-20+ posts.

**Delivers (conditionally):**
- Categories/tags (when 10+ posts spanning topics)
- Pagination (when homepage has 15+ posts)
- Search via Lunr.js/Pagefind (when 20+ posts)
- Dark mode toggle (accessibility enhancement)

**Addresses features:** Search, categories/tags, pagination, dark mode
**Research flag:** Search implementation may need API research for best client-side library

### Phase Ordering Rationale

- **Phase 1 before Phase 2:** Configuration and layouts are prerequisites for content. Wrong `baseurl` or permalink structure discovered after publishing requires painful refactors.
- **Phase 2 before Phase 3:** SEO, RSS, and discoverability features require content to exist. No point generating a sitemap with one page.
- **Phase 4 deferred:** Search with 5 posts is pointless—users can scan titles. Categories with 3 posts is premature. Build only when the pain of missing the feature exceeds the cost of adding it.
- **Grouping by dependency:** Each phase builds on the previous. Layout inheritance means `default.html` must exist before `post.html`. Content collections require config before posts are readable.

### Research Flags

**Phases likely needing deeper research during planning:**
- **Phase 4 (Search):** Client-side search libraries (Lunr.js vs. Pagefind vs. MiniSearch) have different tradeoffs. Needs API research for best fit.
- **Phase 3 (SEO):** Specific meta tag requirements for social sharing (Open Graph, Twitter Cards) may need reference checking.

**Phases with standard patterns (skip research-phase):**
- **Phase 1 (Foundation):** Jekyll's `_config.yml` structure and `relative_url` usage are well-documented with established patterns.
- **Phase 2 (Content):** Blog post front matter and layout templates are Jekyll's core use case—extensive documentation exists.
- **Phase 3 (RSS/Sitemap):** `jekyll-feed` and `jekyll-sitemap` plugins are official, drop-in solutions with no configuration complexity.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Jekyll is the only SSG with native GitHub Pages support—verified via official GitHub Pages and Jekyll documentation |
| Features | HIGH | Blog features are well-established patterns; Jekyll documentation explicitly covers all table stakes |
| Architecture | HIGH | Jekyll's directory structure and Liquid templating are mature, documented conventions |
| Pitfalls | MEDIUM | Based on community discussions (Dev.to, HN) and Jekyll docs; some pitfalls inferred from common patterns |

**Overall confidence:** HIGH

### Gaps to Address

- **Tailwind CSS integration:** While recommended, the specific build setup (running Jekyll and Tailwind CLI in parallel) should be validated during Phase 1 implementation.
- **Search library selection:** Deferred to Phase 4, but when ready, will need evaluation of Lunr.js vs. Pagefind for best GitHub Pages compatibility.
- **Analytics integration:** Not covered in depth; if analytics are desired post-launch, will need privacy-friendly options research (Plausible, Fathom vs. Google Analytics).

## Sources

### Primary (HIGH confidence)
- **Jekyll v4.4.1** — https://github.com/jekyll/jekyll/releases/tag/v4.4.1 (Jan 29, 2025)
- **Jekyll GitHub Pages docs** — https://jekyllrb.com/docs/github-pages/
- **GitHub Pages docs** — https://docs.github.com/en/pages
- **Tailwind CSS v4.2.1** — https://github.com/tailwindlabs/tailwindcss/releases (Feb 23, 2026)
- **Jekyll Documentation** — https://jekyllrb.com/docs/ (Posts, Structure, Layouts, Includes, Datafiles)

### Secondary (MEDIUM confidence)
- **Static site performance best practices** — https://web.dev/
- **Common Jekyll mistakes** — https://dev.to/ community discussions
- **Personal blog postmortems** — https://news.ycombinator.com/ threads

---
*Research completed: 2026-03-17*
*Ready for roadmap: yes*
