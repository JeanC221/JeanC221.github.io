# Architecture & Database Rules

## 1. Clean Architecture & Layer Separation

- **Layer Responsibilities:**
  - **Domain:** Pure business logic and entities (zero external framework dependencies).
  - **Application:** Use cases and orchestration.
  - **Infrastructure:** DB access, HTTP clients, external services.
  - **Presentation:** UI components, REST/gRPC controllers.
- **Decoupling:** Depend on abstractions (interfaces/repository patterns) rather than concrete implementations.

---

## 2. Database Governance

### Relational (PostgreSQL, MySQL, SQLite)
- **Normalization:** Default to Third Normal Form (3NF).
- **Keys & Indexes:**
  - Every table must have a primary key (`UUIDv4`/`v7` or `BIGINT AUTO_INCREMENT`).
  - Explicit foreign keys with explicit delete/update actions (`ON DELETE CASCADE` / `SET NULL`).
  - Create indexes for frequently filtered (`WHERE`), ordered (`ORDER BY`), or joined (`JOIN`) columns.
- **Idempotent Migrations:** Execute schema changes exclusively through versioned, reversible migration files (`up` / `down`).

### NoSQL (MongoDB, DynamoDB, Redis)
- Enforce schema validation at collection/table levels.
- Always attach explicit TTLs (Time-To-Live) for Redis cache keys.

---

## 3. API Contract & Error Resiliency

- **Contracts:** Document APIs using OpenAPI/Swagger or end-to-end typed contracts (e.g., tRPC).
- **Standard Response Payload:**

```json
{
  "success": true,
  "data": {},
  "error": null,
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

- **Resilient Error Handling:**
  - Map internal exceptions to semantic HTTP status codes (400, 401, 403, 404, 429, 500).
  - Do not expose internal stack traces or database errors in production responses.
  - Implement exponential backoff retries and circuit breakers for remote network calls.