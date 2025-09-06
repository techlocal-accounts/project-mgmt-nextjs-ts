'use client';

import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '@/types';
import { TaskModal } from './TaskModal';
import { cn, formatRelativeDate } from '@/lib/utils';
import { 
  CalendarIcon,
  UserIcon,
  FlagIcon,
  ChatBubbleLeftIcon,
  PaperClipIcon,
} from '@heroicons/react/24/outline';

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
}

const priorityColors = {
  low: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
  high: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
  urgent: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
};

const priorityIcons = {
  low: '🔵',
  medium: '🟡',
  high: '🟠',
  urgent: '🔴',
};

export function TaskCard({ task, isDragging }: TaskCardProps) {
  const [showModal, setShowModal] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'task',
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();
  const isUpcoming = task.dueDate && new Date(task.dueDate) > new Date() && 
    new Date(task.dueDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={cn(
          'bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-600 cursor-pointer hover:shadow-md transition-shadow',
          isDragging || isSortableDragging && 'opacity-50 shadow-lg',
          isOverdue && 'border-red-300 dark:border-red-600',
          isUpcoming && 'border-yellow-300 dark:border-yellow-600'
        )}
        onClick={() => setShowModal(true)}
      >
        {/* Task Title */}
        <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
          {task.title}
        </h3>

        {/* Task Description */}
        {task.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Labels */}
        {task.labels.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {task.labels.slice(0, 3).map((label) => (
              <span
                key={label.id}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: `${label.color}20`,
                  color: label.color,
                }}
              >
                {label.name}
              </span>
            ))}
            {task.labels.length > 3 && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                +{task.labels.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Task Meta */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-3">
            {/* Priority */}
            <div className="flex items-center space-x-1">
              <span className="text-xs">{priorityIcons[task.priority]}</span>
              <span className={cn(
                'px-2 py-1 rounded-full text-xs font-medium',
                priorityColors[task.priority]
              )}>
                {task.priority}
              </span>
            </div>

            {/* Due Date */}
            {task.dueDate && (
              <div className={cn(
                'flex items-center space-x-1',
                isOverdue && 'text-red-600 dark:text-red-400',
                isUpcoming && 'text-yellow-600 dark:text-yellow-400'
              )}>
                <CalendarIcon className="h-3 w-3" />
                <span>{formatRelativeDate(new Date(task.dueDate))}</span>
              </div>
            )}
          </div>

          {/* Task Stats */}
          <div className="flex items-center space-x-2">
            {/* Comments */}
            {task.comments.length > 0 && (
              <div className="flex items-center space-x-1">
                <ChatBubbleLeftIcon className="h-3 w-3" />
                <span>{task.comments.length}</span>
              </div>
            )}

            {/* Attachments */}
            {task.attachments.length > 0 && (
              <div className="flex items-center space-x-1">
                <PaperClipIcon className="h-3 w-3" />
                <span>{task.attachments.length}</span>
              </div>
            )}

            {/* Subtasks */}
            {task.subtasks.length > 0 && (
              <div className="flex items-center space-x-1">
                <div className="text-xs">
                  {task.subtasks.filter(subtask => subtask.completed).length}/{task.subtasks.length}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Assignee */}
        {task.assigneeId && (
          <div className="mt-3 flex items-center space-x-2">
            <div className="h-6 w-6 rounded-full bg-primary-500 flex items-center justify-center">
              <UserIcon className="h-3 w-3 text-white" />
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Assigned
            </span>
          </div>
        )}
      </div>

      {/* Task Modal */}
      {showModal && (
        <TaskModal
          task={task}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}