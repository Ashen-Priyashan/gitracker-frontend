import Skeleton from "./Skeleton";

function RepositoryDetailsLoading() {
  return (
    <div className="mx-auto max-w-7xl space-y-6" role="status" aria-live="polite" aria-busy="true" aria-label="Loading repository details">
      <div className="space-y-3">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-9 w-80 max-w-full" />
        <Skeleton className="h-5 w-72 max-w-full" />
      </div>
      <section className="space-y-6">
        <div className="rounded-3xl border border-border bg-surface p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
            <div className="flex-1 space-y-3">
              <Skeleton className="h-8 w-64 max-w-full" />
              <Skeleton className="h-5 w-full max-w-3xl" />
              <Skeleton className="h-5 w-3/4" />
            </div>
            <div className="flex gap-3"><Skeleton className="h-10 w-24" /><Skeleton className="h-10 w-28" /></div>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="rounded-3xl border border-border bg-surface p-6">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="mt-4 h-9 w-16" />
            </div>
          ))}
        </div>
        <div className="rounded-3xl border border-border bg-surface p-8">
          <Skeleton className="h-7 w-72 max-w-full" />
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => <Skeleton key={index} className="h-24" />)}
          </div>
        </div>
      </section>
      <span className="sr-only">Loading repository details</span>
    </div>
  );
}

export default RepositoryDetailsLoading;
