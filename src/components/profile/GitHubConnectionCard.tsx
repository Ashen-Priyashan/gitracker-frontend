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
    <section className="rounded-3xl border border-border bg-surface p-6 sm:p-8 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FolderGit2 size={26} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-heading">
              GitHub Account Connection
            </h2>

            <p className="mt-1 text-sm text-body">
              Connect Gitracker to your GitHub account to access granted private data and repositories.
            </p>
          </div>
        </div>

        <div>
          {loading ? (
            <span className="inline-flex items-center rounded-full bg-border px-4 py-2 text-sm font-semibold text-body">
              Checking status...
            </span>
          ) : status.connected ? (
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-500">
              <ShieldCheck size={18} />
              Connected
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-500">
              <ShieldAlert size={18} />
              Not Connected
            </span>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500">
          {error}
        </div>
      )}

      {status.connected ? (
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-border p-5 bg-background/50">
          <div className="flex items-center gap-4">
            {status.avatarUrl ? (
              <img
                src={status.avatarUrl}
                alt={status.username || "GitHub Avatar"}
                className="h-12 w-12 rounded-full border border-border"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                {status.username?.charAt(0).toUpperCase() || "G"}
              </div>
            )}

            <div>
              <p className="font-semibold text-heading text-lg">
                @{status.username}
              </p>

              <p className="text-xs text-body">
                Connected on {status.connectedAt ? new Date(status.connectedAt).toLocaleDateString() : "Active Session"}
              </p>
            </div>
          </div>

          <button
            onClick={handleDisconnect}
            disabled={actionLoading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-500/20 transition-colors disabled:opacity-50"
          >
            <LogOut size={16} />
            {actionLoading ? "Disconnecting..." : "Disconnect GitHub"}
          </button>
        </div>
      ) : (
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-border p-5">
          <div className="text-sm text-body space-y-1">
            <div className="flex items-center gap-2 text-heading font-medium">
              <CheckCircle2 size={16} className="text-primary" />
              Secure, server-side token storage
            </div>

            <div className="flex items-center gap-2 text-heading font-medium">
              <CheckCircle2 size={16} className="text-primary" />
              Access authorized private repositories with your permission
            </div>
          </div>

          <button
            onClick={handleConnect}
            disabled={actionLoading || loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-md hover:opacity-95 transition-all disabled:opacity-50"
          >
            <FolderGit2 size={18} />
            {actionLoading ? "Connecting..." : "Connect GitHub"}
          </button>
        </div>
      )}
    </section>
  );
}

export default GitHubConnectionCard;
