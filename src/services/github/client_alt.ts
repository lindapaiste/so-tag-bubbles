import { mapValues, orderBy, uniqBy } from "lodash";
import {
  ActivityCounts,
  ActivityResponse,
  ContributedRepo,
  RepositoryInfo,
} from "./types";
import { GITHUB_USERNAME } from "../../config";
import { graphQuery, score } from "./client";

// Note: previously included both issues and pull requests,
// but right now I don't want to include repos with issues only.
// Note: repositoriesContributedTo only includes newer ones.
export const getContributedReposViaViewer = async (): Promise<
  RepositoryInfo[]
> => {
  const data = await graphQuery<{
    viewer: { repositoriesContributedTo: { nodes: RepositoryInfo[] } };
  }>(`query
    {
      viewer {
        repositoriesContributedTo(
          first: 100
          contributionTypes: [PULL_REQUEST]
          privacy: PUBLIC
        ) {
          totalCount
          nodes {
            name
            nameWithOwner
            owner {
              avatarUrl
              login
            }
            url
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }`);
  return data.viewer.repositoriesContributedTo.nodes;
};

// Access repos via issues to include older contributions,
// which aren't included in `viewer.repositoriesContributedTo`
export const getContributedRepos = async (): Promise<RepositoryInfo[]> => {
  const data = await graphQuery<{
    user: { pullRequests: { nodes: { repository: RepositoryInfo }[] } };
  }>(`query
    {
  user(login: "${GITHUB_USERNAME}") {
    pullRequests(first: 100) {
      nodes {
        repository {
          name
          nameWithOwner
          owner {
            avatarUrl
            login
          }
          url
        }
      }
      pageInfo {
        hasNextPage
      }
      totalCount
    }
  }
}`);
  const repos = data.user.pullRequests.nodes
    .map((node) => node.repository)
    .filter((repo) => repo.owner.login !== GITHUB_USERNAME);
  return uniqBy(repos, "nameWithOwner");
};

export const activityInRepo = async (
  nameWithOwner: string
): Promise<ActivityCounts> => {
  const data = await graphQuery<ActivityResponse>(`query
    {
      pullRequest: search(
        query: "author:lindapaiste repo:${nameWithOwner} is:pr"
        type: ISSUE
      ) {
        issueCount
      }
      merged: search(
        query: "author:lindapaiste repo:${nameWithOwner} is:pr is:merged"
        type: ISSUE
      ) {
        issueCount
      }
      issue: search(
        query: "author:lindapaiste repo:${nameWithOwner} is:issue"
        type: ISSUE
      ) {
        issueCount
      }
    }`);
  return mapValues(data, (obj) => obj.issueCount);
};

// TODO: figure out how to query multiple repositories at a time.
export const getGithubContributions = async (): Promise<ContributedRepo[]> => {
  const repos = await getContributedRepos();
  const activities = await Promise.all(
    repos.map((repo) => activityInRepo(repo.nameWithOwner))
  );
  const merged = repos.map((repo, i) => ({
    ...repo,
    activity: activities[i],
  }));
  return orderBy(merged, (repo) => score(repo.activity), "desc");
};
