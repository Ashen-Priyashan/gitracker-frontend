import SearchBar from "./SearchBar";
import PopularSearches from "./PopularSearches";

function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-10 py-16">
      <div className="relative z-10 max-w-3xl">
        <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
          GitHub Profile Analytics
        </span>

        <h1 className="mt-6 text-5xl font-bold tracking-tight text-slate-900">
          Analyze GitHub Profiles
          <span className="block text-blue-600">
            with Powerful Insights
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Search GitHub users, explore repositories, and discover developer
          analytics through one simple dashboard.
        </p>

        <div className="mt-8">
          <SearchBar />
          <PopularSearches />
        </div>
      </div>

      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />

      <div className="absolute -bottom-32 right-40 h-72 w-72 rounded-full bg-slate-100 blur-3xl" />
    </section>
  );
}

export default Hero;