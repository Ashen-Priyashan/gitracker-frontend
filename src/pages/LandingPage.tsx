import { Link } from "react-router-dom";
import { ArrowRight, FolderGit2, ShieldCheck, Sparkles, UserPlus } from "lucide-react";
import FeatureCards from "../components/cards/FeatureCards";
import Hero from "../components/hero/Hero";
import StatisticsSection from "../components/statistics/StatisticsSection";
import { useAuth } from "../context/AuthContext";

export function LandingPage() {
  const { user, githubConnected } = useAuth();

  if (user && githubConnected) {
    return (
      <div className="space-y-8">
        <Hero />
        <FeatureCards />
        <StatisticsSection />
      </div>
    );
  }

  return (
    <div className="space-y-12 py-6">
      <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-surface via-surface to-background p-8 sm:p-12 text-center shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-lg">
          <FolderGit2 size={32} />
        </div>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
          <Sparkles size={14} />
          GitHub Analytics & Insights Platform
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-heading sm:text-5xl">
          Track, Analyze & Elevate Your <br className="hidden sm:inline" />
          <span className="text-primary">GitHub Profile & Repositories</span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base text-body sm:text-lg">
          Gitracker provides deep insights into repository activity, programming language distributions, and commit trends across your public and private GitHub projects.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/signup"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-base font-bold text-white shadow-lg hover:opacity-95 transition-all"
          >
            <UserPlus size={20} />
            Create Free Account
          </Link>

          <Link
            to="/login"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-border bg-surface px-8 py-4 text-base font-bold text-heading hover:bg-background transition-colors"
          >
            Log In
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-body font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-500" />
            Mandatory GitHub Authorization Control
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-500" />
            Private Repository Insights (Granted Permissions)
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-500" />
            Zero Credentials Exposed to Frontend
          </div>
        </div>
      </section>

      <FeatureCards />
    </div>
  );
}

export default LandingPage;
