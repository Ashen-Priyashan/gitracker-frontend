import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ContributorAnalytics from "./ContributorAnalytics";
import * as repositoryService from "../../services/repositoryService";
import type { Contributor } from "../../types/repositoryIntelligence";

const mockContributors: Contributor[] = [
  {
    login: "alice_dev",
    avatarUrl: "https://avatars.example.com/alice",
    htmlUrl: "https://github.com/alice_dev",
    contributions: 75,
    type: "User",
  },
  {
    login: "bob_dev",
    avatarUrl: "https://avatars.example.com/bob",
    htmlUrl: "https://github.com/bob_dev",
    contributions: 25,
    type: "User",
  },
];

describe("ContributorAnalytics Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders contributors list and rankings after loading", async () => {
    vi.spyOn(repositoryService, "getRepositoryContributors").mockResolvedValue(mockContributors);

    render(<ContributorAnalytics username="octocat" repositoryName="gitracker" />);

    await waitFor(() => {
      expect(screen.getByText("Contributor Analytics")).toBeInTheDocument();
    });

    expect(screen.getByText("100")).toBeInTheDocument(); // Total contributions (75 + 25)
    expect(screen.getAllByText("alice_dev").length).toBeGreaterThan(0);
    expect(screen.getByText("bob_dev")).toBeInTheDocument();
    expect(screen.getByText("#1")).toBeInTheDocument();
    expect(screen.getByText("#2")).toBeInTheDocument();
    expect(screen.getAllByText("75.0%").length).toBeGreaterThan(0); // Share
  });

  it("renders empty state when no contributors exist", async () => {
    vi.spyOn(repositoryService, "getRepositoryContributors").mockResolvedValue([]);

    render(<ContributorAnalytics username="octocat" repositoryName="empty-repo" />);

    await waitFor(() => {
      expect(screen.getByText("No Contributors Found")).toBeInTheDocument();
    });
  });

  it("renders error state and retries on button click", async () => {
    const spy = vi
      .spyOn(repositoryService, "getRepositoryContributors")
      .mockRejectedValueOnce(new Error("API Error"))
      .mockResolvedValueOnce(mockContributors);

    render(<ContributorAnalytics username="octocat" repositoryName="gitracker" />);

    await waitFor(() => {
      expect(screen.getByText("Failed to load repository contributors.")).toBeInTheDocument();
    });

    const retryBtn = screen.getByRole("button", { name: /retry/i });
    fireEvent.click(retryBtn);

    await waitFor(() => {
      expect(screen.getAllByText("alice_dev").length).toBeGreaterThan(0);
    });

    expect(spy).toHaveBeenCalledTimes(2);
  });
});
