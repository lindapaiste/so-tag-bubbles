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
      "w-full p-4 shadow-sm bg-white rounded-lg shadow-md",
      "border border-solid border-gray-300"
    )}
    key={nameWithOwner}
  >
    <div className="flex items-center justify-start pl-2 pt-2 mb-4">
      <div
        className={clsx(
          "rounded-full bg-white p-[3px] shadow-md",
          styles.bgGradient
        )}
      >
        <img
          src={owner.avatarUrl}
          alt={nameWithOwner}
          className="w-14 h-14 rounded-full border-gray-300 bg-white"
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
        <div className="font-lora text-md italic">{owner.login}</div>
      </div>
    </div>
    <Activities url={url} counts={activity} />
  </div>
);
