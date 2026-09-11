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
    <div className="flex min-h-[80vh] w-full items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg space-y-6 rounded-2xl border border-border/80 bg-surface p-6 sm:p-8 shadow-lg">
        {/* Title */}
        <div className="text-center space-y-1.5">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-surface-hover text-muted shadow-2xs">
            <FolderGit2 size={20} />
          </div>

          <p className="text-2xs font-semibold uppercase tracking-wider text-muted">
            Step 2 of 2
          </p>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-heading">
            Connect your GitHub Profile
          </h1>

          <p className="text-xs text-muted max-w-sm mx-auto">
            Welcome, <span className="font-semibold text-heading">{user?.name}</span>. Link your GitHub identity to activate your developer portfolio.
          </p>
        </div>

        {/* Primary Option: Quick Link via GitHub Username */}
        <div className="rounded-xl border border-border/80 bg-surface-hover/30 p-4 sm:p-5 space-y-3">
          <div className="flex items-center gap-2 font-semibold text-heading text-xs sm:text-sm">
            <Sparkles size={15} className="text-primary" />
            <span>Instant Access: Link GitHub Username</span>
          </div>

          <p className="text-2xs text-muted leading-relaxed">
            Link your public GitHub profile to instantly view your repositories, languages, commit frequency, and activity trends.
          </p>

          <form onSubmit={handleLinkUsername} className="space-y-2.5">
            <input
              type="text"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              placeholder="e.g. octocat, torvalds, gaearon"
              disabled={linking}
              className="w-full rounded-xl border border-border/80 bg-surface px-3 py-2.5 text-xs text-heading placeholder:text-muted focus:border-primary/50 focus:outline-hidden transition-colors"
            />

            {error && (
              <p className="text-xs text-red-500 font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={linking || !usernameInput.trim()}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-xs font-semibold text-white shadow-2xs hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
            >
              <span>{linking ? "Linking Profile..." : "Link Profile & Launch"}</span>
              <ArrowRight size={13} />
            </button>
          </form>
        </div>

        {/* Secondary Option: Connect via OAuth App */}
        <div className="rounded-xl border border-border/70 bg-surface p-4 space-y-2.5 text-xs text-muted">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-heading text-xs">OAuth App Authorization</span>
            <span className="rounded-full bg-surface-hover border border-border/70 px-2 py-0.5 text-2xs font-medium text-muted">
              Advanced
            </span>
          </div>

          <p className="text-2xs leading-relaxed">
            For authenticated private repository access, connect via registered OAuth App.
          </p>

          {oauthWarning && (
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-2.5 text-2xs text-amber-600 dark:text-amber-400">
              {oauthWarning}
            </div>
          )}

          <button
            type="button"
            onClick={handleConnectOAuth}
            disabled={oauthLoading}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-border/80 bg-surface py-2 text-xs font-medium text-heading hover:bg-surface-hover transition-colors disabled:opacity-50"
          >
            <FolderGit2 size={13} />
            {oauthLoading ? "Redirecting to GitHub..." : "Authorize with GitHub OAuth"}
          </button>
        </div>

        {/* Security Info */}
        <div className="rounded-xl border border-border/60 bg-surface-hover/20 p-3.5 text-2xs text-muted space-y-1.5">
          <div className="flex items-center gap-1.5 font-medium text-heading text-xs">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>Security & Privacy</span>
          </div>
          <div className="space-y-1 pl-4 text-2xs">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={11} className="text-emerald-500 shrink-0" />
              <span>Only public metadata accessed unless explicitly authorized</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={11} className="text-emerald-500 shrink-0" />
              <span>You can update or disconnect linked profiles at any time in Settings</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-border/60">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-xs font-medium text-muted hover:text-heading transition-colors"
          >
            Explore Public Repositories &rarr;
          </button>

          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-600 transition-colors"
          >
            <LogOut size={13} />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConnectGithubPage;
