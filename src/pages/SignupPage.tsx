import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowRight, FolderGit2, Lock, Mail, ShieldAlert, User } from "lucide-react";
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
    <div className="flex min-h-[85vh] w-full items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-border bg-surface p-8 shadow-xl">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg">
            <FolderGit2 size={28} />
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-heading">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-body">
            Join Gitracker to analyze developer profiles and repository insights.
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500">
            <ShieldAlert size={20} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-heading">
              Full Name or Username
            </label>

            <div className="relative mt-2">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-body/60" size={18} />

              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ashen Priyashan"
                className="w-full rounded-2xl border border-border bg-background py-3.5 pl-11 pr-4 text-sm text-heading placeholder:text-body/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

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

          <div>
            <label className="block text-sm font-semibold text-heading">
              Confirm Password
            </label>

            <div className="relative mt-2">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-body/60" size={18} />

              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? "Creating account..." : "Sign Up"}
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="text-center text-sm text-body">
          Already have a Gitracker account?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
