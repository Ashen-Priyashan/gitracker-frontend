import Skeleton from "./Skeleton";

function RepositoryCardSkeleton() {
  return (
    <article className="rounded-xl border border-border/70 bg-surface p-4 sm:p-5 shadow-2xs space-y-2.5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-44" />
          <Skeleton className="h-3.5 w-full max-w-xl" />
        </div>
        <Skeleton className="h-6 w-16 rounded-md" />
      </div>
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-24" />
      </div>
    </article>
  );
}

function RepositoryListLoading() {
  return (
    <div className="space-y-5 py-2" role="status" aria-live="polite" aria-busy="true" aria-label="Loading repositories">
      <div className="space-y-2">
        <Skeleton className="h-3.5 w-28" />
        <Skeleton className="h-7 w-64 max-w-full" />
        <Skeleton className="h-4 w-full max-w-lg" />
      </div>

      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
        <Skeleton className="h-9 flex-1 rounded-xl" />
        <Skeleton className="h-9 w-full sm:w-44 rounded-xl" />
      </div>

      <div className="grid gap-2.5 pt-1">
        {Array.from({ length: 4 }, (_, index) => (
          <RepositoryCardSkeleton key={index} />
        ))}
      </div>
      <span className="sr-only">Loading repositories</span>
    </div>
  );
}

export default RepositoryListLoading;
