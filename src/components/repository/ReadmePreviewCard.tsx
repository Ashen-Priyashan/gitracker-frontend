import { useEffect, useState } from "react";
import {
  FileText,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
} from "lucide-react";
import { getRepositoryReadme } from "../../services/repositoryService";
import type { ReadmeResponse } from "../../types/profile";

type ReadmePreviewCardProps = {
  username: string;
  repositoryName: string;
};

function ReadmePreviewCard({
  username,
  repositoryName,
}: ReadmePreviewCardProps) {
  const [readme, setReadme] = useState<ReadmeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchReadme = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getRepositoryReadme(username, repositoryName);
        if (isMounted) {
          setReadme(data);
        }
      } catch {
        if (isMounted) {
          setError("Failed to load repository README.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchReadme();
    return () => {
      isMounted = false;
    };
  }, [username, repositoryName]);

  const handleCopy = async () => {
    if (!readme?.content) return;

    const textToCopy = readme.content;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Unable to copy README content.");
    }
  };

  return (
    <div className="rounded-2xl border border-border/80 bg-surface p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-4">
        <div className="flex items-center gap-2.5">
          <FileText size={18} className="text-muted" />
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold tracking-tight text-heading">
              README Preview
            </h3>
            <span className="rounded bg-surface-hover px-1.5 py-0.5 text-2xs font-mono text-muted">
              README.md
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {readme?.content && (
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-surface px-2.5 py-1 text-xs font-medium text-body hover:text-heading hover:bg-surface-hover transition-colors"
              title="Copy README content"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-emerald-500" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={13} className="text-muted" />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}

          {readme?.htmlUrl && (
            <a
              href={readme.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-surface px-2.5 py-1 text-xs font-medium text-muted hover:text-heading hover:bg-surface-hover transition-colors"
            >
              <span>View Raw</span>
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>

      <div className="mt-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent mb-2.5" />
            <p className="text-xs font-medium">Fetching README content...</p>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5 text-center text-xs text-red-500">
            {error}
          </div>
        ) : !readme?.exists || !readme.content ? (
          <div className="rounded-xl border border-dashed border-border/80 p-8 text-center text-muted">
            <FileText size={28} className="mx-auto text-muted/50 mb-2" />
            <p className="text-sm font-medium text-heading">No README file found</p>
            <p className="text-xs text-muted mt-0.5">
              This repository does not have a README file.
            </p>
          </div>
        ) : (
          <div>
            <div
              className={`relative overflow-hidden rounded-xl border border-border/50 bg-surface-hover/30 dark:bg-black/25 p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed text-body transition-all duration-200 ${
                isExpanded ? "max-h-none" : "max-h-72"
              }`}
            >
              <pre className="whitespace-pre-wrap font-mono break-words select-text">
                {readme.content}
              </pre>

              {!isExpanded && (
                <div className="absolute inset-x-0 bottom-0 flex h-20 items-end justify-center bg-gradient-to-t from-surface via-surface/90 to-transparent pointer-events-none pb-2" />
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-border/70 bg-surface py-2 text-xs font-medium text-body hover:text-heading hover:bg-surface-hover transition-colors"
            >
              {isExpanded ? (
                <>
                  <span>Collapse README</span>
                  <ChevronUp size={14} />
                </>
              ) : (
                <>
                  <span>Show Full README</span>
                  <ChevronDown size={14} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReadmePreviewCard;
