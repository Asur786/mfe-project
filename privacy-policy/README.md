# Privacy Policy Micro-Frontend

A standalone privacy policy component built with React 18 and Webpack Module Federation. This remote can be consumed by the host application or run independently for development.

## Overview

The Privacy Policy remote provides a comprehensive privacy policy page with five main sections:

1. **Data Collection and Usage** - Information about what data we collect and why
2. **Cookie Policy** - Details about cookies and tracking technologies
3. **Third-Party Services** - Information about third-party integrations
4. **User Rights** - User rights regarding personal data (GDPR-compliant)
5. **Contact Information** - How to reach us with privacy concerns

### Key Features

- ✅ Standalone development mode (runs on port 3005)
- ✅ Module Federation integration with host application
- ✅ Table of contents navigation with smooth scrolling
- ✅ Responsive design for mobile, tablet, and desktop
- ✅ Accessible semantic HTML with proper heading hierarchy
- ✅ CSS custom properties for consistent theming

## Technology Stack

- **React**: 18.2.0
- **Webpack**: 5.106.2
- **Module Federation**: Webpack 5 Container Plugin
- **Babel**: ES6+ and JSX transpilation
- **CSS**: Scoped styles with CSS custom properties

## Getting Started

### Prerequisites

- Node.js >= 14.x
- npm >= 6.x

### Installation

```bash
# Install dependencies
npm install
```

### Development

Run the privacy-policy remote in standalone mode:

```bash
# Start development server on port 3005
npm start
```

The application will be available at:
- **Local**: http://localhost:3005/
- **Remote Entry**: http://localhost:3005/remoteEntry.js

### Production Build

Create an optimized production build:

```bash
# Build for production
npm run build
```

Build output will be in the `dist/` directory with:
- `remoteEntry.js` - Module Federation container (~6.3 KB minified)
- Vendor chunks for React and React-DOM
- Application code chunks

## Module Federation Configuration

### Exposed Modules

This remote exposes the following module:

```javascript
exposes: {
  "./PrivacyPolicyApp": "./src/App"
}
```

### Shared Dependencies

Shared as singletons to avoid version conflicts:

- `react@^18.2.0`
- `react-dom@^18.2.0`

## Integration with Host

### Host Configuration

Add to host's `webpack.config.js`:

```javascript
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
```

### Usage in Host Application

```javascript
import React, { Suspense, lazy } from "react";
import ErrorBoundary from "./ErrorBoundary";

const PrivacyPolicyApp = lazy(() => import("privacyPolicy/PrivacyPolicyApp"));

function App() {
  return (
    <Suspense fallback={<div>Loading Privacy Policy...</div>}>
      <ErrorBoundary>
        <PrivacyPolicyApp />
      </ErrorBoundary>
    </Suspense>
  );
}
```

### Testing Integration

1. Start the privacy-policy remote:
   ```bash
   cd privacy-policy
   npm start
   ```

2. Start the host application:
   ```bash
   cd host
   npm start
   ```

3. Visit http://localhost:3000/ to see the integrated application

## Project Structure

```
privacy-policy/
├── public/
│   └── index.html          # HTML template for standalone mode
├── src/
│   ├── index.js            # Entry point (async import)
│   ├── bootstrap.jsx       # Bootstrap React application
│   ├── App.jsx             # Main PrivacyPolicyApp component
│   └── App.css             # Component styles
├── .gitignore              # Git ignore patterns
├── babel.config.js         # Babel configuration
├── package.json            # Dependencies and scripts
├── webpack.config.js       # Webpack & Module Federation config
└── README.md               # This file
```

## Navigation

The privacy policy includes a table of contents that enables smooth scrolling to specific sections:

- Click any section link to scroll to that section
- Deep linking supported via URL hash (e.g., `/#cookies`)
- Smooth scroll behavior for better UX
- Visual feedback on hover and active states

## Styling

The component uses CSS custom properties for theming:

```css
--primary-color: #007bff;
--text-color: #333;
--heading-color: #1a1a1a;
--link-color: #0056b3;
--nav-background: #f8f9fa;
```

Responsive breakpoints:
- Mobile: < 768px
- Tablet/Desktop: >= 768px

## Performance

- **Bundle Size**: ~177 KB total (dev), ~148 KB (production minified)
- **Remote Entry**: 6.3 KB minified (production)
- **Load Time**: < 2s when consumed by host
- **Code Splitting**: Automatic via Module Federation

## Browser Support

Tested and supported in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility

- ✅ Semantic HTML5 elements (`<nav>`, `<section>`, `<h1-h3>`)
- ✅ Proper heading hierarchy (h1 → h2 → h3)
- ✅ Keyboard navigation support
- ✅ Color contrast meets WCAG 2.1 AA standards
- ✅ Skip links via table of contents

## Development Workflow

### Making Changes

1. Edit components in `src/`
2. Hot module replacement automatically reloads changes
3. Test in standalone mode at http://localhost:3005/
4. Test in integrated mode with host application

### Adding New Sections

1. Add new section to `sections` array in `src/App.jsx`
2. Assign unique `id` for anchor linking
3. Provide `title`, `order`, and `content`
4. Navigation will update automatically

### Updating Styles

1. Edit `src/App.css`
2. Use CSS custom properties for consistency
3. Test responsive behavior at different viewport sizes

## Troubleshooting

### Remote not loading in host

- Verify privacy-policy remote is running on port 3005
- Check browser console for Module Federation errors
- Ensure React versions match between host and remote
- Verify `remoteEntry.js` is accessible at http://localhost:3005/remoteEntry.js

### Version conflicts

- Ensure both host and remote use React 18.2.0
- Check that `singleton: true` is set for shared dependencies
- Clear `node_modules` and reinstall if needed

### Build errors

- Run `npm install` to ensure all dependencies are installed
- Check for Babel or Webpack configuration errors
- Verify Node.js version is >= 14.x

## License

This project is part of the MFE (Micro-Frontend) architecture demo.

## Related Documentation

- [MFE Architecture Constitution](../../.specify/memory/constitution.md)
- [Feature Specification](../../specs/001-privacy-policy/spec.md)
- [Implementation Plan](../../specs/001-privacy-policy/plan.md)
- [Module Federation Contract](../../specs/001-privacy-policy/contracts/module-federation-contract.md)

## Contact

For questions or issues related to this remote:
- Create an issue in the project repository
- Contact the development team
