# AGENTS.md - Agent Protocols, MCPs & Workflow

## 1. Interaction & Communication Guidelines

- **User Response Language:** Always converse with the user in their preferred language (e.g., **Spanish**), while keeping all code, commit messages, variable names, documentation, and internal reasoning strictly in **English**.

---

## 2. Phase-Based Workflow & Micro-Task Execution Protocol

Adhere to the multi-stage execution pipeline when developing features:

```
[Phase 1: High-Level Phases (Opus)]
             │
             ▼
[Phase 2: Micro-Task Breakdown (Opus)] ──> Write PLAN.md & await approval
             │
             ▼
[Phase 3: Micro-Task Execution (Sonnet)] ──> Task-by-Task (TDD / Verification)
             │
             ▼
[Phase 4: Phase Closure & Quality Validation]
```

### Phase 1: High-Level Architecture & Phase Breakdown (Opus / High Reasoning)
- Receive user's feature or project idea.
- Analyze system requirements, project scale, and architecture.
- Break down the overall project into clear, sequential **High-Level Phases** (e.g., Phase 1: Auth & Data Schema, Phase 2: Core API Services, Phase 3: UI Dashboard).

### Phase 2: Micro-Task Breakdown (Opus / High Reasoning)
- Select the active phase to execute.
- Deconstruct the phase into discrete, isolated **Micro-Tasks** inside a `PLAN.md` file in the project root.
- Each micro-task must focus on a single module, function, or component with explicit acceptance and testing criteria.
- **STOP and wait for explicit user approval of PLAN.md before writing any code.**

### Phase 3: Step-by-Step Micro-Task Execution (Sonnet / High Efficiency)
- Execute micro-tasks sequentially (one micro-task at a time).
- **TDD First:** Write or update unit/integration tests before writing implementation code.
- Run local tests and linters after completing each micro-task.
- Update `PLAN.md` checklist status (`[x]`) upon successful completion.
- Respect strict line limits (200 lines/file, 30 lines/function) as defined in `CLAUDE.md`.

### Phase 4: Phase Closure & Quality Validation
- Run full project verification commands (`typecheck`, `lint`, `test`, `build`).
- Inspect codebase for technical debt or modularity violations.
- Clean up `PLAN.md` or temporary artifacts before proceeding to the next high-level phase.

---

## 3. Automation, Git Hooks & Deterministic Tooling

Leverage automated repository tooling to enforce constraints without context bloat:

- **Linter & Formatter Enforcement:** Always run ESLint/Biome/Ruff and Prettier via CLI commands instead of manually validating syntax token-by-token.
- **Git Pre-commit Hooks:** Respect active `husky` or `lefthook` hooks. Ensure type-checking (`tsc --noEmit`), linting, and tests pass locally before staging commits.
- **Custom Project Skills:** Trigger domain-specific CLI scripts or custom skills (e.g., `npm run generate:crud`, `npm run audit:security`) when executing repetitive boilerplating or audit tasks.

---

## 4. MCPs (Model Context Protocol) Integration

Actively invoke connected MCP servers and external tools:

- **Figma / Design MCP:** Query design tokens, components, and layout specs before writing CSS/HTML.
- **Context & Memory MCP:** Read and write architectural decisions and project constraints.
- **Database MCP:** Inspect live schema, indexes, and FK relationships prior to generating migrations or queries.
- **Linter / AST Skills:** Run static analysis to detect vulnerability patterns or high complexity.

---

## 5. Anti-AI UI/UX Design Directives

To prevent generic, low-quality AI-generated interfaces:

- **No Generic AI Palettes:** Do not use default combinations like dark gray `bg-gray-900` paired with saturated `text-purple-500` without visual hierarchy.
- **Mandatory Design Tokens:** Define central CSS variables for colors, typography, radii, and `4px/8px` grid spacing.
- **Skeleton Loaders:** Build structural skeletons matching layout dimensions instead of generic centered spinners.
- **Micro-interactions:** Include explicit `:hover`, `:focus-visible`, and `:active` states with 150-200ms transitions.
- **Professional Visual Density:** Balance padding and margins according to domain needs (compact for dashboards, spacious for marketing pages).

## Token Optimization Directives
- **Context Flushes:** Prompt the user to run `/clear` immediately after completing and validating a micro-task.
- **Scoped File Access:** Read files using exact line range constraints (`lines X-Y`) instead of dumping entire large files into context.
- **Batching:** Execute file edits and terminal commands in combined single-turn executions rather than multi-turn back-and-forth prompts.
- **Thinking Budget:** Disable or minimize extended thinking tokens during routine code editing, reserving high reasoning budgets strictly for architecture planning and deep bug analysis.