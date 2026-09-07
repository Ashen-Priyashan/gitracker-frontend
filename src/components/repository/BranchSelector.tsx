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
      // Auto focus search input when opened
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
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-body">Branch:</span>
        <Skeleton className="h-10 w-44 rounded-xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 text-sm text-red-500">
        <AlertCircle size={16} />
        <span>{error}</span>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="flex items-center gap-1 rounded-lg border border-red-300 px-2.5 py-1 text-xs font-semibold hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/30 transition-colors"
          >
            <RefreshCw size={12} />
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
      <div className="flex items-center gap-3">
        <label
          id="branch-selector-label"
          className="text-sm font-semibold text-body"
        >
          Branch:
        </label>

        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={`Branch: ${selectedBranch || "Select branch"}`}
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-semibold text-heading shadow-xs hover:border-primary/50 hover:bg-surface-hover focus:outline-hidden focus:ring-2 focus:ring-primary transition-all"
        >
          <GitBranch size={16} className="text-primary shrink-0" />
          <span className="max-w-[200px] truncate font-mono text-xs sm:text-sm">
            {selectedBranch || "Select branch"}
          </span>
          <ChevronDown
            size={16}
            className={`text-body transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <div
          role="listbox"
          aria-labelledby="branch-selector-label"
          className="absolute left-0 mt-2 z-30 w-72 sm:w-80 rounded-2xl border border-border bg-surface p-2 shadow-xl animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Search Header */}
          <div className="relative mb-2">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-body"
            />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find or filter branch..."
              className="w-full rounded-xl border border-border bg-background py-2 pl-9 pr-3 text-xs font-medium text-heading placeholder-body focus:border-primary focus:outline-hidden"
            />
          </div>

          {/* Branch List */}
          <div className="max-h-60 overflow-y-auto space-y-1">
            {filteredBranches.length === 0 ? (
              <p className="p-3 text-center text-xs text-body">
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
                    className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-xs font-mono transition-colors ${
                      isSelected
                        ? "bg-primary/10 text-primary font-bold"
                        : "text-heading hover:bg-surface-hover"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <GitBranch size={13} className="shrink-0 text-primary" />
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
                      <Check size={14} className="shrink-0 text-primary" />
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
