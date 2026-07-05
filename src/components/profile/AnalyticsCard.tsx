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
    <article className="rounded-3xl border border-slate-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {label}
          </p>

          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <Icon size={23} />
        </div>
      </div>
    </article>
  );
}

export default AnalyticsCard;