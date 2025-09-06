'use client';

import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface AddColumnButtonProps {
  onAdd: (name: string, color: string) => void;
}

const columnColors = [
  '#6b7280', // Gray
  '#3b82f6', // Blue
  '#10b981', // Green
  '#f59e0b', // Yellow
  '#ef4444', // Red
  '#8b5cf6', // Purple
  '#06b6d4', // Cyan
  '#f97316', // Orange
];

export function AddColumnButton({ onAdd }: AddColumnButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(columnColors[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim(), selectedColor);
      setName('');
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsAdding(false);
      setName('');
    }
  };

  if (isAdding) {
    return (
      <div className="flex-shrink-0 w-64 bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Column name"
            className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            autoFocus
          />
          
          {/* Color picker */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              Color
            </label>
            <div className="flex space-x-2">
              {columnColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    'w-6 h-6 rounded-full border-2 transition-all',
                    selectedColor === color
                      ? 'border-gray-900 dark:border-white scale-110'
                      : 'border-gray-300 dark:border-gray-600 hover:scale-105'
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-3 py-1 text-sm font-medium text-white bg-primary-500 rounded hover:bg-primary-600"
            >
              Add Column
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setName('');
              }}
              className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded hover:bg-gray-200 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsAdding(true)}
      className={cn(
        'flex-shrink-0 w-64 p-4 text-sm text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 hover:text-primary-500 dark:hover:border-primary-400 dark:hover:text-primary-400 transition-colors flex items-center justify-center space-x-2'
      )}
    >
      <PlusIcon className="h-5 w-5" />
      <span>Add a column</span>
    </button>
  );
}