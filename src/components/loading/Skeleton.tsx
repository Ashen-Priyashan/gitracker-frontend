type SkeletonProps = {
  className?: string;
};

function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-lg bg-heading/5 dark:bg-white/5 ${className}`}
    />
  );
}

export default Skeleton;
