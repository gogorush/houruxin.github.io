---
phase: 01-foundation
plan: 01
type: execute
wave: 1
depends_on: []
files_modified: [_config.yml, Gemfile, assets/css/main.css, _includes/head.html, _includes/header.html, _includes/footer.html]
autonomous: true
requirements: [FOUND-01, FOUND-02]
user_setup: []

must_haves:
  truths:
    - "Jekyll can build the site without errors"
    - "All internal links use relative_url filter"
    - "Site configuration has correct url and baseurl for GitHub Pages"
  artifacts:
    - path: "_config.yml"
      provides: "Jekyll site configuration"
      contains: "permalink: /posts/:title/"
    - path: "Gemfile"
      provides: "Ruby dependency declaration"
      contains: "gem \"jekyll\""
    - path: "assets/css/main.css"
      provides: "Tailwind CSS entry point"
      contains: "@import"
    - path: "_includes/head.html"
      provides: "Reusable head content with viewport meta"
      contains: "viewport"
    - path: "_includes/header.html"
      provides: "Site header with navigation"
      contains: "relative_url"
    - path: "_includes/footer.html"
      provides: "Site footer with copyright"
      contains: "relative_url"
  key_links:
    - from: "_config.yml"
      to: "GitHub Pages deployment"
      via: "url and baseurl settings"
      pattern: "url:.*houruxin\\.github\\.io"
    - from: "_includes/header.html"
      to: "site navigation"
      via: "relative_url filter"
      pattern: "relative_url"

---

<objective>
Create Jekyll configuration, Gemfile, Tailwind CSS entry point, and reusable includes (head, header, footer).

Purpose: Establish the foundational files that all pages depend on for correct rendering and navigation.
Output: _config.yml, Gemfile, assets/css/main.css, _includes/head.html, _includes/header.html, _includes/footer.html
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
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create _config.yml with Jekyll configuration</name>
  <files>_config.yml</files>
  <read_first>
    - .planning/phases/01-foundation/01-CONTEXT.md (locked decisions)
    - .planning/phases/01-foundation/01-foundation-RESEARCH.md (minimal config example)
  </read_first>
  <action>
    Create _config.yml with these exact values:
    - title: "Hou Ruxin's Blog"
    - description: "Personal blog about technology and life"
    - url: "https://houruxin.github.io"
    - baseurl: "" (empty string for user site)
    - permalink: /posts/:title/
    - markdown: kramdown
    - highlighter: rouge
    - plugins: [jekyll-feed, jekyll-sitemap]

    These values are locked per CONTEXT.md Decision 1.
  </action>
  <acceptance_criteria>
    - _config.yml exists at repo root
    - Contains: title: "Hou Ruxin's Blog"
    - Contains: url: "https://houruxin.github.io"
    - Contains: baseurl: ""
    - Contains: permalink: /posts/:title/
    - Contains: markdown: kramdown
    - Contains: highlighter: rouge
  </acceptance_criteria>
  <verify>
    <automated>test -f _config.yml && grep -q "permalink: /posts/:title/" _config.yml</automated>
  </verify>
  <done>_config.yml created with all locked configuration values</done>
</task>

<task type="auto">
  <name>Task 2: Create Gemfile for Jekyll dependency</name>
  <files>Gemfile</files>
  <read_first>
    - .planning/phases/01-foundation/01-foundation-RESEARCH.md (Gemfile example)
  </read_first>
  <action>
    Create Gemfile with:
    - source "https://rubygems.org"
    - gem "jekyll", "~> 4.4"

    This enables GitHub Pages native build support.
  </action>
  <acceptance_criteria>
    - Gemfile exists at repo root
    - Contains: source "https://rubygems.org"
    - Contains: gem "jekyll"
  </acceptance_criteria>
  <verify>
    <automated>test -f Gemfile && grep -q 'gem "jekyll"' Gemfile</automated>
  </verify>
  <done>Gemfile created with Jekyll dependency</done>
</task>

<task type="auto">
  <name>Task 3: Create Tailwind CSS entry point</name>
  <files>assets/css/main.css</files>
  <read_first>
    - .planning/phases/01-foundation/01-foundation-RESEARCH.md (Tailwind v4 setup)
  </read_first>
  <action>
    Create assets/css/main.css with:
    - @import "tailwindcss";
    - Optional custom styles using @layer base

    For Phase 1 CDN approach, this file can be minimal. The CSS will be loaded via CDN in head.html.
  </action>
  <acceptance_criteria>
    - assets/css/main.css exists
    - Contains: @import "tailwindcss" OR Tailwind CDN reference
  </acceptance_criteria>
  <verify>
    <automated>test -f assets/css/main.css</automated>
  </verify>
  <done>Tailwind CSS entry point created</done>
</task>

<task type="auto">
  <name>Task 4: Create _includes/head.html with meta tags</name>
  <files>_includes/head.html</files>
  <read_first>
    - .planning/phases/01-foundation/01-CONTEXT.md (Decision 2: includes structure)
    - .planning/phases/01-foundation/01-foundation-RESEARCH.md (viewport meta pattern)
  </read_first>
  <action>
    Create _includes/head.html with:
    - charset UTF-8 meta tag
    - viewport meta tag: width=device-width, initial-scale=1
    - title tag using site.title and page.title
    - description meta tag using site.description
    - Link to main.css using {{ '/assets/css/main.css' | relative_url }}
    - Tailwind CSS v4 CDN script: https://cdn.tailwindcss.com

    This ensures mobile responsiveness and proper SEO meta tags.
  </action>
  <acceptance_criteria>
    - _includes/head.html exists
    - Contains: charset="UTF-8"
    - Contains: name="viewport"
    - Contains: content="width=device-width, initial-scale=1"
    - Contains: relative_url filter for CSS link
    - Contains: tailwindcss CDN script
  </acceptance_criteria>
  <verify>
    <automated>test -f _includes/head.html && grep -q "viewport" _includes/head.html && grep -q "relative_url" _includes/head.html</automated>
  </verify>
  <done>head.html created with viewport meta and CSS links</done>
</task>

<task type="auto">
  <name>Task 5: Create _includes/header.html with navigation</name>
  <files>_includes/header.html</files>
  <read_first>
    - .planning/phases/01-foundation/01-CONTEXT.md (Decision 4: link safety)
  </read_first>
  <action>
    Create _includes/header.html with:
    - Site title link to homepage using {{ '/' | relative_url }}
    - Navigation links: Home and About
    - Use Tailwind classes for styling (container, padding, flexbox)

    All internal links MUST use {{ '...' | relative_url }} filter per CONTEXT.md Decision 4.
  </action>
  <acceptance_criteria>
    - _includes/header.html exists
    - Contains: {{ '/' | relative_url }} for home link
    - Contains: {{ '/about' | relative_url }} for about link
    - Contains: site.title variable
  </acceptance_criteria>
  <verify>
    <automated>test -f _includes/header.html && grep -q "relative_url" _includes/header.html</automated>
  </verify>
  <done>header.html created with navigation using relative_url</done>
</task>

<task type="auto">
  <name>Task 6: Create _includes/footer.html with copyright</name>
  <files>_includes/footer.html</files>
  <read_first>
    - .planning/phases/01-foundation/01-CONTEXT.md (Decision 4: link safety)
  </read_first>
  <action>
    Create _includes/footer.html with:
    - Copyright notice with dynamic year: {{ site.time | date: '%Y' }}
    - Site title reference
    - Simple Tailwind styling
  </action>
  <acceptance_criteria>
    - _includes/footer.html exists
    - Contains: copyright symbol or &copy;
    - Contains: site.time | date for dynamic year
    - Contains: site.title
  </acceptance_criteria>
  <verify>
    <automated>test -f _includes/footer.html && grep -q "site.time" _includes/footer.html</automated>
  </verify>
  <done>footer.html created with copyright notice</done>
</task>

</tasks>

<verification>
- [ ] _config.yml has correct url, baseurl, permalink settings
- [ ] Gemfile declares Jekyll 4.4
- [ ] All includes use relative_url for internal links
- [ ] head.html has viewport meta tag
</verification>

<success_criteria>
- All 6 files created and committed
- grep confirms correct configuration values
- No hardcoded absolute paths in includes
</success_criteria>

<output>
After completion, create `.planning/phases/01-foundation/01-foundation-01-SUMMARY.md`
</output>
