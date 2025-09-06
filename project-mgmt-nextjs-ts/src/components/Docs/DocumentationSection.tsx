'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface DocumentationSectionProps {
  title: string;
  content: string;
}

export function DocumentationSection({ title, content }: DocumentationSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
        {isExpanded ? (
          <ChevronDownIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronRightIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        )}
      </button>
      
      {isExpanded && (
        <div className="px-6 pb-6">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <MarkdownContent content={content} />
          </div>
        </div>
      )}
    </div>
  );
}

function MarkdownContent({ content }: { content: string }) {
  // Simple markdown parser for basic formatting
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={key++} className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-4">
          {line.slice(2)}
        </h1>
      );
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="text-xl font-semibold text-gray-900 dark:text-white mt-5 mb-3">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={key++} className="text-lg font-medium text-gray-900 dark:text-white mt-4 mb-2">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith('- [ ]')) {
      elements.push(
        <div key={key++} className="flex items-start space-x-2 my-2">
          <input type="checkbox" className="mt-1" disabled />
          <span className="text-gray-700 dark:text-gray-300">{line.slice(5)}</span>
        </div>
      );
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={key++} className="text-gray-700 dark:text-gray-300 my-1">
          {line.slice(2)}
        </li>
      );
    } else if (line.startsWith('```')) {
      // Code block
      const codeLines: string[] = [];
      i++; // Skip the opening ```
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      
      elements.push(
        <pre key={key++} className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto my-4">
          <code className="text-sm text-gray-800 dark:text-gray-200">
            {codeLines.join('\n')}
          </code>
        </pre>
      );
    } else if (line.startsWith('`') && line.endsWith('`')) {
      // Inline code
      elements.push(
        <code key={key++} className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm text-gray-800 dark:text-gray-200">
          {line.slice(1, -1)}
        </code>
      );
    } else if (line.trim() === '') {
      elements.push(<br key={key++} />);
    } else if (line.trim()) {
      elements.push(
        <p key={key++} className="text-gray-700 dark:text-gray-300 my-3 leading-relaxed">
          {line}
        </p>
      );
    }
  }

  return <div>{elements}</div>;
}