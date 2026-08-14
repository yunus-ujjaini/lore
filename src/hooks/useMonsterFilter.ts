import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Monster } from '../validation/schema';
import type { Category } from '../../content/categories';
import type { FilterState } from '../types/ui';

const STORAGE_KEY = 'bestiary-filters';

function loadFilterState(): FilterState {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Ignore parse errors
  }
  return { search: '', category: null, threatLevel: null };
}

function saveFilterState(state: FilterState): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage errors
  }
}

export function useMonsterFilter(monsters: Record<string, Monster>) {
  const [filterState, setFilterState] = useState<FilterState>(loadFilterState);

  // Persist to sessionStorage on change
  useEffect(() => {
    saveFilterState(filterState);
  }, [filterState]);

  // Debounced search
  const [searchInput, setSearchInput] = useState(filterState.search);
  const [debouncedSearch, setDebouncedSearch] = useState(filterState.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Update filter state when debounced search changes
  useEffect(() => {
    setFilterState(prev => ({ ...prev, search: debouncedSearch }));
  }, [debouncedSearch]);

  // Filter logic
  const filteredMonsters = useMemo(() => {
    const monsterArray = Object.values(monsters);

    return monsterArray.filter(monster => {
      // Search filter (case-insensitive partial match)
      if (filterState.search) {
        const searchTerm = filterState.search.toLowerCase().trim();
        if (!monster.name.toLowerCase().includes(searchTerm)) {
          return false;
        }
      }

      // Category filter
      if (filterState.category) {
        if (monster.category !== filterState.category) {
          return false;
        }
      }

      // Threat level filter (exact match)
      if (filterState.threatLevel !== null) {
        if (monster.threatLevel !== filterState.threatLevel) {
          return false;
        }
      }

      return true;
    });
  }, [monsters, filterState]);

  // Actions
  const setSearch = useCallback((value: string) => {
    setSearchInput(value);
  }, []);

  const setCategory = useCallback((category: Category | null) => {
    setFilterState(prev => ({ ...prev, category }));
  }, []);

  const setThreatLevel = useCallback((level: number | null) => {
    setFilterState(prev => ({ ...prev, threatLevel: level }));
  }, []);

  const resetFilters = useCallback(() => {
    const emptyState: FilterState = { search: '', category: null, threatLevel: null };
    setSearchInput('');
    setDebouncedSearch('');
    setFilterState(emptyState);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchInput('');
    setDebouncedSearch('');
  }, []);

  return {
    filterState: { ...filterState, search: debouncedSearch },
    filteredMonsters,
    searchInput,
    setSearch,
    setCategory,
    setThreatLevel,
    resetFilters,
    clearSearch,
  };
}
