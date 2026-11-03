# Security, Authentication & Sanitization Rules

## 1. Zero Trust Input Handling

- **Border Validation:** Validate and sanitize all incoming external data (query params, request body, headers, cookies) at the API boundary using strict schemas (e.g., Zod, Valibot, TypeBox).
- **Injection Prevention:** Never concatenate raw strings for database queries, OS commands, or HTML templates. Use parameterized queries or typed Query Builders.
- **Secrets Management:** Never hardcode API keys, credentials, or private keys. Access secrets exclusively via environment variables (`process.env` / `import.meta.env`) validated at system startup.

---

## 2. Authentication & Session Security

- **Token Lifecycle:**
  - Short-lived Access Tokens (JWT) with maximum 15-minute expiration.
  - Store Refresh Tokens strictly in `HttpOnly`, `Secure`, and `SameSite=Strict` cookies.
  - Never store sensitive authentication tokens in `localStorage` or `sessionStorage`.
- **Password Hashing:** Use Argon2id or bcrypt (minimum cost factor 12).
- **Access Control (RBAC / ABAC):**
  - Always evaluate authorization checks on the **server-side**. Frontend checks are strictly for UI visibility, not security.
  - Apply the principle of least privilege across all endpoints.

---

## 3. OWASP Top 10 Mitigation

- **XSS Defense:** Escape user content before rendering. Configure strict `Content-Security-Policy` (CSP) headers.
- **CSRF Defense:** Use `SameSite=Strict` or `SameSite=Lax` cookie flags alongside Anti-CSRF tokens for unsafe HTTP methods.
- **Rate Limiting:** Enforce IP and user-based rate limits on authentication routes and sensitive actions.
- **Security Headers:** Apply standard headers (e.g., using Helmet):
  - `Strict-Transport-Security` (HSTS)
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`