export type Branch = {
  name: string;
  isProtected: boolean;
  commitSha?: string | null;
};

export type CommitSummary = {
  sha: string;
  shortSha: string;
  message: string;
  authorName: string;
  authorLogin?: string | null;
  authorAvatarUrl?: string | null;
  authorHtmlUrl?: string | null;
  committerName?: string | null;
  committerLogin?: string | null;
  committerAvatarUrl?: string | null;
  committerHtmlUrl?: string | null;
  authoredAt?: string | null;
  committedAt?: string | null;
  htmlUrl?: string | null;
};

export type CommitParent = {
  sha: string;
  htmlUrl?: string | null;
};

export type CommitFile = {
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  changes: number;
  blobUrl?: string | null;
  rawUrl?: string | null;
  patch?: string | null;
  previousFilename?: string | null;
};

export type CommitDetail = {
  sha: string;
  shortSha: string;
  message: string;
  authorName: string;
  authorLogin?: string | null;
  authorAvatarUrl?: string | null;
  authorHtmlUrl?: string | null;
  committerName?: string | null;
  committerLogin?: string | null;
  committerAvatarUrl?: string | null;
  committerHtmlUrl?: string | null;
  authoredAt?: string | null;
  committedAt?: string | null;
  htmlUrl?: string | null;
  additions: number;
  deletions: number;
  totalChanges: number;
  changedFilesCount: number;
  parents: CommitParent[];
  files: CommitFile[];
};
