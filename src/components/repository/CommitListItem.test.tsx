import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CommitListItem from "./CommitListItem";
import type { CommitSummary } from "../../types/repositoryActivity";

const mockCommit: CommitSummary = {
  sha: "a1b2c3d4e5f67890123456789abcdef012345678",
  shortSha: "a1b2c3d",
  message: "feat(auth): add OAuth login support\n\nDetailed multiline description here.",
  authorName: "Jane Doe",
  authorLogin: "janedoe",
  authorAvatarUrl: "https://example.com/avatar.jpg",
  authoredAt: "2026-09-08T10:00:00Z",
  htmlUrl: "https://github.com/org/repo/commit/a1b2c3d4e5f6",
};

describe("CommitListItem Component", () => {
  it("renders first line of commit message, author name, and short sha", () => {
    const onSelect = vi.fn();
    render(<CommitListItem commit={mockCommit} onSelect={onSelect} />);

    expect(screen.getByText("feat(auth): add OAuth login support")).toBeInTheDocument();
    expect(screen.queryByText(/Detailed multiline/)).not.toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("a1b2c3d")).toBeInTheDocument();
  });

  it("renders author avatar image when available", () => {
    render(<CommitListItem commit={mockCommit} onSelect={vi.fn()} />);

    const img = screen.getByRole("img", { name: "Jane Doe" });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/avatar.jpg");
  });

  it("renders initials fallback when avatar URL is missing", () => {
    const commitWithoutAvatar: CommitSummary = {
      ...mockCommit,
      authorAvatarUrl: null,
      authorName: "John Smith",
    };

    render(<CommitListItem commit={commitWithoutAvatar} onSelect={vi.fn()} />);
    expect(screen.getByText("JO")).toBeInTheDocument();
  });

  it("calls onSelect with full SHA when clicked", () => {
    const onSelect = vi.fn();
    render(<CommitListItem commit={mockCommit} onSelect={onSelect} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(onSelect).toHaveBeenCalledWith("a1b2c3d4e5f67890123456789abcdef012345678");
  });
});
