# Pitfalls Research

**Domain:** Personal Blog (GitHub Pages / Jekyll)
**Researched:** 2026-03-17
**Confidence:** MEDIUM

## Critical Pitfalls

### Pitfall 1: Local Links Work Locally But Break on GitHub Pages

**What goes wrong:**
Links use relative paths that work when testing locally (`/about`) but break when deployed to `houruxin.github.io` because the site lives in a subdirectory, not the domain root.

**Why it happens:**
Developers test locally with `jekyll serve` which serves at `localhost:4000/` directly, but GitHub Pages serves at `houruxin.github.io/blog/` (or similar). Hardcoded paths like `/css/style.css` or `/about/index.html` resolve incorrectly.

**How to avoid:**
Always use Jekyll's `absolute_url` or `relative_url` helpers in templates:
```liquid
<link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}">
<a href="{{ '/about' | relative_url }}">About</a>
```
Set `baseurl` correctly in `_config.yml` for your repository name.

**Warning signs:**
- CSS/images missing when viewing deployed site
- Navigation links 404 after deployment
- Site works locally but looks broken on GitHub Pages

**Phase to address:**
Phase 1 (Foundation) — Configure `_config.yml` correctly before writing any content, test deployment immediately.

---

### Pitfall 2: Overscoping the First Blog Platform

**What goes wrong:**
Spending weeks building custom features (search, tags, categories, comments, dark mode toggle) before publishing a single post. The blog is "almost ready" for months.

**Why it happens:**
Excitement about building the perfect platform. Belief that you need all features before launching. Underestimating the effort of "just one more feature."

**How to avoid:**
Ship with only: homepage, post listing, individual post view, about page. Everything else requires a published post to justify. GitHub issues can serve as temporary comments.

**Warning signs:**
- More time spent on infrastructure than content
- "Just need X before I can publish" mindset
- Multiple branches for features, no deployed site

**Phase to address:**
Phase 1 (Foundation) — MVP definition and discipline. Explicit "out of scope" list in roadmap.

---

### Pitfall 3: Ignoring Mobile Responsiveness Until After Launch

**What goes wrong:**
Blog looks great on desktop but text is tiny, images overflow, or navigation is unusable on mobile. 50%+ of readers abandon the site.

**Why it happens:**
Developers test on their large monitors during development. Mobile testing is an afterthought. CSS media queries added retroactively are fragile.

**How to avoid:**
Start with mobile-first CSS or use a proven Jekyll theme that's already responsive. Test on actual phone during development, not just browser dev tools.

**Warning signs:**
- No viewport meta tag in layout
- Fixed-width containers (e.g., `width: 960px`)
- Horizontal scroll on narrow screens
- Testing only done on desktop

**Phase to address:**
Phase 1 (Foundation) — Responsive layout is part of the base theme, not an add-on.

---

### Pitfall 4: No Permalink Structure Planning

**What goes wrong:**
Posts have URLs like `/2026/03/17/my-post.html` initially, then later you want `/posts/my-post/` or just `/my-post/`. Changing the structure breaks all existing links (SEO disaster, broken shares).

**Why it happens:**
Default Jekyll settings accepted without understanding the long-term implication. Not realizing permalinks are effectively immutable once content is shared.

**How to avoid:**
Set `permalink: /posts/:title/` or `permalink: /:title/` in `_config.yml` before publishing anything. Decide on date-based vs. evergreen URLs upfront.

**Warning signs:**
- Using default date-based permalinks without consideration
- `.html` extension in URLs
- No `permalink` setting in `_config.yml`

**Phase to address:**
Phase 1 (Foundation) — Define permalink structure before first post.

---

### Pitfall 5: Publishing Without SEO Fundamentals

**What goes wrong:**
Blog posts don't appear in search results. No one discovers content. Each page has the same generic title/description or missing meta tags entirely.

**Why it happens:**
SEO feels like "marketing" not engineering. Assumption that "good content will be found." Jekyll doesn't enforce meta tags by default.

**How to avoid:**
Include in every post front matter: `title`, `description`. Use Jekyll SEO plugin or add to layout:
```liquid
<title>{{ page.title }} | {{ site.title }}</title>
<meta name="description" content="{{ page.description }}">
```
Generate `sitemap.xml` and `robots.txt`.

**Warning signs:**
- Posts without `description` in front matter
- Homepage title is just "Home" or "Index"
- No sitemap.xml being generated
- Duplicate titles across pages

**Phase to address:**
Phase 2 (Content Foundation) — SEO as part of the post template, not optional.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Hardcoded paths in templates | Faster initial setup | Links break on deployment, requires find/replace | Never — `relative_url` takes seconds |
| Skipping mobile testing | Ship faster initially | Half your audience can't read, requires CSS rewrite | Never for production |
| No post descriptions | Write posts faster | Poor SEO, can't fix retroactively without editing all posts | Never — 30 seconds per post |
| Default Jekyll theme | Immediate launch | Hard to customize later, looks generic | MVP only, plan migration |
| No analytics | Privacy-friendly, simpler | No idea what's working, flying blind | First 2 weeks only |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Google Analytics | Hardcode tracking ID in every page | Use `_includes/analytics.html` with `site.google_analytics_id` |
| Custom domain | Add CNAME but don't update `_config.yml` url | Set `url: https://yourdomain.com` in config |
| GitHub Pages deployment | Push to wrong branch (dev instead of main) | Configure Actions to deploy from main only |
| Images in posts | Use absolute paths or external hosting | Use `/assets/images/` in repo with `relative_url` filter |
| RSS feed | Assume it's auto-generated | Add `jekyll-feed` plugin, reference in layout |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Unoptimized images | 5+ second page load, mobile users abandon | Compress to <200KB, use WebP, lazy load | Immediately — affects all users |
| Too many external scripts | Slow rendering, failed requests block content | Inline critical CSS, defer non-essential JS | Immediately |
| No caching headers | Repeat visitors re-download everything | GitHub Pages handles this, but verify | At ~100 repeat visitors |
| Large CSS bundles | Slow first paint | Purge unused CSS, split critical path | At ~500 visitors/month |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Exposing email in plain text | Scraped by spammers, increased spam | Use obfuscation (`name at domain`) or contact form |
| Including API keys in repo | Credentials leaked, abuse | Never commit `.env` or configs with secrets |
| No CSP headers | XSS if any user input rendered | Add Content-Security-Policy via meta tag |
| Outdated Jekyll/plugins | Known vulnerabilities exploitable | Run `bundle update` monthly, check advisories |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| No reading time estimate | Users can't gauge commitment | Add `reading_time` plugin, display "5 min read" |
| Wall of text formatting | Hard to scan, eyes tire | Use subheadings, short paragraphs, lists |
| Missing related posts | Dead-end experience | Add "See also" or recent posts at bottom |
| No way to navigate back | User lands on post, can't find more | Clear navigation on every page |
| Dates not visible | Can't tell if content is current | Show publish date prominently |

## "Looks Done But Isn't" Checklist

- [ ] **RSS Feed:** Often missing — verify `feed.xml` exists and is linked in `<head>`
- [ ] **404 Page:** Often missing — verify custom `404.html` works on GitHub Pages
- [ ] **Favicon:** Often missing — verify `/favicon.ico` and apple-touch-icon present
- [ ] **Social Sharing:** Often missing — verify Open Graph tags render correctly
- [ ] **Print Styles:** Often missing — verify printed pages don't include navigation
- [ ] **Sitemap:** Often missing — verify `/sitemap.xml` generated and accessible

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Broken links after deploy | LOW | Fix `_config.yml` baseurl, re-deploy, test all links |
| Realized permalink structure is wrong | MEDIUM | Only fixable before publishing posts; after that, requires redirects |
| Mobile is broken after launch | MEDIUM | CSS refactor, test on real devices, deploy |
| No analytics for months | LOW | Add analytics snippet, accept gap in data |
| SEO missing from old posts | HIGH | Bulk-edit front matter with script, or accept permanent gap |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Local links break on deploy | Phase 1 | Deploy test site, click every link on mobile and desktop |
| Overscoping | Phase 1 | Roadmap explicitly lists what's NOT in v1 |
| Mobile broken | Phase 1 | Test on physical phone before marking complete |
| Permalink regrets | Phase 1 | `_config.yml` has explicit `permalink:` setting |
| Missing SEO | Phase 2 | Every post template requires `description` |
| No RSS | Phase 2 | `/feed.xml` accessible and linked |
| Performance issues | Phase 2 | Lighthouse score >90 on mobile before launch |
| Security gaps | Phase 1 | No secrets in repo, CSP header present |

## Sources

- [Jekyll Documentation — Configuration](https://jekyllrb.com/docs/configuration/)
- [GitHub Pages — Known Limitations](https://docs.github.com/en/pages)
- [Static site performance best practices — Web.dev](https://web.dev/)
- [Common Jekyll mistakes — Dev.to community discussions](https://dev.to/)
- [Personal blog postmortems — Hacker News threads](https://news.ycombinator.com/)

---
*Pitfalls research for: Personal Blog (GitHub Pages / Jekyll)*
*Researched: 2026-03-17*
