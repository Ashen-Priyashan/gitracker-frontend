import { useEffect, useState } from "react";
import {
  X,
  GitCommit,
  GitFork,
  ExternalLink,
  Copy,
  Check,
  FileCode,
  Plus,
  Minus,
  AlertCircle,
  Loader2,
  ChevronDown,
  ChevronRight,
  User,
  ArrowRight,
} from "lucide-react";
import type { CommitDetail, CommitFile } from "../../types/repositoryActivity";
import { formatExactDateTime } from "../../utils/dateUtils";

type CommitDetailsModalProps = {
  commit: CommitDetail | null;
  loading: boolean;
  error: string | null;
  isOpen: boolean;
  onClose: () => void;
  onRetry?: () => void;
};

function getStatusBadge(status: string) {
  const normalized = status.toLowerCase();
  switch (normalized) {
    case "added":
      return (
        <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          Added
        </span>
      );
    case "removed":
    case "deleted":
      return (
        <span className="rounded-md bg-red-500/10 px-2 py-0.5 text-xs font-semibold text-red-600 dark:text-red-400 border border-red-500/20">
          Deleted
        </span>
      );
    case "renamed":
      return (
        <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400 border border-amber-500/20">
          Renamed
        </span>
      );
    case "modified":
    default:
      return (
        <span className="rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:text-blue-400 border border-blue-500/20">
          Modified
        </span>
      );
  }
}

function DiffPatchViewer({ file }: { file: CommitFile }) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!file.patch) {
    return (
      <div className="rounded-xl border border-border/80 bg-background/50 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            {getStatusBadge(file.status)}
            <span className="font-mono text-xs font-medium text-heading truncate">
              {file.previousFilename ? (
                <span className="flex items-center gap-1.5 flex-wrap">
                  <span className="line-through text-body">{file.previousFilename}</span>
                  <ArrowRight size={12} className="text-body" />
                  <span>{file.filename}</span>
                </span>
              ) : (
                file.filename
              )}
            </span>
          </div>
          <span className="text-xs text-body italic shrink-0">No patch available (binary/large)</span>
        </div>
      </div>
    );
  }

  const patchLines = file.patch.split("\n");

  return (
    <div className="rounded-2xl border border-border/80 bg-background overflow-hidden text-xs">
      {/* File Header */}
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 border-b border-border/80 bg-surface/80 px-4 py-2.5 text-left hover:bg-surface-hover transition-colors"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {isExpanded ? (
            <ChevronDown size={14} className="text-body shrink-0" />
          ) : (
            <ChevronRight size={14} className="text-body shrink-0" />
          )}
          {getStatusBadge(file.status)}
          <span className="font-mono font-medium text-heading truncate">
            {file.previousFilename ? (
              <span className="flex items-center gap-1.5 flex-wrap">
                <span className="line-through text-body">{file.previousFilename}</span>
                <ArrowRight size={12} className="text-body" />
                <span>{file.filename}</span>
              </span>
            ) : (
              file.filename
            )}
          </span>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 font-mono text-xs">
          {file.additions > 0 && (
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              +{file.additions}
            </span>
          )}
          {file.deletions > 0 && (
            <span className="text-red-600 dark:text-red-400 font-medium">
              -{file.deletions}
            </span>
          )}
        </div>
      </button>

      {/* Diff Lines Content */}
      {isExpanded && (
        <div className="overflow-x-auto p-2 font-mono text-[11px] leading-relaxed max-h-96">
          <table className="w-full border-collapse">
            <tbody>
              {patchLines.map((line, idx) => {
                let rowBg = "";
                const textColor = "text-heading/90";

                if (line.startsWith("+")) {
                  rowBg = "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
                } else if (line.startsWith("-")) {
                  rowBg = "bg-red-500/10 text-red-700 dark:text-red-300";
                } else if (line.startsWith("@@")) {
                  rowBg = "bg-purple-500/10 text-purple-700 dark:text-purple-300 font-semibold";
                }

                return (
                  <tr key={idx} className={`${rowBg} hover:bg-black/5 dark:hover:bg-white/5`}>
                    <td className="select-none pr-3 text-right text-body/40 w-8 pl-2 align-top">
                      {idx + 1}
                    </td>
                    <td className={`whitespace-pre font-mono px-2 py-0.5 ${textColor}`}>
                      {line}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function CommitDetailsModal({
  commit,
  loading,
  error,
  isOpen,
  onClose,
  onRetry,
}: CommitDetailsModalProps) {
  const [copiedSha, setCopiedSha] = useState(false);

  // Close on ESC key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopySha = () => {
    if (commit?.sha) {
      navigator.clipboard.writeText(commit.sha);
      setCopiedSha(true);
      setTimeout(() => setCopiedSha(false), 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="commit-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col rounded-3xl border border-border bg-surface shadow-2xl animate-in zoom-in-95 fade-in duration-200 overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-2">
            <GitCommit size={20} className="text-primary" />
            <h2 id="commit-modal-title" className="text-lg font-bold text-heading">
              Commit Details
            </h2>
          </div>

          <button
            type="button"
            aria-label="Close commit details"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-border text-body hover:border-heading/40 hover:text-heading transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Loader2 size={32} className="animate-spin text-primary mb-3" />
              <p className="text-sm font-semibold text-heading">Loading commit details...</p>
              <p className="text-xs text-body mt-1">Fetching diff and stats from GitHub API</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-red-500">
              <AlertCircle size={32} className="mb-3" />
              <p className="text-sm font-semibold">{error}</p>
              {onRetry && (
                <button
                  type="button"
                  onClick={onRetry}
                  className="mt-4 rounded-xl border border-red-300 bg-surface px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 dark:border-red-800 transition-colors"
                >
                  Try again
                </button>
              )}
            </div>
          ) : commit ? (
            <>
              {/* Commit Message & SHA */}
              <div className="rounded-2xl border border-border/80 bg-background/50 p-5 space-y-3">
                <p className="text-base font-bold text-heading whitespace-pre-line leading-relaxed">
                  {commit.message}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/60">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-primary bg-primary/10 border border-primary/20 rounded-lg px-2.5 py-1">
                      {commit.sha}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopySha}
                      title="Copy full SHA"
                      className="flex items-center gap-1 rounded-lg border border-border bg-surface px-2.5 py-1 text-xs font-semibold text-heading hover:bg-surface-hover transition-colors"
                    >
                      {copiedSha ? (
                        <>
                          <Check size={12} className="text-emerald-500" />
                          <span className="text-emerald-500">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {commit.htmlUrl && (
                    <a
                      href={commit.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline ml-auto"
                    >
                      <span>View on GitHub</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>

              {/* Author & Committer Details */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Author Card */}
                <div className="rounded-2xl border border-border bg-surface p-4 flex items-start gap-3">
                  {commit.authorAvatarUrl ? (
                    <img
                      src={commit.authorAvatarUrl}
                      alt={commit.authorName}
                      className="h-10 w-10 rounded-full border border-border object-cover shrink-0"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold shrink-0">
                      {commit.authorName ? commit.authorName.slice(0, 2).toUpperCase() : <User size={16} />}
                    </div>
                  )}

                  <div className="min-w-0 space-y-0.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-body">
                      Author
                    </span>
                    <p className="text-sm font-bold text-heading truncate">
                      {commit.authorName}
                    </p>
                    {commit.authorLogin && (
                      <p className="text-xs text-body truncate">@{commit.authorLogin}</p>
                    )}
                    <p className="text-[11px] text-body pt-1">
                      {formatExactDateTime(commit.authoredAt)}
                    </p>
                  </div>
                </div>

                {/* Committer Card (if available) */}
                <div className="rounded-2xl border border-border bg-surface p-4 flex items-start gap-3">
                  {commit.committerAvatarUrl ? (
                    <img
                      src={commit.committerAvatarUrl}
                      alt={commit.committerName || "Committer"}
                      className="h-10 w-10 rounded-full border border-border object-cover shrink-0"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold shrink-0">
                      {commit.committerName ? commit.committerName.slice(0, 2).toUpperCase() : <User size={16} />}
                    </div>
                  )}

                  <div className="min-w-0 space-y-0.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-body">
                      Committer
                    </span>
                    <p className="text-sm font-bold text-heading truncate">
                      {commit.committerName || commit.authorName}
                    </p>
                    {commit.committerLogin && (
                      <p className="text-xs text-body truncate">@{commit.committerLogin}</p>
                    )}
                    <p className="text-[11px] text-body pt-1">
                      {formatExactDateTime(commit.committedAt || commit.authoredAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats Bar & Parents */}
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-background/50 p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-semibold text-body">Statistics:</span>
                  <span className="rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <Plus size={12} /> {commit.additions} additions
                  </span>
                  <span className="rounded-lg bg-red-500/10 px-2.5 py-1 text-xs font-bold text-red-600 dark:text-red-400 border border-red-500/20 flex items-center gap-1">
                    <Minus size={12} /> {commit.deletions} deletions
                  </span>
                  <span className="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary border border-primary/20">
                    {commit.changedFilesCount} files changed
                  </span>
                </div>

                {/* Parents */}
                {commit.parents && commit.parents.length > 0 && (
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-body font-medium flex items-center gap-1">
                      <GitFork size={13} /> {commit.parents.length > 1 ? "Parents:" : "Parent:"}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {commit.parents.map((parent) => (
                        <a
                          key={parent.sha}
                          href={parent.htmlUrl || undefined}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono font-bold text-primary bg-surface border border-border hover:border-primary/50 rounded-md px-2 py-0.5 transition-colors"
                        >
                          {parent.sha.slice(0, 7)}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Changed Files with Diff Patches */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FileCode size={18} className="text-primary" />
                  <h3 className="text-sm font-bold text-heading uppercase tracking-wider">
                    Changed Files ({commit.files?.length || 0})
                  </h3>
                </div>

                {commit.files && commit.files.length > 0 ? (
                  <div className="space-y-3">
                    {commit.files.map((file, idx) => (
                      <DiffPatchViewer key={`${file.filename}-${idx}`} file={file} />
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-body italic">No changed files listed for this commit.</p>
                )}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
