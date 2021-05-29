import { HierarchyCircularNode } from "d3";
import React, { useState } from "react";
import { ParentBubble } from "./ParentBubble";
import { UserTag } from "../data/types";
import "./bubbles.css";

export interface BubbleCloudProps {
  width: number;
  height: number;
  root: HierarchyCircularNode<UserTag>;
}

export const BubbleCloud = ({
  width,
  height,
  root,
}: BubbleCloudProps): JSX.Element => {
  const [selected, setSelected] =
    useState<HierarchyCircularNode<UserTag> | null>(null);

  const groups = root.children;

  const transformToNode = (node: HierarchyCircularNode<UserTag>): string => {
    const scale = (0.8 * Math.min(width, height)) / (2 * node.r);
    const translateX = 0.5 * width - node.x;
    const translateY = 0.5 * height - node.y;
    return `scale(${Math.min(
      scale,
      5
    )}) translate(${translateX}px, ${translateY}px)`;
  };
  const transform = selected !== null ? transformToNode(selected) : undefined;

  return (
    <>
      <div
        className={`bubbles-container ${selected === null ? "" : "zoomed"}`}
        style={{ width, height, transform }}
      >
        <div className="backdrop" onClick={() => setSelected(null)} />
        {!!groups &&
          groups.map((node, i) => (
            <ParentBubble
              key={`group-${node.data.tag_name}`}
              parent={node}
              select={() => setSelected(node)}
              deselect={() => setSelected(null)}
              isSelected={selected?.data.tag_name === node.data.tag_name}
              colorBasis={(groups.length - i) / groups.length}
            />
          ))}
      </div>
    </>
  );
};
