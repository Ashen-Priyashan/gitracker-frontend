import { AlertCircle, RotateCw } from "lucide-react";

type ProfileErrorProps = {
  message: string;
  title?: string;
  onRetry?: () => void;
};

function ProfileError({
  message,
  title = "Unable to analyze profile",
  onRetry,
}: ProfileErrorProps) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl border border-border/80 bg-surface p-6 sm:p-8 text-center shadow-lg space-y-3">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
          <AlertCircle size={20} />
        </div>

        <h1 className="text-base sm:text-lg font-bold tracking-tight text-heading">
          {title}
        </h1>

        <p className="text-xs text-muted leading-relaxed">
          {message}
        </p>

        {onRetry && (
          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white shadow-2xs transition-opacity hover:opacity-95 active:scale-[0.99]"
            >
              <RotateCw size={13} />
              <span>Try Again</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileError;