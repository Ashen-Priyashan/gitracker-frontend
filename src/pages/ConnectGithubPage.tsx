import { useState } from "react";
import { CheckCircle2, FolderGit2, LogOut, ShieldCheck } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { githubAuthService } from "../services/githubAuthService";

export function ConnectGithubPage() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await githubAuthService.getAuthorizationUrl();
      if (data && data.url) {
        window.location.href = data.url;
      } else {
        setError("Failed to generate authorization URL.");
      }
    } catch (err) {
      console.error("Failed to initiate GitHub connection:", err);
      setError("Unable to start GitHub connection. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[85vh] w-full items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-xl space-y-8 rounded-3xl border border-border bg-surface p-8 shadow-xl">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
            <FolderGit2 size={32} />
          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-primary">
            Step 2 of 2
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            Connect your GitHub Account
          </h1>

          <p className="mt-3 text-base text-body">
            Welcome, <span className="font-semibold text-heading">{user?.name}</span>! One final step is required to unlock your Gitracker analytics dashboard.
          </p>
        </div>

        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-sm text-body space-y-3">
          <div className="flex items-center gap-2 font-semibold text-heading text-base">
            <ShieldCheck size={20} className="text-primary" />
            Why Gitracker needs GitHub access:
          </div>

          <p className="leading-relaxed">
            Gitracker uses your GitHub account to analyze your repositories, commits, languages, and developer activity. You can control which repositories Gitracker can access through GitHub permissions.
          </p>

          <div className="pt-2 space-y-2 text-xs font-medium">
            <div className="flex items-center gap-2 text-heading">
              <CheckCircle2 size={16} className="text-emerald-500" />
              Read-only metadata and repository code access
            </div>

            <div className="flex items-center gap-2 text-heading">
              <CheckCircle2 size={16} className="text-emerald-500" />
              Access granted private repositories securely
            </div>

            <div className="flex items-center gap-2 text-heading">
              <CheckCircle2 size={16} className="text-emerald-500" />
              Tokens remain strictly server-side
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500 text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleConnect}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-primary py-4 text-base font-bold text-white shadow-lg hover:opacity-95 transition-all disabled:opacity-50"
          >
            <FolderGit2 size={22} />
            {loading ? "Redirecting to GitHub..." : "Connect GitHub Account"}
          </button>

          <button
            onClick={logout}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border py-3 text-sm font-semibold text-body hover:bg-background transition-colors"
          >
            <LogOut size={16} />
            Log Out & Return Later
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConnectGithubPage;
