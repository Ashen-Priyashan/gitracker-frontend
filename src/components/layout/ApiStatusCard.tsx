import { useEffect, useState } from "react";
import { Activity, AlertCircle, CheckCircle2 } from "lucide-react";
import apiClient from "../../api/apiClient";
import { useAuth } from "../../context/AuthContext";

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
    <div className="mt-8 rounded-2xl border border-border bg-background p-4">
      <div className="flex items-center gap-2">
        <Activity size={18} className={isOnline ? "text-success" : "text-amber-500"} />
        <h3 className="font-semibold text-heading">API Status</h3>
      </div>

      <p className="mt-3 text-sm text-body">Backend Service</p>

      <div className="mt-2 flex items-center gap-2">
        <span
          className={`h-2 w-2 rounded-full ${
            isOnline === null
              ? "bg-slate-400 animate-pulse"
              : isOnline
              ? "bg-success"
              : "bg-red-500"
          }`}
        />
        <span
          className={`text-sm font-medium ${
            isOnline === null
              ? "text-slate-400"
              : isOnline
              ? "text-success"
              : "text-red-500"
          }`}
        >
          {isOnline === null ? "Checking..." : isOnline ? "Operational" : "Unavailable"}
        </span>
      </div>

      <p className="mt-4 text-xs text-body">GitHub Integration</p>
      <div className="mt-1 flex items-center gap-1.5 text-xs font-medium">
        {user?.githubUsername ? (
          <>
            <CheckCircle2 size={13} className="text-success shrink-0" />
            <span className="text-heading truncate">@{user.githubUsername}</span>
          </>
        ) : (
          <>
            <AlertCircle size={13} className="text-amber-500 shrink-0" />
            <span className="text-body">Public Rate Limit</span>
          </>
        )}
      </div>
    </div>
  );
}

export default ApiStatusCard;