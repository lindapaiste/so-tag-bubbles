import clsx from "clsx";
import { FC } from "react";
import { ContributedRepo } from "../../services/github/types";
import { Activities } from "./Activities";

const styles = require("./github.module.scss");

/**
 * Card showing my activity in a repository.
 */

export const Repository: FC<ContributedRepo> = ({
  nameWithOwner,
  name,
  owner,
  url,
  activity,
}) => (
  <div
    className={clsx(
      "w-full rounded-lg bg-white p-4 shadow-sm shadow-md",
      "border border-solid border-gray-300"
    )}
    key={nameWithOwner}
  >
    <div className="mb-4 flex items-center justify-start pl-2 pt-2">
      <div
        className={clsx(
          "rounded-full bg-white p-[3px] shadow-md",
          styles.bgGradient
        )}
      >
        <img
          src={owner.avatarUrl}
          alt={nameWithOwner}
          className="h-14 w-14 rounded-full border-gray-300 bg-white"
        />
      </div>
      <div className="ml-4">
        <div
          className={clsx(
            "font-benchnine font-bold uppercase leading-6",
            styles.underline,
            name.length > 18 ? "text-xl" : "text-2xl"
          )}
        >
          {name}
        </div>
        <div className="text-md font-lora italic">{owner.login}</div>
      </div>
    </div>
    <Activities url={url} counts={activity} />
  </div>
);
