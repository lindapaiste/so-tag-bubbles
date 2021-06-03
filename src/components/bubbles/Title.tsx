import React from "react";
import clsx from "clsx";
import { useClampFontSize } from "./ZoomContext";
import { TagNode } from "../../services/d3/usePackLayout";
import { CHARACTER_WIDTH_RATIO } from "../../config";
const styles = require("./bubbles.module.css");

export interface TitleProps {
  node: TagNode;
  isActive: boolean;
}

/**
 * Approximates the length of text based on the number of characters.
 * Figure out the radius of the text rectangle based on the number of
 * lines and letters per line.  Then can scale that to fit the circle.
 */
export const Title = ({ node, isActive }: TitleProps): JSX.Element => {
  const { r: radius, data } = node;
  const { tag_name: text = "" } = data;
  const isLeaf = node.children === undefined;

  const words = text.toString().split("-");
  const maxWordLen = Math.max(...words.map((w) => w.length));
  const x = CHARACTER_WIDTH_RATIO * maxWordLen;
  const y = words.length;
  const textR = Math.sqrt(x * x + y * y);

  const titleSize = useClampFontSize((2 * radius) / textR);

  // TODO: better solutions for multi-line and short names
  const detailSize = useClampFontSize(
    Math.min(
      //.5 * titleSize,
      0.4 * radius
    )
  );

  return (
    <div
      className={styles.title}
      style={{
        fontSize: `${titleSize}px`,
        lineHeight: `${titleSize}px`,
      }}
    >
      {words.map((word) => (
        <span key={word}>{word}</span>
      ))}
      {isLeaf && (
        <div
          className={clsx(
            styles.details,
            isActive ? styles.visible : styles.hidden
          )}
          style={{
            fontSize: `${detailSize}px`,
            lineHeight: `${detailSize}px`,
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
