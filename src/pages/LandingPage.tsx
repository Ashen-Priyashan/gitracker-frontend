import { Link } from "react-router-dom";
import { ArrowRight, FolderGit2, ShieldCheck, Sparkles, UserPlus } from "lucide-react";
import FeatureCards from "../components/cards/FeatureCards";
import Hero from "../components/hero/Hero";
import StatisticsSection from "../components/statistics/StatisticsSection";
import { useAuth } from "../hooks/useAuth";

export function LandingPage() {
  const { user, githubConnected } = useAuth();

  if (user && githubConnected) {
    return (
      <div className="space-y-6">
        <Hero />
        <FeatureCards />
        <StatisticsSection />
      </div>
    );
  }

  return (
    <div className="space-y-10 py-4 sm:py-8">
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1 text-xs font-medium text-body">
          <Sparkles size={13} className="text-primary" />
          <span>Developer Analytics Platform</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-heading leading-[1.08]">
          Track, analyze, and elevate <br />
          <span className="text-body font-normal">your GitHub journey.</span>
        </h1>

        <p className="mx-auto max-w-2xl text-base sm:text-lg text-body leading-relaxed">
          GitTracker delivers deep telemetry into repository activity, language distributions,
          and commit velocity across public and private GitHub projects.
        </p>

        {/* Immediate Search Capsule for Guests */}
        <div className="pt-2 flex flex-col items-center">
          <SearchBar />
          <PopularSearches />
        </div>

        {/* Auth CTAs */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/signup"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-heading text-surface hover:opacity-90 dark:bg-white dark:text-black dark:hover:bg-white/90 px-6 py-3 text-sm font-semibold shadow-xs transition-all active:scale-[0.99]"
          >
            <UserPlus size={16} />
            Create Free Account
          </Link>

          <Link
            to="/login"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 text-sm font-semibold text-heading hover:bg-surface-hover hover:border-border transition-colors"
          >
            <span>Sign In</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Security / Privacy Trust Row */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-success" />
            <span>GitHub OAuth 2.0 Security</span>
          </div>

          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-success" />
            <span>Private Repository Telemetry</span>
          </div>

          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-success" />
            <span>Zero Credential Storage</span>
          </div>
        </div>
      </section>

      <FeatureCards />

      <StatisticsSection />
    </div>
  );
}

export default LandingPage;
