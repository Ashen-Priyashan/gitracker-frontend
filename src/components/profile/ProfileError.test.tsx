import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfileError from './ProfileError';

describe('ProfileError component', () => {
  it('renders default error title and custom message', () => {
    render(<ProfileError message="User not found" />);

    expect(screen.getByText('Unable to analyze profile')).toBeInTheDocument();
    expect(screen.getByText('User not found')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /try again/i })).not.toBeInTheDocument();
  });

  it('renders custom title when provided', () => {
    render(<ProfileError title="Custom Error Title" message="Something went wrong" />);

    expect(screen.getByText('Custom Error Title')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders retry button and triggers onRetry callback when clicked', () => {
    const handleRetry = vi.fn();
    render(<ProfileError message="Rate limit exceeded" onRetry={handleRetry} />);

    const retryButton = screen.getByRole('button', { name: /try again/i });
    expect(retryButton).toBeInTheDocument();

    fireEvent.click(retryButton);
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });
});
