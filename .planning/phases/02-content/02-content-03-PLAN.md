---
phase: 02-content
plan: 03
wave: 2
depends_on: [02-content-01, 02-content-02]
files_modified: [_posts/*.md]
autonomous: true
requirements: [CONT-05]
---

# Plan 03: First Blog Post

**Objective:** Publish first blog post to demonstrate the system works

---

<tasks>

## Task 1: Create first blog post

<read_first>
- .planning/phases/02-content/02-CONTEXT.md (first post topic decision)
- .planning/ROADMAP.md (success criteria)
- _config.yml (to verify permalink structure)
</read_first>

<action>
Create _posts/YYYY-MM-DD-welcome.md (use today's date) with:
- Front matter:
  ```yaml
  ---
  layout: post
  title: "Welcome"
  description: "Welcome to my personal blog"
  ---
  ```
- Content: Brief welcome post (2-3 paragraphs) introducing the blog purpose
- Use Markdown formatting
- Content can mention: this is a test post, blog purpose, what to expect
</action>

<acceptance_criteria>
- File exists in _posts/ directory
- Filename matches pattern: YYYY-MM-DD-slug.md (e.g., 2026-03-17-welcome.md)
- Front matter contains `layout: post`
- Front matter contains `title:` with welcome-related text
- Contains markdown body content (at least 1 paragraph)
</acceptance_criteria>

</tasks>

<verification>
- Post is accessible at /posts/welcome/ (based on permalink structure)
- Post renders with post.html layout
- Metadata shows date and reading time
</verification>

<must_haves>
- At least one post file in _posts/
- Uses post layout
- Valid YAML front matter
</must_haves>
