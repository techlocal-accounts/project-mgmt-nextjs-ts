'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Bars3Icon, 
  MagnifyingGlassIcon, 
  BellIcon, 
  UserCircleIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from '@/hooks/useTheme';
import { useSearch } from '@/hooks/useSearch';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export function Header({ onMenuToggle, isMenuOpen }: HeaderProps) {
  const router = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { query, setQuery, results, isSearching, clearSearch } = useSearch();
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setShowSearchResults(false);
    }
  };

  const handleResultClick = (url: string) => {
    router.push(url);
    setShowSearchResults(false);
    clearSearch();
  };

  const themeOptions = [
    { value: 'light', label: 'Light', icon: SunIcon },
    { value: 'dark', label: 'Dark', icon: MoonIcon },
    { value: 'system', label: 'System', icon: ComputerDesktopIcon },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/80 dark:supports-[backdrop-filter]:bg-gray-900/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left side - Menu button and Logo */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
            aria-label="Toggle menu"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white"
          >
            <div className="h-8 w-8 rounded-lg bg-primary-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">PM</span>
            </div>
            <span className="hidden sm:block">Project Management</span>
          </Link>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md mx-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects, tasks, boards..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => setShowSearchResults(true)}
                className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              />
            </div>

            {/* Search Results Dropdown */}
            {showSearchResults && (query.length > 0 || results.length > 0) && (
              <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-96 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                {isSearching ? (
                  <div className="p-4 text-center text-gray-500">
                    <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-primary-500"></div>
                    <span className="ml-2">Searching...</span>
                  </div>
                ) : results.length > 0 ? (
                  <div className="py-2">
                    {results.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => handleResultClick(result.url)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="mt-1">
                            <div className={cn(
                              "h-2 w-2 rounded-full",
                              result.type === 'project' && "bg-blue-500",
                              result.type === 'task' && "bg-green-500",
                              result.type === 'board' && "bg-purple-500",
                              result.type === 'user' && "bg-orange-500"
                            )} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {result.title}
                            </p>
                            {result.description && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {result.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : query.length > 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No results found for "{query}"
                  </div>
                ) : null}
              </div>
            )}
          </form>
        </div>

        {/* Right side - Notifications, Theme, User */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <button className="relative rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white">
            <BellIcon className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>

          {/* Theme Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? (
                <MoonIcon className="h-6 w-6" />
              ) : (
                <SunIcon className="h-6 w-6" />
              )}
            </button>

            {showThemeMenu && (
              <div className="absolute right-0 top-full mt-1 w-32 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                {themeOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() => {
                        setTheme(option.value as 'light' | 'dark' | 'system');
                        setShowThemeMenu(false);
                      }}
                      className={cn(
                        "flex w-full items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700",
                        theme === option.value && "bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{option.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* User Menu */}
          <button className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white">
            <UserCircleIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showSearchResults || showThemeMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowSearchResults(false);
            setShowThemeMenu(false);
          }}
        />
      )}
    </header>
  );
}