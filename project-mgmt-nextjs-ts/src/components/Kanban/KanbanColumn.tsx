'use client';

import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Column, Task } from '@/types';
import { TaskCard } from './TaskCard';
import { AddTaskButton } from './AddTaskButton';
import { ColumnMenu } from './ColumnMenu';
import { cn } from '@/lib/utils';
import { 
  EllipsisVerticalIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

interface KanbanColumnProps {
  column: Column;
  onUpdate: (columnId: string, updates: Partial<Column>) => void;
  onDelete: (columnId: string) => void;
}

export function KanbanColumn({ column, onUpdate, onDelete }: KanbanColumnProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(column.name);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: 'column',
      column,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleNameSubmit = () => {
    if (editName.trim() && editName !== column.name) {
      onUpdate(column.id, { name: editName.trim() });
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSubmit();
    } else if (e.key === 'Escape') {
      setEditName(column.name);
      setIsEditing(false);
    }
  };

  const taskCount = column.tasks.length;
  const completedTasks = column.tasks.filter(task => task.status === 'done').length;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex-shrink-0 w-64 bg-gray-100 dark:bg-gray-800 rounded-lg p-4',
        isDragging && 'opacity-50'
      )}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 flex-1">
          {isEditing ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={handleNameSubmit}
              onKeyDown={handleKeyDown}
              className="flex-1 px-2 py-1 text-sm font-medium bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              autoFocus
            />
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 text-left px-2 py-1 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            >
              {column.name}
            </button>
          )}
          
          {/* Column color indicator */}
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: column.color }}
          />
        </div>

        <div className="flex items-center space-x-1">
          {/* Task count */}
          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
            {taskCount}
          </span>

          {/* Column menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded"
            >
              <EllipsisVerticalIcon className="h-4 w-4" />
            </button>
            
            {showMenu && (
              <ColumnMenu
                column={column}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onClose={() => setShowMenu(false)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      {taskCount > 0 && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>Progress</span>
            <span>{completedTasks}/{taskCount}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedTasks / taskCount) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Tasks */}
      <div className="space-y-3 min-h-[200px]">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        
        {/* Add task button */}
        <AddTaskButton columnId={column.id} />
      </div>
    </div>
  );
}