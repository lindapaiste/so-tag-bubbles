import React from "react";
import { useClampFontSize } from "./ZoomContext";
import { HierarchyCircularNode } from "d3";
import { UserTag } from "../data/types";

export interface TitleProps {
  node: HierarchyCircularNode<UserTag>;
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
      className="title"
      style={{
        fontSize: `${titleSize}px`,
        lineHeight: `${titleSize}px`,
      }}
    >
      {words.map((word) => (
        <span className="word" key={word}>
          {word}
        </span>
      ))}
      {isLeaf && (
        <div
          className={`details ${isActive ? "visible" : "hidden"}`}
          style={{
            fontSize: `${detailSize}px`,
            lineHeight: `${detailSize}px`,
          }}
        >
          <div className="score">
            <span className="number">{data.answer_score}</span>{" "}
            <span className="label">Score</span>
          </div>
          <div className="answers">
            <span className="number">{data.answer_count}</span>{" "}
            <span className="label">Answers</span>
          </div>
        </div>
      )}
    </div>
  );
};
