'use client';

import { useState, useEffect } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Board, Column, Task } from '@/types';
import { KanbanColumn } from './KanbanColumn';
import { TaskCard } from './TaskCard';
import { AddColumnButton } from './AddColumnButton';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/constants';

interface KanbanBoardProps {
  boardId: string;
}

export function KanbanBoard({ boardId }: KanbanBoardProps) {
  const [board, setBoard] = useLocalStorage<Board | null>(`board-${boardId}`, null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Initialize board with demo data if not exists
  useEffect(() => {
    if (!board) {
      const demoBoard: Board = {
        id: boardId,
        name: 'Demo Board',
        description: 'A sample Kanban board with demo tasks',
        projectId: 'demo-project',
        columns: [
          {
            id: 'todo',
            name: 'To Do',
            color: '#6b7280',
            position: 0,
            boardId: boardId,
            tasks: [
              {
                id: 'task-1',
                title: 'Design new dashboard',
                description: 'Create wireframes and mockups for the new dashboard',
                status: 'todo',
                priority: 'high',
                labels: [],
                columnId: 'todo',
                boardId: boardId,
                position: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
                subtasks: [],
                attachments: [],
                comments: [],
              },
              {
                id: 'task-2',
                title: 'Setup development environment',
                description: 'Configure tools and dependencies',
                status: 'todo',
                priority: 'medium',
                labels: [],
                columnId: 'todo',
                boardId: boardId,
                position: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                subtasks: [],
                attachments: [],
                comments: [],
              },
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 'in-progress',
            name: 'In Progress',
            color: '#3b82f6',
            position: 1,
            boardId: boardId,
            tasks: [
              {
                id: 'task-3',
                title: 'Implement user authentication',
                description: 'Add login and registration functionality',
                status: 'in-progress',
                priority: 'high',
                labels: [],
                columnId: 'in-progress',
                boardId: boardId,
                position: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
                subtasks: [],
                attachments: [],
                comments: [],
              },
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 'review',
            name: 'Review',
            color: '#8b5cf6',
            position: 2,
            boardId: boardId,
            tasks: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 'done',
            name: 'Done',
            color: '#10b981',
            position: 3,
            boardId: boardId,
            tasks: [
              {
                id: 'task-4',
                title: 'Project setup',
                description: 'Initialize Next.js project with TypeScript',
                status: 'done',
                priority: 'medium',
                labels: [],
                columnId: 'done',
                boardId: boardId,
                position: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
                subtasks: [],
                attachments: [],
                comments: [],
              },
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setBoard(demoBoard);
    }
  }, [board, boardId, setBoard]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    
    // Find the task or column being dragged
    const task = findTask(active.id as string);
    const column = findColumn(active.id as string);
    
    if (task) {
      setActiveTask(task);
    } else if (column) {
      setActiveColumn(column);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find the active and over items
    const activeTask = findTask(activeId);
    const overTask = findTask(overId);
    const overColumn = findColumn(overId);

    if (!activeTask) return;

    // If dragging over a column
    if (overColumn && activeTask.columnId !== overColumn.id) {
      setBoard((prev) => {
        if (!prev) return prev;

        const newBoard = { ...prev };
        const sourceColumn = newBoard.columns.find(col => col.id === activeTask.columnId);
        const targetColumn = newBoard.columns.find(col => col.id === overColumn.id);

        if (!sourceColumn || !targetColumn) return prev;

        // Remove task from source column
        sourceColumn.tasks = sourceColumn.tasks.filter(task => task.id !== activeId);
        
        // Add task to target column
        const updatedTask = { ...activeTask, columnId: overColumn.id, position: targetColumn.tasks.length };
        targetColumn.tasks.push(updatedTask);

        return newBoard;
      });
    }

    // If dragging over another task
    if (overTask && activeTask.id !== overTask.id) {
      setBoard((prev) => {
        if (!prev) return prev;

        const newBoard = { ...prev };
        const sourceColumn = newBoard.columns.find(col => col.id === activeTask.columnId);
        const targetColumn = newBoard.columns.find(col => col.id === overTask.columnId);

        if (!sourceColumn || !targetColumn) return prev;

        if (sourceColumn.id === targetColumn.id) {
          // Reordering within the same column
          const oldIndex = sourceColumn.tasks.findIndex(task => task.id === activeId);
          const newIndex = sourceColumn.tasks.findIndex(task => task.id === overId);
          
          sourceColumn.tasks = arrayMove(sourceColumn.tasks, oldIndex, newIndex);
          sourceColumn.tasks.forEach((task, index) => {
            task.position = index;
          });
        } else {
          // Moving between columns
          sourceColumn.tasks = sourceColumn.tasks.filter(task => task.id !== activeId);
          
          const updatedTask = { ...activeTask, columnId: targetColumn.id };
          const overIndex = targetColumn.tasks.findIndex(task => task.id === overId);
          targetColumn.tasks.splice(overIndex, 0, updatedTask);
          
          targetColumn.tasks.forEach((task, index) => {
            task.position = index;
          });
        }

        return newBoard;
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    setActiveColumn(null);
  };

  const findTask = (id: string): Task | undefined => {
    if (!board) return undefined;
    
    for (const column of board.columns) {
      const task = column.tasks.find(task => task.id === id);
      if (task) return task;
    }
    return undefined;
  };

  const findColumn = (id: string): Column | undefined => {
    if (!board) return undefined;
    return board.columns.find(column => column.id === id);
  };

  const addColumn = (name: string, color: string) => {
    if (!board) return;

    const newColumn: Column = {
      id: `column-${Date.now()}`,
      name,
      color,
      position: board.columns.length,
      boardId: board.id,
      tasks: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setBoard((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        columns: [...prev.columns, newColumn],
        updatedAt: new Date(),
      };
    });
  };

  const updateColumn = (columnId: string, updates: Partial<Column>) => {
    setBoard((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        columns: prev.columns.map(column =>
          column.id === columnId
            ? { ...column, ...updates, updatedAt: new Date() }
            : column
        ),
        updatedAt: new Date(),
      };
    });
  };

  const deleteColumn = (columnId: string) => {
    setBoard((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        columns: prev.columns.filter(column => column.id !== columnId),
        updatedAt: new Date(),
      };
    });
  };

  if (!board) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-2 text-gray-500">Loading board...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      {/* Board Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {board.name}
        </h1>
        {board.description && (
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            {board.description}
          </p>
        )}
      </div>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {board.columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              onUpdate={updateColumn}
              onDelete={deleteColumn}
            />
          ))}
          <AddColumnButton onAdd={addColumn} />
        </div>

        <DragOverlay>
          {activeTask && <TaskCard task={activeTask} isDragging />}
          {activeColumn && (
            <div className="w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white">
                {activeColumn.name}
              </h3>
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}