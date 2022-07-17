import clsx from "clsx";
import { FC, ReactNode } from "react";
import { VscGitMerge, VscGitPullRequest, VscIssues } from "react-icons/vsc";
import { ActivityCounts } from "../../services/github/types";
import { GITHUB_USERNAME } from "../../config";

/**
 * A single activity icon and count.
 */

interface ActivityProps {
  url: string;
  icon: ReactNode;
  count: number;
  label: string;
}

const Activity: FC<ActivityProps> = ({ icon, url, count, label }) => (
  <a
    className={clsx(
      "flex-1 flex items-center justify-evenly",
      "m-1 rounded-md p-2 bg-gray-100 shadow-sm",
      count || "text-gray-400"
    )}
    href={url}
    title={label}
  >
    <div className="text-xl">{icon}</div>
    <span className="bold font-benchnine text-xl">{count}</span>
  </a>
);

/**
 * Row of counts for PRs, merged, and issues.
 */

interface ActivitiesProps {
  url: string;
  counts: ActivityCounts;
}

export const Activities: FC<ActivitiesProps> = ({ url, counts }) => {
  const deepUrl = (base: string, query: string) => {
    const q = encodeURIComponent(`${query} author:${GITHUB_USERNAME}`);
    return `${url}/${base}?q=${q}`;
  };
  return (
    <div className="flex">
      <Activity
        url={deepUrl("pulls", "is:pr")}
        icon={<VscGitPullRequest />}
        count={counts.pullRequest}
        label="Pull Requests Created"
      />
      <Activity
        url={deepUrl("pulls", "is:pr is:merged")}
        icon={<VscGitMerge />}
        count={counts.merged}
        label="Merged Pull Requests"
      />
      <Activity
        url={deepUrl("issues", "is:issue")}
        icon={<VscIssues />}
        count={counts.issue}
        label="Issues Created"
      />
    </div>
  );
};
