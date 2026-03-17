---
phase: 02-content
plan: 02
wave: 1
depends_on: []
files_modified: [index.html, about.md]
autonomous: true
requirements: [CONT-01, CONT-04]
---

# Plan 02: Homepage and About Page

**Objective:** Create homepage with post listing and about page

---

<tasks>

## Task 1: Update index.html with post loop

<read_first>
- .planning/phases/02-content/02-CONTEXT.md (homepage style decision)
- .planning/phases/01-foundation/01-foundation-CONTEXT.md (Phase 1 patterns)
- index.html (current state from Phase 1)
- _layouts/home.html (existing layout)
</read_first>

<action>
Update index.html to:
- Use layout: home (already set in Phase 1)
- Add liquid loop: {% for post in site.posts %} ... {% endfor %}
- For each post display:
  - Title as link: `<a href="{{ post.url | relative_url }}">{{ post.title }}</a>`
  - Date below: `<time>{{ post.date | date: "%B %d, %Y" }}</time>`
- Wrap in semantic article elements
- Use Tailwind classes for spacing (gap-4, py-2, etc.)
- Show "No posts yet" message if site.posts is empty (optional)
</action>

<acceptance_criteria>
- index.html contains `{% for post in site.posts %}` loop
- index.html contains `{{ post.url | relative_url }}` for post links
- index.html contains `{{ post.title }}` for post titles
- index.html contains date display with `{{ post.date` or similar
- All internal links use `| relative_url` filter
- Has fallback/content for empty posts state OR loop only
</acceptance_criteria>

## Task 2: Create about page

<read_first>
- .planning/phases/02-content/02-CONTEXT.md (about page decision)
- _layouts/default.html (to understand layout inheritance)
</read_first>

<action>
Create about.md in root directory with:
- Front matter:
  ```yaml
  ---
  layout: default
  title: About
  permalink: /about/
  ---
  ```
- Markdown content with brief placeholder about text (can be generic: "Welcome to my blog...")
- Use Tailwind container classes for consistent layout
</action>

<acceptance_criteria>
- File about.md exists in root directory
- Front matter contains `layout: default`
- Front matter contains `title: About` or `title: "About"`
- Front matter contains `permalink: /about/` or `permalink: /about/index.html`
- Contains some markdown content (heading + paragraph minimum)
</acceptance_criteria>

</tasks>

<verification>
- Homepage lists all posts with titles and dates
- About page accessible at /about/
- All links work with relative_url filter
</verification>

<must_haves>
- Homepage uses site.posts loop
- Post links use relative_url filter
- About page exists with correct permalink
</must_haves>
