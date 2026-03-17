# Feature Landscape

**Domain:** Personal Blog (Static Site / GitHub Pages)
**Researched:** 2026-03-17

## Table Stakes

Features users expect. Missing = users leave or product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Blog post pages** | Core purpose of a blog. Users expect to read individual articles. | Low | Jekyll provides this out of the box via `_posts/` directory with front matter |
| **Blog homepage with post listings** | Users need to discover and navigate to individual posts. | Low | Simple Liquid loop over `site.posts` displays chronological list |
| **About page** | Establishes author credibility and context. Standard for personal blogs. | Low | Static page at `/about.html` or `/about/` |
| **Responsive design (mobile/desktop)** | >50% of web traffic is mobile. Non-responsive = broken experience. | Medium | CSS media queries, flexible layouts. Jekyll themes include this. |
| **RSS/Atom feed** | Readers expect to subscribe via RSS readers. Built into Jekyll via `jekyll-feed` plugin. | Low | Automatic generation at `/feed.xml`. Essential for blog readers. |
| **Clean typography & readability** | Blog is text-first. Poor typography = unreadable = users leave. | Low | Readable font sizes (16px+), line-height (1.5-1.7), max line width (~70 chars) |
| **Fast page load times** | Users abandon slow sites. Static sites should load <1s. | Low | Jekyll generates static HTML. No server-side rendering needed. |
| **Permalinks to posts** | Users need stable URLs to share posts. | Low | Jekyll handles via `permalink` front matter or global config |
| **Post titles & dates** | Basic metadata for identifying content. | Low | Extracted from filename or front matter |
| **GitHub Pages deployment** | Free hosting, automatic deployment on git push. Expected for this stack. | Low | Push to `main` branch triggers deploy. HTTPS included. |

## Differentiators

Features that set product apart. Not expected, but valued when done well.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Search functionality** | Enables finding specific content across many posts. Valuable once 20+ posts exist. | Medium | Can use client-side search (Lunr.js, Pagefind) or Algolia. Overkill for <10 posts. |
| **Categories/Tags** | Helps organize content, enables topic-based browsing. | Low | Jekyll has first-class support. `site.categories` and `site.tags` in Liquid. |
| **Pagination** | Improves navigation when many posts exist. Prevents endless homepage scroll. | Low | Jekyll supports via `jekyll-paginate` plugin or manual Liquid logic. |
| **Related posts section** | Keeps readers engaged, discovers older content. | Medium | Jekyll can compute by tags/categories or simple "recent posts" logic. |
| **Author bio/Byline on posts** | Personalizes content, builds author brand. | Low | Simple front matter + layout include. |
| **Reading time estimate** | Helps readers commit to content. Nice-to-have UX touch. | Low | Word count / 200 words per minute. Simple Liquid calculation. |
| **Dark mode toggle** | Accessibility, user preference. Modern expectation for 2025+. | Medium | CSS custom properties + localStorage for persistence. |
| **Social sharing links** | Makes sharing easy. Increases reach. | Low | Simple URLs to Twitter, LinkedIn, etc. No JavaScript required. |
| **Sitemap.xml** | SEO benefit, helps search engines index content. | Low | `jekyll-sitemap` plugin generates automatically. |
| **Custom domain with HTTPS** | Professional appearance, trust. GitHub Pages provides free HTTPS. | Low | Configure in GitHub repo settings. |
| **Archive page (by date/year)** | Alternative navigation for long-standing blogs. | Low | Group posts by year using Liquid. |

## Anti-Features

Features to explicitly NOT build. Avoid complexity that doesn't serve the core purpose.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Comments system** | Adds dynamic backend complexity to static site. Spam, moderation, database requirements. Contradicts "simple, fast" value prop. | Link to social media for discussion. Accept that blog is one-way communication for now. |
| **Newsletter integration** | Requires email service, signup forms, GDPR compliance. Out of scope for v1 personal blog. | Add RSS feed. Readers who want updates can subscribe via RSS reader. |
| **User authentication** | No user accounts needed for read-only blog. Adds massive complexity. | None. Blog is public, no login required. |
| **Dynamic content (JavaScript-heavy)** | Defeats purpose of static site. Slower load, more failure points. | Use minimal JS for essential interactions only (e.g., dark mode toggle). |
| **Analytics dashboard (self-hosted)** | Building analytics is a different product. Massive scope creep. | Use simple, privacy-friendly external analytics if needed (e.g., Plausible, Fathom). Or none at all. |
| **Categories/tags for <10 posts** | Premature optimization. Adds UI complexity without enough content to organize. | Start simple. Add when you have 10+ posts spanning multiple topics. |
| **Search for <20 posts** | Users can scan 20 titles easily. Search UI adds complexity before it's needed. | Add search when you hit 20+ posts. Use client-side search (no backend). |
| **Multiple authors** | Personal blog = one author. Multi-author adds user management complexity. | If needed later, use front matter `author:` field. No user system needed. |
| **Draft workflow with preview** | GitHub workflow is sufficient. No need for complex preview system. | Write locally, `jekyll serve` for preview, push to deploy. Simple. |
| **Custom theme builder** | Theme customization is a product unto itself. | Pick or build one theme. Hardcode it. Change by editing CSS directly. |

## Feature Dependencies

```
Blog posts → Homepage listing (homepage displays posts)
Blog posts → RSS feed (feed requires posts to syndicate)
Blog posts → Categories/Tags (requires posts with taxonomy)
Categories/Tags → Related posts (related logic uses taxonomy)
Responsive design → All pages (global concern)
Pagination → Homepage listing (paginates the list)
```

## MVP Recommendation

**Prioritize for v1:**
1. Blog posts (core content)
2. Homepage with post listing
3. About page
4. Responsive design (mobile-friendly CSS)
5. RSS feed (jekyll-feed plugin)
6. GitHub Pages deployment pipeline

**Defer:**
- Search: Add when 20+ posts exist
- Categories/tags: Add when 10+ posts spanning multiple topics
- Pagination: Add when homepage has 15+ posts
- Dark mode: Nice-to-have, add post-v1
- Social sharing: Add after content exists

**Rationale:** Ship the simplest possible blog that delivers core value (publishing and reading). All deferred features are additive improvements, not blockers for value delivery.

## Sources

- [Jekyll Documentation - Posts](https://jekyllrb.com/docs/posts/) - Blog-aware features built into Jekyll
- [Jekyll Documentation - Structure](https://jekyllrb.com/docs/structure/) - Collections, includes, layouts
- [GitHub Pages](https://pages.github.com/) - Free static hosting with HTTPS
- Web search results on personal blog best practices 2025-2026
