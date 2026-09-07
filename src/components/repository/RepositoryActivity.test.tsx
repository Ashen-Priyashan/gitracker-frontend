import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RepositoryActivity from "./RepositoryActivity";
import * as repositoryService from "../../services/repositoryService";
import type {
  Branch,
  CommitDetail,
  CommitSummary,
} from "../../types/repositoryActivity";

vi.mock("../../services/repositoryService");

const mockBranches: Branch[] = [
  { name: "main", commitSha: "1111111", isProtected: true },
  { name: "develop", commitSha: "2222222", isProtected: false },
];

const mockMainCommits: CommitSummary[] = [
  {
    sha: "commit1sha123456789",
    shortSha: "commit1",
    message: "feat: initial commit on main",
    authorName: "Alice",
    authorLogin: "alice",
    authorAvatarUrl: null,
    authoredAt: "2026-09-08T10:00:00Z",
    htmlUrl: "https://github.com/repo/commit/1",
  },
];

const mockDevelopCommits: CommitSummary[] = [
  {
    sha: "commit2sha123456789",
    shortSha: "commit2",
    message: "feat: work on develop branch",
    authorName: "Bob",
    authorLogin: "bob",
    authorAvatarUrl: null,
    authoredAt: "2026-09-08T11:00:00Z",
    htmlUrl: "https://github.com/repo/commit/2",
  },
];

const mockCommitDetail: CommitDetail = {
  sha: "commit1sha123456789",
  shortSha: "commit1",
  message: "feat: initial commit on main",
  authorName: "Alice",
  authorLogin: "alice",
  authorAvatarUrl: null,
  authoredAt: "2026-09-08T10:00:00Z",
  committerName: "Alice",
  committerLogin: "alice",
  committerAvatarUrl: null,
  committedAt: "2026-09-08T10:00:00Z",
  htmlUrl: "https://github.com/repo/commit/1",
  additions: 10,
  deletions: 2,
  totalChanges: 12,
  changedFilesCount: 1,
  parents: [],
  files: [
    {
      filename: "index.ts",
      status: "modified",
      additions: 10,
      deletions: 2,
      changes: 12,
      patch: "+console.log('hello');",
      rawUrl: "https://example.com",
      blobUrl: "https://example.com",
      previousFilename: null,
    },
  ],
};

describe("RepositoryActivity Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(repositoryService.getRepositoryBranches).mockResolvedValue(mockBranches);
    vi.mocked(repositoryService.getRepositoryCommits).mockResolvedValue(mockMainCommits);
    vi.mocked(repositoryService.getRepositoryCommitDetail).mockResolvedValue(mockCommitDetail);
  });

  it("fetches branches on mount and displays default branch and its commits", async () => {
    render(
      <RepositoryActivity
        username="octocat"
        repositoryName="Hello-World"
        defaultBranch="main"
      />,
    );

    expect(repositoryService.getRepositoryBranches).toHaveBeenCalledWith(
      "octocat",
      "Hello-World",
    );

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Branch: main" })).toBeInTheDocument();
      expect(screen.getByText("feat: initial commit on main")).toBeInTheDocument();
    });
  });

  it("switches branch, resets commit list, and loads new branch commits", async () => {
    vi.mocked(repositoryService.getRepositoryCommits).mockImplementation(
      async (_u, _r, branch) => {
        if (branch === "develop") {
          return mockDevelopCommits;
        }
        return mockMainCommits;
      },
    );

    render(
      <RepositoryActivity
        username="octocat"
        repositoryName="Hello-World"
        defaultBranch="main"
      />,
    );

    await waitFor(() => {
      expect(screen.getByText("feat: initial commit on main")).toBeInTheDocument();
    });

    // Open branch selector dropdown
    fireEvent.click(screen.getByRole("button", { name: "Branch: main" }));

    // Click develop branch option
    const devOption = screen.getByText("develop");
    fireEvent.click(devOption);

    await waitFor(() => {
      expect(repositoryService.getRepositoryCommits).toHaveBeenCalledWith(
        "octocat",
        "Hello-World",
        "develop",
        1,
        30,
      );
      expect(screen.getByText("feat: work on develop branch")).toBeInTheDocument();
      expect(screen.queryByText("feat: initial commit on main")).not.toBeInTheDocument();
    });
  });

  it("opens commit details modal when a commit item is clicked", async () => {
    render(
      <RepositoryActivity
        username="octocat"
        repositoryName="Hello-World"
        defaultBranch="main"
      />,
    );

    await waitFor(() => {
      expect(screen.getByText("feat: initial commit on main")).toBeInTheDocument();
    });

    // Click commit item
    fireEvent.click(screen.getByText("feat: initial commit on main"));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(repositoryService.getRepositoryCommitDetail).toHaveBeenCalledWith(
      "octocat",
      "Hello-World",
      "commit1sha123456789",
    );

    await waitFor(() => {
      expect(screen.getByText("Commit Details")).toBeInTheDocument();
      expect(screen.getByText("index.ts")).toBeInTheDocument();
    });
  });

  it("handles branch load failure and retries", async () => {
    vi.mocked(repositoryService.getRepositoryBranches).mockRejectedValueOnce(
      new Error("Network error"),
    );

    render(
      <RepositoryActivity
        username="octocat"
        repositoryName="Hello-World"
        defaultBranch="main"
      />,
    );

    await waitFor(() => {
      expect(screen.getByText("Failed to load branches.")).toBeInTheDocument();
    });

    vi.mocked(repositoryService.getRepositoryBranches).mockResolvedValueOnce(mockBranches);
    fireEvent.click(screen.getByRole("button", { name: /retry/i }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Branch: main" })).toBeInTheDocument();
    });
  });
});
