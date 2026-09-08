import { CircleAlert, RotateCw } from "lucide-react";

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
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="max-w-md rounded-3xl border border-red-300 bg-surface p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-500">
          <CircleAlert size={28} />
        </div>

        <h1 className="mt-5 text-2xl font-bold text-heading">
          {title}
        </h1>

        <p className="mt-3 text-body">
          {message}
        </p>

        {onRetry && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <RotateCw size={16} />
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileError;