import * as d3 from "d3";
import { PackCircle } from "d3";
import React, { CSSProperties, FC } from "react";

/**
 * Create the interpolator to map from values 0-2.
 * Where 0-1 are the parents and 2 is the smallest child.
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
 * Creates the size, color, and position.
 * Titles should be passed as children.
 */
export type BubbleProps = {
  node: PackCircle;
  colorValue: number;
} & JSX.IntrinsicElements["div"];

export const Bubble: FC<BubbleProps> = ({
  node,
  colorValue,
  children,
  ...props
}) => {
  return (
    <div
      {...props}
      style={{
        ...circleStyle(node),
        background: colorInterpolator(colorValue),
      }}
    >
      {children}
    </div>
  );
};
