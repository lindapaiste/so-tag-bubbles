import React from "react";
import clsx from "clsx";
import { useClampFontSize } from "./ZoomContext";
import { TagNode } from "../../services/d3/usePackLayout";
import styles from "./bubbles.module.css";

export interface TitleProps {
  node: TagNode;
  isActive: boolean;
}

/**
 * Approximates the length of text based on the number of characters.
 * Could use canvas measure to get the exact width, but that level of accuracy is not required.
 */
export const Title = ({ node, isActive }: TitleProps): JSX.Element => {
  const { r: radius, data } = node;
  const { tag_name: text = "" } = data;
  const isLeaf = node.children === undefined;

  const words = text.split("-");
  const maxWordLen = Math.max(...words.map((w) => w.length));
  // size is primarily based on width of longest word
  // combined height cannot be more than some % of radius
  // TODO: base this on approximate diagonal of the text as radius
  const titleSize = useClampFontSize(
    Math.min(
      (4.1 * radius) / maxWordLen, // base size
      (1.5 * radius) / words.length // max size by height
    )
  );
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