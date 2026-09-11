import Skeleton from "./Skeleton";

function RepositoryDetailsLoading() {
  return (
    <div className="space-y-6 py-2" role="status" aria-live="polite" aria-busy="true" aria-label="Loading repository details">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-7 w-64 max-w-full" />
        <Skeleton className="h-4 w-full max-w-lg" />
      </div>

      <section className="space-y-6">
        {/* Header Workspace Card Skeleton */}
        <div className="rounded-2xl border border-border/80 bg-surface p-6 sm:p-7 shadow-xs">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1 space-y-2.5 max-w-2xl">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="flex gap-2 shrink-0">
              <Skeleton className="h-8 w-20 rounded-lg" />
              <Skeleton className="h-8 w-24 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="rounded-xl border border-border/70 bg-surface p-4 sm:p-5 shadow-2xs">
              <Skeleton className="h-3.5 w-16" />
              <Skeleton className="mt-2 h-7 w-20" />
            </div>
          ))}
        </div>

        {/* Specs Box Skeleton */}
        <div className="rounded-2xl border border-border/70 bg-surface p-5 sm:p-6 shadow-2xs space-y-3">
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
      </section>
      <span className="sr-only">Loading repository details</span>
    </div>
  );
}

export default RepositoryDetailsLoading;
