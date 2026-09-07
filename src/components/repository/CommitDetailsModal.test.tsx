import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CommitDetailsModal from "./CommitDetailsModal";
import type { CommitDetail } from "../../types/repositoryActivity";

const mockCommitDetail: CommitDetail = {
  sha: "a1b2c3d4e5f67890123456789abcdef012345678",
  shortSha: "a1b2c3d",
  message: "feat(core): major refactor\n\nDetailed multiline explanation of the change.",
  authorName: "Alice Wonderland",
  authorLogin: "alicew",
  authorAvatarUrl: "https://example.com/alice.jpg",
  authoredAt: "2026-09-08T12:00:00Z",
  committerName: "Bob Builder",
  committerLogin: "bobb",
  committerAvatarUrl: null,
  committedAt: "2026-09-08T12:05:00Z",
  htmlUrl: "https://github.com/org/repo/commit/a1b2c3d",
  additions: 15,
  deletions: 4,
  totalChanges: 19,
  changedFilesCount: 2,
  parents: [
    { sha: "parent1sha123456", htmlUrl: "https://github.com/org/repo/commit/parent1" },
  ],
  files: [
    {
      filename: "src/App.tsx",
      status: "modified",
      additions: 10,
      deletions: 2,
      changes: 12,
      patch: "@@ -1,5 +1,6 @@\n-import Old from './Old';\n+import New from './New';",
      rawUrl: "https://github.com/raw/App.tsx",
      blobUrl: "https://github.com/blob/App.tsx",
      previousFilename: null,
    },
    {
      filename: "src/new-feature.ts",
      status: "added",
      additions: 5,
      deletions: 2,
      changes: 7,
      patch: null,
      rawUrl: "https://github.com/raw/new-feature.ts",
      blobUrl: "https://github.com/blob/new-feature.ts",
      previousFilename: null,
    },
  ],
};

describe("CommitDetailsModal Component", () => {
  beforeEach(() => {
    // Mock clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  it("does not render when isOpen is false", () => {
    render(
      <CommitDetailsModal
        commit={mockCommitDetail}
        loading={false}
        error={null}
        isOpen={false}
        onClose={vi.fn()}
      />,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders loading state when loading is true", () => {
    render(
      <CommitDetailsModal
        commit={null}
        loading={true}
        error={null}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Loading commit details...")).toBeInTheDocument();
  });

  it("renders error state and handles retry", () => {
    const onRetry = vi.fn();
    render(
      <CommitDetailsModal
        commit={null}
        loading={false}
        error="Failed to load commit details."
        isOpen={true}
        onClose={vi.fn()}
        onRetry={onRetry}
      />,
    );

    expect(screen.getByText("Failed to load commit details.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("renders full commit metadata, author/committer, stats, and files", () => {
    render(
      <CommitDetailsModal
        commit={mockCommitDetail}
        loading={false}
        error={null}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );

    // Header & Message
    expect(screen.getByText(/feat\(core\): major refactor/)).toBeInTheDocument();
    expect(screen.getByText(/Detailed multiline explanation/)).toBeInTheDocument();
    expect(screen.getByText(mockCommitDetail.sha)).toBeInTheDocument();

    // Author & Committer
    expect(screen.getByText("Alice Wonderland")).toBeInTheDocument();
    expect(screen.getByText("@alicew")).toBeInTheDocument();
    expect(screen.getByText("Bob Builder")).toBeInTheDocument();
    expect(screen.getByText("@bobb")).toBeInTheDocument();

    // Stats
    expect(screen.getByText(/15 additions/)).toBeInTheDocument();
    expect(screen.getByText(/4 deletions/)).toBeInTheDocument();
    expect(screen.getByText(/2 files changed/)).toBeInTheDocument();

    // Parent
    expect(screen.getByText("parent1")).toBeInTheDocument();

    // Files
    expect(screen.getByText("src/App.tsx")).toBeInTheDocument();
    expect(screen.getByText("Modified")).toBeInTheDocument();
    expect(screen.getByText("src/new-feature.ts")).toBeInTheDocument();
    expect(screen.getByText("Added")).toBeInTheDocument();
    expect(screen.getByText("No patch available (binary/large)")).toBeInTheDocument();
  });

  it("copies full SHA to clipboard on button click", () => {
    render(
      <CommitDetailsModal
        commit={mockCommitDetail}
        loading={false}
        error={null}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );

    const copyBtn = screen.getByTitle("Copy full SHA");
    fireEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockCommitDetail.sha);
    expect(screen.getByText("Copied")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = vi.fn();
    render(
      <CommitDetailsModal
        commit={mockCommitDetail}
        loading={false}
        error={null}
        isOpen={true}
        onClose={onClose}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Close commit details" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose on Escape key press", () => {
    const onClose = vi.fn();
    render(
      <CommitDetailsModal
        commit={mockCommitDetail}
        loading={false}
        error={null}
        isOpen={true}
        onClose={onClose}
      />,
    );

    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
