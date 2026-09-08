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
    <div className="flex flex-wrap items-center gap-2 border-b border-border/60 pb-3">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
              isActive
                ? "bg-primary text-white shadow-xs"
                : "bg-surface text-body hover:bg-surface-hover hover:text-heading border border-border/60"
            }`}
          >
            <Icon size={16} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
