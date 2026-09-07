import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BranchSelector from "./BranchSelector";
import type { Branch } from "../../types/repositoryActivity";

const mockBranches: Branch[] = [
  { name: "main", commitSha: "abc1234", isProtected: true },
  { name: "feature/login", commitSha: "def5678", isProtected: false },
  { name: "fix/navbar", commitSha: "ghi9012", isProtected: false },
];

describe("BranchSelector Component", () => {
  it("renders loading skeleton when loading is true", () => {
    render(
      <BranchSelector
        branches={[]}
        selectedBranch="main"
        onSelectBranch={vi.fn()}
        loading={true}
        error={null}
      />,
    );

    expect(screen.getByText("Branch:")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /main/i })).not.toBeInTheDocument();
  });

  it("renders error state and handles retry", () => {
    const onRetry = vi.fn();
    render(
      <BranchSelector
        branches={[]}
        selectedBranch="main"
        onSelectBranch={vi.fn()}
        loading={false}
        error="Failed to load branches"
        onRetry={onRetry}
      />,
    );

    expect(screen.getByText("Failed to load branches")).toBeInTheDocument();
    const retryBtn = screen.getByRole("button", { name: /retry/i });
    fireEvent.click(retryBtn);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("renders current selected branch and toggles dropdown on click", () => {
    render(
      <BranchSelector
        branches={mockBranches}
        selectedBranch="main"
        onSelectBranch={vi.fn()}
        loading={false}
        error={null}
      />,
    );

    const button = screen.getByRole("button", { name: /main/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-expanded", "false");

    // Click to open
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByPlaceholderText(/find or filter branch/i)).toBeInTheDocument();
    expect(screen.getByText("feature/login")).toBeInTheDocument();
    expect(screen.getByText("fix/navbar")).toBeInTheDocument();
  });

  it("filters branches by search query", () => {
    render(
      <BranchSelector
        branches={mockBranches}
        selectedBranch="main"
        onSelectBranch={vi.fn()}
        loading={false}
        error={null}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /main/i }));
    const searchInput = screen.getByPlaceholderText(/find or filter branch/i);

    fireEvent.change(searchInput, { target: { value: "login" } });
    expect(screen.getByText("feature/login")).toBeInTheDocument();
    expect(screen.queryByText("fix/navbar")).not.toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: "nonexistent" } });
    expect(screen.getByText("No branches found.")).toBeInTheDocument();
  });

  it("calls onSelectBranch and closes dropdown on selecting a branch", () => {
    const onSelectBranch = vi.fn();
    render(
      <BranchSelector
        branches={mockBranches}
        selectedBranch="main"
        onSelectBranch={onSelectBranch}
        loading={false}
        error={null}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /main/i }));
    const option = screen.getByText("feature/login");
    fireEvent.click(option);

    expect(onSelectBranch).toHaveBeenCalledWith("feature/login");
    expect(screen.queryByPlaceholderText(/find or filter branch/i)).not.toBeInTheDocument();
  });

  it("closes dropdown on Escape key", () => {
    render(
      <BranchSelector
        branches={mockBranches}
        selectedBranch="main"
        onSelectBranch={vi.fn()}
        loading={false}
        error={null}
      />,
    );

    const button = screen.getByRole("button", { name: /main/i });
    fireEvent.click(button);
    expect(screen.getByPlaceholderText(/find or filter branch/i)).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByPlaceholderText(/find or filter branch/i)).not.toBeInTheDocument();
  });
});
