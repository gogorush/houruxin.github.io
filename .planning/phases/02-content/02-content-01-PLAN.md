---
phase: 02-content
plan: 01
wave: 1
depends_on: []
files_modified: [_layouts/post.html, _includes/post-meta.html]
autonomous: true
requirements: [CONT-02, CONT-03]
---

# Plan 01: Post Layout and Metadata

**Objective:** Create post layout with clean typography and metadata display (date, reading time)

---

<tasks>

## Task 1: Create post layout

<read_first>
- .planning/phases/02-content/02-CONTEXT.md (implementation decisions)
- .planning/phases/01-foundation/01-foundation-CONTEXT.md (Phase 1 patterns)
- _layouts/default.html (parent layout to extend)
</read_first>

<action>
Create _layouts/post.html with:
- Front matter: layout: default, type: article
- HTML structure: article element with class="post"
- Include post-meta.html for metadata display
- Content area with {{ content }}
- Tailwind CSS classes for typography: prose-like styling with max-w-prose, mx-auto, text-lg, leading-relaxed
</action>

<acceptance_criteria>
- File _layouts/post.html exists
- Contains front matter with `layout: default`
- Contains `{% include post-meta.html %}` or inline metadata display
- Contains `{{ content }}` for post body
- Uses Tailwind classes for typography (text-lg or text-base, leading-relaxed or leading-7)
- Has max-width constraint (max-w-prose, max-w-3xl, or similar)
</acceptance_criteria>

## Task 2: Create post metadata include

<read_first>
- .planning/phases/02-content/02-CONTEXT.md (reading time decision)
- _includes/header.html (existing include pattern from Phase 1)
</read_first>

<action>
Create _includes/post-meta.html with:
- Date display using {{ page.date | date: "%B %d, %Y" }}
- Reading time calculation: {% assign words = content | number_of_words %}{% assign read_time = words | divided_by: 200 %}
- Display format: "Date • X min read"
- Wrap in time/semantic element with appropriate classes
</action>

<acceptance_criteria>
- File _includes/post-meta.html exists
- Contains date filter: `| date:` with format string
- Contains reading time calculation with `number_of_words` and `divided_by: 200`
- Contains output showing both date and reading time
- Uses relative_url filter if any links present
</acceptance_criteria>

</tasks>

<verification>
- post.html renders when used by a post
- Metadata shows date and reading time
- Typography is readable (16px+ font, 1.6+ line-height)
</verification>

<must_haves>
- Post layout extends default.html
- Metadata include shows date and reading time
- Typography uses Tailwind classes for readability
</must_haves>
