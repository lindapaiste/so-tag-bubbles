import * as d3 from "d3";
import { PackCircle } from "d3";
import { CSSProperties, FC } from "react";
import clsx from "clsx";
import { percent } from "../../services/units";

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
  top: percent(circle.y - circle.r),
  left: percent(circle.x - circle.r),
  width: percent(2 * circle.r),
  height: percent(2 * circle.r),
});

/**
 * Basic bubble which can be used for the parent or the child.
 * Creates the size, color, and position.
 * Titles should be passed as children.
 */
export type BubbleProps = {
  /**
   * The x, y, and r of the circle as computed by D3.
   */
  node: PackCircle;
  /**
   * A number between 0 (green) and 2 (pink) to pass to the color interpolator.
   */
  colorValue: number;
} & /**
 * Can pass through any props to the underlying div.
 */ JSX.IntrinsicElements["li"];

export const Bubble: FC<BubbleProps> = ({
  node,
  colorValue,
  children,
  className,
  ...props
}) => (
  <li
    {...props}
    role="treeitem"
    className={clsx(
      "rounded-full",
      "absolute",
      "transition-all duration-500",
      "origin-center",
      "focus:outline-none",
      className
    )}
    style={{
      ...circleStyle(node),
      background: colorInterpolator(colorValue),
    }}
  >
    {children}
  </li>
);
