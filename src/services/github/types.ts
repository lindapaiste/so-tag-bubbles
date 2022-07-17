export interface RepositoryInfo {
  name: string;
  nameWithOwner: string;
  owner: {
    avatarUrl: string;
    login: string;
  };
  url: string;
}

export interface ActivityCounts {
  pullRequest: number;
  merged: number;
  issue: number;
}

export type ActivityResponse = {
  [K in keyof ActivityCounts]: {
    issueCount: number;
  };
};

export interface ContributedRepo extends RepositoryInfo {
  activity: ActivityCounts;
}
