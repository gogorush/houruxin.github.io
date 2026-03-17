---
phase: 03-discoverability
plan: 02
wave: 1
depends_on: []
files_modified: [_config.yml, Gemfile, index.html, about.md]
autonomous: true
requirements: [DISC-01, DISC-02]
---

# Plan 02: RSS Feed and Sitemap

**Objective:** Verify jekyll-feed and jekyll-sitemap plugins are configured and update front matter

---

<tasks>

## Task 1: Verify plugins in Gemfile

<read_first>
- Gemfile (current plugin declarations)
- _config.yml (plugin configuration)
</read_first>

<action>
Verify Gemfile contains:
- `gem "jekyll-feed"`
- `gem "jekyll-sitemap"`

If missing, add them to the Gemfile.

Verify _config.yml contains in plugins:
- `- jekyll-feed`
- `- jekyll-sitemap`

If missing, add to plugins list.
</action>

<acceptance_criteria>
- Gemfile contains `jekyll-feed`
- Gemfile contains `jekyll-sitemap`
- _config.yml plugins list contains `jekyll-feed`
- _config.yml plugins list contains `jekyll-sitemap`
</acceptance_criteria>

## Task 2: Add front matter descriptions

<read_first>
- index.html (current front matter)
- about.md (current front matter)
- _config.yml (site.description value)
</read_first>

<action>
Update index.html front matter to include:
- `description: "Welcome to my personal blog about technology and life"` (or similar)

Update about.md front matter to include:
- `description: "About Hou Ruxin and this blog"` (or similar)

This ensures each page has a description for SEO meta tags.
</action>

<acceptance_criteria>
- index.html front matter contains `description:` key with non-empty value
- about.md front matter contains `description:` key with non-empty value
</acceptance_criteria>

</tasks>

<verification>
- /feed.xml returns valid Atom feed
- /sitemap.xml returns valid sitemap with pages and posts
- All pages have descriptions in front matter
</verification>

<must_haves>
- jekyll-feed plugin configured
- jekyll-sitemap plugin configured
- Pages have description front matter
</must_haves>
