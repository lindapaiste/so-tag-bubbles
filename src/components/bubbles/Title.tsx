import { useContext, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { ZoomContext } from "./ZoomContext";
import { TagNode } from "../../services/d3/usePackLayout";
import { BUBBLE_MINIMUM_FONT_SIZE, CHARACTER_WIDTH_RATIO } from "../../config";
import { vmin } from "../../services/units";

const styles = require("./bubbles.module.scss");

export interface TitleProps {
  node: TagNode;
  isActive: boolean;
  className?: string;
}

/**
 * Approximates the length of text based on the number of characters.
 * Figure out the radius of the text rectangle based on the number of
 * lines and letters per line.  Then can scale that to fit the circle.
 *
 * Use a local state because need to enforce the minimum font size
 * AFTER the initial render due to SSR hydration.
 */
export const Title = ({
  node,
  isActive,
  className,
}: TitleProps): JSX.Element => {
  const { r: radius, data } = node;
  const { tag_name: text = "" } = data;
  const words = text.toString().split("-");

  const isLeaf = !node.children;

  // TODO: better solutions for multi-line and short names
  const detailBase = 0.4 * node.r;
  const titleBase = useMemo(() => {
    const maxWordLen = Math.max(...words.map((w) => w.length));
    const x = CHARACTER_WIDTH_RATIO * maxWordLen;
    const y = words.length;
    const textR = Math.sqrt(x * x + y * y);
    return (2 * radius) / textR;
  }, [node]);

  const [titleSize, setTitleSize] = useState(titleBase);
  const [detailSize, setDetailSize] = useState(detailBase);

  const scale = useContext(ZoomContext);

  useEffect(() => {
    // okay to access window directly as long as it's inside of a useEffect
    const min = Math.min(window.innerHeight, window.innerWidth);
    const minVminSize = (100 * BUBBLE_MINIMUM_FONT_SIZE) / (min * scale);
    setTitleSize(Math.max(titleBase, minVminSize));
    setDetailSize(Math.max(detailBase, minVminSize));
  }, [scale]);

  return (
    <div
      id={`tag${isLeaf ? "" : "-group"}-${text}-name`}
      className={clsx(
        "h-full",
        "flex flex-col items-center justify-center",
        "transition-all duration-500",
        "text-center leading-none",
        className
      )}
      style={{
        fontSize: vmin(titleSize),
      }}
    >
      {words.map((word) => (
        <span key={word}>{word}</span>
      ))}
      {isLeaf && (
        <div
          id={`tag-${text}-details`}
          aria-hidden={!isActive}
          // Note: use an arbitrarily high max height for proper transition
          className={clsx(
            "transition-all duration-500",
            isActive
              ? "transform scale-y-100 max-h-40"
              : "transform scale-y-0 max-h-0"
          )}
          style={{
            fontSize: vmin(detailSize),
          }}
        >
          <div>
            <span>{data.answer_score}</span>{" "}
            <span className={styles.label}>Score</span>
          </div>
          <div>
            <span>{data.answer_count}</span>{" "}
            <span className={styles.label}>Answers</span>
          </div>
        </div>
      )}
    </div>
  );
};
