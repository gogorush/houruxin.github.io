---
phase: 03-discoverability
plan: 01
wave: 1
depends_on: []
files_modified: [_includes/seo.html, _includes/head.html]
autonomous: true
requirements: [DISC-03, DISC-04]
---

# Plan 01: SEO Meta Tags Include

**Objective:** Create reusable SEO include with title, meta description, and Open Graph tags

---

<tasks>

## Task 1: Create SEO include

<read_first>
- .planning/phases/03-discoverability/03-CONTEXT.md (implementation decisions)
- .planning/phases/03-discoverability/03-RESEARCH.md (OG tag patterns)
- _includes/head.html (where SEO will be included)
</read_first>

<action>
Create _includes/seo.html with:
- Title tag: `{% if page.title %}{{ page.title }} | {{ site.title }}{% else %}{{ site.title }}{% endif %}`
- Meta description: `{% if page.description %}{{ page.description }}{% else %}{{ site.description }}{% endif %}`
- Open Graph tags: og:title, og:description, og:url, og:type (article/website), og:site_name
- Twitter Card tags: twitter:card, twitter:title, twitter:description
- Use Liquid conditionals to determine og:type based on layout (post = article, else = website)
</action>

<acceptance_criteria>
- File _includes/seo.html exists
- Contains `<title>` tag with conditional logic for page.title vs site.title
- Contains `<meta name="description"` with content
- Contains `<meta property="og:title"` tag
- Contains `<meta property="og:description"` tag
- Contains `<meta property="og:url"` tag
- Contains `<meta property="og:type"` tag with conditional (article/website)
- Contains `<meta property="og:site_name"` tag
- Contains Twitter Card meta tags (twitter:card, twitter:title, twitter:description)
</acceptance_criteria>

## Task 2: Include SEO in head.html

<read_first>
- _includes/head.html (current structure)
- _includes/seo.html (newly created)
</read_first>

<action>
Update _includes/head.html to:
- Add `{% include seo.html %}` inside the `<head>` section
- Place after existing meta tags, before CSS links
- Remove any existing title tag from head.html (now in seo.html)
</action>

<acceptance_criteria>
- _includes/head.html contains `{% include seo.html %}`
- Title tag is now in seo.html, not duplicated in head.html
- Include is placed within `<head>` element
</acceptance_criteria>

</tasks>

<verification>
- All pages have unique title tags
- All pages have meta descriptions
- Posts have og:type = article, pages have og:type = website
</verification>

<must_haves>
- SEO include created with all required meta tags
- SEO included in head.html
- Open Graph and Twitter Card tags present
</must_haves>
