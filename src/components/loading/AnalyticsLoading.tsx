import Skeleton from "./Skeleton";

function AnalyticsLoading() {
  return (
    <div className="space-y-6" role="status" aria-live="polite" aria-busy="true" aria-label="Loading analytics">
      <div className="space-y-3">
        <Skeleton className="h-4 w-44" />
        <Skeleton className="h-9 w-72 max-w-full" />
        <Skeleton className="h-5 w-full max-w-2xl" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="rounded-3xl border border-border bg-surface p-6">
            <Skeleton className="h-12 w-12 rounded-2xl" />
            <Skeleton className="mt-5 h-4 w-28" />
            <Skeleton className="mt-3 h-9 w-20" />
          </div>
        ))}
      </div>
      <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="mt-3 h-8 w-72 max-w-full" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
      </div>
      <span className="sr-only">Loading analytics</span>
    </div>
  );
}

export default AnalyticsLoading;
