# Data Model: Privacy Policy Micro-Frontend

**Feature**: Privacy Policy Micro-Frontend  
**Date**: 2026-04-27  
**Purpose**: Define the content structure and component data contracts

## Content Entities

### Privacy Policy Section

Represents a distinct section of the privacy policy document.

**Attributes**:
- `id` (string): Unique identifier for the section, used for anchor links (e.g., "data-collection", "cookies")
- `title` (string): Display title for the section (e.g., "Data Collection and Usage", "Cookie Policy")
- `order` (number): Sequence number for section ordering (1-5)
- `content` (string/JSX): The actual policy text content for the section

**Relationships**:
- No relationships to other entities (standalone, self-contained content)

**Validation Rules**:
- `id` must be URL-safe (lowercase, hyphens only, no spaces)
- `title` must be non-empty string
- `order` must be unique positive integer
- `content` should be non-empty

**Example**:
```javascript
{
  id: "data-collection",
  title: "Data Collection and Usage",
  order: 1,
  content: "We collect information that you provide directly to us..."
}
```

### Privacy Policy Document

The complete privacy policy containing all sections.

**Attributes**:
- `sections` (array of Section): Ordered list of all policy sections
- `lastUpdated` (date): Date of last policy update (for display purposes)
- `version` (string): Policy version number (optional, for compliance tracking)

**Example**:
```javascript
{
  sections: [
    { id: "data-collection", title: "Data Collection and Usage", order: 1, content: "..." },
    { id: "cookies", title: "Cookie Policy", order: 2, content: "..." },
    { id: "third-party", title: "Third-Party Services", order: 3, content: "..." },
    { id: "user-rights", title: "User Rights", order: 4, content: "..." },
    { id: "contact", title: "Contact Information", order: 5, content: "..." }
  ],
  lastUpdated: "2026-04-27",
  version: "1.0"
}
```

## Component Data Contracts

### PrivacyPolicyApp Component

**Props**: None (or minimal configuration props)
- No required props for MVP - component is self-contained
- Optional future props: `onSectionChange` callback, `defaultSection` for deep-linking

**Internal State**:
- `activeSection` (string): Currently highlighted/active section ID (if implementing scroll-spy in future)
- `sections` (array): List of section data (could be hard-coded or loaded from local constant)

**Exposed Interface** (for Module Federation):
```javascript
// Default export
export default PrivacyPolicyApp;

// No props required
<PrivacyPolicyApp />
```

### Section Component (if extracted)

**Props**:
- `id` (string, required): Section identifier for anchor linking
- `title` (string, required): Section heading text
- `children` (node, required): Section content (JSX or text)

**Example**:
```jsx
<Section id="data-collection" title="Data Collection and Usage">
  <p>We collect information that you provide directly to us...</p>
  <ul>
    <li>Account information (name, email)</li>
    <li>Usage data (analytics, logs)</li>
  </ul>
</Section>
```

### Navigation Component (if extracted)

**Props**:
- `sections` (array, required): List of section objects with `id` and `title`
- `activeSection` (string, optional): Current active section for highlighting

**Example**:
```jsx
<Navigation 
  sections={[
    { id: "data-collection", title: "Data Collection and Usage" },
    { id: "cookies", title: "Cookie Policy" },
    // ...
  ]}
  activeSection="cookies"
/>
```

## Data Flow

```
PrivacyPolicyApp (root)
├── Navigation (table of contents)
│   └── Links to sections via anchor hrefs
├── Section: Data Collection
├── Section: Cookie Policy
├── Section: Third-Party Services
├── Section: User Rights
└── Section: Contact Information
```

**Data Source**: Static content defined within the component (no API calls, no external data)

**State Management**: Local component state only (no Redux, Context, or external state management needed)

## Notes

- **Static Content**: The privacy policy content is hard-coded within the component for MVP. Future enhancement could load from CMS or markdown files.
- **No Backend**: This is a purely client-side component with no API integration or data persistence.
- **Update Process**: Content updates require code changes and redeployment (acceptable for legal/compliance docs that change infrequently).
- **Minimal Props**: The component is designed to be self-contained with no required props, making it easy to consume from the host with minimal configuration.
