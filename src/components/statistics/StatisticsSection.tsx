import StatisticItem from "./StatisticItem";

const statistics = [
  {
    value: "Profile",
    label: "GitHub user insights",
  },
  {
    value: "Repository",
    label: "Repository analytics",
  },
  {
    value: "Language",
    label: "Technology breakdown",
  },
  {
    value: "Activity",
    label: "Developer metrics",
  },
];

function StatisticsSection() {
  return (
    <section className="mt-8 py-10 border-t border-border/60">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
          GitTracker Engine
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-heading">
          Engineering intelligence, clarified.
        </h2>

        <p className="text-sm sm:text-base text-body">
          Explore profile reputation, repository statistics, language usage,
          and developer activity through a disciplined analytics experience.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statistics.map((statistic) => (
          <StatisticItem
            key={statistic.value}
            value={statistic.value}
            label={statistic.label}
          />
        ))}
      </div>
    </section>
  );
}

export default StatisticsSection;