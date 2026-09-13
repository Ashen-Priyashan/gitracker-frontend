import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowRight, Lock, Mail, ShieldAlert } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const user = await login({ email, password });
      if (!user.githubConnected) {
        navigate("/connect-github");
      } else {
        navigate("/");
      }
    } catch (err: unknown) {
      console.error("Login failed:", err);
      let msg = "Invalid email or password. Please try again.";
      if (axios.isAxiosError<{ message?: string; retryAfterSeconds?: number }>(err)) {
        if (err.response?.status === 429) {
          const retryHeader = err.response.headers?.["retry-after"];
          const retryBody = err.response.data?.retryAfterSeconds;
          const retrySeconds = retryHeader ? parseInt(retryHeader, 10) : retryBody;
          msg = retrySeconds && !isNaN(retrySeconds)
            ? `Too many login attempts. Please wait ${retrySeconds} seconds before trying again.`
            : "Too many login attempts. Please wait a few minutes before trying again.";
        } else if (err.response?.data?.message) {
          msg = err.response.data.message;
        }
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-sm space-y-6 rounded-2xl border border-border/80 bg-surface p-6 sm:p-8 shadow-lg">
        {/* Brand & Title */}
        <div className="text-center space-y-1.5">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-heading text-surface shadow-xs">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </div>

          <h1 className="text-xl font-bold tracking-tight text-heading">
            Welcome back
          </h1>

          <p className="text-xs text-muted">
            Log in to your GitTracker developer analytics account.
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-600 dark:text-red-400">
            <ShieldAlert size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-heading">
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={15} />

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@example.com"
                className="w-full rounded-xl border border-border/80 bg-surface-hover/40 py-2.5 pl-9 pr-3 text-xs text-heading placeholder:text-muted focus:bg-surface focus:border-primary/50 focus:outline-hidden transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-heading">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={15} />

              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-border/80 bg-surface-hover/40 py-2.5 pl-9 pr-3 text-xs text-heading placeholder:text-muted focus:bg-surface focus:border-primary/50 focus:outline-hidden transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-xs font-semibold text-white shadow-2xs hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
          >
            <span>{loading ? "Signing in..." : "Log In"}</span>
            <ArrowRight size={13} />
          </button>
        </form>

        <div className="text-center text-xs text-muted pt-1 border-t border-border/60">
          Don't have an account yet?{" "}
          <Link to="/signup" className="font-semibold text-primary hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
