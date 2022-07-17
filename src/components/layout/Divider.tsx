import * as d3 from "d3";
import { FC } from "react";
import { colorInterpolator } from "../bubbles/Bubble";

/**
 * Decorative divider element using the colors of the tag bubbles.
 */

const sizeInterpolator = d3.scaleLinear().domain([0, 2]).rangeRound([8, 16]);

const Circle: FC<{ value: number }> = ({ value }) => {
  const size = sizeInterpolator(value);
  return (
    <div
      className="rounded-full m-2"
      style={{
        background: colorInterpolator(2 - value),
        width: size,
        height: size,
      }}
    />
  );
};

export const Divider: FC = () => {
  const leading = d3.range(0, 2, 0.3);
  const trailing = leading.slice(0, -1).reverse();
  return (
    <div className="flex justify-center items-center">
      {leading.map((value) => (
        <Circle value={value} key={`leading-${value}`} />
      ))}
      {trailing.map((value) => (
        <Circle value={value} key={`trailing-${value}`} />
      ))}
    </div>
  );
};
