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

  const handleCopy = () => {
    if (readme?.content) {
      navigator.clipboard.writeText(readme.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FileText size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-heading">
              README Preview
            </h3>
            <p className="text-xs text-body font-mono">README.md</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {readme?.content && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-xl border border-border px-3 py-1.5 text-xs font-semibold text-body hover:bg-surface-hover hover:text-heading transition-colors"
              title="Copy README content"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-500" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
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
              className="flex items-center gap-1.5 rounded-xl bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors"
            >
              <span>View Raw</span>
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      <div className="mt-5">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-body">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-primary border-t-transparent mb-3" />
            <p className="text-sm font-medium">Fetching README content...</p>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center text-sm text-red-500">
            {error}
          </div>
        ) : !readme?.exists || !readme.content ? (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center text-body">
            <FileText size={32} className="mx-auto text-body/40 mb-2" />
            <p className="font-medium text-heading">No README file found</p>
            <p className="text-xs text-body mt-1">
              This repository does not have a README file.
            </p>
          </div>
        ) : (
          <div>
            <div
              className={`relative overflow-hidden rounded-2xl bg-black/20 p-6 font-mono text-sm leading-relaxed text-body transition-all duration-300 ${
                isExpanded ? "max-h-none" : "max-h-80"
              }`}
            >
              <pre className="whitespace-pre-wrap font-mono break-words">
                {(() => {
                  try {
                    const bytes = Uint8Array.from(
                      atob(readme.content),
                      (c) => c.charCodeAt(0),
                    );
                    return new TextDecoder().decode(bytes);
                  } catch {
                    return readme.content;
                  }
                })()}
              </pre>

              {!isExpanded && (
                <div className="absolute inset-x-0 bottom-0 flex h-24 items-end justify-center bg-gradient-to-t from-surface via-surface/80 to-transparent pb-2" />
              )}
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-heading hover:bg-surface-hover transition-colors"
            >
              {isExpanded ? (
                <>
                  <span>Collapse README</span>
                  <ChevronUp size={16} />
                </>
              ) : (
                <>
                  <span>Show Full README</span>
                  <ChevronDown size={16} />
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
