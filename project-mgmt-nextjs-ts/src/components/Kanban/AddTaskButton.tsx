'use client';

import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface AddTaskButtonProps {
  columnId: string;
}

export function AddTaskButton({ columnId }: AddTaskButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      // TODO: Implement task creation
      console.log('Creating task:', { title: title.trim(), columnId });
      setTitle('');
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsAdding(false);
      setTitle('');
    }
  };

  if (isAdding) {
    return (
      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a title for this task..."
          className="w-full p-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          autoFocus
          rows={3}
        />
        <div className="flex space-x-2">
          <button
            type="submit"
            className="px-3 py-1 text-sm font-medium text-white bg-primary-500 rounded hover:bg-primary-600"
          >
            Add Task
          </button>
          <button
            type="button"
            onClick={() => {
              setIsAdding(false);
              setTitle('');
            }}
            className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded hover:bg-gray-200 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <button
      onClick={() => setIsAdding(true)}
      className={cn(
        'w-full p-3 text-sm text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 hover:text-primary-500 dark:hover:border-primary-400 dark:hover:text-primary-400 transition-colors flex items-center justify-center space-x-2'
      )}
    >
      <PlusIcon className="h-4 w-4" />
      <span>Add a task</span>
    </button>
  );
}