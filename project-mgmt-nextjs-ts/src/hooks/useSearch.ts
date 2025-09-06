'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { debounce } from '@/lib/utils';
import { SearchResult } from '@/types';
import { SEARCH, STORAGE_KEYS } from '@/lib/constants';
import { getFromStorage, setToStorage } from '@/lib/utils';

interface SearchCache {
  [query: string]: {
    results: SearchResult[];
    timestamp: number;
  };
}

export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [cache, setCache] = useState<SearchCache>({});

  // Load cache from localStorage
  useEffect(() => {
    const storedCache = getFromStorage<SearchCache>(STORAGE_KEYS.searchCache, {});
    setCache(storedCache);
  }, []);

  // Save cache to localStorage
  useEffect(() => {
    setToStorage(STORAGE_KEYS.searchCache, cache);
  }, [cache]);

  // Clean expired cache entries
  useEffect(() => {
    const now = Date.now();
    const cleanedCache = Object.fromEntries(
      Object.entries(cache).filter(
        ([, data]) => now - data.timestamp < SEARCH.cacheExpiry
      )
    );
    
    if (Object.keys(cleanedCache).length !== Object.keys(cache).length) {
      setCache(cleanedCache);
    }
  }, [cache]);

  // Mock search function - replace with actual search logic
  const performSearch = useCallback(async (searchQuery: string): Promise<SearchResult[]> => {
    if (searchQuery.length < SEARCH.minQueryLength) {
      return [];
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));

    // Mock search results
    const mockResults: SearchResult[] = [
      {
        id: '1',
        type: 'project',
        title: `Project: ${searchQuery} Dashboard`,
        description: 'A comprehensive project management dashboard',
        url: `/projects/1`,
        metadata: { priority: 'high' },
      },
      {
        id: '2',
        type: 'task',
        title: `Task: Implement ${searchQuery} feature`,
        description: 'Add new functionality to the application',
        url: `/tasks/2`,
        metadata: { status: 'in-progress' },
      },
      {
        id: '3',
        type: 'board',
        title: `${searchQuery} Board`,
        description: 'Kanban board for project management',
        url: `/boards/3`,
        metadata: { taskCount: 15 },
      },
    ].filter(result => 
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return mockResults.slice(0, SEARCH.maxResults);
  }, []);

  // Debounced search function
  const debouncedSearch = useMemo(
    () => debounce(async (searchQuery: string) => {
      if (searchQuery.length < SEARCH.minQueryLength) {
        setResults([]);
        setIsSearching(false);
        return;
      }

      // Check cache first
      const cachedResult = cache[searchQuery];
      if (cachedResult && Date.now() - cachedResult.timestamp < SEARCH.cacheExpiry) {
        setResults(cachedResult.results);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      
      try {
        const searchResults = await performSearch(searchQuery);
        
        // Update cache
        setCache(prev => ({
          ...prev,
          [searchQuery]: {
            results: searchResults,
            timestamp: Date.now(),
          },
        }));
        
        setResults(searchResults);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, SEARCH.debounceMs),
    [cache, performSearch]
  );

  // Handle search query changes
  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
  }, []);

  const clearCache = useCallback(() => {
    setCache({});
    setToStorage(STORAGE_KEYS.searchCache, {});
  }, []);

  return {
    query,
    setQuery,
    results,
    isSearching,
    clearSearch,
    clearCache,
    hasResults: results.length > 0,
    cacheSize: Object.keys(cache).length,
  };
}