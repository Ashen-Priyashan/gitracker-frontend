import { Home } from "lucide-react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-xl rounded-3xl border border-border bg-surface p-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          404 Error
        </p>

        <h1 className="mt-4 text-5xl font-bold text-heading">
          Page Not Found
        </h1>

        <p className="mt-4 text-body">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"
        >
          <Home size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;