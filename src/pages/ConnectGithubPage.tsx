import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  FolderGit2,
  LogOut,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { githubAuthService } from "../services/githubAuthService";

export function ConnectGithubPage() {
  const { user, logout, linkGithub } = useAuth();
  const navigate = useNavigate();

  const [usernameInput, setUsernameInput] = useState("");
  const [linking, setLinking] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [oauthWarning, setOauthWarning] = useState<string | null>(null);

  const handleLinkUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUsername = usernameInput.trim().replace(/^@/, "");
    if (!cleanUsername) {
      setError("Please enter a valid GitHub username.");
      return;
    }

    try {
      setLinking(true);
      setError(null);
      await linkGithub(cleanUsername);
      navigate(`/profile/${encodeURIComponent(cleanUsername)}`);
    } catch (err: unknown) {
      console.error("Failed to link GitHub username:", err);
      const msg =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : undefined;
      setError(msg || "Failed to link GitHub username. Please try again.");
    } finally {
      setLinking(false);
    }
  };

  const handleConnectOAuth = async () => {
    try {
      setOauthLoading(true);
      setOauthWarning(null);
      const data = await githubAuthService.getAuthorizationUrl();
      if (data && data.url) {
        window.location.href = data.url;
      } else {
        setOauthWarning(
          "GitHub OAuth App is not configured on this environment. Enter your GitHub username above to access your profile immediately."
        );
      }
    } catch (err: unknown) {
      console.error("Failed to initiate GitHub OAuth:", err);
      const msg =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : undefined;
      setOauthWarning(
        msg ||
          "GitHub OAuth App is not configured on this environment. Enter your GitHub username above to access your profile immediately."
      );
    } finally {
      setOauthLoading(false);
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
            Connect your GitHub Profile
          </h1>

          <p className="mt-3 text-base text-body">
            Welcome, <span className="font-semibold text-heading">{user?.name}</span>! Connect your GitHub profile to unlock your Gitracker analytics dashboard.
          </p>
        </div>

        {/* Primary Option: Quick Link via GitHub Username */}
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 space-y-4">
          <div className="flex items-center gap-2 font-semibold text-heading text-base">
            <Sparkles size={18} className="text-primary" />
            <span>Instant Access: Link your GitHub Username</span>
          </div>

          <p className="text-xs text-body leading-relaxed">
            Link your public GitHub profile to instantly view your repositories, languages, commit frequency, and developer score.
          </p>

          <form onSubmit={handleLinkUsername} className="space-y-3">
            <div className="relative">
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="e.g. Ashen-Priyashan, octocat, torvalds"
                disabled={linking}
                className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-heading placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            {error && (
              <p className="text-xs text-red-500 font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={linking || !usernameInput.trim()}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white shadow-md hover:opacity-95 transition-all disabled:opacity-50"
            >
              <span>{linking ? "Linking Profile..." : "Link Profile & Launch Dashboard"}</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </div>

        {/* Secondary Option: Connect via OAuth App */}
        <div className="rounded-2xl border border-border bg-background/50 p-5 space-y-3 text-xs text-body">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-heading text-sm">OAuth App Connection</span>
            <span className="rounded-full bg-border/60 px-2.5 py-0.5 text-[10px] font-medium text-muted">
              Advanced
            </span>
          </div>

          <p className="leading-relaxed">
            If you have configured a registered GitHub OAuth App, you can connect for private repository access.
          </p>

          {oauthWarning && (
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-amber-600 dark:text-amber-400">
              {oauthWarning}
            </div>
          )}

          <button
            type="button"
            onClick={handleConnectOAuth}
            disabled={oauthLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface py-2.5 text-xs font-semibold text-heading hover:bg-background transition-all disabled:opacity-50"
          >
            <FolderGit2 size={16} />
            {oauthLoading ? "Redirecting to GitHub..." : "Authorize with GitHub OAuth"}
          </button>
        </div>

        {/* Security Info */}
        <div className="rounded-2xl border border-border/60 p-4 text-xs text-muted space-y-2">
          <div className="flex items-center gap-2 font-medium text-heading">
            <ShieldCheck size={16} className="text-emerald-500" />
            Security & Privacy
          </div>
          <div className="space-y-1.5 pl-6 text-[11px]">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={13} className="text-emerald-500" />
              <span>Only public metadata accessed unless explicitly authorized</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={13} className="text-emerald-500" />
              <span>You can update or disconnect your linked profile at any time in Settings</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-xs font-medium text-muted hover:text-heading transition-colors"
          >
            Explore Public Repositories First &rarr;
          </button>

          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-600 transition-colors"
          >
            <LogOut size={14} />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConnectGithubPage;
