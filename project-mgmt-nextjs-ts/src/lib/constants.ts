// Application constants

export const APP_NAME = 'Project Management';
export const APP_DESCRIPTION = 'Fast, Accessible, Offline-ready Project Management';
export const APP_VERSION = '1.0.0';

// Color palette
export const COLORS = {
  primary: '#0b5cff',
  secondary: '#0f1724',
  accent: '#00d1b2',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
} as const;

// Priority colors
export const PRIORITY_COLORS = {
  low: '#6b7280',
  medium: '#f59e0b',
  high: '#ef4444',
  urgent: '#dc2626',
} as const;

// Status colors
export const STATUS_COLORS = {
  todo: '#6b7280',
  'in-progress': '#3b82f6',
  review: '#8b5cf6',
  done: '#10b981',
} as const;

// Default project colors
export const PROJECT_COLORS = [
  '#0b5cff', // Blue
  '#10b981', // Green
  '#f59e0b', // Yellow
  '#ef4444', // Red
  '#8b5cf6', // Purple
  '#06b6d4', // Cyan
  '#84cc16', // Lime
  '#f97316', // Orange
  '#ec4899', // Pink
  '#6366f1', // Indigo
] as const;

// Breakpoints
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Animation durations
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  theme: 'pm-theme',
  user: 'pm-user',
  projects: 'pm-projects',
  boards: 'pm-boards',
  tasks: 'pm-tasks',
  settings: 'pm-settings',
  offlineActions: 'pm-offline-actions',
  searchCache: 'pm-search-cache',
} as const;

// API endpoints (for future backend integration)
export const API_ENDPOINTS = {
  projects: '/api/projects',
  boards: '/api/boards',
  tasks: '/api/tasks',
  users: '/api/users',
  auth: '/api/auth',
  search: '/api/search',
  analytics: '/api/analytics',
} as const;

// Pagination
export const PAGINATION = {
  defaultLimit: 20,
  maxLimit: 100,
} as const;

// Search
export const SEARCH = {
  debounceMs: 300,
  minQueryLength: 2,
  maxResults: 50,
  cacheExpiry: 5 * 60 * 1000, // 5 minutes
} as const;

// File upload
export const FILE_UPLOAD = {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
} as const;

// Accessibility
export const A11Y = {
  focusVisibleClass: 'focus-visible',
  reducedMotionClass: 'reduce-motion',
  highContrastClass: 'high-contrast',
} as const;

// PWA
export const PWA = {
  cacheName: 'pm-cache-v1',
  offlinePage: '/offline',
  installPromptEvent: 'beforeinstallprompt',
} as const;

// Keyboard shortcuts
export const KEYBOARD_SHORTCUTS = {
  search: 'ctrl+k',
  newTask: 'ctrl+n',
  newProject: 'ctrl+shift+n',
  toggleSidebar: 'ctrl+b',
  toggleTheme: 'ctrl+shift+t',
  save: 'ctrl+s',
  escape: 'escape',
} as const;

// Form validation
export const VALIDATION = {
  minPasswordLength: 8,
  maxNameLength: 100,
  maxDescriptionLength: 1000,
  maxTitleLength: 200,
} as const;

// Date formats
export const DATE_FORMATS = {
  short: 'MMM dd',
  medium: 'MMM dd, yyyy',
  long: 'EEEE, MMMM dd, yyyy',
  time: 'h:mm a',
  datetime: 'MMM dd, yyyy h:mm a',
} as const;

// Notification types
export const NOTIFICATION_TYPES = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
} as const;

// Drag and drop
export const DRAG_DROP = {
  taskType: 'task',
  columnType: 'column',
  boardType: 'board',
} as const;

// Analytics events
export const ANALYTICS_EVENTS = {
  projectCreated: 'project_created',
  taskCreated: 'task_created',
  taskCompleted: 'task_completed',
  boardViewed: 'board_viewed',
  searchPerformed: 'search_performed',
  themeChanged: 'theme_changed',
  pwaInstalled: 'pwa_installed',
} as const;

// Internationalization
export const I18N = {
  defaultLocale: 'en',
  supportedLocales: ['en', 'es', 'fr', 'de', 'ja', 'zh'],
} as const;

// Performance
export const PERFORMANCE = {
  virtualScrollThreshold: 100,
  debounceDelay: 300,
  throttleDelay: 100,
  maxRenderItems: 50,
} as const;

// Error messages
export const ERROR_MESSAGES = {
  networkError: 'Network error. Please check your connection.',
  serverError: 'Server error. Please try again later.',
  validationError: 'Please check your input and try again.',
  unauthorized: 'You are not authorized to perform this action.',
  notFound: 'The requested resource was not found.',
  offline: 'You are currently offline. Changes will be synced when you reconnect.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  projectCreated: 'Project created successfully',
  taskCreated: 'Task created successfully',
  taskUpdated: 'Task updated successfully',
  taskDeleted: 'Task deleted successfully',
  settingsSaved: 'Settings saved successfully',
  dataSynced: 'Data synced successfully',
} as const;