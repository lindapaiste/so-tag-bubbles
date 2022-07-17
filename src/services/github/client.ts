import axios from "axios";
import { groupBy, orderBy, partition } from "lodash";
import {
  ActivityCounts,
  ContributedRepo,
  IssueOrPr,
  IssueSearchResponse,
} from "./types";
import { GITHUB_TOKEN } from "../../config";

export const graphQuery = async <T>(query: string): Promise<T> => {
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
  if (res.data.errors) {
    throw new Error(
      `error in graphql response: ${JSON.stringify(res.data.errors)}`
    );
  }
  return res.data.data; // data property on response data
};

// Access repos via search to include older contributions.
export const getIssueSearchPage = async (
  endCursor?: string
): Promise<IssueSearchResponse> => {
  const data = await graphQuery<{ search: IssueSearchResponse }>(`query
    {
      search(
        query: "author:lindapaiste -org:lindapaiste is:public"
        type: ISSUE
        first: 100
        ${endCursor ? `after: "${endCursor}"` : ""}
      ) {
        nodes {
          ... on Issue {
            __typename
            repository {
              ...repoFields
            }
            state
          }
          ... on PullRequest {
            __typename
            repository {
              ...repoFields
            }
            state
            merged
          }
        }
        issueCount
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }

    fragment repoFields on Repository {
      name
      nameWithOwner
      owner {
        avatarUrl
        login
      }
      url
    }`);
  return data.search;
};

export const score = ({ issue, merged, pullRequest }: ActivityCounts): number =>
  3 * merged + 2 * pullRequest + issue;

const countActivity = (issuesAndPrs: IssueOrPr[]): ActivityCounts => {
  const [pullRequest, issue] = partition(issuesAndPrs, {
    __typename: "PullRequest",
  });
  return {
    pullRequest: pullRequest.length,
    merged: pullRequest.filter((pr) => pr.merged).length,
    issue: issue.length,
  };
};

export const getGithubContributions = async (): Promise<ContributedRepo[]> => {
  let hasNextPage = true;
  let endCursor = undefined as string | undefined;
  const issuesAndPrs: IssueOrPr[] = [];
  while (hasNextPage) {
    // eslint-disable-next-line no-await-in-loop
    const { nodes, pageInfo } = await getIssueSearchPage(endCursor);
    issuesAndPrs.push(...nodes);
    hasNextPage = pageInfo.hasNextPage;
    endCursor = pageInfo.endCursor;
  }
  const byRepo = groupBy(issuesAndPrs, (obj) => obj.repository.nameWithOwner);
  const repos = Object.values(byRepo)
    .map((array) => {
      const { repository } = array[0];
      const activity = countActivity(array);
      return {
        ...repository,
        activity,
        score: score(activity),
      };
    })
    .filter((repo) => repo.activity.pullRequest > 0);
  return orderBy(repos, "score", "desc");
};
