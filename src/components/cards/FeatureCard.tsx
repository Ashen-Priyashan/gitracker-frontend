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
    <article className="group rounded-2xl border border-border/80 bg-surface p-6 transition-colors duration-150 hover:bg-surface-hover/80">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-hover text-heading border border-border/60">
        <Icon size={20} strokeWidth={1.8} />
      </div>

      <h3 className="mt-4 text-base font-semibold text-heading tracking-tight">
        {title}
      </h3>

      <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-body">
        {description}
      </p>
    </article>
  );
}

export default FeatureCard;