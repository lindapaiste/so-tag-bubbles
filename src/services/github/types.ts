export interface RepositoryInfo {
  name: string;
  nameWithOwner: string;
  owner: {
    avatarUrl: string;
    login: string;
  };
  url: string;
}

export interface IssueOrPr {
  __typename: "PullRequest" | "Issue";
  repository: RepositoryInfo;
  state: string;
  merged?: boolean; // on PR only
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

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}

export interface IssueSearchResponse {
  nodes: IssueOrPr[];
  pageInfo: PageInfo;
}
