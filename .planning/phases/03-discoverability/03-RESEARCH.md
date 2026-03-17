---
phase: 03-discoverability
researched: 2026-03-17
tags: [seo, rss, sitemap, discoverability, meta-tags]
---

# Phase 3: Discoverability - Research Summary

**Research Question:** What do I need to know to PLAN this phase well?

---

## RSS/Atom Feed (DISC-01)

### jekyll-feed Plugin

The `jekyll-feed` plugin is already declared in `_config.yml`. It:
- Generates Atom feed at `/feed.xml` automatically
- Uses site title, description, URL from config
- Includes all posts with proper dates

**Required:** Nothing to create - just verify it's working.

**Verification:** `curl http://localhost:4000/feed.xml` should return valid Atom XML.

---

## Sitemap (DISC-02)

### jekyll-sitemap Plugin

The `jekyll-sitemap` plugin is already declared in `_config.yml`. It:
- Generates `sitemap.xml` at site root
- Includes all pages and posts
- Adds proper `<lastmod>` dates

**Required:** Nothing to create - just verify it's working.

**Verification:** `curl http://localhost:4000/sitemap.xml` should return valid sitemap XML.

---

## Meta Tags (DISC-03, DISC-04)

### Title Tags

Each page/post needs a unique title:
- **Posts:** `{{ page.title }} | {{ site.title }}`
- **Pages:** `{{ page.title }} | {{ site.title }}`
- **Homepage:** `{{ site.title }}` or custom

### Meta Description

Each page/post needs a description:
- **Posts:** Use `page.description` from front matter
- **Pages:** Use `page.description` from front matter
- **Homepage:** Use `site.description`

### Open Graph Tags (for social sharing)

Required tags for proper social previews:

```liquid
<meta property="og:title" content="{{ page.title | default: site.title }}">
<meta property="og:description" content="{{ page.description | default: site.description }}">
<meta property="og:url" content="{{ page.url | absolute_url }}">
<meta property="og:type" content="{% if page.layout == 'post' %}article{% else %}website{% endif %}">
<meta property="og:site_name" content="{{ site.title }}">
<meta property="og:image" content="{{ page.image | default: '/assets/og-image.jpg' | absolute_url }}">
```

### Twitter Card Tags (optional but recommended)

```liquid
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{ page.title | default: site.title }}">
<meta name="twitter:description" content="{{ page.description | default: site.description }}">
```

---

## Required Files for Phase 3

| File | Purpose |
|------|---------|
| `_includes/seo.html` | Reusable SEO meta tags (title, description, OG, Twitter) |
| `_includes/head.html` (update) | Include seo.html or add meta tags directly |
| `_config.yml` (verify) | Ensure jekyll-feed and jekyll-sitemap plugins enabled |
| `about.md` (update) | Add description front matter |
| `index.html` (update) | Add description front matter |
| `_posts/*.md` (update existing) | Ensure description in front matter |

---

## Validation Requirements (Nyquist Dimension 8)

| Requirement | Validation Approach |
|-------------|---------------------|
| DISC-01: RSS feed | Verify `/feed.xml` exists and contains valid Atom |
| DISC-02: Sitemap | Verify `/sitemap.xml` exists and lists pages/posts |
| DISC-03: Meta tags | Verify each page has unique `<title>` and `<meta name="description">` |
| DISC-04: Open Graph | Verify posts have `og:title`, `og:description`, `og:url`, `og:type` |

---

## Key Decisions to Make

1. **SEO include structure:** Single `seo.html` include or inline in `head.html`?
2. **Default OG image:** Create a default social sharing image?
3. **Title format:** "Title | Site" for all pages or different for homepage?

---

## Canonical References

- `.planning/ROADMAP.md` — Phase 3 goal and success criteria
- `.planning/REQUIREMENTS.md` — DISC-01 through DISC-04 requirements
- `.planning/phases/01-foundation/01-foundation-CONTEXT.md` — Phase 1 decisions (head.html structure)

---

*Research complete: 2026-03-17*
