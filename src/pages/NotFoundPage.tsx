import { Home } from "lucide-react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-border/80 bg-surface p-8 sm:p-10 text-center shadow-lg space-y-4">
        <p className="text-2xs font-semibold uppercase tracking-wider text-muted">
          404 Not Found
        </p>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-heading">
          Page Not Found
        </h1>

        <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-xs mx-auto">
          The requested page or resource could not be located. It may have been moved or does not exist.
        </p>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:opacity-95 active:scale-[0.99] transition-all"
          >
            <Home size={14} />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;