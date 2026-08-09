import Skeleton from "./Skeleton";

function RepositoryCardSkeleton() {
  return (
    <article className="rounded-3xl border border-border bg-surface p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-full max-w-2xl" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="h-8 w-20" />
      </div>
      <div className="mt-6 flex flex-wrap gap-4">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-28" />
      </div>
    </article>
  );
}

function RepositoryListLoading() {
  return (
    <div aria-busy="true" aria-label="Loading repositories">
      <div className="space-y-3">
        <Skeleton className="h-4 w-44" />
        <Skeleton className="h-9 w-72 max-w-full" />
        <Skeleton className="h-5 w-full max-w-xl" />
      </div>
      <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-border bg-surface p-5 lg:flex-row">
        <Skeleton className="h-12 flex-1" />
        <Skeleton className="h-12 w-full lg:w-56" />
      </div>
      <Skeleton className="mt-6 h-5 w-52" />
      <div className="mt-5 grid gap-5">
        {Array.from({ length: 4 }, (_, index) => (
          <RepositoryCardSkeleton key={index} />
        ))}
      </div>
      <span className="sr-only">Loading repositories</span>
    </div>
  );
}

export default RepositoryListLoading;
