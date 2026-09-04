import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from './ThemeToggle';

describe('ThemeToggle component', () => {
  it('renders correctly and toggles theme on click', () => {
    render(<ThemeToggle />);
    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();

    const initialText = toggleButton.textContent;
    fireEvent.click(toggleButton);
    expect(toggleButton.textContent).not.toBe(initialText);
  });
});
