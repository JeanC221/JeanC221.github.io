# PLAN.md - Personal Portfolio Landing

Status: **P3 tooling done (2026-11-02). Next: P4 base layout & tokens. Content answers still open (section 5).**
Legend: `[ ]` pending, `[~]` in progress, `[x]` done. Model column = recommended model.

## 0. Context & Decisions

- Scale: Small (static site). No framework, no bundler. Hosted on GitHub Pages.
- Stack: HTML5, CSS (custom properties as design tokens), vanilla JS (ES modules).
- Typing: JS + JSDoc checked by `tsc --noEmit` (`checkJs`, `strict: true`). No `any`.
- Tooling (dev only): ESLint, Stylelint, Prettier, html-validate, Vitest 4.1 + happy-dom.
  Vitest stays on 4.x: html-validate declares a vitest ^3 || ^4 peer. Lockfile was
  generated with npm 11 (npm 10 crashes resolving that peer); `npm ci` on npm 10 works.
  `overrides.minimatch` ^11 clears the ESLint audit advisory (0 vulnerabilities).
- Limits enforced by tooling: ESLint `max-lines: 200`, `max-lines-per-function: 30`;
  `scripts/check-lines.mjs` for HTML/CSS/MD line limits and tab/emoji detection.
- Security: no secrets in the site. CSP via `<meta http-equiv>` (Pages cannot set headers).
  All project text rendered with `textContent`, never `innerHTML`.
- Confidentiality: the veterinary client is never named; no endpoints, data or keys.

## 1. Visual Direction: B2 (APPROVED 2026-11-02)

Mockups: `mockups/index.html`. Reference build: `mockups/b2-banco/`. A and B kept for comparison.

- Palette: graphite `#14130f`, neutral bone ink `#ecebe7`, amber `#f0a93b` (action and
  contact field only), one tone step `#1f1d18` for the skills section.
- Type: Erode only (Fontshare), display 9vw at -0.035em, body 17-19px.
- Composition (taste-skill direction "Type and nothing else", seed 1107780485):
  hero is a full-width two-line statement with the lead bottom-left and the action
  bottom-right; projects vary: Vinyls full-width, then split, mirrored split, split;
  about is a two-column statement with
  highlighted facts; skills are a one-size line-up table tying each skill to a project;
  contact is an amber field of display-size rows that closes the page.
- Pictures: each project shows a real fragment of its own UI (`data-ui`), with
  fictitious data that adds up. Live thing: the Vinyls equalizer is draggable.
- Motion: masked headline reveal, staggered reveal per project, press feedback, level meter.

Anti-AI rules (from taste-skill house rules, impeccable and web research; enforced in P7):
no monospace outside code, no uppercase tracked labels or eyebrows, no 01/02 numbering,
no hairlines or 1px outlined boxes, no gradients, no shadows at rest, no card grids,
no icon cards, no styled accent word in headlines, headlines two lines max at every
width, body text in full ink at 16px+, one accent, equal outer margins.

Gate result for `mockups/b2-banco`: lint 0 FAIL; inspect 0 FAIL at 1440/768/390.
Accepted warnings: no photographs or video (the honest pictures of software are its
interfaces); edge-text at 390px (measured box is 16px from both edges; glyph overhang).
Critique round 3 (taste rubric): design 7.5, usability 8, creativity 7.5, content 8 -> 7.7.

## 2. Content Model: everything editable, no HTML changes

All visible text, links and sections live in `content/`. `index.html` is a shell
(head, skeletons, `<main id="app">`). Editing the site = editing these files only.
Hero copy guidance and drafts: `docs/hero-guide.md`.

| File                  | Controls                                                          |
| :-------------------- | :---------------------------------------------------------------- |
| `content/site.js`     | Page title, description, language, footer text                    |
| `content/sections.js` | Section order, `enabled` flag, nav label, heading                 |
| `content/profile.js`  | Hero: eyebrow, name, headline, subline, facts, actions, photo, CV |
| `content/projects.js` | Project list (schema below)                                       |
| `content/about.js`    | About paragraphs                                                  |
| `content/skills.js`   | Skill groups `{ title, items[] }`                                 |
| `content/contact.js`  | Contact links `{ label, href, handle, visible }`                  |

Every list item has `visible: boolean` to hide it without deleting it.
Removing a section = `enabled: false`; reordering = moving it in `sections.js`.

```js
/** @typedef {"public" | "private"} Visibility    Can visitors see the code? */
/** @typedef {"live" | "in-progress" | "archived"} Status  Development state */
/**
 * @typedef {Object} Project
 * @property {string} id            Unique slug, used as DOM id
 * @property {boolean} visible      false = draft, not rendered
 * @property {boolean} featured     Rendered large; first featured wins
 * @property {number} order         Ascending sort key
 * @property {string} title
 * @property {string} summary       1-2 sentences, plain text
 * @property {string[]} stack
 * @property {Visibility} visibility
 * @property {Status} status
 * @property {{ src: string, alt: string, width: number, height: number } | null} image
 * @property {string | null} repo   Ignored when visibility is "private"
 * @property {string | null} demo
 */
```

Rules enforced by the validator: unique `id`, valid enums, `https:` or relative
URLs only, private projects never render a repo link. Invalid entries are skipped
with a `console.warn` naming the field, so a typo never breaks the page.

Trade-off accepted: content is rendered by JS at runtime (no build step). Google
renders JS; link previews use the static meta tags, which task 6.5 syncs from
`content/site.js` with a small script.

## 3. High-Level Phases

| #   | Phase                          | Model                          | Why this model                                   |
| :-- | :----------------------------- | :----------------------------- | :----------------------------------------------- |
| P1  | Architecture & phases          | Opus                           | Done. Requirements and trade-offs                |
| P2  | Micro-tasks & mockups          | Opus                           | Done. Design direction and plan                  |
| P3  | Tooling & repo hygiene         | Haiku                          | Mechanical config, well-known tools              |
| P4  | Base layout & tokens           | Sonnet                         | Translate approved mockup into real CSS          |
| P5  | Projects data & renderer (TDD) | Sonnet                         | Logic + tests, the core requirement              |
| P6  | Content sections               | Sonnet (copy review: Opus)     | Markup is routine; wording needs judgment        |
| P7  | Assets, a11y, performance QA   | Opus (review) + Haiku (images) | Audit needs judgment; image export is mechanical |
| P8  | Deploy to GitHub Pages         | Haiku                          | Standard workflow file                           |
| P9  | Phase closure & validation     | Opus                           | Final review against all rules                   |

## 4. Micro-Tasks

### P3 - Tooling & repo hygiene (Haiku)

| ID  | Task                                                                                      | Acceptance criteria                                        | Status |
| :-- | :---------------------------------------------------------------------------------------- | :--------------------------------------------------------- | :----- |
| 3.1 | `package.json` with scripts `typecheck`, `lint`, `format`, `test`, `build`, `check:lines` | `npm ci` works in CI; each script exits 0 on empty project | [x]    |
| 3.2 | `jsconfig.json` (`checkJs`, `strict`, `noEmit`)                                           | `npm run typecheck` passes                                 | [x]    |
| 3.3 | ESLint flat config with `max-lines` 200 and `max-lines-per-function` 30                   | A 31-line function fails lint                              | [x]    |
| 3.4 | Stylelint + Prettier (2 spaces, no tabs) + html-validate configs                          | Lint fails on a tab character                              | [x]    |
| 3.5 | `scripts/check-lines.mjs` for HTML/CSS/MD length, tabs and emojis                         | Script fails on a 201-line HTML file                       | [x]    |
| 3.6 | Remove tracked `firebase-debug.log`, add `.gitignore` (incl. `.taste-skill/`)             | `git ls-files` no longer lists it                          | [x]    |

### P4 - Base layout & tokens (Sonnet)

| ID  | Task                                                      | Acceptance criteria                                                      | Status |
| :-- | :-------------------------------------------------------- | :----------------------------------------------------------------------- | :----- |
| 4.1 | `css/tokens.css` from chosen direction                    | Only tokens; no hardcoded colors elsewhere (Stylelint rule)              | [ ]    |
| 4.2 | `css/base.css` (reset, typography, focus, reduced motion) | Focus ring visible on every interactive element                          | [ ]    |
| 4.3 | `css/layout.css` (wrap, sections, header, footer)         | 16px gutter below 768px; `scrollWidth == innerWidth` at 320/375/768/1280 | [ ]    |
| 4.4 | `css/components.css` (buttons, links, status, chips)      | hover/focus-visible/active states, 150-200ms transitions                 | [ ]    |
| 4.5 | `index.html` skeleton: header, nav, sections, landmarks   | html-validate passes; one `h1`; sections have `aria-labelledby`          | [ ]    |

### P5 - Content model & renderers, TDD (Sonnet)

| ID   | Task                                                                      | Acceptance criteria                                           | Status |
| :--- | :------------------------------------------------------------------------ | :------------------------------------------------------------ | :----- |
| 5.1  | `js/types.js`: JSDoc typedefs for every `content/` file                   | Typecheck flags a wrong enum value in content                 | [ ]    |
| 5.2  | Tests + `js/validate/project.js` (fields, enums, URLs, private repo rule) | Tests first; invalid entry skipped with field name in warning | [ ]    |
| 5.3  | Tests + `js/validate/common.js` (visible flag, links, sections)           | Tests first; hidden items never reach renderers               | [ ]    |
| 5.4  | Tests + `js/dom.js` helper `el(tag, attrs, children)` with `textContent`  | No `innerHTML` anywhere (ESLint `no-restricted-properties`)   | [ ]    |
| 5.5  | Tests + `js/render/hero.js` from `profile.js`                             | Missing photo or CV hides that element, no empty gaps         | [ ]    |
| 5.6  | Tests + `js/render/project-card.js` (status + visibility labels)          | Private shows "Privado" and no repo link; public shows repo   | [ ]    |
| 5.7  | Tests + `js/render/projects.js` (sort, featured first, empty state)       | All projects hidden shows the empty state                     | [ ]    |
| 5.8  | Tests + `js/render/about.js`, `skills.js`, `contact.js`                   | Each renders only `visible` items                             | [ ]    |
| 5.9  | Tests + `js/render/app.js`: section registry driven by `sections.js`      | Disabling or reordering a section needs no HTML change        | [ ]    |
| 5.10 | `content/*.js` filled with real data; `js/main.js` entry + `<noscript>`   | Site renders in Chrome, Firefox, Safari                       | [ ]    |
| 5.11 | `docs/editing.md`: how to add, hide, delete, reorder anything             | User can add a project by following it, without help          | [ ]    |

### P6 - Content sections (Sonnet, copy review Opus)

| ID  | Task                                                           | Acceptance criteria                                       | Status |
| :-- | :------------------------------------------------------------- | :-------------------------------------------------------- | :----- |
| 6.1 | Hero copy: Draft 2 (generalist) from `docs/hero-guide.md`      | Role, proof and CTAs visible at 375x812 without scrolling | [ ]    |
| 6.2 | About section copy                                             | Max 2 short paragraphs; reviewed by user                  | [ ]    |
| 6.3 | Skills section                                                 | Grouped list; only skills backed by a listed project      | [ ]    |
| 6.4 | Contact: GitHub and LinkedIn                                   | `rel="noopener noreferrer"`, accessible names, real URLs  | [ ]    |
| 6.5 | Meta: title, description, Open Graph, favicon SVG, `lang="es"` | Link preview shows name and role                          | [ ]    |

### P7 - Assets, accessibility, performance QA (Opus review, Haiku images)

| ID  | Task                                                                  | Acceptance criteria                                    | Status |
| :-- | :-------------------------------------------------------------------- | :----------------------------------------------------- | :----- |
| 7.1 | Export screenshots to AVIF/WebP with explicit width/height            | Each image < 150 KB; fictitious data only              | [ ]    |
| 7.2 | Self-host or preload fonts, `font-display: swap`                      | No layout shift from font swap (CLS < 0.1)             | [ ]    |
| 7.3 | CSP meta tag (`default-src 'self'`, fonts allowed)                    | No console CSP violations                              | [ ]    |
| 7.4 | Accessibility audit (contrast, keyboard, screen reader)               | WCAG 2.1 AA; Lighthouse a11y >= 95                     | [ ]    |
| 7.6 | Design gate: taste-skill `lint.mjs` + `inspect.mjs`, impeccable audit | 0 FAIL at 1440/768/390; every WARN defended in writing | [ ]    |
| 7.5 | Lighthouse run on mobile                                              | Performance >= 90, LCP < 2.5s                          | [ ]    |

### P8 - Deploy (Haiku)

| ID  | Task                                                                 | Acceptance criteria                                                 | Status |
| :-- | :------------------------------------------------------------------- | :------------------------------------------------------------------ | :----- |
| 8.1 | `.github/workflows/pages.yml` (quality checks then `deploy-pages`)   | Deploy runs only if lint/test pass                                  | [ ]    |
| 8.2 | Exclude `mockups/`, `PLAN.md`, dev files from the published artifact | Published site contains only `index.html`, `css/`, `js/`, `assets/` | [ ]    |
| 8.3 | Smoke test on the live URL                                           | All links resolve; CV downloads                                     | [ ]    |

### P9 - Phase closure (Opus)

| ID  | Task                                                     | Acceptance criteria                                    | Status |
| :-- | :------------------------------------------------------- | :----------------------------------------------------- | :----- |
| 9.1 | Run `typecheck`, `lint`, `test`, `build`, `check:lines`  | All green                                              | [ ]    |
| 9.2 | Review for rule violations and tech debt                 | No file > 200 lines, no function > 30 lines, no emojis | [ ]    |
| 9.3 | Remove `mockups/` or move to a branch; archive this plan | Repo contains only the site and tooling                | [ ]    |

## 5. Open Questions for the User

1. Visual direction: answered, B2 approved.
2. Remaining hero answers in `docs/hero-guide.md` section 4 (role decided: generalist).
3. Is the Vinyls repository public? Is there a Play Store link?
4. Can Reto Mundialista have a public demo with fictitious data, or screenshots only?
5. CV file: ready as PDF, or should it be planned as a task?
