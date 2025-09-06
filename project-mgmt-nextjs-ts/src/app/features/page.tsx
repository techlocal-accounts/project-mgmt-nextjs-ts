'use client';

import { Layout } from '@/components/Layout/Layout';
import { FeatureSection } from '@/components/Features/FeatureSection';

const features = [
  {
    title: 'Kanban & Boards',
    description: 'CRUD boards/columns/tasks/subtasks with drag/drop, inline edit, bulk actions, labels, priorities and local persistence.',
    details: [
      'Drag and drop task management',
      'Customizable columns and labels',
      'Priority levels and due dates',
      'Subtasks and attachments',
      'Real-time collaboration',
      'Local data persistence'
    ],
    icon: '📋',
    color: 'blue'
  },
  {
    title: 'Timeline / Gantt',
    description: 'Gantt bars with drag/resize, board/timeline/calendar views, virtual scrolling, zoom/pan and snap-to-grid.',
    details: [
      'Interactive Gantt charts',
      'Drag and resize timeline bars',
      'Multiple view modes',
      'Virtual scrolling for performance',
      'Zoom and pan controls',
      'Snap-to-grid functionality'
    ],
    icon: '📅',
    color: 'green'
  },
  {
    title: 'Search, Analytics & PWA',
    description: 'Global debounced search with cache, responsive charts, export, service worker, offline queue and sync.',
    details: [
      'Global search with intelligent caching',
      'Comprehensive analytics dashboard',
      'PWA with offline support',
      'Background sync capabilities',
      'Export functionality',
      'Performance monitoring'
    ],
    icon: '🔍',
    color: 'purple'
  }
];

export default function FeaturesPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Features
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Detailed feature pages covering Kanban, Timeline, Search, PWA, Accessibility, and Performance.
          </p>
        </div>

        <div className="space-y-16">
          {features.map((feature, index) => (
            <FeatureSection
              key={feature.title}
              feature={feature}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}