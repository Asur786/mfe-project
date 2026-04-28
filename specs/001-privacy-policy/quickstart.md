# Quickstart: Privacy Policy Micro-Frontend

**Feature**: Privacy Policy Micro-Frontend  
**Remote Name**: `privacyPolicy`  
**Port**: 3005

## Prerequisites

- Node.js (version compatible with React 18.2.0, typically v16+)
- npm (comes with Node.js)
- Git (for version control)

## Initial Setup

### 1. Create the Privacy Policy Remote

```bash
# From repository root
cd privacy-policy

# Install dependencies
npm install

# Verify installation
npm run build    # Should complete successfully
npm start        # Should start dev server on port 3005
```

### 2. Verify Standalone Operation

```bash
# Start development server
npm start

# Open in browser
# Navigate to: http://localhost:3005
# You should see the privacy policy with all 5 sections and navigation
```

**Expected Behavior**:
- Privacy policy displays with clear heading
- All 5 sections visible: Data Collection, Cookie Policy, Third-Party Services, User Rights, Contact
- Navigation menu/table of contents allows clicking to jump to sections
- Smooth scrolling to sections (on browsers that support it)

### 3. Run Tests

```bash
# Run component tests
npm test

# Run tests in watch mode (for development)
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

**Expected Tests**:
- Component renders without errors
- All 5 sections are present in the DOM
- Navigation links exist and have correct hrefs
- Clicking navigation scrolls to correct section (or changes URL hash)

## Integrating with Host Application

### 1. Update Host Configuration

Edit `host/webpack.config.js`:

```javascript
new ModuleFederationPlugin({
  name: "host",
  remotes: {
    dashboard: "dashboard@http://localhost:3001/remoteEntry.js",
    settings: "settings@http://localhost:3002/remoteEntry.js",
    profile: "profile@http://localhost:3003/remoteEntry.js",
    services: "services@http://localhost:3004/remoteEntry.js",
    privacyPolicy: "privacyPolicy@http://localhost:3005/remoteEntry.js"  // ADD THIS LINE
  },
  shared: {
    react: { singleton: true, requiredVersion: "^18.2.0" },
    "react-dom": { singleton: true, requiredVersion: "^18.2.0" }
  }
})
```

### 2. Import in Host Application

Edit `host/src/App.jsx`:

```javascript
import React, { Suspense } from "react";

// Lazy load the privacy policy remote
const PrivacyPolicyApp = React.lazy(() => import("privacyPolicy/PrivacyPolicyApp"));

function App() {
  return (
    <div className="app">
      {/* Your existing host UI */}
      
      {/* Add privacy policy route/section */}
      <Suspense fallback={<div>Loading Privacy Policy...</div>}>
        <ErrorBoundary fallback={<div>Failed to load privacy policy</div>}>
          <PrivacyPolicyApp />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}
```

### 3. Test Integration

```bash
# Terminal 1: Start privacy-policy remote
cd privacy-policy
npm start    # Runs on port 3005

# Terminal 2: Start host
cd host
npm start    # Runs on port 3000

# Open browser to host
# Navigate to: http://localhost:3000
# The host should load and display the privacy policy component
```

**Expected Behavior**:
- Host loads without errors
- Privacy policy section displays correctly within host layout
- Navigation within privacy policy works
- No console errors related to Module Federation or React version conflicts

## Development Workflow

### Standalone Development (Privacy Policy Only)

```bash
cd privacy-policy
npm start
# Make changes to src/App.jsx, src/App.css, etc.
# Browser hot-reloads automatically
```

**Use Case**: Working on privacy policy content or styling in isolation

### Integrated Development (With Host)

```bash
# Terminal 1
cd privacy-policy
npm start

# Terminal 2
cd host
npm start

# Changes to privacy-policy/src/* will hot-reload in both standalone and host views
```

**Use Case**: Testing how privacy policy integrates with host layout and navigation

## Common Tasks

### Update Privacy Policy Content

```javascript
// Edit: privacy-policy/src/App.jsx
const sections = [
  {
    id: "data-collection",
    title: "Data Collection and Usage",
    content: "Your updated content here..."  // MODIFY THIS
  },
  // ... other sections
];
```

### Add New Section

```javascript
// Edit: privacy-policy/src/App.jsx
const sections = [
  // ... existing sections
  {
    id: "new-section",           // ADD NEW SECTION
    title: "New Section Title",
    content: "New section content..."
  }
];
```

### Update Styling

```css
/* Edit: privacy-policy/src/App.css */
.privacy-policy {
  /* Update global privacy policy styles */
}

.privacy-policy section {
  /* Update section styles */
}
```

### Run Production Build

```bash
cd privacy-policy
npm run build

# Output in privacy-policy/dist/
# Contains bundled JS, CSS, and remoteEntry.js
```

## Troubleshooting

### Port 3005 Already in Use

```bash
# Option 1: Kill process using port 3005
# Windows PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 3005).OwningProcess | Stop-Process

# Option 2: Change port in webpack.config.js
# Edit privacy-policy/webpack.config.js
devServer: {
  port: 3006,  // Use different port
  // ...
}
# Also update host remotes configuration to match new port
```

### Module Federation Loading Error in Host

**Symptom**: `Uncaught Error: Shared module is not available for eager consumption`

**Solution**: Ensure privacy-policy remote is running before starting host

```bash
# Always start remotes before host
cd privacy-policy && npm start    # Start this first
cd host && npm start              # Then start host
```

### React Version Mismatch

**Symptom**: `Warning: Invalid hook call` or multiple React copies error

**Solution**: Verify all remotes use same React version

```bash
# Check React version in all remotes
cd privacy-policy && npm list react
cd host && npm list react
# All should show ^18.2.0
```

### Navigation Links Don't Scroll

**Symptom**: Clicking navigation links doesn't scroll to sections

**Check**:
1. Section IDs match navigation href hashes (e.g., `id="cookies"` and `href="#cookies"`)
2. CSS `scroll-behavior: smooth` is set on `:root` or `html`
3. Browser supports smooth scrolling (fallback: instant scroll should still work)

### Component Not Rendering in Host

**Checklist**:
- [ ] Privacy-policy remote is running (`npm start` in privacy-policy/)
- [ ] Host webpack config includes privacyPolicy in remotes
- [ ] Component is wrapped in `<Suspense>` and `<ErrorBoundary>`
- [ ] No console errors in browser dev tools
- [ ] Port 3005 is accessible (check firewall/network)

## Next Steps

After completing quickstart:
1. Review [Module Federation Contract](contracts/module-federation-contract.md) for full API details
2. Review [Data Model](data-model.md) for component structure
3. See [Implementation Plan](plan.md) for complete feature overview
4. Proceed to [Tasks](tasks.md) for step-by-step implementation guide (generated by `/speckit.tasks`)

## Reference

- **Spec**: [spec.md](spec.md) - Feature requirements and user stories
- **Plan**: [plan.md](plan.md) - Implementation plan and architecture
- **Contract**: [contracts/module-federation-contract.md](contracts/module-federation-contract.md) - Module Federation API
- **Data Model**: [data-model.md](data-model.md) - Component and data structure
