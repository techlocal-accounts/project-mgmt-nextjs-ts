'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface FeatureSectionProps {
  feature: {
    title: string;
    description: string;
    details: string[];
    icon: string;
    color: string;
  };
  reverse?: boolean;
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-100 dark:bg-blue-900/20',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800',
  },
  green: {
    bg: 'bg-green-100 dark:bg-green-900/20',
    text: 'text-green-600 dark:text-green-400',
    border: 'border-green-200 dark:border-green-800',
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-900/20',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-200 dark:border-purple-800',
  },
};

export function FeatureSection({ feature, reverse = false }: FeatureSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const colors = colorClasses[feature.color as keyof typeof colorClasses];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className={cn(
      'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center',
      reverse && 'lg:grid-flow-col-dense'
    )}>
      {/* Content */}
      <div className={cn(
        'space-y-6 transition-all duration-700',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        reverse && 'lg:col-start-2'
      )}>
        <div className="flex items-center space-x-4">
          <div className={cn(
            'text-4xl p-3 rounded-xl',
            colors.bg
          )}>
            {feature.icon}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {feature.title}
          </h2>
        </div>

        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          {feature.description}
        </p>

        <ul className="space-y-3">
          {feature.details.map((detail, index) => (
            <li key={index} className="flex items-start space-x-3">
              <CheckIcon className={cn(
                'h-5 w-5 mt-0.5 flex-shrink-0',
                colors.text
              )} />
              <span className="text-gray-700 dark:text-gray-300">
                {detail}
              </span>
            </li>
          ))}
        </ul>

        <div className="pt-4">
          <Link
            href="/boards"
            className={cn(
              'inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105',
              colors.bg,
              colors.text,
              'hover:shadow-lg'
            )}
          >
            <span>Try it now</span>
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Visual */}
      <div className={cn(
        'transition-all duration-700 delay-200',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        reverse && 'lg:col-start-1'
      )}>
        <div className={cn(
          'relative p-8 rounded-2xl border-2',
          colors.bg,
          colors.border
        )}>
          {/* Mock interface based on feature */}
          {feature.title.includes('Kanban') && (
            <div className="space-y-4">
              <div className="flex space-x-4">
                <div className="w-48 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">To Do</h3>
                  <div className="space-y-2">
                    <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded text-sm">Design dashboard</div>
                    <div className="bg-yellow-100 dark:bg-yellow-900/20 p-2 rounded text-sm">Setup environment</div>
                  </div>
                </div>
                <div className="w-48 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">In Progress</h3>
                  <div className="space-y-2">
                    <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded text-sm">Implement auth</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {feature.title.includes('Timeline') && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Project Setup</span>
                  </div>
                  <div className="h-2 bg-blue-200 dark:bg-blue-800 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full w-3/4"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Development</span>
                  </div>
                  <div className="h-2 bg-green-200 dark:bg-green-800 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {feature.title.includes('Search') && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <input 
                    type="text" 
                    placeholder="Search projects, tasks..."
                    className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-500"
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-900 dark:text-white">Project: Dashboard</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-900 dark:text-white">Task: Implement auth</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}