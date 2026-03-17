---
phase: 02-content
researched: 2026-03-17
tags: [content, jekyll, posts, blog, typography]
---

# Phase 2: Content - Research Summary

**Research Question:** What do I need to know to PLAN this phase well?

---

## Jekyll Content Patterns

### Blog Post Front Matter

Jekyll posts require YAML front matter at the top of each Markdown file:

```yaml
---
layout: post
title: "Post Title"
date: 2026-03-17 12:00:00 -0800
categories: [category1, category2]
description: "Meta description for SEO"
---
```

Posts must be placed in `_posts/` directory with naming convention: `YYYY-MM-DD-slug.md`

### Homepage Post Listing

Two approaches for listing posts:

1. **Using `site.posts` in index.html:**
```liquid
{% for post in site.posts %}
  <article>
    <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
    <time>{{ post.date | date: "%B %d, %Y" }}</time>
  </article>
{% endfor %}
```

2. **Using pagination (jekyll-paginate plugin):**
   - Requires `paginate: 5` in _config.yml
   - Use `paginator.posts` instead of `site.posts`
   - **Not recommended for Phase 2** - adds complexity

### Reading Time Calculation

Liquid snippet for reading time estimate:

```liquid
{% assign words = content | number_of_words %}
{% assign read_time = words | divided_by: 200 %}
{{ read_time }} min read
```

### Typography Best Practices

For clean, readable blog posts:

- **Font size:** 16px minimum (1rem) for body text
- **Line height:** 1.6-1.8 for body, 1.2-1.4 for headings
- **Max width:** 65-75 characters per line (optimal reading width)
- **Contrast:** 4.5:1 minimum for normal text

### About Page Pattern

Static page at `/about/`:
- Create `about.md` in root (or `about/index.md`)
- Front matter: `permalink: /about/` or `permalink: /about/index.html`
- Uses a page layout (not post layout)

---

## Required Files for Phase 2

| File | Purpose |
|------|---------|
| `_posts/YYYY-MM-DD-first-post.md` | First blog post |
| `_layouts/post.html` | Post layout extending default |
| `index.html` (update) | Homepage with post loop |
| `about.md` | About page |
| `_includes/post-meta.html` (optional) | Reusable metadata display |

---

## Validation Requirements (Nyquist Dimension 8)

From requirements analysis:

| Requirement | Validation Approach |
|-------------|---------------------|
| CONT-01: Homepage post list | Verify `site.posts` loop in index.html |
| CONT-02: Clean typography | Verify font-size >= 16px, line-height >= 1.6 |
| CONT-03: Post metadata | Verify date and reading time in post layout |
| CONT-04: About page | Verify about.md exists with correct permalink |
| CONT-05: First post | Verify _posts/ contains at least one post file |

---

## Key Decisions to Make

1. **Post layout structure:** What sections? (title, meta, content, footer)
2. **Homepage style:** Simple list or cards with excerpts?
3. **Reading time:** Show or hide? Where?
4. **About page content:** What to include?
5. **First post topic:** Welcome/intro post or sample content?

---

## Canonical References

- `.planning/ROADMAP.md` - Phase 2 goal and success criteria
- `.planning/REQUIREMENTS.md` - CONT-01 through CONT-05 requirements
- `.planning/phases/01-foundation/01-foundation-CONTEXT.md` - Phase 1 decisions ( Tailwind CSS, relative_url filter)

---

*Research complete: 2026-03-17*
