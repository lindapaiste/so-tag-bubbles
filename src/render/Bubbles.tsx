import React, { CSSProperties, Fragment, useState } from "react";
import topAnswerTags from "../data/my-top-answer-tags.json";
import { UserTag } from "../types";
import * as d3 from "d3";
import { HierarchyCircularNode, PackCircle } from "d3";
import "./bubbles.css";
import groupingMap from "../data/groupings.json";
/** based on https://codesandbox.io/s/d3-react-bubble-chart-92lfm?file=/src/index.js:3059-4196 */

const width = window.innerWidth;
const height = window.innerHeight;

const mapped = topAnswerTags.items
  .map((obj) => ({
    ...obj,
    value: obj.answer_score,
    group: groupingMap[obj.tag_name] ?? ""
  }))
  .sort((a, b) => b.value - a.value)
  .filter((o) => o.group !== "")
  .slice(0, 40);

const data = {
  children: Array.from(
    d3.group(mapped, (d) => d.group),
    ([group, children]) => ({ tag_name: group, children })
  )
};

const nodes = d3.hierarchy<UserTag>(data).sum((d) => d.answer_score);

const packLayout = d3.pack().size([width, height]).padding(10);

const root = packLayout(nodes) as HierarchyCircularNode<UserTag>; //kill the unknown

console.log(root);

const colorInterpolator = d3
  .scaleSequential<string, number>()
  .domain([0, 1.3, 2])
  .range(["#0fffaa", "#b797ff", "#fa97ff"]);

// approximates the length of text based on the number of characters
// can use canvas measure to get the exact width, but that level of accuracy is not required
const Title = ({ radius, text = "" }: { radius: number; text: string }) => {
  const split = text.split("-");
  const maxWordLen = Math.max(...split.map((w) => w.length));
  // enforce minimum of 14 px
  // combined height cannot be more than some % of radius
  let fontSize = Math.max(
    10, // min size
    Math.min(
      (3 * radius) / maxWordLen, // base size
      (1.5 * radius) / split.length // max size by height
    )
  );
  return (
    <div
      className="title"
      style={{
        fontSize: `${fontSize}px`,
        lineHeight: `${fontSize}px`
      }}
    >
      {split.map((word) => (
        <span key={word}>{word}</span>
      ))}
    </div>
  );
};

interface BubbleProps {
  leaf: HierarchyCircularNode<UserTag>;
  isSelected: boolean;
  select?: () => void;
  deselect?: () => void;
  colorBasis: number;
}

const circleStyle = (circle: PackCircle): CSSProperties => ({
  top: circle.y - circle.r,
  left: circle.x - circle.r,
  width: 2 * circle.r,
  height: 2 * circle.r,
  borderRadius: circle.r
});

const Bubble = ({
  leaf,
  isSelected,
  select,
  deselect,
  colorBasis
}: BubbleProps) => {
  return (
    <div
      className={`group ${isSelected ? "selected" : ""}`}
      onMouseLeave={deselect}
    >
      <div
        className={"tag-bubble"}
        style={{
          ...circleStyle(leaf),
          background: colorInterpolator(colorBasis)
        }}
        onMouseEnter={select}
      >
        <Title text={leaf.data.tag_name} radius={leaf.r} />
      </div>
      {!!leaf.children &&
        leaf.children.map((node, i) => (
          <div
            className={"tag-bubble child"}
            onMouseEnter={select}
            style={{
              ...circleStyle(node),
              background: colorInterpolator(
                colorBasis + (leaf.children.length - i) / leaf.children.length
              )
            }}
          >
            <Title text={node.data.tag_name} radius={node.r} />
          </div>
        ))}
    </div>
  );
};

const BubbleCloud = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      <div
        className={`bubbles-container ${selected === null ? "" : "zoomed"}`}
        style={{ width, height }}
      >
        {(root.children || []).map((node, i) => (
          <Bubble
            key={`group-${node.data.tag_name}`}
            leaf={node}
            select={() => setSelected(node.data.tag_name)}
            deselect={() => setSelected(null)}
            isSelected={selected === node.data.tag_name}
            colorBasis={(root.children?.length - i) / root.children?.length}
          />
        ))}
      </div>
    </>
  );
};

export default BubbleCloud;
