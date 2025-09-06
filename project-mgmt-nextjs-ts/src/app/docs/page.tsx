'use client';

import { Layout } from '@/components/Layout/Layout';
import { DocumentationSection } from '@/components/Docs/DocumentationSection';

const docSections = [
  {
    title: 'Getting Started',
    content: `
# Getting Started

Welcome to the Project Management application! This guide will help you get up and running quickly.

## Quick Start

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/project-mgmt-nextjs-ts.git
   cd project-mgmt-nextjs-ts
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

The application follows Next.js best practices with a clear separation of concerns:

- \`src/app/\` - Next.js App Router pages
- \`src/components/\` - Reusable React components
- \`src/hooks/\` - Custom React hooks
- \`src/lib/\` - Utility functions and configurations
- \`src/types/\` - TypeScript type definitions
    `,
  },
  {
    title: 'Architecture',
    content: `
# Architecture Overview

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for utility-first styling
- **State Management**: React Context + Local Storage
- **Drag & Drop**: @dnd-kit for accessible drag and drop
- **Charts**: Recharts for data visualization
- **PWA**: Next-PWA + Workbox for offline support

## Key Design Decisions

### State Management
We use React Context for global state and Local Storage for persistence. This approach provides:
- Simple state management without external dependencies
- Automatic persistence across browser sessions
- Type-safe state updates with TypeScript

### Component Architecture
Components are organized by feature and follow these principles:
- Single Responsibility Principle
- Composition over inheritance
- Accessibility-first design
- Mobile-first responsive design

### Performance Optimizations
- Code splitting with Next.js dynamic imports
- Image optimization with next/image
- Virtual scrolling for large lists
- Lazy loading of non-critical components
    `,
  },
  {
    title: 'API Reference',
    content: `
# API Reference

## Hooks

### useTheme
Manages theme state (light/dark/system) with persistence.

\`\`\`typescript
const { theme, setTheme, resolvedTheme } = useTheme();
\`\`\`

### useLocalStorage
Provides type-safe local storage with React state synchronization.

\`\`\`typescript
const [value, setValue, removeValue] = useLocalStorage('key', defaultValue);
\`\`\`

### useOffline
Manages offline state and action queuing.

\`\`\`typescript
const { isOnline, offlineActions, addOfflineAction } = useOffline();
\`\`\`

### useSearch
Provides debounced search with caching.

\`\`\`typescript
const { query, setQuery, results, isSearching } = useSearch();
\`\`\`

## Components

### KanbanBoard
Main Kanban board component with drag and drop support.

\`\`\`typescript
<KanbanBoard boardId="board-1" />
\`\`\`

### TaskCard
Individual task card with modal support.

\`\`\`typescript
<TaskCard task={task} />
\`\`\`

## Types

### Core Types
\`\`\`typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  // ... more properties
}
\`\`\`
    `,
  },
  {
    title: 'Testing Guide',
    content: `
# Testing Guide

## Running Tests

### Unit Tests
\`\`\`bash
npm run test
\`\`\`

### Integration Tests
\`\`\`bash
npm run test:integration
\`\`\`

### E2E Tests
\`\`\`bash
npm run e2e
\`\`\`

## Test Structure

### Unit Tests
- Component rendering tests
- Hook behavior tests
- Utility function tests
- Type validation tests

### Integration Tests
- Component interaction tests
- State management tests
- API integration tests

### E2E Tests
- User workflow tests
- Cross-browser compatibility
- Performance tests
- Accessibility tests

## Writing Tests

### Component Tests
\`\`\`typescript
import { render, screen } from '@testing-library/react';
import { TaskCard } from '@/components/Kanban/TaskCard';

test('renders task title', () => {
  const task = { id: '1', title: 'Test Task', /* ... */ };
  render(<TaskCard task={task} />);
  expect(screen.getByText('Test Task')).toBeInTheDocument();
});
\`\`\`

### Hook Tests
\`\`\`typescript
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

test('updates localStorage when value changes', () => {
  const { result } = renderHook(() => useLocalStorage('test', 'initial'));
  
  act(() => {
    result.current[1]('updated');
  });
  
  expect(result.current[0]).toBe('updated');
});
\`\`\`
    `,
  },
  {
    title: 'Accessibility Checklist',
    content: `
# Accessibility Checklist

## WCAG 2.1 AA Compliance

### Keyboard Navigation
- [ ] All interactive elements are keyboard accessible
- [ ] Tab order is logical and intuitive
- [ ] Focus indicators are visible
- [ ] Skip links are provided for main content

### Screen Reader Support
- [ ] All images have alt text
- [ ] Form labels are properly associated
- [ ] ARIA labels and descriptions are used
- [ ] Live regions for dynamic content

### Color and Contrast
- [ ] Color contrast meets AA standards (4.5:1)
- [ ] Information is not conveyed by color alone
- [ ] Dark mode support is available

### Motion and Animation
- [ ] Respects prefers-reduced-motion
- [ ] No auto-playing content
- [ ] Pause/stop controls for animations

## Testing Accessibility

### Automated Testing
\`\`\`bash
# Run accessibility tests
npm run test:a11y
\`\`\`

### Manual Testing
1. Test with keyboard only
2. Test with screen reader
3. Test with high contrast mode
4. Test with zoom up to 200%

### Tools
- axe-core for automated testing
- Lighthouse for accessibility audit
- WAVE for visual accessibility feedback
- Screen readers (NVDA, JAWS, VoiceOver)
    `,
  },
];

export default function DocsPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Developer Guides
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            README, architecture overview, state management choices, code examples and testing instructions.
          </p>
        </div>

        <div className="space-y-12">
          {docSections.map((section, index) => (
            <DocumentationSection
              key={section.title}
              title={section.title}
              content={section.content}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}