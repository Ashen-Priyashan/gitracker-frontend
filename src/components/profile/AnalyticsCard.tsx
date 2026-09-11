import type { LucideIcon } from "lucide-react";

type AnalyticsCardProps = {
  icon: LucideIcon;
  label: string;
  value: string;
};

function AnalyticsCard({
  icon: Icon,
  label,
  value,
}: AnalyticsCardProps) {
  return (
    <article className="rounded-2xl border border-border/80 bg-surface p-5 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium text-muted uppercase tracking-wider">
          {label}
        </p>

        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-hover text-muted">
          <Icon size={15} strokeWidth={1.8} />
        </div>
      </div>

      <p className="mt-3 text-3xl font-bold tracking-tight text-heading tabular-nums">
        {value}
      </p>
    </article>
  );
}

export default AnalyticsCard;