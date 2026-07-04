type StatisticItemProps = {
  value: string;
  label: string;
};

function StatisticItem({
  value,
  label,
}: StatisticItemProps) {
  return (
    <div className="text-center">
      <p className="text-3xl font-bold tracking-tight text-slate-900">
        {value}
      </p>

      <p className="mt-2 text-sm font-medium text-slate-500">
        {label}
      </p>
    </div>
  );
}

export default StatisticItem;