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
      <p className="text-3xl font-bold tracking-tight text-heading">
        {value}
      </p>

      <p className="mt-2 text-sm font-medium text-body">
        {label}
      </p>
    </div>
  );
}

export default StatisticItem;