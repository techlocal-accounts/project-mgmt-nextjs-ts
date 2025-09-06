'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRightIcon,
  CodeBracketIcon,
  BookOpenIcon,
  RocketLaunchIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

export function CTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600">
      <div className="container-custom">
        <div className="text-center">
          {/* Main CTA */}
          <div className={`mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Get the Starter
            </h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
              Clone repo, run dev, view docs and storybook for components. Start building your next project management app today.
            </p>
          </div>

          {/* Action buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Link
              href="/docs"
              className="inline-flex items-center space-x-2 bg-white hover:bg-gray-50 text-primary-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              <CodeBracketIcon className="h-5 w-5" />
              <span>View Documentation</span>
            </Link>
            
            <Link
              href="/features"
              className="inline-flex items-center space-x-2 bg-primary-800 hover:bg-primary-900 text-white px-8 py-4 rounded-lg font-semibold text-lg border border-primary-500 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              <RocketLaunchIcon className="h-5 w-5" />
              <span>Try Live Demo</span>
            </Link>
          </div>

          {/* Quick start steps */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Clone & Install</h3>
              <p className="text-primary-100 text-sm">
                <code className="bg-white/20 px-2 py-1 rounded text-xs">git clone</code> and <code className="bg-white/20 px-2 py-1 rounded text-xs">npm install</code>
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Run Development</h3>
              <p className="text-primary-100 text-sm">
                <code className="bg-white/20 px-2 py-1 rounded text-xs">npm run dev</code> to start the development server
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Start Building</h3>
              <p className="text-primary-100 text-sm">
                Explore components, customize themes, and build your app
              </p>
            </div>
          </div>

          {/* GitHub stats */}
          <div className={`mt-16 flex flex-wrap justify-center gap-8 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center space-x-2 text-primary-100">
              <StarIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Open Source</span>
            </div>
            <div className="flex items-center space-x-2 text-primary-100">
              <BookOpenIcon className="h-5 w-5" />
              <span className="text-sm font-medium">MIT License</span>
            </div>
            <div className="flex items-center space-x-2 text-primary-100">
              <RocketLaunchIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Production Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}