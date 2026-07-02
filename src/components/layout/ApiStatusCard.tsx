import { Activity } from "lucide-react";

function ApiStatusCard() {
  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center gap-2">
        <Activity size={18} className="text-green-500" />

        <h3 className="font-semibold text-slate-900">
          GitHub API
        </h3>
      </div>

      <p className="mt-3 text-sm text-slate-600">
        Status
      </p>

      <div className="mt-2 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-green-500"></span>

        <span className="text-sm font-medium text-green-600">
          Connected
        </span>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Rate Limit
      </p>

      <p className="font-semibold text-slate-900">
        5000 / 5000
      </p>
    </div>
  );
}

export default ApiStatusCard;