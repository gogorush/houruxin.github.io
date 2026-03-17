---
phase: 01-foundation
plan: 02
type: execute
wave: 2
depends_on: [01]
files_modified: [_layouts/default.html, _layouts/home.html]
autonomous: true
requirements: [FOUND-04]
user_setup: []

must_haves:
  truths:
    - "Layout hierarchy exists with default.html as base"
    - "Other layouts extend default via layout front matter"
    - "Header and footer appear on all pages via includes"
  artifacts:
    - path: "_layouts/default.html"
      provides: "Base HTML structure with head, header, footer"
      contains: "{% include head.html %}"
    - path: "_layouts/home.html"
      provides: "Homepage layout extending default"
      contains: "layout: default"
  key_links:
    - from: "_layouts/default.html"
      to: "_includes/head.html"
      via: "include tag"
      pattern: "{% include head.html %}"
    - from: "_layouts/default.html"
      to: "_includes/header.html"
      via: "include tag"
      pattern: "{% include header.html %}"
    - from: "_layouts/home.html"
      to: "_layouts/default.html"
      via: "layout front matter"
      pattern: "layout: default"

---

<objective>
Create the layout hierarchy with default.html as the base and home.html for the homepage.

Purpose: Establish the template structure that all pages inherit from, ensuring consistent header, footer, and HTML structure.
Output: _layouts/default.html, _layouts/home.html
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
<!-- Key includes created in Plan 01 - use these in layouts -->

From _includes/head.html:
- Meta tags, viewport, CSS links

From _includes/header.html:
- Site header with navigation links (Home, About)

From _includes/footer.html:
- Copyright notice with dynamic year
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create _layouts/default.html base layout</name>
  <files>_layouts/default.html</files>
  <read_first>
    - _includes/head.html (created in Plan 01)
    - _includes/header.html (created in Plan 01)
    - _includes/footer.html (created in Plan 01)
    - .planning/phases/01-foundation/01-foundation-RESEARCH.md (default layout example)
  </read_first>
  <action>
    Create _layouts/default.html with full HTML5 structure:
    - DOCTYPE html declaration
    - html tag with lang="en"
    - head section including {% include head.html %}
    - body with:
      - header element including {% include header.html %}
      - main element with {{ content }} placeholder
      - footer element including {% include footer.html %}
    - Use Tailwind classes: container with max-w-7xl mx-auto px-4

    This is the base layout that all other layouts extend.
  </action>
  <acceptance_criteria>
    - _layouts/default.html exists
    - Contains: <!DOCTYPE html>
    - Contains: <html lang="en">
    - Contains: {% include head.html %}
    - Contains: {% include header.html %}
    - Contains: {% include footer.html %}
    - Contains: {{ content }}
    - Contains: viewport meta tag (via head.html include)
  </acceptance_criteria>
  <verify>
    <automated>test -f _layouts/default.html && grep -q "{% include head.html %}" _layouts/default.html && grep -q "{{ content }}" _layouts/default.html</automated>
  </verify>
  <done>default.html created with complete HTML structure and all includes</done>
</task>

<task type="auto">
  <name>Task 2: Create _layouts/home.html for homepage</name>
  <files>_layouts/home.html</files>
  <read_first>
    - _layouts/default.html (created in Task 1 of this plan)
    - .planning/phases/01-foundation/01-foundation-RESEARCH.md (layout inheritance pattern)
  </read_first>
  <action>
    Create _layouts/home.html with:
    - Front matter: layout: default
    - Main content area with {{ content }}
    - Empty posts container for future post listing (Phase 2)

    This layout extends default.html and provides the homepage structure.
    Keep it minimal for Phase 1 - post listing logic comes in Phase 2.
  </action>
  <acceptance_criteria>
    - _layouts/home.html exists
    - Front matter contains: layout: default
    - Contains: {{ content }}
  </acceptance_criteria>
  <verify>
    <automated>test -f _layouts/home.html && grep -q "layout: default" _layouts/home.html</automated>
  </verify>
  <done>home.html created extending default layout</done>
</task>

</tasks>

<verification>
- [ ] default.html has valid HTML5 structure
- [ ] All three includes are referenced in default.html
- [ ] home.html specifies layout: default in front matter
- [ ] {{ content }} placeholder exists in both layouts
</verification>

<success_criteria>
- Both layout files created and committed
- Layout inheritance chain: home.html -> default.html -> includes
- Jekyll can build with these layouts
</success_criteria>

<output>
After completion, create `.planning/phases/01-foundation/01-foundation-02-SUMMARY.md`
</output>
