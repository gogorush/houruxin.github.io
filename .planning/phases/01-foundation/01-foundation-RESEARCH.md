# Phase 1: Foundation - Research

**Researched:** 2026-03-17
**Domain:** Jekyll/ GitHub Pages static site foundation
**Confidence:** HIGH

## Summary

Phase 1 establishes the core Jekyll site structure that all subsequent phases depend on. The research confirms Jekyll 4.4.1 is the only SSG with native GitHub Pages support—no build workflows required. The site currently has only `index.html` (with "Hello World" text) and `README.md`, meaning we're building from scratch.

Key findings: (1) Use `relative_url` filter for all internal links to prevent broken paths on GitHub Pages; (2) Set `permalink: /posts/:title/` in `_config.yml` before publishing any content; (3) Layout inheritance flows from `default.html` → `home.html`/`post.html`/`page.html`; (4) Tailwind CSS v4.2.1 provides responsive utilities with zero config; (5) Test on actual mobile devices, not just browser dev tools.

**Primary recommendation:** Start with minimal Jekyll + Tailwind CSS v4, deploy to GitHub Pages immediately after `_config.yml` and `default.html` exist to catch baseurl issues early.

## User Constraints (from CONTEXT.md)

<user_constraints>
### Locked Decisions
None specified - no CONTEXT.md exists for this phase.

### Claude's Discretion
Full discretion on:
- Specific Jekyll configuration values (title, description, baseurl)
- Tailwind CSS integration approach (CDN vs. build step)
- Layout hierarchy depth and structure
- Responsive design implementation details

### Deferred Ideas (OUT OF SCOPE)
None specified - no CONTEXT.md exists for this phase.
</user_constraints>

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FOUND-01 | Jekyll site renders correctly on GitHub Pages | Jekyll 4.4.1 has native GitHub Pages support—no build workflow needed. Requires `_config.yml` with correct `url` and `baseurl` settings, plus valid layout files. |
| FOUND-02 | Site uses correct baseurl configuration (no broken local links) | Use `{{ '/path' \| relative_url }}` filter in all templates. Set `baseurl: ""` for user/organization site (`houruxin.github.io`) or `baseurl: "/repo-name"` for project sites. |
| FOUND-03 | Permalink structure is set and consistent (`/posts/:title/`) | Set `permalink: /posts/:title/` in `_config.yml` before any posts exist. This setting is immutable after publishing—changing breaks all shared links. |
| FOUND-04 | Layout hierarchy works (default.html extended by others) | Create `_layouts/default.html` with `<head>`, header, footer. Other layouts (`home.html`, `post.html`, `page.html`) specify `layout: default` in front matter. |
| FOUND-05 | Responsive design works on mobile devices | Use Tailwind CSS v4.2.1 utility classes or vanilla CSS with viewport meta tag, media queries, and max-width containers. Test on physical devices. |

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Jekyll | 4.4.1 | Static site generator | Only SSG with native GitHub Pages support—zero build config, GitHub renders on push |
| Liquid | Built-in | Template language | Jekyll's templating engine, simple syntax for blogs, official support |
| Bundler | 2.x | Ruby dependency management | Ensures consistent gem versions across local dev and GitHub Pages |

### Styling
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Tailwind CSS | 4.2.1 | Utility-first CSS framework | Recommended—10x faster than v3, zero-config, single CSS file output |
| @tailwindcss/cli | 4.2.1 | Build tool | Development watch mode for Tailwind CSS compilation |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| minima | 2.5+ | Jekyll theme | Use if you want a proven responsive base theme instead of custom |

### Version Verification
```bash
# Verified package versions as of 2026-03-17
gem list jekyll          # 4.4.1 (Jan 29, 2025)
npm view tailwindcss version  # 4.2.1 (Feb 23, 2026)
ruby --version           # Ruby 2.6.10+ (GitHub Pages runs Ruby 3.1)
```

**Installation:**
```bash
# Install Jekyll and Bundler
gem install jekyll bundler

# Initialize Bundler in project
bundle init

# Add to Gemfile:
echo 'source "https://rubygems.org"' > Gemfile
echo 'gem "jekyll", "~> 4.4"' >> Gemfile

# Install dependencies
bundle install

# Install Tailwind CSS (optional, for styling)
npm install tailwindcss @tailwindcss/cli
```

## Architecture Patterns

### Recommended Project Structure
```
houruxin.github.io/
├── _layouts/               # Template files (Phase 1 deliverable)
│   ├── default.html        # Base layout with <head>, header, footer
│   ├── home.html           # Homepage layout (post listing)
│   ├── post.html           # Individual blog post layout
│   └── page.html           # Static page layout (About, etc.)
├── _includes/              # Reusable components (Phase 1 deliverable)
│   ├── head.html           # <head> content (meta, CSS links)
│   ├── header.html         # Site header with navigation
│   └── footer.html         # Site footer with copyright
├── assets/                 # Compiled & static files
│   └── css/
│       └── main.scss       # Main stylesheet (or Tailwind output)
├── _config.yml             # Site configuration (Phase 1 deliverable)
├── index.html              # Homepage (uses home.html layout)
├── 404.html                # Custom 404 page (GitHub Pages picks up automatically)
└── Gemfile                 # Ruby dependencies
```

### Pattern 1: Layout Inheritance
**What:** Layouts extend other layouts via `layout:` front matter, creating a template hierarchy.

**When to use:** Always—reduces duplication, enforces consistent page structure.

**Example:**
```liquid
{%- raw -%}
<!-- _layouts/default.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    {% include head.html %}
  </head>
  <body>
    <header>
      {% include header.html %}
    </header>
    <main>
      {{ content }}
    </main>
    <footer>
      {% include footer.html %}
    </footer>
  </body>
</html>

<!-- _layouts/home.html -->
---
layout: default
---
<h1>{{ site.title }}</h1>
<div class="posts">
  {% for post in site.posts %}
    <article>
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <time>{{ post.date | date_to_string }}</time>
    </article>
  {% endfor %}
</div>
{%- endraw -%}
```
**Source:** [Jekyll Layouts Documentation](https://jekyllrb.com/docs/layouts/)

### Pattern 2: Baseurl-Safe Links
**What:** All internal links use `relative_url` filter to work correctly regardless of deployment path.

**When to use:** Always for internal navigation, CSS, images, and assets.

**Example:**
```liquid
{%- raw -%}
<!-- Correct: works on localhost and GitHub Pages -->
<link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}">
<a href="{{ '/about' | relative_url }}">About</a>
<img src="{{ '/assets/images/logo.png' | relative_url }}" alt="Logo">

<!-- WRONG: breaks on GitHub Pages if baseurl is set -->
<link rel="stylesheet" href="/assets/css/main.css">
<a href="/about">About</a>
{%- endraw -%}
```
**Source:** [Jekyll GitHub Pages Docs](https://jekyllrb.com/docs/github-pages/)

### Pattern 3: Mobile-First Responsive Container
**What:** CSS container that constrains content width and centers it, with padding for mobile.

**Example:**
```css
/* Tailwind CSS v4 equivalent */
.container {
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

/* Vanilla CSS alternative */
.site-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .site-container {
    max-width: 640px;
  }
}

@media (min-width: 1024px) {
  .site-container {
    max-width: 1024px;
  }
}
```

### Anti-Patterns to Avoid
- **Hardcoded absolute paths:** `/about` breaks on GitHub Pages—always use `{{ '/about' | relative_url }}`
- **Inline styles in layouts:** Breaks separation of concerns—use CSS classes
- **Fixed-width containers:** `width: 960px` causes horizontal scroll on mobile—use `max-width`
- **Missing viewport meta tag:** Makes site tiny on mobile—must have `<meta name="viewport" content="width=device-width, initial-scale=1">`
- **Deep layout nesting:** More than 3 levels makes debugging hard—keep to `default.html` → `page-type.html`

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| CSS Reset | Custom reset CSS | Tailwind CSS v4 preflight | Handles 100+ browser inconsistencies, maintained |
| Responsive utilities | Custom media queries | Tailwind CSS utility classes | `sm:`, `md:`, `lg:` prefixes are battle-tested |
| Typography scale | Manual font sizes | Tailwind `text-sm`, `text-lg`, etc. | Consistent scale, accessible defaults |
| Syntax highlighting | Custom highlighter | Rouge (built into Jekyll) | Supports 300+ languages, no config needed |

**Key insight:** Tailwind CSS v4 is 10x faster than v3, zero-config, and produces single-file output. Building custom responsive utilities takes days and will have edge cases Tailwind already solved.

## Common Pitfalls

### Pitfall 1: Baseurl Blindness
**What goes wrong:** Links work locally (`localhost:4000/about`) but return 404 on GitHub Pages (`houruxin.github.io/about` returns 404).

**Why it happens:** `jekyll serve` serves at domain root, but GitHub Pages may serve at `houruxin.github.io/repo-name/`. Hardcoded paths don't account for this.

**How to avoid:**
1. Set `baseurl: ""` in `_config.yml` for user sites (`houruxin.github.io`)
2. Always use `{{ '/path' | relative_url }}` in templates
3. Deploy test immediately after `_config.yml` exists

**Warning signs:** CSS missing on deployed site, navigation links 404, images broken on GitHub Pages but fine locally.

### Pitfall 2: Permalink Regrets
**What goes wrong:** After publishing posts with default `/YYYY/MM/DD/title.html` structure, you want cleaner `/posts/title/` URLs. Changing breaks all shared links.

**Why it happens:** Default Jekyll config accepted without understanding long-term implications.

**How to avoid:** Set `permalink: /posts/:title/` in `_config.yml` BEFORE writing any posts.

**Warning signs:** No `permalink:` setting in `_config.yml`, posts have `.html` extension in URLs.

### Pitfall 3: Mobile Unusability
**What goes wrong:** Text is tiny, images overflow, horizontal scroll appears on mobile. 50%+ readers abandon.

**Why it happens:** Testing only on desktop browser, no viewport meta tag, fixed-width containers.

**How to avoid:**
1. Include `<meta name="viewport" content="width=device-width, initial-scale=1">` in `<head>`
2. Use `max-width: 100%` on images
3. Use relative widths (`max-width: 100%`) not fixed (`width: 960px`)
4. Test on actual phone before marking Phase 1 complete

**Warning signs:** No viewport meta tag, horizontal scroll on narrow screens, text unreadable on mobile.

### Pitfall 4: Layout Inversion Failure
**What goes wrong:** `post.html` doesn't include header/footer, or includes them directly instead of extending `default.html`.

**Why it happens:** Not understanding Liquid's `layout:` front matter inheritance.

**How to avoid:**
1. `default.html` has full HTML structure
2. Other layouts specify `layout: default` and only contain their unique content
3. Use `{{ content }}` in `default.html` to inject child layout output

### Pitfall 5: Missing GitHub Pages Configuration
**What goes wrong:** Site builds locally but fails on GitHub Pages with cryptic errors.

**Why it happens:** Missing `Gemfile`, using unsupported plugins, Ruby version mismatch.

**How to avoid:**
1. Include `Gemfile` with `gem "jekyll", "~> 4.4"`
2. Only use plugins listed in [GitHub Pages supported plugins](https://pages.github.com/versions/)
3. Commit `Gemfile.lock` for reproducible builds

## Code Examples

### Minimal _config.yml
```yaml
# _config.yml
title: Hou Ruxin's Blog
description: Personal blog about technology and life
url: "https://houruxin.github.io"
baseurl: ""  # Empty for user/organization site

# Permalink structure - SET BEFORE FIRST POST
permalink: /posts/:title/

# Build settings
markdown: kramdown
highlighter: rouge

# Plugins (GitHub Pages supported)
plugins:
  - jekyll-feed
  - jekyll-sitemap

# Defaults
defaults:
  - scope:
      path: ""
    values:
      layout: default
```
**Source:** [Jekyll Configuration Docs](https://jekyllrb.com/docs/configuration/)

### Default Layout with Responsive Meta
```liquid
{%- raw -%}
<!-- _layouts/default.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{% if page.title %}{{ page.title }} | {% endif %}{{ site.title }}</title>
  <meta name="description" content="{{ page.description | default: site.description }}">

  <!-- CSS: Tailwind or custom -->
  <link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}">
</head>
<body>
  <header class="site-header">
    <div class="container">
      <a href="{{ '/' | relative_url }}" class="site-title">{{ site.title }}</a>
      <nav>
        <a href="{{ '/' | relative_url }}">Home</a>
        <a href="{{ '/about' | relative_url }}">About</a>
      </nav>
    </div>
  </header>

  <main class="site-main">
    <div class="container">
      {{ content }}
    </div>
  </main>

  <footer class="site-footer">
    <div class="container">
      <p>&copy; {{ site.time | date: '%Y' }} {{ site.title }}</p>
    </div>
  </footer>
</body>
</html>
{%- endraw -%}
```

### Tailwind CSS v4 Setup
```css
/* assets/css/main.scss or assets/css/main.css */
@import "tailwindcss";

/* Custom base styles */
@layer base {
  body {
    @apply text-gray-900 antialiased;
  }

  .container {
    @apply max-w-7xl mx-auto px-4;
  }
}
```

```bash
# Build command (run in parallel with jekyll serve)
npx tailwindcss -i ./assets/css/main.css -o ./_site/assets/css/main.css --watch
```
**Source:** [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)

### 404 Page (GitHub Pages Auto-Detected)
```liquid
{%- raw -%}
<!-- 404.html -->
---
layout: default
title: Page Not Found
---
<div class="error-page">
  <h1>404</h1>
  <p>Page not found. <a href="{{ '/' | relative_url }}">Return home</a></p>
</div>
{%- endraw -%}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Jekyll 3.x | Jekyll 4.4.1 | Jan 2025 | Faster builds, better Windows support |
| Tailwind CSS v3 | Tailwind CSS v4 | Feb 2026 | 10x faster, zero-config, simpler |
| Custom CSS reset | Tailwind Preflight | Always | 100+ browser inconsistencies handled |
| Manual responsive utilities | Tailwind `sm:`, `md:`, `lg:` | 2020+ | Consistent breakpoints, less CSS |

**Deprecated/outdated:**
- **Jekyll 3.x:** Missing features, slower, not recommended
- **Tailwind CSS v3:** v4 has 10x performance improvement
- **`{% include %}` with parameters:** Prefer simpler includes, pass data via page front matter

## Open Questions

1. **Tailwind CSS integration approach**
   - What we know: v4 supports both build step and CDN
   - What's unclear: Whether build step complexity is worth it for Phase 1
   - Recommendation: Start with CDN for Phase 1, migrate to build step in Phase 2 if needed

2. **baseurl value for houruxin.github.io**
   - What we know: User sites (`username.github.io`) use root, project sites use `/repo-name`
   - What's unclear: Whether this is a user site or project site
   - Recommendation: Set `baseurl: ""` for `houruxin.github.io` (user site)

3. **Custom theme vs. minima base**
   - What we know: minima is GitHub Pages default theme
   - What's unclear: Whether to build custom or extend minima
   - Recommendation: Build custom for full control, minima adds unnecessary abstraction

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Manual testing + Link checker |
| Config file | None |
| Quick run command | `bundle exec jekyll serve` |
| Full suite command | Manual: test on mobile + desktop |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FOUND-01 | Jekyll site renders correctly on GitHub Pages | Manual | Deploy + visual check | ❌ Wave 0 |
| FOUND-02 | No broken links from baseurl issues | Manual | Click all nav links on deployed site | ❌ Wave 0 |
| FOUND-03 | Permalink structure consistent | Manual | Check post URL format | ❌ Wave 0 |
| FOUND-04 | Layout inheritance works | Manual | Verify header/footer on all pages | ❌ Wave 0 |
| FOUND-05 | Responsive on mobile | Manual | Test on physical device | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `bundle exec jekyll serve` - verify no build errors
- **Per wave merge:** Manual deployment to GitHub Pages, test all links
- **Phase gate:** Site accessible at houruxin.github.io with no 404s, mobile tested

### Wave 0 Gaps
- [ ] `_config.yml` — Jekyll configuration with baseurl, permalink, url
- [ ] `_layouts/default.html` — Base layout with head, header, footer
- [ ] `_layouts/home.html` — Homepage layout
- [ ] `_includes/head.html` — Reusable head content
- [ ] `_includes/header.html` — Reusable header
- [ ] `_includes/footer.html` — Reusable footer
- [ ] `assets/css/main.css` — Stylesheet (Tailwind or custom)
- [ ] `404.html` — Custom 404 page
- [ ] `Gemfile` — Jekyll dependency declaration
- [ ] Mobile testing checklist — Verify on actual device

## Sources

### Primary (HIGH confidence)
- **Jekyll v4.4.1** — https://github.com/jekyll/jekyll/releases/tag/v4.4.1 (Jan 29, 2025)
- **Jekyll GitHub Pages docs** — https://jekyllrb.com/docs/github-pages/
- **GitHub Pages docs** — https://docs.github.com/en/pages
- **Tailwind CSS v4.2.1** — https://github.com/tailwindlabs/tailwindcss/releases (Feb 23, 2026)
- **Jekyll Documentation** — https://jekyllrb.com/docs/ (Posts, Structure, Layouts, Includes, Datafiles)
- **Tailwind CSS v4 Docs** — https://tailwindcss.com/docs

### Secondary (MEDIUM confidence)
- **Static site performance best practices** — https://web.dev/
- **Common Jekyll mistakes** — https://dev.to/ community discussions
- **Personal blog postmortems** — https://news.ycombinator.com/ threads

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — Jekyll is the only SSG with native GitHub Pages support, verified via official docs
- Architecture: HIGH — Jekyll's directory structure and Liquid templating are mature, documented conventions
- Pitfalls: MEDIUM — Based on community discussions and Jekyll docs; some pitfalls inferred from common patterns

**Research date:** 2026-03-17
**Valid until:** 2026-06-17 (90 days for stable Jekyll ecosystem)
