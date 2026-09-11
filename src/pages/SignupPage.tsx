import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowRight, Lock, Mail, ShieldAlert, User } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export function SignupPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await signUp({ name, email, password, confirmPassword });
      navigate("/connect-github");
    } catch (err: unknown) {
      console.error("Sign up failed:", err);
      let msg = "Failed to create account. Please try again.";
      if (axios.isAxiosError<{ message?: string }>(err) && err.response?.data?.message) {
        msg = err.response.data.message;
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
            Create your account
          </h1>

          <p className="text-xs text-muted">
            Join GitTracker to explore repositories and developer telemetry.
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-600 dark:text-red-400">
            <ShieldAlert size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-heading">
              Full Name or Username
            </label>

            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={15} />

              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Mercer"
                className="w-full rounded-xl border border-border/80 bg-surface-hover/40 py-2.5 pl-9 pr-3 text-xs text-heading placeholder:text-muted focus:bg-surface focus:border-primary/50 focus:outline-hidden transition-colors"
              />
            </div>
          </div>

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

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-heading">
              Confirm Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={15} />

              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-border/80 bg-surface-hover/40 py-2.5 pl-9 pr-3 text-xs text-heading placeholder:text-muted focus:bg-surface focus:border-primary/50 focus:outline-hidden transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-xs font-semibold text-white shadow-2xs hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer pt-2"
          >
            <span>{loading ? "Creating account..." : "Sign Up"}</span>
            <ArrowRight size={13} />
          </button>
        </form>

        <div className="text-center text-xs text-muted pt-1 border-t border-border/60">
          Already have a GitTracker account?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
