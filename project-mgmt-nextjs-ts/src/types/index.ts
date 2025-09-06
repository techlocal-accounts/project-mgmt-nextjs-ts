// Core types for the Project Management app

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'member' | 'viewer';
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  status: 'active' | 'archived' | 'completed';
  ownerId: string;
  members: string[];
  createdAt: Date;
  updatedAt: Date;
  startDate?: Date;
  endDate?: Date;
}

export interface Board {
  id: string;
  name: string;
  description?: string;
  projectId: string;
  columns: Column[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Column {
  id: string;
  name: string;
  color: string;
  position: number;
  boardId: string;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  labels: Label[];
  assigneeId?: string;
  columnId: string;
  boardId: string;
  position: number;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  subtasks: Subtask[];
  attachments: Attachment[];
  comments: Comment[];
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  taskId: string;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Label {
  id: string;
  name: string;
  color: string;
  projectId: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  taskId: string;
  uploadedBy: string;
  createdAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  taskId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  type: 'milestone' | 'task' | 'event';
  projectId: string;
  taskId?: string;
  color: string;
  completed: boolean;
}

export interface SearchResult {
  id: string;
  type: 'project' | 'board' | 'task' | 'user';
  title: string;
  description?: string;
  url: string;
  metadata?: Record<string, any>;
}

export interface Theme {
  mode: 'light' | 'dark' | 'system';
  primary: string;
  secondary: string;
  accent: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export interface OfflineAction {
  id: string;
  type: 'create' | 'update' | 'delete';
  entity: string;
  entityId: string;
  data: any;
  timestamp: Date;
  synced: boolean;
}

// Drag and Drop types
export interface DragItem {
  id: string;
  type: 'task' | 'column';
  data: Task | Column;
}

// Form types
export interface CreateProjectForm {
  name: string;
  description?: string;
  color: string;
  startDate?: Date;
  endDate?: Date;
}

export interface CreateTaskForm {
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigneeId?: string;
  dueDate?: Date;
  labels: string[];
}

export interface CreateBoardForm {
  name: string;
  description?: string;
  projectId: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Analytics types
export interface ProjectAnalytics {
  projectId: string;
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  teamMembers: number;
  completionRate: number;
  averageTaskDuration: number;
  productivityScore: number;
}

export interface UserActivity {
  userId: string;
  date: Date;
  tasksCompleted: number;
  tasksCreated: number;
  commentsAdded: number;
  timeSpent: number;
}

// PWA types
export interface PWAInstallPrompt {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Accessibility types
export interface A11ySettings {
  highContrast: boolean;
  reducedMotion: boolean;
  fontSize: 'small' | 'medium' | 'large';
  screenReader: boolean;
}

// Internationalization types
export interface Locale {
  code: string;
  name: string;
  flag: string;
}

export interface Translation {
  [key: string]: string | Translation;
}