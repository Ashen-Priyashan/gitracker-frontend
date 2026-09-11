import { useEffect, useState, useRef, useCallback } from "react";
import { GitBranch } from "lucide-react";
import type {
  Branch,
  CommitDetail,
  CommitSummary,
} from "../../types/repositoryActivity";
import {
  getRepositoryBranches,
  getRepositoryCommits,
  getRepositoryCommitDetail,
} from "../../services/repositoryService";
import BranchSelector from "./BranchSelector";
import CommitHistory from "./CommitHistory";
import CommitDetailsModal from "./CommitDetailsModal";

type RepositoryActivityProps = {
  username: string;
  repositoryName: string;
  defaultBranch?: string;
};

const PAGE_SIZE = 30;

export default function RepositoryActivity({
  username,
  repositoryName,
  defaultBranch,
}: RepositoryActivityProps) {
  // Branch State
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [loadingBranches, setLoadingBranches] = useState<boolean>(true);
  const [branchesError, setBranchesError] = useState<string | null>(null);

  // Commit List State
  const [commits, setCommits] = useState<CommitSummary[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loadingCommits, setLoadingCommits] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [commitsError, setCommitsError] = useState<string | null>(null);

  // Commit Detail Modal State
  const [selectedSha, setSelectedSha] = useState<string | null>(null);
  const [commitDetail, setCommitDetail] = useState<CommitDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Active branch ref to avoid race conditions
  const activeBranchRef = useRef<string>("");

  // 1. Fetch Branches
  const loadBranches = useCallback(async () => {
    try {
      setLoadingBranches(true);
      setBranchesError(null);
      const data = await getRepositoryBranches(username, repositoryName);
      setBranches(data);

      let initialBranch = defaultBranch || "";
      if (!initialBranch || !data.some((b) => b.name === initialBranch)) {
        initialBranch = data.length > 0 ? data[0].name : defaultBranch || "main";
      }

      setSelectedBranch(initialBranch);
      activeBranchRef.current = initialBranch;
    } catch {
      setBranchesError("Failed to load branches.");
    } finally {
      setLoadingBranches(false);
    }
  }, [username, repositoryName, defaultBranch]);

  useEffect(() => {
    let isMounted = true;

    async function fetchInitialBranches() {
      try {
        setLoadingBranches(true);
        setBranchesError(null);
        const data = await getRepositoryBranches(username, repositoryName);
        if (!isMounted) return;
        setBranches(data);

        let initialBranch = defaultBranch || "";
        if (!initialBranch || !data.some((b) => b.name === initialBranch)) {
          initialBranch = data.length > 0 ? data[0].name : defaultBranch || "main";
        }

        setSelectedBranch(initialBranch);
        activeBranchRef.current = initialBranch;
      } catch {
        if (isMounted) {
          setBranchesError("Failed to load branches.");
        }
      } finally {
        if (isMounted) {
          setLoadingBranches(false);
        }
      }
    }

    fetchInitialBranches();

    return () => {
      isMounted = false;
    };
  }, [username, repositoryName, defaultBranch]);

  // 2. Fetch Commits when selectedBranch changes
  useEffect(() => {
    if (!selectedBranch) return;

    let isMounted = true;
    activeBranchRef.current = selectedBranch;

    async function fetchInitialCommits() {
      try {
        setLoadingCommits(true);
        setCommitsError(null);
        const data = await getRepositoryCommits(
          username,
          repositoryName,
          selectedBranch,
          1,
          PAGE_SIZE,
        );
        if (!isMounted || activeBranchRef.current !== selectedBranch) return;

        setCommits(data);
        setPage(1);
        setHasMore(data.length === PAGE_SIZE);
      } catch {
        if (isMounted && activeBranchRef.current === selectedBranch) {
          setCommitsError("Failed to load commit history for this branch.");
        }
      } finally {
        if (isMounted && activeBranchRef.current === selectedBranch) {
          setLoadingCommits(false);
        }
      }
    }

    fetchInitialCommits();

    return () => {
      isMounted = false;
    };
  }, [username, repositoryName, selectedBranch]);

  // Handle branch switch
  const handleSelectBranch = (branch: string) => {
    if (branch === selectedBranch) return;
    setCommits([]);
    setSelectedBranch(branch);
  };

  // Handle Load More
  const handleLoadMore = async () => {
    if (loadingMore || !hasMore || !selectedBranch) return;

    const nextPage = page + 1;
    const currentBranch = selectedBranch;

    try {
      setLoadingMore(true);
      const data = await getRepositoryCommits(
        username,
        repositoryName,
        currentBranch,
        nextPage,
        PAGE_SIZE,
      );

      if (activeBranchRef.current !== currentBranch) return;

      setCommits((prev) => [...prev, ...data]);
      setPage(nextPage);
      setHasMore(data.length === PAGE_SIZE);
    } catch {
      if (activeBranchRef.current === currentBranch) {
        setCommitsError("Failed to load more commits.");
      }
    } finally {
      if (activeBranchRef.current === currentBranch) {
        setLoadingMore(false);
      }
    }
  };

  // 3. Fetch Commit Details
  const fetchCommitDetail = useCallback(
    async (sha: string) => {
      try {
        setLoadingDetail(true);
        setDetailError(null);
        const detail = await getRepositoryCommitDetail(
          username,
          repositoryName,
          sha,
        );
        setCommitDetail(detail);
      } catch {
        setDetailError("Failed to load commit details.");
      } finally {
        setLoadingDetail(false);
      }
    },
    [username, repositoryName],
  );

  const handleSelectCommit = (sha: string) => {
    setSelectedSha(sha);
    setCommitDetail(null);
    setIsModalOpen(true);
    fetchCommitDetail(sha);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSha(null);
    setCommitDetail(null);
    setDetailError(null);
  };

  const handleRetryCommits = () => {
    if (!selectedBranch) return;
    setLoadingCommits(true);
    setCommitsError(null);
    getRepositoryCommits(username, repositoryName, selectedBranch, 1, PAGE_SIZE)
      .then((data) => {
        if (activeBranchRef.current === selectedBranch) {
          setCommits(data);
          setPage(1);
          setHasMore(data.length === PAGE_SIZE);
        }
      })
      .catch(() => {
        if (activeBranchRef.current === selectedBranch) {
          setCommitsError("Failed to load commit history for this branch.");
        }
      })
      .finally(() => {
        if (activeBranchRef.current === selectedBranch) {
          setLoadingCommits(false);
        }
      });
  };

  return (
    <div className="rounded-2xl border border-border/80 bg-surface p-5 sm:p-6 space-y-5 shadow-xs">
      {/* Header with Title & Branch Selector */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-4">
        <div className="flex items-center gap-2.5">
          <GitBranch size={18} className="text-muted" />
          <div>
            <h3 className="text-sm font-semibold tracking-tight text-heading">
              Repository Activity
            </h3>
            <p className="text-2xs text-muted">
              Branch selector and commit history
            </p>
          </div>
        </div>

        {/* Branch Selector Dropdown */}
        <BranchSelector
          branches={branches}
          selectedBranch={selectedBranch}
          onSelectBranch={handleSelectBranch}
          loading={loadingBranches}
          error={branchesError}
          onRetry={loadBranches}
        />
      </div>

      {/* Commit History List */}
      <CommitHistory
        commits={commits}
        loading={loadingCommits}
        loadingMore={loadingMore}
        hasMore={hasMore}
        error={commitsError}
        onLoadMore={handleLoadMore}
        onSelectCommit={handleSelectCommit}
        onRetry={handleRetryCommits}
      />

      {/* Commit Detail Modal */}
      <CommitDetailsModal
        commit={commitDetail}
        loading={loadingDetail}
        error={detailError}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onRetry={() => selectedSha && fetchCommitDetail(selectedSha)}
      />
    </div>
  );
}
