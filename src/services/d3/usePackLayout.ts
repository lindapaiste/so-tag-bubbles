import * as d3 from "d3";
import { HierarchyCircularNode, HierarchyNode, PackCircle } from "d3";
import { useMemo } from "react";
import groupingMap from "./tag-groupings.json";
import { UserTag } from "../stackoverflow/types";
import { PACK_LAYOUT_PADDING } from "../../config";

/**
 * Not all properties of the UserTag are actually needed.
 */
export type TagData = Pick<
  UserTag,
  "tag_name" | "answer_score" | "answer_count"
>;

/**
 * Instead of using HierarchyCircularNode<UserTag>, want to require
 * only the minimum information that is actually needed for rendering.
 * This makes it easier to render components with Storybook.
 */
export interface TagNode extends PackCircle {
  data: TagData;
  children?: TagNode[];
  // depth: number might be a useful one
}

export const prepareTags = (
  tags: TagData[],
  count: number
): HierarchyNode<TagData> => {
  /**
   * Assign the group name to each tag.
   * Remove tags with no group.
   * Make sure that the tags are sorted before selecting the top n.
   * Nest into a hierarchy
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
   * to be assignable to TagData, but it just has children.
   */
  return d3
    .hierarchy<TagData>(data as unknown as TagData)
    .sum((d) => d.answer_score);
};

export interface Props {
  width: number;
  height: number;
  count: number;
  tags: TagData[];
}

/**
 * Do all of the data formatting and D3 computations here.
 */
export const usePackLayout = ({
  width,
  height,
  count,
  tags,
}: Props): HierarchyCircularNode<TagData> => {
  /**
   * Nodes depend on the count and tags, but not the size.
   */
  const nodes = useMemo(() => prepareTags(tags, count), [tags, count]);

  /**
   * Layout depends on the size.
   */
  const packLayout = useMemo(
    () => d3.pack<TagData>().size([width, height]).padding(PACK_LAYOUT_PADDING),
    [width, height]
  );

  /**
   * Apply the layout to the nodes.
   */
  return packLayout(nodes);
};
