type StatisticItemProps = {
  value: string;
  label: string;
};

function StatisticItem({
  value,
  label,
}: StatisticItemProps) {
  return (
    <div className="flex flex-col items-center justify-center p-3 text-center">
      <p className="text-3xl sm:text-4xl font-bold tracking-tight text-heading tabular-nums">
        {value}
      </p>

      <p className="mt-1 text-xs sm:text-sm text-muted font-normal">
        {label}
      </p>
    </div>
  );
}

export default StatisticItem;