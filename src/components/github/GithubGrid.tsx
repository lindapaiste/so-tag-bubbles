import { FC } from "react";
import { ContributedRepo } from "../../services/github/types";
import { Repository } from "./Repository";

export const GithubGrid: FC<{ repos: ContributedRepo[] }> = ({ repos }) => (
  <div className="flex flex-wrap p-4 w-full max-w-screen-lg">
    {repos?.map((repo) => (
      <div className="w-full sm:w-1/2 lg:w-1/3 p-4" key={repo.nameWithOwner}>
        <Repository {...repo} />
      </div>
    ))}
  </div>
);
