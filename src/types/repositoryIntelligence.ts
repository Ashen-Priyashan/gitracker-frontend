export type Contributor = {
  login: string;
  avatarUrl: string;
  htmlUrl: string;
  contributions: number;
  type: string;
};

export type CommitActivityWeek = {
  weekTimestamp: number;
  totalCommits: number;
  days: number[];
};

export type CommitActivityResponse = {
  status: "READY" | "CALCULATING" | "UNAVAILABLE";
  totalYearCommits: number;
  weeks: CommitActivityWeek[];
};

export type CodeFrequencyWeek = {
  weekTimestamp: number;
  additions: number;
  deletions: number;
  netChange: number;
};

export type CodeFrequencyResponse = {
  status: "READY" | "CALCULATING" | "UNAVAILABLE";
  weeklyStats: CodeFrequencyWeek[];
};

export type ParticipationResponse = {
  status: "READY" | "CALCULATING" | "UNAVAILABLE";
  allCommits: number[];
  ownerCommits: number[];
};
