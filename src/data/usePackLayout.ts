import * as d3 from "d3";
import { HierarchyCircularNode } from "d3";
import { useMemo } from "react";
import groupingMap from "./groupings.json";
import { UserTag } from "./types";

/**
 * Do all of the data formatting and D3 computations here.
 */
export interface Props {
  width: number;
  height: number;
  count: number;
  tags: UserTag[];
}

export const usePackLayout = ({
  width,
  height,
  count,
  tags,
}: Props): HierarchyCircularNode<UserTag> => {
  /**
   * Nodes depend on the count and tags, but not the size.
   */
  const nodes = useMemo(() => {
    /**
     * Assign the group name to each tag.
     * Remove tags with no group.
     * Make sure that the tags are sorted before selecting the top n.
     */
    const mapped = tags
      .map((obj) => ({
        ...obj,
        group: (groupingMap as Record<string, string>)[obj.tag_name] ?? "",
      }))
      .sort((a, b) => b.answer_score - a.answer_score)
      .filter((o) => o.group !== "")
      .slice(0, count);

    /**
     * Create parent nodes for each group.
     */
    const data = {
      children: Array.from(
        d3.group(mapped, (d) => d.group),
        ([group, children]) => ({ tag_name: group, children })
      ),
    };

    /**
     * Note: have to use a type assertion because D3 expects the root node
     * to be assignable to UserTag, but it just has children.
     */
    return d3
      .hierarchy<UserTag>(data as unknown as UserTag)
      .sum((d) => d.answer_score);
  }, [tags, count]);

  /**
   * Layout depends on the size.
   */
  const packLayout = useMemo(
    () => d3.pack<UserTag>().size([width, height]).padding(10),
    [width, height]
  );

  /**
   * Apply the layout to the nodes.
   */
  return packLayout(nodes);
};
