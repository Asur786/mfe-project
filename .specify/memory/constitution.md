<!--
Sync Impact Report - Constitution v1.0.0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VERSION CHANGE: [template] → 1.0.0 (Initial ratification)
CHANGE TYPE: MINOR (new constitution, initial principle establishment)

PRINCIPLES ADDED:
  1. Module Federation Architecture
  2. React Component Standards
  3. Independent Deployment (NON-NEGOTIABLE)
  4. Consistent Structure Across Remotes
  5. Spec Kit Workflow for Features (NON-NEGOTIABLE)
  6. Dual Testing Strategy

TEMPLATES STATUS:
  ✅ plan-template.md - Updated with MFE-specific constitution checks
  ✅ spec-template.md - Validated for micro-frontend requirements
  ✅ tasks-template.md - Aligned with dual testing and MFE deployment patterns

FOLLOW-UP TODOS:
  - None (all placeholders resolved)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-->

# Micro-Frontend Ecosystem Constitution

## Core Principles

### I. Module Federation Architecture

Every micro-frontend MUST be configured with Webpack Module Federation:
- Each remote exposes components via `ModuleFederationPlugin` with unique `name`
- Host application consumes remotes via explicit `remotes` configuration
- Shared dependencies (React, React-DOM) MUST use `singleton: true` to prevent version conflicts
- `publicPath: "auto"` MUST be set for dynamic resource loading
- Each remote MUST generate `remoteEntry.js` accessible at configured port
- CORS headers MUST be enabled for cross-origin module loading in development

**Rationale**: Module Federation is the architectural foundation enabling independent deployment
and runtime composition. Strict configuration prevents runtime errors and version conflicts.

### II. React Component Standards

All components MUST follow React best practices:
- Functional components with Hooks (no class components without justification)
- React version `^18.2.0` or higher maintained across all remotes
- Components MUST be self-contained with their own styles (CSS modules or scoped CSS)
- Props interface clearly defined for all exported components
- No direct DOM manipulation unless absolutely necessary (justify in PR)

**Rationale**: Consistency in component patterns ensures predictable behavior when
components from different remotes compose together. Version alignment prevents hydration
and rendering issues.

### III. Independent Deployment (NON-NEGOTIABLE)

Each micro-frontend MUST be independently buildable and deployable:
- Each remote has its own `package.json` with complete dependency manifest
- Build process (`npm run build`) MUST succeed without requiring other remotes
- Development server (`npm run start`) MUST run standalone on unique port
- No cross-remote file imports or shared source code (only runtime module consumption)
- Deployment of one remote MUST NOT require redeploying others

**Rationale**: Independent deployment is fundamental to micro-frontend benefits - autonomous
teams, isolated releases, and reduced blast radius. Violating this principle negates the
architecture's core value.

### IV. Consistent Structure Across Remotes

All micro-frontends MUST follow identical project structure:
```
<remote-name>/
├── package.json          # Independent dependency manifest
├── webpack.config.js     # Module Federation configuration
├── public/
│   └── index.html       # HTML template
└── src/
    ├── App.jsx          # Root component
    ├── App.css          # Root styles
    ├── bootstrap.jsx    # Async boundary for MF loading
    └── index.js         # Entry point (imports bootstrap)
```

**Required Configuration Consistency**:
- Development ports: Host=3000, Dashboard=3001, Settings=3002, Profile=3003, Services=3004
- Babel presets: `@babel/preset-env`, `@babel/preset-react`
- File extensions resolved: `.js`, `.jsx`

**Rationale**: Uniform structure reduces cognitive load, enables shared tooling and automation,
and simplifies onboarding. Developers can navigate any remote with existing knowledge.

### V. Spec Kit Workflow for Features (NON-NEGOTIABLE)

All new features MUST follow Spec Kit development workflow:
- Feature work begins in `.specify/` with `/speckit.specify` command
- Specification MUST define user stories, requirements, acceptance criteria
- Planning phase (`/speckit.plan`) MUST identify affected remotes and integration points
- Task generation (`/speckit.tasks`) MUST break work into implementable units
- Implementation (`/speckit.implement`) follows generated tasks with verification

**Feature Branch Pattern**: `###-feature-name` where `###` is sequential number

**Cross-Remote Features**: When a feature spans multiple remotes:
- Specification MUST identify all affected remotes and their responsibilities
- Contract/interface changes MUST be documented in `contracts/` directory
- Tasks MUST include integration testing across remote boundaries

**Rationale**: Spec Kit ensures thorough planning before implementation, reducing rework
and integration issues. Critical for distributed micro-frontend development where changes
can have ripple effects.

### VI. Dual Testing Strategy

Features MUST be tested both standalone and integrated:

**Standalone Testing** (per remote):
- Component unit tests verify isolated behavior
- Remote MUST be fully functional when run independently
- Tests run in remote's own test environment without external dependencies
- Test coverage MUST include all exported components

**Integration Testing** (cross-remote):
- Host integration tests verify remote consumption works correctly
- Module Federation loading MUST be tested (async imports, error boundaries)
- Shared state management (if any) MUST be integration tested
- End-to-end scenarios spanning multiple remotes MUST be covered

**Rationale**: Dual testing provides confidence at both isolation and composition levels.
Standalone tests catch internal issues quickly; integration tests catch federation-specific
problems (version conflicts, loading failures, contract mismatches).

## Technical Standards

### Technology Stack (MANDATORY)

- **JavaScript**: ES6+ with Babel transpilation
- **Framework**: React ^18.2.0
- **Bundler**: Webpack 5 with Module Federation
- **Package Manager**: npm (consistent across all remotes)
- **Code Quality**: ESLint configuration (remotes may extend with specific rules)

### Performance Requirements

- Initial bundle size MUST NOT exceed 500KB per remote (pre-compression)
- Shared dependencies MUST be optimized to prevent duplication
- Lazy loading MUST be used for routes and large components
- Remote loading failures MUST be handled gracefully with fallback UI

### Module Federation Contracts

When remotes expose components consumed by host or other remotes:
- Exposed modules MUST be documented in `contracts/` directory
- Breaking changes MUST follow semantic versioning
- Deprecation notices MUST be provided 2 releases before removal
- Contract changes MUST be communicated across teams

## Development Workflow

### Feature Development Lifecycle

1. **Specification** (`/speckit.specify`): Define feature scope and requirements
2. **Clarification** (`/speckit.clarify`): Resolve ambiguities before planning
3. **Planning** (`/speckit.plan`): Design solution and identify affected remotes
4. **Tasks** (`/speckit.tasks`): Generate ordered implementation tasks
5. **Implementation** (`/speckit.implement`): Execute tasks with verification
6. **Testing**: Run standalone tests → integration tests → manual verification

### Git Workflow

- Feature branches follow `###-feature-name` pattern
- Commits MUST reference tasks (e.g., "T001: Setup dashboard widget")
- Pull requests MUST link to feature specification
- Changes affecting Module Federation config require additional review

### Review Requirements

All changes MUST be reviewed for:
- Constitution compliance (especially deployment independence)
- Module Federation configuration correctness
- Cross-remote impact assessment
- Test coverage (both standalone and integration)

## Governance

This constitution supersedes all other development practices and guidelines. All team members
MUST be familiar with these principles. Feature specifications and implementation plans MUST
demonstrate constitutional compliance.

**Amendment Process**:
- Proposed changes MUST be documented with rationale and impact analysis
- Major version bumps require team consensus for breaking principle changes
- Minor version bumps for new principles or material expansions
- Patch version bumps for clarifications and wording improvements

**Compliance Verification**:
- All PRs MUST pass constitution check before merge
- `/speckit.plan` command enforces constitution gates automatically
- Complexity or deviations MUST be explicitly justified in plan.md

**Living Document**: This constitution evolves with project needs. When patterns emerge that
should be standardized, propose constitutional amendments rather than creating separate
documentation.

**Version**: 1.0.0 | **Ratified**: 2026-04-27 | **Last Amended**: 2026-04-27
