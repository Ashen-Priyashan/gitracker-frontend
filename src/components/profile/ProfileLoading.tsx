import Skeleton from "../loading/Skeleton";

function ProfileLoading() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading GitHub profile">
      <section className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <Skeleton className="h-28 w-28 rounded-3xl" />
          <div className="w-full flex-1 space-y-3">
            <Skeleton className="h-9 w-56 max-w-full" />
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-5 w-full max-w-2xl" />
            <Skeleton className="h-5 w-3/4 max-w-xl" />
            <div className="flex flex-wrap gap-5 pt-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
        </div>
      </section>
      <section>
        <Skeleton className="h-4 w-24" />
        <Skeleton className="mt-3 h-8 w-56" />
        <div className="mt-5 grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="rounded-3xl border border-border bg-surface p-6">
              <Skeleton className="h-12 w-12 rounded-2xl" />
              <Skeleton className="mt-5 h-4 w-24" />
              <Skeleton className="mt-3 h-9 w-16" />
            </div>
          ))}
        </div>
      </section>
      <div className="rounded-3xl border border-border bg-surface p-6">
        <Skeleton className="h-12 w-12 rounded-2xl" />
        <Skeleton className="mt-4 h-4 w-36" />
        <Skeleton className="mt-2 h-8 w-32" />
      </div>
      <section className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="mt-3 h-8 w-64" />
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {Array.from({ length: 4 }, (_, index) => <Skeleton key={index} className="h-40" />)}
        </div>
      </section>
      <span className="sr-only">Loading GitHub profile</span>
    </div>
  );
}

export default ProfileLoading;
