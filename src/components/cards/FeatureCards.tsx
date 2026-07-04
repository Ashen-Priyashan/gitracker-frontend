import {
  BarChart3,
  FolderGit2,
  Lightbulb,
  UserRound,
} from "lucide-react";

import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: UserRound,
    title: "User Profiles",
    description:
      "Explore GitHub profiles, follower statistics, and developer information.",
  },
  {
    icon: FolderGit2,
    title: "Repositories",
    description:
      "Discover repositories, stars, forks, languages, and recent activity.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Understand developer activity through clear repository analytics.",
  },
  {
    icon: Lightbulb,
    title: "Developer Insights",
    description:
      "Discover meaningful insights from GitHub profile and repository data.",
  },
];

function FeatureCards() {
  return (
    <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {features.map((feature) => (
        <FeatureCard
          key={feature.title}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </section>
  );
}

export default FeatureCards;