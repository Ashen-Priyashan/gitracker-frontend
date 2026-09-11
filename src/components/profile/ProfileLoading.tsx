import Skeleton from "../loading/Skeleton";

function ProfileLoading() {
  return (
    <div className="space-y-6 py-2" role="status" aria-live="polite" aria-busy="true" aria-label="Loading GitHub profile">
      {/* Profile Header Skeleton */}
      <section className="rounded-2xl border border-border/80 bg-surface p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start text-center sm:text-left">
          <Skeleton className="h-24 w-24 rounded-2xl shrink-0" />
          <div className="w-full flex-1 space-y-2.5">
            <Skeleton className="h-7 w-52 max-w-full mx-auto sm:mx-0" />
            <Skeleton className="h-4 w-32 mx-auto sm:mx-0" />
            <Skeleton className="h-4 w-full max-w-xl mx-auto sm:mx-0" />
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Summary Skeleton */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="rounded-xl border border-border/70 bg-surface p-4 sm:p-5 shadow-2xs">
              <Skeleton className="h-3.5 w-16" />
              <Skeleton className="mt-2.5 h-8 w-20" />
              <Skeleton className="mt-1 h-3 w-28" />
            </div>
          ))}
        </div>
      </section>

      {/* Language Skeleton */}
      <div className="rounded-xl border border-border/70 bg-surface p-4 sm:p-5 shadow-2xs">
        <Skeleton className="h-3.5 w-24" />
        <Skeleton className="mt-2.5 h-6 w-32" />
        <Skeleton className="mt-1 h-3 w-40" />
      </div>

      {/* Repository Showcase Skeleton */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="rounded-xl border border-border/70 bg-surface p-4 shadow-2xs space-y-3">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="h-3.5 w-3/4" />
              <div className="flex justify-between pt-1">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </div>
      </section>
      <span className="sr-only">Loading GitHub profile</span>
    </div>
  );
}

export default ProfileLoading;
