import Skeleton from "./Skeleton";

function AnalyticsLoading() {
  return (
    <div className="space-y-6 py-2" role="status" aria-live="polite" aria-busy="true" aria-label="Loading analytics">
      <div className="space-y-2">
        <Skeleton className="h-3.5 w-24" />
        <Skeleton className="h-7 w-56 max-w-full" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="rounded-xl border border-border/70 bg-surface p-4 sm:p-5 shadow-2xs">
            <Skeleton className="h-3.5 w-20" />
            <Skeleton className="mt-2 h-7 w-20" />
            <Skeleton className="mt-1 h-3 w-28" />
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border/80 bg-surface p-5 sm:p-6 shadow-xs space-y-3">
        <Skeleton className="h-3.5 w-36" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="space-y-1.5">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-28" />
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading analytics</span>
    </div>
  );
}

export default AnalyticsLoading;
