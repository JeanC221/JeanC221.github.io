# Frontend, PWA & UI/UX Rules

## 1. Performance & Core Web Vitals

* **Metric Targets:**
  * **LCP (Largest Contentful Paint):** Optimize hero images using modern formats (AVIF/WebP), explicit dimensions, and `priority` / `preload`.
  * **CLS (Cumulative Layout Shift):** Reserve layout spaces for dynamic content, ads, and asynchronous media to avoid layout jumps.
  * **INP (Interaction to Next Paint):** Keep the main thread responsive via code splitting, dynamic imports, and web workers.
* **Virtualization:** Use virtualized lists for dataset renders exceeding 50 item nodes.

---

## 2. PWAs & Native Applications

* **Service Workers:**
  * *Cache First* strategy for static assets (JS, CSS, fonts, static icons).
  * *Network First* strategy with cache fallback for dynamic API responses.
* **PWA Manifest:** Complete `manifest.json` with vector icons, theme color settings, and `display: standalone` mode.
* **Offline Capabilities:** Build gracefully degraded offline states and queue write actions via `Background Sync`.
* **Native Apps (React Native / Flutter):**
  * Follow platform-specific guidelines (Human Interface Guidelines for iOS, Material 3 for Android).
  * Clean up event listeners and subscriptions on unmount to prevent memory leaks.

---

## 3. Accessibility (a11y) & Form Standards

* **WCAG 2.1 AA Compliance:**
  * Minimum text contrast ratio of 4.5:1 (3:1 for large typography).
  * Full keyboard navigation support (`tabindex`, visible focus indicators).
  * Explicit ARIA attributes (`aria-expanded`, `aria-hidden`, `aria-live`) on custom interactive widgets.
* **Form UX & Validation:**
  * Link `<label>` and `<input>` using explicit `htmlFor` / `for` attributes.
  * On-blur and on-change input validation with localized, non-technical error messages positioned adjacent to fields.
  * Disable submit buttons during pending requests and provide explicit inline loading states.