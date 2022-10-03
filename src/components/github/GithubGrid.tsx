import { FC } from "react";
import { ContributedRepo } from "../../services/github/types";
import { Repository } from "./Repository";

export const GithubGrid: FC<{ repos: ContributedRepo[] }> = ({ repos }) => (
  <div className="flex w-full max-w-screen-lg flex-wrap p-4">
    {repos?.map((repo) => (
      <div className="w-full p-4 sm:w-1/2 lg:w-1/3" key={repo.nameWithOwner}>
        <Repository {...repo} />
      </div>
    ))}
  </div>
);
