import { describe, it, expect, beforeEach } from 'vitest';
import { getStoredTheme, saveTheme, applyTheme } from './theme';

describe('theme utility', () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.theme;
  });

  it('should default to light theme if nothing stored', () => {
    expect(getStoredTheme()).toBe('light');
  });

  it('should return stored dark theme', () => {
    saveTheme('dark');
    expect(getStoredTheme()).toBe('dark');
  });

  it('should apply theme to document root dataset', () => {
    applyTheme('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');

    applyTheme('light');
    expect(document.documentElement.dataset.theme).toBe('light');
  });
});
