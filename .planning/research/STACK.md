# Technology Stack

**Project:** Personal Blog (houruxin.github.io)
**Domain:** GitHub Pages Static Site
**Researched:** 2026-03-17
**Confidence:** HIGH

## Recommended Stack

### Core Technology: Jekyll 4.4.1

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| **Jekyll** | v4.4.1 (Jan 2025) | Static site generator | **Only SSG with native GitHub Pages support** - no build step required, GitHub Pages runs Jekyll directly on push |
| **Liquid** | Built-in | Template language | Jekyll's templating engine, simple syntax for blogs |
| **GitHub Actions** | Current | CI/CD pipeline | For non-Jekyll SSGs; deploys pre-built static files |

### Styling: Tailwind CSS 4.2.1

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| **Tailwind CSS** | v4.2.1 (Feb 2026) | Utility-first CSS framework | v4 is 10x faster, zero-config, single CSS file output. Perfect for static sites |
| **@tailwindcss/cli** | v4.2.1 | Build tool | Watch mode for development, one-command build |

### Development Tooling

| Tool | Purpose | Notes |
|------|---------|-------|
| **Bundler** | Ruby dependency management | Manages Jekyll + plugins, ensures consistent versions |
| **Jekyll serve** | Local dev server | `bundle exec jekyll serve --livereload` for hot reload |

## Why Jekyll for GitHub Pages

GitHub Pages **natively supports Jekyll** - meaning:

1. **No build step required** - Push Markdown + Jekyll config, GitHub builds automatically
2. **Zero configuration** - No GitHub Actions workflow needed for basic setup
3. **Fastest deployment** - No CI wait time, direct rendering on GitHub's infrastructure
4. **Official support** - GitHub's docs explicitly recommend Jekyll for Pages

Other SSGs (Astro, Hugo, 11ty) require GitHub Actions to pre-build and deploy, adding complexity.

## Installation

### Option A: Pure Jekyll (Recommended for GitHub Pages)

```bash
# Install Ruby (if not installed)
# macOS: brew install ruby
# Linux: apt install ruby-full

# Install Jekyll and Bundler
gem install jekyll bundler

# Initialize Bundler in project
bundle init

# Add to Gemfile (already done in this repo):
# gem "jekyll", "~> 4.4"

# Install dependencies
bundle install

# Run local dev server
bundle exec jekyll serve --livereload
```

### Option B: Jekyll + Tailwind CSS v4

```bash
# Core Jekyll setup
bundle install

# Install Tailwind CSS v4
npm install tailwindcss @tailwindcss/cli

# Create tailwind.config.js
npx tailwindcss init

# Build Tailwind CSS
npx tailwindcss -i ./src/input.css -o ./assets/css/style.css --watch

# Run both in parallel (dev)
# Terminal 1: bundle exec jekyll serve --livereload
# Terminal 2: npx tailwindcss -i ./src/input.css -o ./assets/css/style.css --watch
```

## GitHub Actions Deployment (If Using Non-Jekyll SSG)

If you choose Astro/Hugo/11ty instead, you need this workflow:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # For Astro:
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|------------------------|
| Jekyll | **Astro 6.0** | Choose Astro if: you need React/Vue/Svelte components, want partial hydration for complex interactivity |
| Jekyll | **Hugo 0.158** | Choose Hugo if: you have 1000+ pages, need sub-second builds, prefer Go over Ruby |
| Jekyll | **11ty 3.1** | Choose 11ty if: you want maximum flexibility, JavaScript config, no opinions |
| Tailwind CSS | **Plain CSS** | Choose plain CSS if: site is very simple, team knows CSS well, want zero dependencies |
| Tailwind CSS | **Bootstrap** | Choose Bootstrap if: you need pre-built components, don't want to customize design |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| **Jekyll 3.x** | Missing features, slower, no longer latest | Jekyll 4.4.1 |
| **Tailwind CSS v3** | v4 has 10x performance improvement, simpler config | Tailwind CSS v4.2.1 |
| **Bootstrap 5** | Heavy (~200KB), overkill for simple blog | Tailwind CSS v4 (tree-shakes unused styles) |
| **React/Next.js** | Overkill for static blog, requires hosting beyond Pages | Jekyll or Astro static export |
| **Gatsby** | Complex build process, slow rebuilds, React-heavy | Astro (lighter) or Jekyll (simpler) |
| **Middleman** | Ruby-based like Jekyll but less maintained, smaller community | Jekyll |
| **Pure HTML/CSS** | No templating, no Markdown, manual maintenance | Jekyll (adds minimal overhead) |

## Stack Variants

### Minimalist (Fastest to Launch)
- Jekyll 4.4.1 only
- Default Jekyll theme (minima)
- No custom CSS framework
- **Launch time:** 1-2 hours

### Standard (Recommended)
- Jekyll 4.4.1
- Tailwind CSS 4.2.1
- Custom theme
- **Launch time:** 1 day

### Enhanced (Future Upgrade Path)
- Astro 6.0 instead of Jekyll
- Tailwind CSS 4.2.1
- React/Preact for interactive components
- **Launch time:** 2-3 days
- **Why:** Adds build complexity but enables modern component architecture

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| Jekyll 4.4.1 | Ruby 3.0+ | GitHub Pages runs Ruby 3.1 |
| Tailwind CSS 4.x | Node 18+ | Use LTS version |
| Bundler 2.x | Jekyll 4.x | Included with Ruby |

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    GitHub Pages                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Your Repository (houruxin.github.io)           │   │
│  │                                                 │   │
│  │  _posts/     (Markdown blog posts)              │   │
│  │  _layouts/   (Liquid templates)                 │   │
│  │  _includes/  (Reusable components)              │   │
│  │  assets/     (CSS, images, JS)                  │   │
│  │  _config.yml (Jekyll configuration)             │   │
│  │                                                 │   │
│  │  ┌─────────────────────────────────────────┐   │   │
│  │  │  GitHub Pages Build (Native Jekyll)     │   │   │
│  │  │  On push to main:                       │   │   │
│  │  │  1. Jekyll renders all pages            │   │   │
│  │  │  2. Static files generated              │   │   │
│  │  │  3. Deployed to github.io               │   │   │
│  │  └─────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────┘   │
│                        │                                │
│                        ▼                                │
│         https://houruxin.github.io                      │
└─────────────────────────────────────────────────────────┘
```

## Sources

- **Jekyll v4.4.1** - https://github.com/jekyll/jekyll/releases/tag/v4.4.1 (Jan 29, 2025) - HIGH confidence
- **Jekyll GitHub Pages docs** - https://jekyllrb.com/docs/github-pages/ - HIGH confidence (official)
- **GitHub Pages docs** - https://docs.github.com/en/pages - HIGH confidence (official)
- **Tailwind CSS v4.2.1** - https://github.com/tailwindlabs/tailwindcss/releases (Feb 23, 2026) - HIGH confidence
- **Astro 6.0.5** - https://github.com/withastro/astro/releases (Mar 2026) - HIGH confidence
- **Hugo 0.158.0** - https://github.com/gohugoio/hugo/releases (Mar 16, 2026) - HIGH confidence
- **11ty 3.1.2** - https://github.com/11ty/eleventy/releases (Jun 24, 2025) - HIGH confidence

---
*Stack recommendation for: Personal Blog on GitHub Pages*
*Key insight: Jekyll is the only SSG with native GitHub Pages support - zero build configuration required*
