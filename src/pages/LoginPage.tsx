import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowRight, FolderGit2, Lock, Mail, ShieldAlert } from "lucide-react";
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
      if (axios.isAxiosError<{ message?: string }>(err) && err.response?.data?.message) {
        msg = err.response.data.message;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[85vh] w-full items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-border bg-surface p-8 shadow-xl">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg">
            <FolderGit2 size={28} />
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-heading">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-body">
            Log in to your Gitracker account to access your developer analytics.
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500">
            <ShieldAlert size={20} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-heading">
              Email Address
            </label>

            <div className="relative mt-2">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-body/60" size={18} />

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ashen@example.com"
                className="w-full rounded-2xl border border-border bg-background py-3.5 pl-11 pr-4 text-sm text-heading placeholder:text-body/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-heading">
              Password
            </label>

            <div className="relative mt-2">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-body/60" size={18} />

              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl border border-border bg-background py-3.5 pl-11 pr-4 text-sm text-heading placeholder:text-body/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-bold text-white shadow-md hover:opacity-95 transition-all disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="text-center text-sm text-body">
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
