'use client';

import { useRef, useEffect } from 'react';
import { Column } from '@/types';
import { 
  PencilIcon,
  TrashIcon,
  PaintBrushIcon,
} from '@heroicons/react/24/outline';

interface ColumnMenuProps {
  column: Column;
  onUpdate: (columnId: string, updates: Partial<Column>) => void;
  onDelete: (columnId: string) => void;
  onClose: () => void;
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

export function ColumnMenu({ column, onUpdate, onDelete, onClose }: ColumnMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleColorChange = (color: string) => {
    onUpdate(column.id, { color });
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete the "${column.name}" column? This action cannot be undone.`)) {
      onDelete(column.id);
      onClose();
    }
  };

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-8 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
    >
      {/* Change Color */}
      <div className="px-3 py-2">
        <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
          Change Color
        </div>
        <div className="flex space-x-2">
          {columnColors.map((color) => (
            <button
              key={color}
              onClick={() => handleColorChange(color)}
              className={`w-6 h-6 rounded-full border-2 transition-all ${
                column.color === color
                  ? 'border-gray-900 dark:border-white scale-110'
                  : 'border-gray-300 dark:border-gray-600 hover:scale-105'
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700 my-1" />

      {/* Delete Column */}
      <button
        onClick={handleDelete}
        className="flex w-full items-center space-x-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
      >
        <TrashIcon className="h-4 w-4" />
        <span>Delete Column</span>
      </button>
    </div>
  );
}