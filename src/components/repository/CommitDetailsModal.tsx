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
        <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-2xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          Added
        </span>
      );
    case "removed":
    case "deleted":
      return (
        <span className="rounded-md bg-rose-500/10 px-2 py-0.5 text-2xs font-semibold text-rose-600 dark:text-rose-400 border border-rose-500/20">
          Deleted
        </span>
      );
    case "renamed":
      return (
        <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-2xs font-semibold text-amber-600 dark:text-amber-400 border border-amber-500/20">
          Renamed
        </span>
      );
    case "modified":
    default:
      return (
        <span className="rounded-md bg-primary/10 px-2 py-0.5 text-2xs font-semibold text-primary border border-primary/20">
          Modified
        </span>
      );
  }
}

function DiffPatchViewer({ file }: { file: CommitFile }) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!file.patch) {
    return (
      <div className="rounded-xl border border-border/70 bg-surface-hover/40 p-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {getStatusBadge(file.status)}
            <span className="font-mono text-xs font-medium text-heading truncate">
              {file.previousFilename ? (
                <span className="flex items-center gap-1.5 flex-wrap">
                  <span className="line-through text-muted">{file.previousFilename}</span>
                  <ArrowRight size={11} className="text-muted" />
                  <span>{file.filename}</span>
                </span>
              ) : (
                file.filename
              )}
            </span>
          </div>
          <span className="text-2xs text-muted italic shrink-0">No patch available (binary/large)</span>
        </div>
      </div>
    );
  }

  const patchLines = file.patch.split("\n");

  return (
    <div className="rounded-xl border border-border/80 bg-surface overflow-hidden text-xs">
      {/* File Header */}
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 border-b border-border/70 bg-surface-hover/50 px-3.5 py-2 text-left hover:bg-surface-hover transition-colors"
      >
        <div className="flex items-center gap-2 min-w-0">
          {isExpanded ? (
            <ChevronDown size={13} className="text-muted shrink-0" />
          ) : (
            <ChevronRight size={13} className="text-muted shrink-0" />
          )}
          {getStatusBadge(file.status)}
          <span className="font-mono text-xs font-medium text-heading truncate">
            {file.previousFilename ? (
              <span className="flex items-center gap-1.5 flex-wrap">
                <span className="line-through text-muted">{file.previousFilename}</span>
                <ArrowRight size={11} className="text-muted" />
                <span>{file.filename}</span>
              </span>
            ) : (
              file.filename
            )}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
          {file.additions > 0 && (
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              +{file.additions}
            </span>
          )}
          {file.deletions > 0 && (
            <span className="text-rose-600 dark:text-rose-400 font-medium">
              -{file.deletions}
            </span>
          )}
        </div>
      </button>

      {/* Diff Lines Content */}
      {isExpanded && (
        <div className="overflow-x-auto p-1.5 font-mono text-[11px] leading-relaxed max-h-80 bg-surface-hover/20 dark:bg-black/25">
          <table className="w-full border-collapse">
            <tbody>
              {patchLines.map((line, idx) => {
                let rowBg = "";
                let textColor = "text-heading";

                if (line.startsWith("+")) {
                  rowBg = "bg-emerald-500/10";
                  textColor = "text-emerald-700 dark:text-emerald-300";
                } else if (line.startsWith("-")) {
                  rowBg = "bg-rose-500/10";
                  textColor = "text-rose-700 dark:text-rose-300";
                } else if (line.startsWith("@@")) {
                  rowBg = "bg-purple-500/10";
                  textColor = "text-purple-700 dark:text-purple-300 font-semibold";
                }

                return (
                  <tr key={idx} className={`${rowBg} hover:bg-black/5 dark:hover:bg-white/5`}>
                    <td className="select-none pr-3 text-right text-muted/50 w-8 pl-2 align-top">
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-150"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl border border-border/80 bg-surface shadow-2xl animate-in zoom-in-95 fade-in duration-150 overflow-hidden">
        {/* macOS Style Window Header */}
        <div className="flex items-center justify-between border-b border-border/70 px-5 py-3.5 bg-surface-hover/40">
          <div className="flex items-center gap-2">
            <GitCommit size={16} className="text-muted" />
            <h2 id="commit-modal-title" className="text-xs font-semibold uppercase tracking-wider text-muted">
              Commit Details
            </h2>
          </div>

          <button
            type="button"
            aria-label="Close commit details"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-border/70 text-muted hover:text-heading hover:bg-surface-hover transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5 flex-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Loader2 size={28} className="animate-spin text-muted mb-2.5" />
              <p className="text-xs font-medium text-heading">Loading commit details...</p>
              <p className="text-2xs text-muted mt-0.5">Fetching diff and stats from GitHub API</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-red-500">
              <AlertCircle size={28} className="mb-2" />
              <p className="text-xs font-medium">{error}</p>
              {onRetry && (
                <button
                  type="button"
                  onClick={onRetry}
                  className="mt-3 rounded-lg border border-red-500/30 bg-surface px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  Try again
                </button>
              )}
            </div>
          ) : commit ? (
            <>
              {/* Commit Message & SHA */}
              <div className="rounded-xl border border-border/70 bg-surface-hover/30 p-4 sm:p-5 space-y-3">
                <p className="text-sm sm:text-base font-semibold text-heading whitespace-pre-line leading-relaxed">
                  {commit.message}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/60">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="font-mono text-2xs font-medium text-muted bg-surface border border-border/70 rounded-md px-2 py-0.5 truncate max-w-[200px] sm:max-w-none">
                      {commit.sha}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopySha}
                      title="Copy full SHA"
                      className="inline-flex items-center gap-1 rounded-md border border-border/70 bg-surface px-2 py-0.5 text-2xs font-medium text-muted hover:text-heading hover:bg-surface-hover transition-colors shrink-0"
                    >
                      {copiedSha ? (
                        <>
                          <Check size={11} className="text-emerald-500" />
                          <span className="text-emerald-500">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={11} />
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
                      className="inline-flex items-center gap-1 text-2xs font-medium text-muted hover:text-heading transition-colors ml-auto shrink-0"
                    >
                      <span>View on GitHub</span>
                      <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              </div>

              {/* Author & Committer Cards */}
              <div className="grid gap-3 sm:grid-cols-2">
                {/* Author Card */}
                <div className="rounded-xl border border-border/70 bg-surface p-3.5 flex items-start gap-3 shadow-2xs">
                  {commit.authorAvatarUrl ? (
                    <img
                      src={commit.authorAvatarUrl}
                      alt={commit.authorName}
                      className="h-8 w-8 rounded-full border border-border/70 object-cover shrink-0"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-hover text-muted border border-border/70 text-2xs font-bold shrink-0">
                      {commit.authorName ? commit.authorName.slice(0, 2).toUpperCase() : <User size={13} />}
                    </div>
                  )}

                  <div className="min-w-0 space-y-0.5">
                    <span className="text-2xs font-semibold uppercase tracking-wider text-muted">
                      Author
                    </span>
                    <p className="text-xs font-semibold text-heading truncate">
                      {commit.authorName}
                    </p>
                    {commit.authorLogin && (
                      <p className="text-2xs text-muted truncate">@{commit.authorLogin}</p>
                    )}
                    <p className="text-2xs text-muted pt-0.5">
                      {formatExactDateTime(commit.authoredAt)}
                    </p>
                  </div>
                </div>

                {/* Committer Card */}
                <div className="rounded-xl border border-border/70 bg-surface p-3.5 flex items-start gap-3 shadow-2xs">
                  {commit.committerAvatarUrl ? (
                    <img
                      src={commit.committerAvatarUrl}
                      alt={commit.committerName || "Committer"}
                      className="h-8 w-8 rounded-full border border-border/70 object-cover shrink-0"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-hover text-muted border border-border/70 text-2xs font-bold shrink-0">
                      {commit.committerName ? commit.committerName.slice(0, 2).toUpperCase() : <User size={13} />}
                    </div>
                  )}

                  <div className="min-w-0 space-y-0.5">
                    <span className="text-2xs font-semibold uppercase tracking-wider text-muted">
                      Committer
                    </span>
                    <p className="text-xs font-semibold text-heading truncate">
                      {commit.committerName || commit.authorName}
                    </p>
                    {commit.committerLogin && (
                      <p className="text-2xs text-muted truncate">@{commit.committerLogin}</p>
                    )}
                    <p className="text-2xs text-muted pt-0.5">
                      {formatExactDateTime(commit.committedAt || commit.authoredAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats Bar & Parents */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/70 bg-surface-hover/30 p-3 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-2xs font-semibold uppercase tracking-wider text-muted">Statistics:</span>
                  <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-2xs font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <Plus size={10} /> {commit.additions} additions
                  </span>
                  <span className="rounded-md bg-rose-500/10 px-2 py-0.5 text-2xs font-medium text-rose-600 dark:text-rose-400 border border-rose-500/20 flex items-center gap-1">
                    <Minus size={10} /> {commit.deletions} deletions
                  </span>
                  <span className="rounded-md bg-surface border border-border/70 px-2 py-0.5 text-2xs font-medium text-muted">
                    {commit.changedFilesCount} files changed
                  </span>
                </div>

                {/* Parents */}
                {commit.parents && commit.parents.length > 0 && (
                  <div className="flex items-center gap-1.5 text-2xs">
                    <span className="text-muted font-medium flex items-center gap-1">
                      <GitFork size={11} /> {commit.parents.length > 1 ? "Parents:" : "Parent:"}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {commit.parents.map((parent) => (
                        <a
                          key={parent.sha}
                          href={parent.htmlUrl || undefined}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-2xs text-muted bg-surface border border-border/70 hover:text-heading hover:border-border rounded px-1.5 py-0.5 transition-colors"
                        >
                          {parent.sha.slice(0, 7)}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Changed Files with Diff Patches */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-1.5">
                  <FileCode size={14} className="text-muted" />
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Changed Files ({commit.files?.length || 0})
                  </h3>
                </div>

                {commit.files && commit.files.length > 0 ? (
                  <div className="space-y-2">
                    {commit.files.map((file, idx) => (
                      <DiffPatchViewer key={`${file.filename}-${idx}`} file={file} />
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted italic">No changed files listed for this commit.</p>
                )}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
