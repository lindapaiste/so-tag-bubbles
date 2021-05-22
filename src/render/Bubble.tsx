import * as d3 from "d3";
import { HierarchyCircularNode, PackCircle } from "d3";
import React, { CSSProperties } from "react";
import { UserTag } from "../data/types";
import { Title } from "./Title";

/**
 * Create the interpolator to map from values 0-2.
 * Where 0-1 are the parents and 2 is the largest child.
 */
const colorInterpolator = d3
  .scaleSequential<string, number>()
  .domain([0, 1.3, 2])
  .range(["#0fffaa", "#b797ff", "#fa97ff"]);

/**
 * Convert d3 object properties to a CSS style
 * with absolute position and defined size.
 */
const circleStyle = (circle: PackCircle): CSSProperties => ({
  top: circle.y - circle.r,
  left: circle.x - circle.r,
  width: 2 * circle.r,
  height: 2 * circle.r,
  borderRadius: circle.r,
});

/**
 * Basic bubble which can be used for the parent or the child.
 * Creates the size, color, position, and title.
 */
export interface BubbleProps {
  node: HierarchyCircularNode<UserTag>;
  onMouseEnter?: () => void;
  className?: string;
  colorValue: number;
}

export const Bubble = ({
  node,
  onMouseEnter,
  className,
  colorValue,
}: BubbleProps): JSX.Element => (
  <div
    className={className}
    onMouseEnter={onMouseEnter}
    style={{
      ...circleStyle(node),
      background: colorInterpolator(colorValue),
    }}
  >
    <Title text={node.data.tag_name} radius={node.r} />
  </div>
);
