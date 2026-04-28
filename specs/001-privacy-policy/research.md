# Research: Privacy Policy Micro-Frontend

**Feature**: Privacy Policy Micro-Frontend  
**Date**: 2026-04-27  
**Purpose**: Resolve technical unknowns and establish best practices for implementation

## Research Tasks

### 1. Testing Framework for React Micro-Frontends

**Unknown**: Testing framework not yet established - need to determine appropriate tools for component testing in a Module Federation context.

**Decision**: Jest + React Testing Library

**Rationale**:
- **Industry Standard**: Jest is the de facto testing framework for React applications, with excellent React ecosystem support
- **React Testing Library**: Encourages testing components from user perspective (DOM queries, user interactions) rather than implementation details
- **Module Federation Compatibility**: Jest can be configured to work with webpack Module Federation by mocking the remote imports in tests
- **Developer Experience**: Fast execution with watch mode, excellent error messages, snapshot testing for UI verification
- **Existing Patterns**: Likely already in use or easily adoptable by team familiar with React ecosystem

**Implementation Notes**:
- Install: `jest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`
- Configure babel-jest for JSX transformation
- Mock Module Federation imports in test environment (remotes don't exist in test context)
- Standalone tests run in privacy-policy remote's own environment
- Integration tests in host will use actual Module Federation loading (possibly with `webpack-dev-server` or E2E tools)

**Alternatives Considered**:
- **Vitest**: Faster than Jest, better ES modules support, but less mature ecosystem and documentation for React
- **React Native Testing Library**: Not applicable (web-only project)
- **Enzyme**: Deprecated in favor of React Testing Library

### 2. Best Practices for Module Federation Component Exposure

**Research Focus**: How to properly expose and consume React components via Module Federation in standalone and integrated modes.

**Findings**:

**Exposure Pattern** (in privacy-policy remote):
```javascript
// webpack.config.js
new ModuleFederationPlugin({
  name: "privacyPolicy",
  filename: "remoteEntry.js",
  exposes: {
    "./PrivacyPolicyApp": "./src/App"
  },
  shared: {
    react: { singleton: true, requiredVersion: "^18.2.0" },
    "react-dom": { singleton: true, requiredVersion: "^18.2.0" }
  }
})
```

**Consumption Pattern** (in host):
```javascript
// webpack.config.js
new ModuleFederationPlugin({
  name: "host",
  remotes: {
    privacyPolicy: "privacyPolicy@http://localhost:3005/remoteEntry.js"
  },
  shared: { /* ... */ }
})

// In host App.jsx
const PrivacyPolicyApp = React.lazy(() => import("privacyPolicy/PrivacyPolicyApp"));

// Usage with Suspense + ErrorBoundary
<Suspense fallback={<Loading />}>
  <ErrorBoundary fallback={<ErrorMessage />}>
    <PrivacyPolicyApp />
  </ErrorBoundary>
</Suspense>
```

**Best Practices**:
- Always wrap lazy-loaded remotes in `<Suspense>` for loading states
- Use `<ErrorBoundary>` to handle Module Federation loading failures gracefully
- Expose components at `./ComponentName` path convention (matches existing remotes: `./DashboardApp`, etc.)
- Keep exposed component names descriptive and unique across remotes
- Document exposed contracts in `contracts/` directory for team visibility

### 3. Navigation Patterns for Single-Page Privacy Policy

**Research Focus**: Best approach for multi-section navigation within a single component view.

**Decision**: Anchor-based scrolling with smooth scroll behavior

**Rationale**:
- **Simplicity**: No routing library needed for a single-page view with multiple sections
- **Accessibility**: Anchor links work with screen readers and keyboard navigation
- **Browser Compatibility**: `scroll-behavior: smooth` CSS property widely supported, graceful degradation on older browsers
- **Shareable Links**: Deep linking with URL hash (e.g., `/privacy#cookies`) works natively
- **Performance**: No additional JavaScript bundle size for routing logic

**Implementation Approach**:
```jsx
// Navigation component
const sections = [
  { id: "data-collection", title: "Data Collection and Usage" },
  { id: "cookies", title: "Cookie Policy" },
  { id: "third-party", title: "Third-Party Services" },
  { id: "user-rights", title: "User Rights" },
  { id: "contact", title: "Contact Information" }
];

<nav>
  {sections.map(section => (
    <a href={`#${section.id}`}>{section.title}</a>
  ))}
</nav>

// Sections with IDs
<section id="data-collection">...</section>
<section id="cookies">...</section>
```

**Alternatives Considered**:
- **React Router**: Overkill for single-page content, adds unnecessary bundle size
- **State-based tab switching**: Loses deep-linking capability, more complex state management
- **Scroll-spy with intersection observer**: More complex than needed for MVP, can be added later if needed

### 4. Styling Approach for Consistency

**Research Focus**: How to maintain consistent styling across MFE remotes without coupling.

**Decision**: Scoped CSS with shared design tokens via CSS custom properties

**Rationale**:
- **Independence**: Each remote owns its styles (App.css), avoiding external dependencies
- **Consistency**: CSS custom properties (variables) can be defined in each remote with same values
- **Simplicity**: No CSS-in-JS library needed, standard CSS files match existing remotes
- **Performance**: No runtime CSS processing, minimal bundle size

**Implementation**:
```css
/* App.css in privacy-policy remote */
:root {
  --primary-color: #007bff;
  --text-color: #333;
  --background-color: #fff;
  --border-color: #e0e0e0;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.privacy-policy {
  font-family: var(--font-family);
  color: var(--text-color);
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}
```

**Note**: If centralized design system emerges later, can be refactored, but for MVP, duplicated CSS variables across remotes is acceptable and maintains independence.

## Summary

All technical unknowns have been resolved:

1. **Testing**: Jest + React Testing Library (industry standard, excellent React support)
2. **Module Federation**: Follow established exposure pattern (`./PrivacyPolicyApp`), use Suspense + ErrorBoundary in host
3. **Navigation**: Anchor-based scrolling with smooth behavior (simple, accessible, shareable)
4. **Styling**: Scoped CSS with CSS custom properties (independent, consistent, performant)

**No remaining NEEDS CLARIFICATION items.** Ready to proceed to Phase 1: Design.
