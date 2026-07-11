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
    <article className="rounded-3xl border border-border bg-surface p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-body">
            {label}
          </p>

          <p className="mt-3 text-3xl font-bold tracking-tight text-heading">
            {value}
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon size={23} />
        </div>
      </div>
    </article>
  );
}

export default AnalyticsCard;