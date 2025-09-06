'use client';

import { useState } from 'react';
import { Task } from '@/types';
import { cn, formatDate } from '@/lib/utils';
import { 
  XMarkIcon,
  CalendarIcon,
  UserIcon,
  FlagIcon,
  ChatBubbleLeftIcon,
  PaperClipIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';

interface TaskModalProps {
  task: Task;
  onClose: () => void;
}

export function TaskModal({ task, onClose }: TaskModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    high: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
    urgent: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
  };

  const handleSave = () => {
    // TODO: Implement task update
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditTitle(task.title);
      setEditDescription(task.description || '');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full text-xl font-semibold bg-transparent border-none outline-none text-gray-900 dark:text-white"
                  autoFocus
                />
              ) : (
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {task.title}
                </h2>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Description
              </h3>
              {isEditing ? (
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full h-24 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Add a description..."
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  {task.description || 'No description provided'}
                </p>
              )}
            </div>

            {/* Task Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Status */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Status
                </h3>
                <span className={cn(
                  'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                  task.status === 'todo' && 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
                  task.status === 'in-progress' && 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
                  task.status === 'review' && 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
                  task.status === 'done' && 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                )}>
                  {task.status.replace('-', ' ')}
                </span>
              </div>

              {/* Priority */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Priority
                </h3>
                <span className={cn(
                  'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                  priorityColors[task.priority]
                )}>
                  <FlagIcon className="h-4 w-4 mr-1" />
                  {task.priority}
                </span>
              </div>

              {/* Due Date */}
              {task.dueDate && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Due Date
                  </h3>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{formatDate(new Date(task.dueDate), 'MMM dd, yyyy')}</span>
                  </div>
                </div>
              )}

              {/* Assignee */}
              {task.assigneeId && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Assignee
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center">
                      <UserIcon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">John Doe</span>
                  </div>
                </div>
              )}
            </div>

            {/* Labels */}
            {task.labels.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Labels
                </h3>
                <div className="flex flex-wrap gap-2">
                  {task.labels.map((label) => (
                    <span
                      key={label.id}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: `${label.color}20`,
                        color: label.color,
                      }}
                    >
                      {label.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Subtasks */}
            {task.subtasks.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Subtasks
                </h3>
                <div className="space-y-2">
                  {task.subtasks.map((subtask) => (
                    <div key={subtask.id} className="flex items-center space-x-2">
                      <button
                        className={cn(
                          'h-4 w-4 rounded border-2 flex items-center justify-center',
                          subtask.completed
                            ? 'bg-primary-500 border-primary-500 text-white'
                            : 'border-gray-300 dark:border-gray-600'
                        )}
                      >
                        {subtask.completed && <CheckIcon className="h-3 w-3" />}
                      </button>
                      <span className={cn(
                        'text-sm',
                        subtask.completed
                          ? 'line-through text-gray-500 dark:text-gray-400'
                          : 'text-gray-900 dark:text-white'
                      )}>
                        {subtask.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comments */}
            {task.comments.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Comments ({task.comments.length})
                </h3>
                <div className="space-y-3">
                  {task.comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-3">
                      <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                        <UserIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            John Doe
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(new Date(comment.createdAt), 'MMM dd, h:mm a')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Attachments */}
            {task.attachments.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Attachments ({task.attachments.length})
                </h3>
                <div className="space-y-2">
                  {task.attachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <PaperClipIcon className="h-5 w-5 text-gray-400" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {attachment.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {attachment.type} • {Math.round(attachment.size / 1024)} KB
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Created {formatDate(new Date(task.createdAt), 'MMM dd, yyyy')}
            </div>
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditTitle(task.title);
                      setEditDescription(task.description || '');
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600"
                  >
                    Save
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}