import { useCallback, useEffect, useState } from "react";
import { CheckCircle2, FolderGit2, LogOut, ShieldAlert, ShieldCheck } from "lucide-react";
import type { GitHubConnectionStatus } from "../../services/githubAuthService";
import { githubAuthService } from "../../services/githubAuthService";

interface GitHubConnectionCardProps {
  onStatusChange?: (status: GitHubConnectionStatus) => void;
}

export function GitHubConnectionCard({ onStatusChange }: GitHubConnectionCardProps) {
  const [status, setStatus] = useState<GitHubConnectionStatus>({
    connected: false,
    username: null,
    avatarUrl: null,
    connectedAt: null,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      setLoading(true);
      const data = await githubAuthService.getConnectionStatus();
      setStatus(data);
      if (onStatusChange) onStatusChange(data);
    } catch (err) {
      console.error("Failed to fetch GitHub connection status:", err);
      setError("Unable to retrieve GitHub connection status.");
    } finally {
      setLoading(false);
    }
  }, [onStatusChange]);

  useEffect(() => {
    let isMounted = true;
    const loadStatus = async () => {
      try {
        const data = await githubAuthService.getConnectionStatus();
        if (isMounted) {
          setStatus(data);
          if (onStatusChange) onStatusChange(data);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Failed to fetch GitHub connection status:", err);
          setError("Unable to retrieve GitHub connection status.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadStatus();

    return () => {
      isMounted = false;
    };
  }, [onStatusChange]);

  const handleConnect = async () => {
    try {
      setActionLoading(true);
      setError(null);
      const data = await githubAuthService.getAuthorizationUrl();
      if (data && data.url) {
        window.location.href = data.url;
      } else {
        setError("Failed to generate authorization URL.");
      }
    } catch (err) {
      console.error("Failed to start GitHub authorization:", err);
      setError("Failed to start GitHub authorization. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      setActionLoading(true);
      setError(null);
      await githubAuthService.disconnectGitHub();
      await fetchStatus();
    } catch (err) {
      console.error("Failed to disconnect GitHub:", err);
      setError("Failed to disconnect GitHub account.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <section className="rounded-2xl border border-border/80 bg-surface p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-hover text-muted">
            <FolderGit2 size={18} />
          </div>

          <div>
            <h2 className="text-sm sm:text-base font-semibold tracking-tight text-heading">
              GitHub Account Connection
            </h2>

            <p className="text-2xs text-muted">
              Connect GitTracker to access authenticated repository insights
            </p>
          </div>
        </div>

        <div>
          {loading ? (
            <span className="inline-flex items-center rounded-full bg-surface-hover px-3 py-1 text-2xs font-medium text-muted">
              Checking status...
            </span>
          ) : status.connected ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-2xs font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <ShieldCheck size={13} />
              Connected
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-hover border border-border/80 px-3 py-1 text-2xs font-medium text-muted">
              <ShieldAlert size={13} />
              Not Connected
            </span>
          )}
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3.5 text-xs text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {status.connected ? (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-border/70 p-4 bg-surface-hover/30">
          <div className="flex items-center gap-3">
            {status.avatarUrl ? (
              <img
                src={status.avatarUrl}
                alt={status.username || "GitHub Avatar"}
                className="h-10 w-10 rounded-full border border-border/80 object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-hover text-muted font-bold text-xs">
                {status.username?.charAt(0).toUpperCase() || "G"}
              </div>
            )}

            <div>
              <p className="font-semibold text-heading text-sm">
                @{status.username}
              </p>

              <p className="text-2xs text-muted">
                Connected on {status.connectedAt ? new Date(status.connectedAt).toLocaleDateString() : "Active Session"}
              </p>
            </div>
          </div>

          <button
            onClick={handleDisconnect}
            disabled={actionLoading}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-500/30 bg-surface px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
          >
            <LogOut size={13} />
            {actionLoading ? "Disconnecting..." : "Disconnect"}
          </button>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-border/70 p-4 bg-surface-hover/20">
          <div className="text-xs text-body space-y-1.5">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-muted shrink-0" />
              <span>Secure server-side token encryption and management</span>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-muted shrink-0" />
              <span>Access authorized private repositories with granted permissions</span>
            </div>
          </div>

          <button
            onClick={handleConnect}
            disabled={actionLoading || loading}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-white shadow-2xs hover:opacity-95 transition-opacity disabled:opacity-50 shrink-0"
          >
            <FolderGit2 size={14} />
            {actionLoading ? "Connecting..." : "Connect GitHub"}
          </button>
        </div>
      )}
    </section>
  );
}

export default GitHubConnectionCard;
