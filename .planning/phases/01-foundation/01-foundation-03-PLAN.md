---
phase: 01-foundation
plan: 03
type: execute
wave: 3
depends_on: [01, 02]
files_modified: [404.html, index.html]
autonomous: true
requirements: [FOUND-01, FOUND-02, FOUND-03, FOUND-05]
user_setup: []

must_haves:
  truths:
    - "404 page exists and GitHub Pages will serve it automatically"
    - "index.html uses home.html layout"
    - "All internal links use relative_url filter"
    - "Site can build with jekyll serve without errors"
  artifacts:
    - path: "404.html"
      provides: "Custom 404 error page"
      contains: "layout: default"
    - path: "index.html"
      provides: "Homepage entry point"
      contains: "layout: home"
  key_links:
    - from: "404.html"
      to: "_layouts/default.html"
      via: "layout front matter"
      pattern: "layout: default"
    - from: "index.html"
      to: "_layouts/home.html"
      via: "layout front matter"
      pattern: "layout: home"
    - from: "404.html"
      to: "homepage"
      via: "relative_url link"
      pattern: "relative_url"

---

<objective>
Create 404 error page and update index.html to use the home layout.

Purpose: Complete the foundational file structure with error handling and proper homepage entry point.
Output: 404.html, updated index.html
</objective>

<execution_context>
@/Users/hou/.claude/get-shit-done/workflows/execute-plan.md
@/Users/hou/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/phases/01-foundation/01-CONTEXT.md
@.planning/phases/01-foundation/01-foundation-RESEARCH.md

<interfaces>
<!-- Key layouts created in previous plans - use these in pages -->

From _layouts/default.html (Plan 02):
- Base HTML structure with head, header, footer includes

From _layouts/home.html (Plan 02):
- Homepage layout extending default
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create 404.html custom error page</name>
  <files>404.html</files>
  <read_first>
    - _layouts/default.html (created in Plan 02)
    - .planning/phases/01-foundation/01-foundation-RESEARCH.md (404 page example)
  </read_first>
  <action>
    Create 404.html with:
    - Front matter: layout: default, title: Page Not Found
    - H1 heading: 404
    - Message: Page not found with link back to homepage
    - Use {{ '/' | relative_url }} for the home link

    GitHub Pages automatically serves this file when a 404 occurs.
  </action>
  <acceptance_criteria>
    - 404.html exists at repo root
    - Front matter contains: layout: default
    - Front matter contains: title: Page Not Found (or similar)
    - Contains: 404 heading
    - Contains: relative_url filter for home link
  </acceptance_criteria>
  <verify>
    <automated>test -f 404.html && grep -q "layout: default" 404.html && grep -q "relative_url" 404.html</automated>
  </verify>
  <done>404.html created with proper layout and home link</done>
</task>

<task type="auto">
  <name>Task 2: Update index.html to use home.html layout</name>
  <files>index.html</files>
  <read_first>
    - index.html (current: contains "Hello World")
    - _layouts/home.html (created in Plan 02)
    - .planning/phases/01-foundation/01-CONTEXT.md (Decision 5: index.html update)
  </read_first>
  <action>
    Update index.html:
    - Add front matter with: layout: home
    - Keep or update content (placeholder until Phase 2 post listing)
    - Replace "Hello World" with a proper welcome message or keep as placeholder

    This connects the homepage to the home.html layout created in Plan 02.
  </action>
  <acceptance_criteria>
    - index.html has front matter with --- delimiters
    - Front matter contains: layout: home
    - File is valid Liquid/Jekyll syntax
  </acceptance_criteria>
  <verify>
    <automated>grep -q "layout: home" index.html</automated>
  </verify>
  <done>index.html updated to use home.html layout</done>
</task>

</tasks>

<verification>
- [ ] 404.html exists with default layout
- [ ] index.html uses home layout
- [ ] All links use relative_url filter
- [ ] jekyll serve builds without errors
</verification>

<success_criteria>
- Both page files created/updated and committed
- Jekyll serves the site locally without errors
- GitHub Pages will deploy correctly with these files
</success_criteria>

<output>
After completion, create `.planning/phases/01-foundation/01-foundation-03-SUMMARY.md`
</output>
