# Module Federation Contract: Privacy Policy Remote

**Remote Name**: `privacyPolicy`  
**Version**: 1.0.0  
**Port**: 3005  
**Entry**: `http://localhost:3005/remoteEntry.js`

## Exposed Modules

### `./PrivacyPolicyApp`

The main privacy policy component that displays the full privacy policy with navigation.

**Module Path**: `./PrivacyPolicyApp`  
**Source File**: `privacy-policy/src/App.jsx`  
**Type**: React Component (default export)

#### Component Interface

```typescript
interface PrivacyPolicyAppProps {
  // No required props for version 1.0.0
  // Component is fully self-contained
}

export default function PrivacyPolicyApp(props: PrivacyPolicyAppProps): JSX.Element;
```

#### Usage Example

**In Host Application**:

```javascript
// 1. Configure remote in host/webpack.config.js
new ModuleFederationPlugin({
  name: "host",
  remotes: {
    privacyPolicy: "privacyPolicy@http://localhost:3005/remoteEntry.js"
  },
  shared: {
    react: { singleton: true, requiredVersion: "^18.2.0" },
    "react-dom": { singleton: true, requiredVersion: "^18.2.0" }
  }
})

// 2. Import and use in host/src/App.jsx
import React, { Suspense } from "react";

const PrivacyPolicyApp = React.lazy(() => import("privacyPolicy/PrivacyPolicyApp"));

function App() {
  return (
    <Suspense fallback={<div>Loading Privacy Policy...</div>}>
      <ErrorBoundary fallback={<div>Failed to load privacy policy</div>}>
        <PrivacyPolicyApp />
      </ErrorBoundary>
    </Suspense>
  );
}
```

#### Behavior

- **Self-Contained**: Component manages its own layout, styling, and navigation
- **Stateless**: No external state management required; all state is internal
- **Navigation**: Provides internal section navigation via anchor links
- **Responsive**: Adapts to container width (host should provide appropriate container)
- **Accessibility**: Semantic HTML, keyboard navigation support, screen reader compatible

#### Styling

- **Scoped CSS**: All styles are scoped to `.privacy-policy` class prefix
- **No Global Styles**: Component does not pollute global CSS namespace
- **Container Sizing**: Component is designed to fill its container; host should provide appropriate width constraints

#### Dependencies

**Peer Dependencies** (must be provided by host via Module Federation shared):
- `react`: ^18.2.0 (singleton)
- `react-dom`: ^18.2.0 (singleton)

**Internal Dependencies** (bundled with remote):
- CSS styles (App.css)
- No external libraries beyond React

## Shared Dependencies

The privacy-policy remote shares the following dependencies with the host:

```javascript
{
  react: { 
    singleton: true, 
    requiredVersion: "^18.2.0",
    strictVersion: false
  },
  "react-dom": { 
    singleton: true, 
    requiredVersion: "^18.2.0",
    strictVersion: false
  }
}
```

**Version Compatibility**:
- React 18.2.0 or higher required
- Must match host application's React version (singleton mode enforced)
- Breaking changes to shared dependencies require coordinated updates

## Error Handling

### Loading Errors

If the remote fails to load (network error, wrong URL, server down):
- Host should use `<ErrorBoundary>` to catch loading errors
- Recommended fallback: Display error message with link to standalone privacy-policy app
- Remote does not provide its own error boundary for loading failures

### Runtime Errors

If the component encounters runtime errors after loading:
- Component should handle internal errors gracefully
- Host's `<ErrorBoundary>` will catch unhandled component errors

## Deep Linking

The component supports deep linking to specific sections via URL hash:

```
# Standalone mode
http://localhost:3005/#data-collection
http://localhost:3005/#cookies
http://localhost:3005/#third-party
http://localhost:3005/#user-rights
http://localhost:3005/#contact

# Integrated mode (host responsibility to pass URL hash)
https://app.example.com/privacy#cookies
```

**Host Responsibility**: If the host uses routing, it should preserve or pass URL hash fragments to enable deep linking within the privacy policy.

## Versioning and Breaking Changes

**Current Version**: 1.0.0

**Semantic Versioning**:
- **Patch** (1.0.x): Bug fixes, content updates, styling tweaks (no contract changes)
- **Minor** (1.x.0): New optional props, additional exposed modules, backward-compatible changes
- **Major** (x.0.0): Breaking changes to component interface, removed exports, required props changes

**Deprecation Policy**:
- Deprecated features will be marked in documentation 2 releases before removal
- Migration guides will be provided for breaking changes

## Testing Contract

### Standalone Testing

The privacy-policy remote can be tested independently:

```bash
cd privacy-policy
npm test              # Run component unit tests
npm start             # Start dev server on port 3005
```

### Integration Testing

Host application should test:
1. Remote loads successfully via Module Federation
2. Component renders without errors when consumed
3. Navigation works correctly in integrated mode
4. Error boundary catches loading failures
5. Shared dependencies don't cause version conflicts

## Performance Expectations

- **Initial Bundle Size**: <500KB (pre-compression)
- **Load Time**: <2s when consumed by host (measured from import to render)
- **Runtime Performance**: Minimal re-renders; static content with CSS-only animations

## Security Considerations

- **No User Input**: Component is read-only; no forms, no XSS risk
- **No External Requests**: No API calls, no data exfiltration
- **CSP Compatible**: No inline scripts, no eval usage

## Support and Contact

For contract changes, breaking changes, or integration issues:
- **Documentation**: See privacy-policy/README.md in repository
- **Issues**: Open issue in main repository
- **Breaking Changes**: Communicated via team channels before release
