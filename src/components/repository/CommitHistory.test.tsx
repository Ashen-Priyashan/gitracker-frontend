import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CommitHistory from "./CommitHistory";
import type { CommitSummary } from "../../types/repositoryActivity";

const mockCommits: CommitSummary[] = [
  {
    sha: "1111111111111111111111111111111111111111",
    shortSha: "1111111",
    message: "chore: initial commit",
    authorName: "Alice",
    authorLogin: "alice",
    authorAvatarUrl: null,
    authoredAt: "2026-09-08T10:00:00Z",
    htmlUrl: "https://github.com/repo/commit/1",
  },
  {
    sha: "2222222222222222222222222222222222222222",
    shortSha: "2222222",
    message: "feat: add feature",
    authorName: "Bob",
    authorLogin: "bob",
    authorAvatarUrl: null,
    authoredAt: "2026-09-08T11:00:00Z",
    htmlUrl: "https://github.com/repo/commit/2",
  },
];

describe("CommitHistory Component", () => {
  it("renders loading skeletons when loading is true", () => {
    render(
      <CommitHistory
        commits={[]}
        loading={true}
        loadingMore={false}
        hasMore={false}
        error={null}
        onLoadMore={vi.fn()}
        onSelectCommit={vi.fn()}
        onRetry={vi.fn()}
      />,
    );

    expect(screen.getByRole("status", { name: "Loading commits" })).toBeInTheDocument();
  });

  it("renders empty state when commits list is empty", () => {
    render(
      <CommitHistory
        commits={[]}
        loading={false}
        loadingMore={false}
        hasMore={false}
        error={null}
        onLoadMore={vi.fn()}
        onSelectCommit={vi.fn()}
        onRetry={vi.fn()}
      />,
    );

    expect(screen.getByText("No commits found for this branch.")).toBeInTheDocument();
  });

  it("renders error state and handles retry", () => {
    const onRetry = vi.fn();
    render(
      <CommitHistory
        commits={[]}
        loading={false}
        loadingMore={false}
        hasMore={false}
        error="Failed to load commits"
        onLoadMore={vi.fn()}
        onSelectCommit={vi.fn()}
        onRetry={onRetry}
      />,
    );

    expect(screen.getByText("Failed to load commits")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("renders commits list and commit count badge", () => {
    render(
      <CommitHistory
        commits={mockCommits}
        loading={false}
        loadingMore={false}
        hasMore={false}
        error={null}
        onLoadMore={vi.fn()}
        onSelectCommit={vi.fn()}
        onRetry={vi.fn()}
      />,
    );

    expect(screen.getByText("chore: initial commit")).toBeInTheDocument();
    expect(screen.getByText("feat: add feature")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("renders 'Load more' button when hasMore is true and handles click", () => {
    const onLoadMore = vi.fn();
    render(
      <CommitHistory
        commits={mockCommits}
        loading={false}
        loadingMore={false}
        hasMore={true}
        error={null}
        onLoadMore={onLoadMore}
        onSelectCommit={vi.fn()}
        onRetry={vi.fn()}
      />,
    );

    const loadMoreBtn = screen.getByRole("button", { name: /load more commits/i });
    expect(loadMoreBtn).toBeInTheDocument();
    fireEvent.click(loadMoreBtn);
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it("displays loading spinner on button when loadingMore is true", () => {
    render(
      <CommitHistory
        commits={mockCommits}
        loading={false}
        loadingMore={true}
        hasMore={true}
        error={null}
        onLoadMore={vi.fn()}
        onSelectCommit={vi.fn()}
        onRetry={vi.fn()}
      />,
    );

    expect(screen.getByText("Loading more commits...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /loading more commits/i })).toBeDisabled();
  });
});
