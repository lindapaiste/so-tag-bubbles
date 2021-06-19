import { NextApiHandler } from "next";
import * as stackApi from "../../services/stackoverflow/client";
import { TAG_COUNT } from "../../config";
import groupingMap from "../../services/d3/tag-groupings.json";
import { TagData } from "../../services/d3/usePackLayout";

/**
 * Run routinely to identify tags needing grouping
 */
export const groupNeeded = (tags: TagData[]): TagData[] =>
  // if it's not in the map at all, or if the value is an empty string
  tags.filter(
    ({ tag_name }) => !(groupingMap as Record<string, string>)[tag_name]
  );

const route: NextApiHandler = async (req, res) => {
  /**
   * Can pass the top n to check as an argument, or use the tag count.
   */
  const { limit } = req.query;
  const str = Array.isArray(limit) ? limit[0] : limit;
  const num = str ? parseInt(str, 10) : TAG_COUNT;
  const data = await stackApi.getMyTopTags(num);
  const tags = data.items.slice(0, num);
  res.status(200).json(groupNeeded(tags));
};

export default route;
