import axios from "axios";
import { MeInTag, TagForPeriod, TopUser } from "./types";

const USER_ID = 10431574;

const tagUsersApi = (tag: string, isMonth: boolean): string => {
  return `https://api.stackexchange.com/2.2/tags/${encodeURIComponent(
    tag
  )}/top-answerers/${isMonth ? "month" : "all_time"}?site=stackoverflow`;
};

const myTopTagsApi =
  "https://api.stackexchange.com/2.2/users/10431574/top-answer-tags?site=stackoverflow";

/** find my position in a tag's top users list */
const getRank = (users: TopUser[]): TagForPeriod | undefined => {
  const index = users.findIndex((u) => u.user.user_id === USER_ID);
  if (index) {
    const { post_count, score } = users[index];
    return {
      postCount: post_count,
      score,
      rank: index + 1
    };
  }
};
