import { useState, useRef, useEffect } from "react";
import { GitBranch, ChevronDown, Check, Search, Shield, AlertCircle, RefreshCw } from "lucide-react";
import type { Branch } from "../../types/repositoryActivity";
import Skeleton from "../loading/Skeleton";

type BranchSelectorProps = {
  branches: Branch[];
  selectedBranch: string;
  onSelectBranch: (branch: string) => void;
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
};

export default function BranchSelector({
  branches,
  selectedBranch,
  onSelectBranch,
  loading,
  error,
  onRetry,
}: BranchSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (loading) {
    return (
      <div className="flex items-center gap-2.5">
        <span className="text-xs font-medium text-muted">Branch:</span>
        <Skeleton className="h-9 w-36 rounded-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-xs text-red-500">
        <AlertCircle size={14} />
        <span>{error}</span>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="flex items-center gap-1 rounded-md border border-red-300 dark:border-red-900/60 bg-surface px-2 py-0.5 text-2xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          >
            <RefreshCw size={11} />
            Retry
          </button>
        )}
      </div>
    );
  }

  const filteredBranches = branches.filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase().trim()),
  );

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className="flex items-center gap-2.5">
        <label
          id="branch-selector-label"
          className="text-xs font-medium text-muted"
        >
          Branch:
        </label>

        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={`Branch: ${selectedBranch || "Select branch"}`}
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center gap-2 rounded-lg border border-border/80 bg-surface px-3 py-1.5 text-xs font-medium text-heading shadow-2xs hover:bg-surface-hover hover:border-border transition-colors duration-150 focus:outline-hidden focus:ring-2 focus:ring-primary/20"
        >
          <GitBranch size={13} className="text-muted shrink-0" />
          <span className="max-w-[160px] truncate font-mono text-xs font-medium">
            {selectedBranch || "Select branch"}
          </span>
          <ChevronDown
            size={13}
            className={`text-muted transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <div
          role="listbox"
          aria-labelledby="branch-selector-label"
          className="absolute right-0 sm:left-auto mt-2 z-30 w-72 rounded-xl border border-border/80 bg-surface p-1.5 shadow-xl transition-apple animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Search Header */}
          <div className="relative mb-1.5">
            <Search
              size={13}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find or filter branch..."
              className="w-full rounded-lg border border-border/70 bg-surface-hover/60 py-1.5 pl-8 pr-2.5 text-xs font-medium text-heading placeholder:text-muted focus:border-primary/50 focus:bg-surface focus:outline-hidden"
            />
          </div>

          {/* Branch List */}
          <div className="max-h-56 overflow-y-auto space-y-0.5">
            {filteredBranches.length === 0 ? (
              <p className="py-4 text-center text-xs text-muted">
                No branches found.
              </p>
            ) : (
              filteredBranches.map((branch) => {
                const isSelected = branch.name === selectedBranch;
                return (
                  <button
                    key={branch.name}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onSelectBranch(branch.name);
                      setIsOpen(false);
                      setSearchQuery("");
                    }}
                    className={`flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs font-mono transition-colors ${
                      isSelected
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-heading hover:bg-surface-hover"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <GitBranch size={12} className={isSelected ? "text-primary shrink-0" : "text-muted shrink-0"} />
                      <span className="truncate">{branch.name}</span>
                      {branch.isProtected && (
                        <span
                          title="Protected branch"
                          className="flex items-center text-amber-500 shrink-0"
                        >
                          <Shield size={11} />
                        </span>
                      )}
                    </div>

                    {isSelected && (
                      <Check size={13} className="shrink-0 text-primary" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
