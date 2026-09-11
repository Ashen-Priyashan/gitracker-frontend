import SearchBar from "./SearchBar";
import PopularSearches from "./PopularSearches";

function Hero() {
  return (
    <section className="relative py-8 sm:py-14 lg:py-18">
      <div className="max-w-3xl space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1 text-xs font-medium text-body">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span>GitHub Developer Intelligence</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-heading leading-[1.08]">
          Explore any developer. <br />
          <span className="text-body font-normal">
            Understand their craft.
          </span>
        </h1>

        <p className="max-w-2xl text-base sm:text-lg text-body leading-relaxed font-normal">
          Deep telemetry across repositories, language distributions, commit frequencies,
          and contributor networks in one calm interface.
        </p>

        <div className="pt-2">
          <SearchBar />
          <PopularSearches />
        </div>
      </div>
    </section>
  );
}

export default Hero;