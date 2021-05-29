import { useEffect, useState } from "react";
import axios from "axios";
import saved from "./my-top-answer-tags.json";
import { TopTagsJson, UserTag } from "./types";

const USER_ID = 10431574;
/**
 * TODO: receive data from a server with caching.
 *
 * Right now attempt to load fresh data from API response,
 * and backfill with stored data from a .json file only on error.
 *
 * TBH there is not much volatility in my top tags,
 * so the .json file is pretty good.
 */
export const useTopTags = (): UserTag[] => {
  const [data, setData] = useState<TopTagsJson>();

  useEffect(() => {
    let isSubscribed = true;

    (async () => {
      try {
        const json = await axios.get(
          `https://api.stackexchange.com/2.2/users/${USER_ID}/top-answer-tags`,
          {
            params: {
              pagesize: 100,
              site: "stackoverflow",
            },
          }
        );
        if (isSubscribed && "items" in json.data) {
          setData(json.data);
        }
      } catch (e) {
        setData(saved);
      }
    })();

    return () => {
      isSubscribed = false;
    };
  }, []);

  return data?.items ?? [];
};
