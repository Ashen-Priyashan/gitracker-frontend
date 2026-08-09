import type { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <article className="group rounded-3xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
        <Icon size={24} />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-heading">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-body">
        {description}
      </p>
    </article>
  );
}

export default FeatureCard;