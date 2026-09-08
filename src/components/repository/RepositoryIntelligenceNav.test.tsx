import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import RepositoryIntelligenceNav from "./RepositoryIntelligenceNav";

describe("RepositoryIntelligenceNav Component", () => {
  it("renders all tabs properly", () => {
    render(
      <RepositoryIntelligenceNav
        activeTab="overview"
        onSelectTab={vi.fn()}
      />
    );

    expect(screen.getByRole("button", { name: /Overview & Commits/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Contributors/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Commit Activity & Trends/i })).toBeInTheDocument();
  });

  it("calls onSelectTab with appropriate tab ID when clicked", () => {
    const onSelectTab = vi.fn();
    render(
      <RepositoryIntelligenceNav
        activeTab="overview"
        onSelectTab={onSelectTab}
      />
    );

    const contributorsTab = screen.getByRole("button", { name: /Contributors/i });
    fireEvent.click(contributorsTab);

    expect(onSelectTab).toHaveBeenCalledWith("contributors");
  });
});
