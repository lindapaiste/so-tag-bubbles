import axios from "axios";
import { mapValues, orderBy } from "lodash";
import { ActivityCounts, ActivityResponse, ContributedRepo, RepositoryInfo } from "./types";
import { GITHUB_TOKEN } from "../../config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const graphQuery = async <T = any>(query: string): Promise<T> => {
  const res = await axios({
    url: "https://api.github.com/graphql",
    method: "POST",
    headers: {
      Authorization: `bearer ${GITHUB_TOKEN}`,
    },
    data: {
      query,
    },
  });
  return res.data.data; // data property on response data
};

// Note: previously included both issues and pull requests,
// but right now I don't want to include repos with issues only.
export const getContributedRepos = async (): Promise<RepositoryInfo[]> => {
  const data = await graphQuery(`query
    {
      viewer {
        repositoriesContributedTo(
          first: 100
          contributionTypes: [PULL_REQUEST]
          privacy: PUBLIC
        ) {
          totalCount
          nodes {
            nameWithOwner
            name
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

const score = ({ issue, merged, pullRequest }: ActivityCounts): number =>
  merged * 3 + pullRequest * 2 + issue;

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
