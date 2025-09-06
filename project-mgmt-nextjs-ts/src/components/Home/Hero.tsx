'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRightIcon,
  PlayIcon,
  SparklesIcon,
  BoltIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" />

      <div className="relative container-custom py-20 lg:py-32">
        <div className="text-center">
          {/* Badge */}
          <div className={`inline-flex items-center space-x-2 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-medium mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <SparklesIcon className="h-4 w-4" />
            <span>Production-ready Project Management</span>
          </div>

          {/* Main heading */}
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Project Management
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Fast, Accessible, Offline-ready
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Next.js + TypeScript frontend scaffold with Kanban, Timeline/Gantt, Search, Analytics, and PWA support.
          </p>

          {/* Feature highlights */}
          <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
              <BoltIcon className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Lightning Fast</span>
            </div>
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
              <ShieldCheckIcon className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">WCAG 2.1 AA</span>
            </div>
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
              <SparklesIcon className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">PWA Ready</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Link
              href="/boards"
              className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              <span>Try Kanban Board</span>
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
            
            <button className="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-lg font-semibold text-lg border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:scale-105 hover:shadow-lg">
              <PlayIcon className="h-5 w-5" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Quick stats */}
          <div className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">100%</div>
              <div className="text-gray-600 dark:text-gray-400">Accessible</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-600 dark:text-accent-400 mb-2">Offline</div>
              <div className="text-gray-600 dark:text-gray-400">First</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">TypeScript</div>
              <div className="text-gray-600 dark:text-gray-400">Ready</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}