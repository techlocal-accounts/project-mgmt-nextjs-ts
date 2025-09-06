import { render, screen } from '@testing-library/react';
import { KanbanBoard } from '@/components/Kanban/KanbanBoard';

// Mock the useLocalStorage hook
jest.mock('@/hooks/useLocalStorage', () => ({
  useLocalStorage: jest.fn(() => [null, jest.fn()]),
}));

describe('KanbanBoard', () => {
  it('renders loading state when board is null', () => {
    render(<KanbanBoard boardId="test-board" />);
    
    expect(screen.getByText('Loading board...')).toBeInTheDocument();
  });

  it('renders board with demo data', () => {
    const mockBoard = {
      id: 'test-board',
      name: 'Test Board',
      description: 'A test board',
      projectId: 'test-project',
      columns: [
        {
          id: 'todo',
          name: 'To Do',
          color: '#6b7280',
          position: 0,
          boardId: 'test-board',
          tasks: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const { useLocalStorage } = require('@/hooks/useLocalStorage');
    useLocalStorage.mockReturnValue([mockBoard, jest.fn()]);

    render(<KanbanBoard boardId="test-board" />);
    
    expect(screen.getByText('Test Board')).toBeInTheDocument();
    expect(screen.getByText('A test board')).toBeInTheDocument();
    expect(screen.getByText('To Do')).toBeInTheDocument();
  });
});