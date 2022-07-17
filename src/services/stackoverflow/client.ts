import axios from "axios";
import { range, sortBy, uniqBy } from "lodash";
import { SoResponse, TopTagsJson, UserTag } from "./types";
import { USER_ID } from "../../config";
import { Badge, UserBadge } from "./types-badges";

const client = axios.create({
  baseURL: "https://api.stackexchange.com/2.2/",
  params: {
    pagesize: 100,
    site: "stackoverflow",
  },
});

type Params = Record<string, string | number | boolean>;

/**
 * Helper function
 * Avoids putting res.data everywhere.
 * `params` is expected to include page if not 1.
 */
const getData = async <T>(
  path: string,
  params: Params = {}
): Promise<SoResponse<T>> => {
  const res = await client.get(path, { params });
  return res.data;
};

/**
 * Helper function
 * Provided with the request args, create a function that needs
 * only the page number to fetch.
 */
const createPaginatedGet =
  <T>(path: string, params?: Params) =>
  async (page = 1): Promise<SoResponse<T>> =>
    getData(path, { ...params, page });

/**
 * Helper function
 * Fetch multiple poges up to the max, stopping if the end is reached.
 * Needs to go sequentially in order to access has_next of the previous page.
 */
// eslint-disable-next-line  @typescript-eslint/no-unused-vars
const getSequentialPages = async <T>(
  path: string,
  maxPages: number,
  params?: Params
): Promise<SoResponse<T>> => {
  const getPage = createPaginatedGet<T>(path, params);
  const items: T[] = [];
  let hasNext = true;
  let page = 1;
  while (hasNext && page <= maxPages) {
    // eslint-disable-next-line no-await-in-loop
    const res = await getPage(page);
    items.push(...res.items);
    hasNext = res.has_more;
    page++;
  }
  return {
    items,
    has_more: hasNext,
  };
};

/**
 * Can load many pages in parallel.
 * Here, the maximum number of pages is always fetched even if they are empty.
 * Merge all responses into one response containing all items.
 */
const getMultiplePages = async <T>(
  path: string,
  maxPages: number,
  params?: Params
): Promise<SoResponse<T>> => {
  const getPage = createPaginatedGet<T>(path, params);
  // have to add 1 because lodash range is 0-indexed and exclusive
  const array = await Promise.all(range(1, maxPages + 1).map(getPage));
  return array.reduce((combined, current) => ({
    ...current,
    items: combined.items.concat(...current.items),
  }));
};

/**
 * Primary request for getting my top tags with answer counts and scores.
 * Loads multiple pages based on the requested count.
 */
export const getMyTopTags = async (count: number): Promise<TopTagsJson> => {
  const pages = Math.ceil(count / 100);
  return getMultiplePages<UserTag>(`users/${USER_ID}/top-answer-tags`, pages);
};

/**
 * Returns all of the tag badges that I have received.
 */
export const getMyTagBadges = async (): Promise<SoResponse<UserBadge>> =>
  getData(`users/${USER_ID}/badges`, {
    order: "desc",
    min: "tag_based",
    sort: "type", // must sort by type in order to use min=tag_based
  });

/**
 * Get the badge object for a badge from its id.
 * This includes the count awarded to all users.
 * Can request multiple badge ids at one time.
 * API accepts up to 100 semicolon delimited ids.
 */
export const getBadgeDetails = async (
  ...ids: number[]
): Promise<SoResponse<Badge>> => getData(`badges/${ids.join(";")}`);

/**
 * Gets all of the users who have received a badge.
 * Don't need to hit this endpoint just to get the count.
 * Note: can get for multiple badges at once, but this is an "OR" operation
 * rather than an "AND"
 */
export const getBadgeRecipients = async (
  ...ids: number[]
): Promise<SoResponse<UserBadge>> =>
  getData(`badges/${ids.join(";")}/recipients`);

/**
 * Combines two separate requests.
 * Gets badges that I've earned along with the count of users who have earned it.
 * Sorts by rarity and de-duplicates multiple levels (bronze + silver) of the same tag.
 */
export const getMyBadgesWithCount = async (): Promise<Badge[]> => {
  const badges = await getMyTagBadges();
  const ids = badges.items.map((o) => o.badge_id);
  const details = await getBadgeDetails(...ids);
  const sorted = sortBy(details.items, (b) => b.award_count);
  return uniqBy(sorted, (b) => b.name);
};
