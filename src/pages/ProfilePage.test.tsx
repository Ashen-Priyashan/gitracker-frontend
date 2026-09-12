import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios, { AxiosHeaders } from 'axios';
import ProfilePage from './ProfilePage';
import * as profileService from '../services/profileService';
import type { ProfileSummary } from '../types/profile';

vi.mock('../services/profileService');

const mockProfileSummary: ProfileSummary = {
  user: {
    username: 'octocat',
    name: 'The Octocat',
    bio: 'GitHub mascot',
    location: 'San Francisco',
    avatarUrl: 'https://avatars.githubusercontent.com/u/583231?v=4',
    followers: 100,
    following: 10,
    createdAt: '2024-01-01T00:00:00Z',
  },
  analytics: {
    id: 1,
    totalRepositories: 8,
    totalStars: 50,
    totalForks: 20,
    mostUsedLanguage: 'TypeScript',
    calculatedAt: '2024-01-01T00:00:00Z',
    githubUser: {
      id: 1,
      githubId: 583231,
      username: 'octocat',
      name: 'The Octocat',
      avatarUrl: 'https://avatars.githubusercontent.com/u/583231?v=4',
      bio: 'GitHub mascot',
      followers: 100,
      following: 10,
      publicRepos: 8,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
  },
  repositories: [
    {
      name: 'gitracker',
      description: 'GitHub analytics dashboard',
      stars: 50,
      forks: 20,
      watchers: 50,
      language: 'TypeScript',
      defaultBranch: 'main',
      openIssues: 2,
      licenseName: 'MIT',
      topics: ['github', 'analytics'],
      htmlUrl: 'https://github.com/octocat/gitracker',
      size: 1024,
      archived: false,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-02T00:00:00Z',
    },
  ],
};

function renderWithRouter(username = 'octocat') {
  return render(
    <MemoryRouter initialEntries={[`/profile/${username}`]}>
      <Routes>
        <Route path="/profile/:username" element={<ProfilePage />} />
      </Routes>
    </MemoryRouter>
  );
}

function createAxiosError(
  status: number,
  message: string,
  retryAfterSeconds?: number,
  resetTimeSeconds?: number
) {
  const error = new axios.AxiosError(
    `Request failed with status code ${status}`,
    'ERR_BAD_REQUEST',
    undefined,
    undefined,
    {
      data: {
        message,
        status,
        timestamp: new Date().toISOString(),
        ...(retryAfterSeconds !== undefined ? { retryAfterSeconds } : {}),
        ...(resetTimeSeconds !== undefined ? { resetTimeSeconds } : {}),
      },
      status,
      statusText: 'Error',
      headers: {},
      config: { headers: new AxiosHeaders() },
    }
  );
  return error;
}

describe('ProfilePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders profile summary when API succeeds', async () => {
    vi.mocked(profileService.getProfileSummary).mockResolvedValue(mockProfileSummary);

    renderWithRouter('octocat');

    await waitFor(() => {
      expect(screen.getByText('The Octocat')).toBeInTheDocument();
    });

    expect(screen.getByText('GitHub mascot')).toBeInTheDocument();
    expect(screen.getAllByText('TypeScript').length).toBeGreaterThan(0);
  });

  it('displays user-friendly message on 404 Not Found', async () => {
    vi.mocked(profileService.getProfileSummary).mockRejectedValue(
      createAxiosError(404, 'GitHub user not found')
    );

    renderWithRouter('unknown-user');

    await waitFor(() => {
      expect(screen.getByText('GitHub user not found')).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('displays user-friendly rate limit message on 429 Too Many Requests', async () => {
    vi.mocked(profileService.getProfileSummary).mockRejectedValue(
      createAxiosError(429, 'GitHub API rate limit exceeded. Please try again later.')
    );

    renderWithRouter('octocat');

    await waitFor(() => {
      expect(
        screen.getByText(/GitHub API rate limit exceeded/i)
      ).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('displays retry countdown when retryAfterSeconds is provided on 429 Too Many Requests', async () => {
    vi.mocked(profileService.getProfileSummary).mockRejectedValue(
      createAxiosError(429, 'GitHub API rate limit exceeded', 120)
    );

    renderWithRouter('octocat');

    await waitFor(() => {
      expect(
        screen.getByText(/Please try again in about 2 minutes \(120s\)/i)
      ).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('displays retry countdown using resetTimeSeconds when retryAfterSeconds is unavailable on 429 Too Many Requests', async () => {
    const futureResetTime = Math.floor(Date.now() / 1000) + 180;
    vi.mocked(profileService.getProfileSummary).mockRejectedValue(
      createAxiosError(429, 'GitHub API rate limit exceeded', undefined, futureResetTime)
    );

    renderWithRouter('octocat');

    await waitFor(() => {
      expect(
        screen.getByText(/Please try again in about 3 minutes/i)
      ).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('displays forbidden access message on 403 Forbidden', async () => {
    vi.mocked(profileService.getProfileSummary).mockRejectedValue(
      createAxiosError(403, 'GitHub access to this resource is currently unavailable.')
    );

    renderWithRouter('octocat');

    await waitFor(() => {
      expect(
        screen.getByText(/GitHub access to this resource is currently unavailable/i)
      ).toBeInTheDocument();
    });
  });

  it('displays service unavailable message on 503 Service Unavailable', async () => {
    vi.mocked(profileService.getProfileSummary).mockRejectedValue(
      createAxiosError(503, 'GitHub is temporarily unavailable. Please try again shortly.')
    );

    renderWithRouter('octocat');

    await waitFor(() => {
      expect(
        screen.getByText(/GitHub is temporarily unavailable/i)
      ).toBeInTheDocument();
    });
  });

  it('retries fetching profile when Try Again button is clicked', async () => {
    vi.mocked(profileService.getProfileSummary)
      .mockRejectedValueOnce(createAxiosError(429, 'Rate limit exceeded'))
      .mockResolvedValueOnce(mockProfileSummary);

    renderWithRouter('octocat');

    await waitFor(() => {
      expect(screen.getByText('Rate limit exceeded')).toBeInTheDocument();
    });

    const retryButton = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(retryButton);

    await waitFor(() => {
      expect(screen.getByText('The Octocat')).toBeInTheDocument();
    });

    expect(profileService.getProfileSummary).toHaveBeenCalledTimes(2);
  });
});
