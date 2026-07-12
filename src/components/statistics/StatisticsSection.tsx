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
    <section className="mt-8 rounded-3xl border border-border bg-surface px-6 py-8 sm:px-8 sm:py-10">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Gitracker Analytics
        </p>

        <h2 className="mt-3 text-2xl font-bold tracking-tight text-heading sm:text-3xl">
          Powerful GitHub insights in one place
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-body">
          Explore profile information, repository statistics, language usage,
          and developer activity through a simple analytics experience.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
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