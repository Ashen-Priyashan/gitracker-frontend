import { describe, it, expect, beforeEach } from 'vitest';
import {
  getRecentSearches,
  addRecentSearch,
  clearRecentSearches,
} from './recentSearches';

describe('recentSearches utility', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return empty array when no searches stored', () => {
    expect(getRecentSearches()).toEqual([]);
  });

  it('should add a search term', () => {
    addRecentSearch('octocat');
    expect(getRecentSearches()).toEqual(['octocat']);
  });

  it('should move existing search term to top and deduplicate case-insensitively', () => {
    addRecentSearch('octocat');
    addRecentSearch('torvalds');
    addRecentSearch('OCTOCAT');

    const searches = getRecentSearches();
    expect(searches).toEqual(['OCTOCAT', 'torvalds']);
    expect(searches.length).toBe(2);
  });

  it('should cap recent searches at maximum 10 items', () => {
    for (let i = 1; i <= 15; i++) {
      addRecentSearch(`user-${i}`);
    }

    const searches = getRecentSearches();
    expect(searches.length).toBe(10);
    expect(searches[0]).toBe('user-15');
    expect(searches[9]).toBe('user-6');
  });

  it('should clear stored searches', () => {
    addRecentSearch('octocat');
    clearRecentSearches();
    expect(getRecentSearches()).toEqual([]);
  });
});
