import { GitCommit, Users, TrendingUp } from "lucide-react";

export type RepositoryTab = "overview" | "contributors" | "activity";

type RepositoryIntelligenceNavProps = {
  activeTab: RepositoryTab;
  onSelectTab: (tab: RepositoryTab) => void;
};

export default function RepositoryIntelligenceNav({
  activeTab,
  onSelectTab,
}: RepositoryIntelligenceNavProps) {
  const tabs: { id: RepositoryTab; label: string; icon: React.ComponentType<{ size: number }> }[] = [
    { id: "overview", label: "Overview & Commits", icon: GitCommit },
    { id: "contributors", label: "Contributors", icon: Users },
    { id: "activity", label: "Commit Activity & Trends", icon: TrendingUp },
  ];

  return (
    <div className="flex items-center overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
      <div
        aria-label="Repository navigation"
        className="inline-flex items-center gap-1 rounded-xl border border-border/80 bg-surface-hover/70 p-1 text-xs sm:text-sm select-none"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              aria-selected={isActive}
              onClick={() => onSelectTab(tab.id)}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 font-medium transition-all duration-150 active:scale-[0.98] ${
                isActive
                  ? "bg-surface text-heading font-semibold shadow-xs border border-border/50"
                  : "text-body hover:text-heading hover:bg-surface/50"
              }`}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
