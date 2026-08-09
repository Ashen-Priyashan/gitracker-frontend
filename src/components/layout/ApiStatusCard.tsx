import { Activity } from "lucide-react";

function ApiStatusCard() {
  return (
    <div className="mt-8 rounded-2xl border border-border bg-background p-4">
      <div className="flex items-center gap-2">
        <Activity size={18} className="text-success" />

        <h3 className="font-semibold text-heading">
          GitHub API
        </h3>
      </div>

      <p className="mt-3 text-sm text-body">
        Status
      </p>

      <div className="mt-2 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-success" />

        <span className="text-sm font-medium text-success">
          Connected
        </span>
      </div>

      <p className="mt-4 text-xs text-body">
        Rate Limit
      </p>

      <p className="font-semibold text-heading">
        5000 / 5000
      </p>
    </div>
  );
}

export default ApiStatusCard;