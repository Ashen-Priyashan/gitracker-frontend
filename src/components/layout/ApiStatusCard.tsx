import { useEffect, useState } from "react";
import { Activity, AlertCircle, CheckCircle2 } from "lucide-react";
import apiClient from "../../api/apiClient";
import useAuth from "../../hooks/useAuth";

function ApiStatusCard() {
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;
    const checkHealth = async () => {
      try {
        await apiClient.get("/api/health");
        if (isMounted) setIsOnline(true);
      } catch {
        if (isMounted) setIsOnline(false);
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="rounded-xl border border-border/80 bg-surface-hover/50 p-3 space-y-2 text-xs">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-heading flex items-center gap-1.5">
          <Activity size={13} className={isOnline ? "text-success" : "text-amber-500"} />
          API Status
        </span>
        <div className="flex items-center gap-1.5">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isOnline === null
                ? "bg-muted animate-pulse"
                : isOnline
                ? "bg-success"
                : "bg-danger"
            }`}
          />
          <span
            className={`text-[11px] font-medium ${
              isOnline === null
                ? "text-muted"
                : isOnline
                ? "text-success"
                : "text-danger"
            }`}
          >
            {isOnline === null ? "Checking..." : isOnline ? "Operational" : "Offline"}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-border/50 text-[11px]">
        <span className="text-muted">GitHub Mode</span>
        {user?.githubUsername ? (
          <span className="flex items-center gap-1 font-medium text-heading truncate max-w-[120px]">
            <CheckCircle2 size={11} className="text-success shrink-0" />
            @{user.githubUsername}
          </span>
        ) : (
          <span className="flex items-center gap-1 text-muted">
            <AlertCircle size={11} className="text-amber-500 shrink-0" />
            Public API
          </span>
        )}
      </div>
    </div>
  );
}

export default ApiStatusCard;