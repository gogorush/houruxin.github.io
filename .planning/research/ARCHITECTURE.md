# Architecture Research

**Domain:** Personal Blog (Static Site / GitHub Pages)
**Researched:** 2026-03-17
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Content Layer                           │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   _posts/   │  │   pages/    │  │   _data/    │         │
│  │  (Markdown) │  │  (Markdown) │  │   (YAML)    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│                      Template Layer                          │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  _layouts/  │  │ _includes/  │  │ _sass/      │         │
│  │  (HTML+LF)  │  │   (HTML)    │  │   (SCSS)    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│                      Build Layer                             │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐    │
│  │                    Jekyll Engine                     │    │
│  │              (Markdown → HTML + SCSS → CSS)          │    │
│  └─────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────┤
│                      Output Layer                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ index.html│  │ posts.html│  │ about.html│  │ assets/  │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| `_posts/` | Blog post content | Markdown files with front matter (YYYY-MM-DD-title.md) |
| `_layouts/` | Page templates | HTML with Liquid templating (default.html, post.html, page.html) |
| `_includes/` | Reusable HTML fragments | header.html, footer.html, social-links.html |
| `_sass/` | Stylesheets | SCSS partials for theming |
| `_data/` | Structured data | YAML files for navigation, social links, etc. |
| `assets/` | Static assets | CSS, JavaScript, images |
| `_config.yml` | Site configuration | Title, description, theme, plugins |
| `pages/` or root | Static pages | about.md, index.html |

## Recommended Project Structure

```
houruxin.github.io/
├── _posts/                 # Blog posts (Markdown)
│   ├── 2026-03-17-hello-world.md
│   └── 2026-03-18-second-post.md
├── _layouts/               # Template files
│   ├── default.html        # Base layout with <head>, header, footer
│   ├── home.html           # Homepage layout (post listing)
│   ├── post.html           # Individual blog post layout
│   └── page.html           # Static page layout (About, etc.)
├── _includes/              # Reusable components
│   ├── header.html         # Site header with navigation
│   ├── footer.html         # Site footer with copyright
│   ├── social-links.html   # Social media icons
│   └── head.html           # <head> content (meta, CSS)
├── _sass/                  # SCSS stylesheets
│   ├── _variables.scss     # Colors, fonts, spacing
│   ├── _base.scss          # Global resets, typography
│   ├── _layout.scss        # Page structure styles
│   └── _posts.scss         # Post-specific styles
├── _data/                  # Structured data
│   └── navigation.yml      # Menu links
├── assets/                 # Compiled & static files
│   ├── css/
│   │   └── main.scss       # Main stylesheet (imports _sass/)
│   └── images/             # Blog post images
├── pages/                  # Optional: organize static pages
│   └── about.md            # About page
├── _config.yml             # Site configuration
├── index.md                # Homepage (uses home.html layout)
├── 404.html                # Custom 404 page
└── Gemfile                 # Ruby dependencies (Jekyll + plugins)
```

### Structure Rationale

- **`_posts/`:** Date-prefixed filenames enable automatic chronological ordering. Jekyll parses these as blog posts with `site.posts` collection.
- **`_layouts/`:** Separates page templates by content type (post vs. static page). Enables consistent header/footer via `default.html` inheritance.
- **`_includes/`:** Promotes DRY — common elements (header, footer) written once, included in multiple layouts.
- **`_sass/`:** Modular stylesheets using SCSS partials (underscore prefix). Imported into `assets/css/main.scss` for compilation.
- **`_config.yml`:** Single source of truth for site metadata, build settings, and plugin configuration.
- **`assets/`:** Holds compiled CSS and images. Clear separation from source content.

## Architectural Patterns

### Pattern 1: Layout Inheritance

**What:** Layouts extend other layouts via `layout:` front matter, creating a template hierarchy.

**When to use:** Always — reduces duplication, enforces consistent page structure.

**Trade-offs:** Deep nesting can make debugging harder. Keep to 2-3 levels max.

**Example:**
```yaml
# _layouts/post.html
---
layout: default
---
<article class="post">
  <h1>{{ page.title }}</h1>
  <time>{{ page.date | date_to_string }}</time>
  {{ content }}
</article>

# _layouts/default.html
---
---
<!DOCTYPE html>
<html>
  <head>
    {% include head.html %}
  </head>
  <body>
    {% include header.html %}
    <main>{{ content }}</main>
    {% include footer.html %}
  </body>
</html>
```

### Pattern 2: Content Collections

**What:** Group related content (posts, pages, projects) into separate directories with shared metadata schemas.

**When to use:** When content types differ significantly (e.g., blog posts vs. portfolio projects).

**Trade-offs:** Default `_posts/` collection requires no config. Custom collections need `_config.yml` setup.

### Pattern 3: Data Files for Configuration

**What:** Store navigation menus, social links, and other structured data in `_data/*.yml` files.

**When to use:** For content that appears in multiple places (nav menu in header + footer).

**Trade-offs:** Adds indirection but enables single-source updates.

**Example:**
```yaml
# _data/navigation.yml
- label: Home
  url: /
- label: About
  url: /about/
- label: GitHub
  url: https://github.com/houruxin

# _includes/header.html
<nav>
  {% for item in site.data.navigation %}
    <a href="{{ item.url }}">{{ item.label }}</a>
  {% endfor %}
</nav>
```

## Data Flow

### Build-Time Data Flow

```
┌──────────────┐
│   Source     │
│   Content    │
│   (Markdown) │
│   (YAML)     │
└──────┬───────┘
       │
       ↓
┌──────────────┐
│   Jekyll     │
│   Front      │
│   Matter     │
│   Parser     │
└──────┬───────┘
       │
       ↓
┌──────────────┐     ┌──────────────┐
│   Layout     │────▶│   Liquid     │
│   Resolver   │     │   Renderer   │
└──────┬───────┘     └──────┬───────┘
       │                    │
       ↓                    ↓
┌──────────────┐     ┌──────────────┐
│   SCSS       │     │   HTML       │
│   Compiler   │     │   Output     │
└──────┬───────┘     └──────┬───────┘
       │                    │
       ↓                    ↓
┌─────────────────────────────────────┐
│           _site/ (Deploy)           │
│   index.html | posts.html | assets/ │
└─────────────────────────────────────┘
```

### Content Flow (Author → Reader)

1. **Author writes:** Markdown file in `_posts/YYYY-MM-DD-title.md` with front matter (title, date, tags)
2. **Jekyll builds:** Converts Markdown → HTML, applies layout template, injects includes
3. **Git push:** Commit to `main` branch triggers GitHub Pages build
4. **GitHub Pages:** Runs `jekyll build`, deploys `_site/` to CDN
5. **Reader requests:** Browser loads static HTML, CSS, images from CDN

### Key Data Flows

1. **Post Listing Flow:** `site.posts` → `home.html` layout → iterates posts → renders excerpt → outputs index.html
2. **Individual Post Flow:** Request `/year/month/title/` → finds matching post → applies `post.html` layout → renders full `content`
3. **Navigation Flow:** `_data/navigation.yml` → `{% for item in site.data.navigation %}` → header.html + footer.html

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-1k users | Default Jekyll structure is sufficient. No changes needed. |
| 1k-100k users | Enable GitHub Pages caching, optimize images, consider CDN for assets. |
| 100k+ users | Move to dedicated hosting (Vercel, Netlify), add search (Algolia), lazy-load images. |

### Scaling Priorities

1. **First bottleneck:** Image load times — Fix with responsive images (`srcset`), WebP format, lazy loading.
2. **Second bottleneck:** Build times (100+ posts) — Fix with incremental builds (`--incremental` flag), limit posts per page (pagination).

## Anti-Patterns

### Anti-Pattern 1: All Content in One Layout

**What people do:** Put full HTML structure in every post/page file instead of using layouts.

**Why it's wrong:** Duplicates header/footer/nav on every page. Makes site-wide changes require editing every file.

**Do this instead:** Create `default.html` layout with shared elements. Use `layout: default` in front matter.

### Anti-Pattern 2: Inline Styles in Posts

**What people do:** Write `<style>` blocks or inline CSS in Markdown posts.

**Why it's wrong:** Breaks separation of concerns. Styles scattered across content files. Harder to maintain theme.

**Do this instead:** Add classes to Markdown (`{: .classname}`), define styles in `_sass/`.

### Anti-Pattern 3: Hardcoded Navigation

**What people do:** Write navigation links directly in `_includes/header.html` and `_includes/footer.html`.

**Why it's wrong:** Update requires editing multiple files. Easy to forget one location.

**Do this instead:** Store navigation in `_data/navigation.yml`, loop in both includes.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Google Analytics | Include in `_includes/head.html` via `_config.yml` toggle | Use `site.google_analytics` ID |
| Disqus Comments | Include in `_includes/comments.html`, conditionally load on posts | Add `comments: true` front matter |
| GitHub Social Proof | Fetch via JavaScript or use static badges | Avoid build-time API calls (slow builds) |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| `_posts/` ↔ `_layouts/post.html` | Front matter variables (`page.title`, `page.date`) | Layout reads post metadata |
| `_includes/` ↔ `_layouts/*` | Liquid `{% include %}` tags with optional parameters | Pass variables: `{% include social.html twitter=site.twitter %}` |
| `_sass/` ↔ `assets/css/main.scss` | SCSS `@import` directives | Main.scss imports all partials |

## Build Order Implications

For roadmap phasing, build components in this order:

1. **Phase 1: Core Structure**
   - `_config.yml` — Site metadata, theme settings
   - `_layouts/default.html` — Base HTML shell
   - `_includes/head.html`, `_includes/header.html`, `_includes/footer.html`
   - `assets/css/main.scss` — Basic typography styles

2. **Phase 2: Content Display**
   - `index.md` with `layout: home` — Homepage shell
   - `_layouts/home.html` — Post listing template
   - `_posts/` — First blog posts
   - `_layouts/post.html` — Individual post template

3. **Phase 3: Polish**
   - `_sass/` — Theming, responsive styles
   - `pages/about.md` — About page
   - `_data/navigation.yml` — Centralized navigation
   - `404.html` — Custom error page

4. **Phase 4: Enhancements (Defer until content exists)**
   - Search (Algolia or simple client-side)
   - Pagination for post listing
   - RSS feed (`feed.xml`)
   - Sitemap generation

## Sources

- [Jekyll Official Documentation — Directory Structure](https://jekyllrb.com/docs/structure/)
- [Jekyll Official Documentation — Posts](https://jekyllrb.com/docs/posts/)
- [Jekyll Official Documentation — Layouts](https://jekyllrb.com/docs/layouts/)
- [Jekyll Official Documentation — Includes](https://jekyllrb.com/docs/includes/)
- [Jekyll Official Documentation — Data Files](https://jekyllrb.com/docs/datafiles/)
- [GitHub Pages Documentation](https://pages.github.com/)
- [Jekyll Best Practices — Community Patterns](https://jekyllrb.com/docs/best-practices/)

---
*Architecture research for: Personal Blog (GitHub Pages / Jekyll)*
*Researched: 2026-03-17*
