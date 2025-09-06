'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ClipboardDocumentListIcon,
  CalendarIcon,
  MagnifyingGlassIcon,
  CloudIcon,
  ShieldCheckIcon,
  BoltIcon,
  GlobeAltIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Kanban Boards',
    description: 'Drag and drop task management with customizable columns, labels, and priorities.',
    icon: ClipboardDocumentListIcon,
    href: '/boards',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
  },
  {
    name: 'Timeline / Gantt',
    description: 'Visual project timelines with drag/resize, virtual scrolling, and multiple views.',
    icon: CalendarIcon,
    href: '/timeline',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/20',
  },
  {
    name: 'Global Search',
    description: 'Debounced search with intelligent caching and offline support.',
    icon: MagnifyingGlassIcon,
    href: '/search',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20',
  },
  {
    name: 'Offline Sync',
    description: 'PWA with service worker, offline queue, and background sync capabilities.',
    icon: CloudIcon,
    href: '/features',
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-100 dark:bg-orange-900/20',
  },
  {
    name: 'Accessibility',
    description: 'WCAG 2.1 AA compliant with keyboard navigation and screen reader support.',
    icon: ShieldCheckIcon,
    href: '/features',
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/20',
  },
  {
    name: 'Performance',
    description: 'Optimized with virtual scrolling, lazy loading, and performance monitoring.',
    icon: BoltIcon,
    href: '/features',
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
  },
  {
    name: 'Multi-language',
    description: 'Internationalization support with multiple language options.',
    icon: GlobeAltIcon,
    href: '/features',
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/20',
  },
  {
    name: 'Analytics',
    description: 'Comprehensive analytics with charts, reports, and productivity insights.',
    icon: ChartBarIcon,
    href: '/analytics',
    color: 'text-pink-600 dark:text-pink-400',
    bgColor: 'bg-pink-100 dark:bg-pink-900/20',
  },
];

export function Features() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Key Features
          </h2>
          <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Everything you need for modern project management, built with accessibility and performance in mind.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link
              key={feature.name}
              href={feature.href}
              className={`group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 transition-all duration-700 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${feature.bgColor} mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {feature.name}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Additional info */}
        <div className={`mt-16 text-center transition-all duration-700 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="inline-flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 px-6 py-3 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              All features work offline and sync when you reconnect
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}