import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import CommitActivityTrends from "./CommitActivityTrends";
import * as repositoryService from "../../services/repositoryService";
import type {
  CommitActivityResponse,
  CodeFrequencyResponse,
  ParticipationResponse,
} from "../../types/repositoryIntelligence";

const mockActivity: CommitActivityResponse = {
  status: "READY",
  totalYearCommits: 45,
  weeks: [
    { weekTimestamp: 1640000000, totalCommits: 15, days: [1, 2, 3, 4, 5, 0, 0] },
    { weekTimestamp: 1640604800, totalCommits: 30, days: [5, 5, 5, 5, 5, 5, 0] },
  ],
};

const mockCodeFreq: CodeFrequencyResponse = {
  status: "READY",
  weeklyStats: [
    { weekTimestamp: 1640000000, additions: 500, deletions: -100, netChange: 400 },
    { weekTimestamp: 1640604800, additions: 250, deletions: -50, netChange: 200 },
  ],
};

const mockParticipation: ParticipationResponse = {
  status: "READY",
  allCommits: [15, 30],
  ownerCommits: [10, 20],
};

describe("CommitActivityTrends Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders commit activity, code frequency stats, and participation breakdown", async () => {
    vi.spyOn(repositoryService, "getRepositoryCommitActivity").mockResolvedValue(mockActivity);
    vi.spyOn(repositoryService, "getRepositoryCodeFrequency").mockResolvedValue(mockCodeFreq);
    vi.spyOn(repositoryService, "getRepositoryParticipation").mockResolvedValue(mockParticipation);

    render(<CommitActivityTrends username="octocat" repositoryName="gitracker" />);

    await waitFor(() => {
      expect(screen.getByText("Commit Activity (Past 52 Weeks)")).toBeInTheDocument();
    });

    // Total Additions (+750)
    expect(screen.getByText("+750")).toBeInTheDocument();
    // Total Deletions (-150)
    expect(screen.getByText("-150")).toBeInTheDocument();
    // Net Code Change (+600)
    expect(screen.getByText("+600")).toBeInTheDocument();
    // Annual commits (45)
    expect(screen.getByText("45")).toBeInTheDocument();
    // Peak week & owner commits (30)
    expect(screen.getAllByText("30").length).toBeGreaterThan(0);
    // Owner share (30/45 = 66.7%)
    expect(screen.getByText(/Owner Share: 66.7%/i)).toBeInTheDocument();
  });

  it("renders calculating banner when status is CALCULATING", async () => {
    vi.spyOn(repositoryService, "getRepositoryCommitActivity").mockResolvedValue({
      status: "CALCULATING",
      totalYearCommits: 0,
      weeks: [],
    });
    vi.spyOn(repositoryService, "getRepositoryCodeFrequency").mockResolvedValue({
      status: "CALCULATING",
      weeklyStats: [],
    });
    vi.spyOn(repositoryService, "getRepositoryParticipation").mockResolvedValue({
      status: "CALCULATING",
      allCommits: [],
      ownerCommits: [],
    });

    render(<CommitActivityTrends username="octocat" repositoryName="gitracker" />);

    await waitFor(() => {
      expect(screen.getByText("Statistics Calculating")).toBeInTheDocument();
    });
    expect(
      screen.getByText(/GitHub is currently calculating activity statistics for this repository/i)
    ).toBeInTheDocument();
  });

  it("handles error state and retries fetching data", async () => {
    const actSpy = vi
      .spyOn(repositoryService, "getRepositoryCommitActivity")
      .mockRejectedValueOnce(new Error("API Error"))
      .mockResolvedValueOnce(mockActivity);

    vi.spyOn(repositoryService, "getRepositoryCodeFrequency").mockResolvedValue(mockCodeFreq);
    vi.spyOn(repositoryService, "getRepositoryParticipation").mockResolvedValue(mockParticipation);

    render(<CommitActivityTrends username="octocat" repositoryName="gitracker" />);

    await waitFor(() => {
      expect(screen.getByText("Failed to load commit activity and trends.")).toBeInTheDocument();
    });

    const retryBtn = screen.getByRole("button", { name: /retry/i });
    fireEvent.click(retryBtn);

    await waitFor(() => {
      expect(screen.getByText("Commit Activity (Past 52 Weeks)")).toBeInTheDocument();
    });

    expect(actSpy).toHaveBeenCalledTimes(2);
  });
});
