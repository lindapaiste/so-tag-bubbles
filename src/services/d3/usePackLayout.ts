import * as d3 from "d3";
import { HierarchyCircularNode, HierarchyNode, PackCircle } from "d3";
import { useMemo } from "react";
import groupingMap from "./tag-groupings.json";
import { UserTag } from "../stackoverflow/types";
import {
  MAX_CHILDREN_PER_BUBBLE,
  MINIMUM_GROUP_SCORE,
  PACK_LAYOUT_PADDING,
  TAG_COUNT,
} from "../../config";

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

/**
 * Drop non-serializable properties from the nodes before returning.
 * Allows for data to be inspected in dev tools.
 */
export const toSerializable = (
  node: HierarchyCircularNode<TagData>
): TagNode & { value?: number } => {
  const { data, x, y, r, value, children } = node;
  return { data, x, y, r, value, children: children?.map(toSerializable) };
};

/**
 * Sort & size based on the sum of answers and upvotes
 */
const score = (tag: TagData): number =>
  tag.answer_score + tag.answer_count;

export const prepareTags = (tags: TagData[]): HierarchyNode<TagData> => {
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
    .sort((a, b) => score(b) - score(a))
    .filter((o) => o.group !== "")
    .slice(0, TAG_COUNT);

  /**
   * Create parent nodes for each group.
   * Limit the children based on number and the parents based on score.
   */
  const data = {
    children: Array.from(
      d3.group(mapped, (d) => d.group),
      ([group, children]) => ({
        tag_name: group,
        children: children.slice(0, MAX_CHILDREN_PER_BUBBLE),
      })
    ),
  };

  /**
   * Note: have to use a type assertion because D3 expects the root node
   * to be assignable to TagData, but it just has children.
   */
  return d3
    .hierarchy<TagData>(data as unknown as TagData)
    .sum(score);
};

/**
 * Do all of the data formatting and D3 computations here.
 * Instead of returning the root node, return an array of parent groups.
 *
 * Return the layout for a 100x100 size -- this can be converted to vmin units.
 */
export const usePackLayout = (tags: TagData[]): TagNode[] => {
  /**
   * Nodes depend on the tags, but not the size.
   */
  const nodes = useMemo(() => prepareTags(tags), [tags]);

  /**
   * Layout depends on the size.
   */
  const packLayout = useMemo(
    () => d3.pack<TagData>().size([100, 100]).padding(PACK_LAYOUT_PADDING),
    []
  );

  /**
   * Apply the layout to the nodes.
   * Drop unneeded data.
   * Remove tiny bubbles -- should not impact layout.
   */
  return (packLayout(nodes).children || [])
    .filter((g) => g.value === undefined || g.value >= MINIMUM_GROUP_SCORE)
    .map(toSerializable);
};
