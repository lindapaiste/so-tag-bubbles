import { HierarchyCircularNode } from "d3";
import React, { useState } from "react";
import { ParentBubble } from "./ParentBubble";
import { UserTag } from "../data/types";
import "./bubbles.css";
import { ZoomContext } from "./ZoomContext";

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

  const zoomScale = selected
    ? Math.min(
        (0.8 * Math.min(width, height)) / (2 * selected.r), // 80% of canvas
        5 // maximum of 5x
      )
    : 1;

  const transform = selected
    ? `scale(${zoomScale}) translate(${0.5 * width - selected.x}px, ${
        0.5 * height - selected.y
      }px)`
    : undefined;

  return (
    <ZoomContext.Provider value={zoomScale}>
      <div
        className={`bubbles-container ${selected === null ? "" : "zoomed"}`}
        style={{ width, height, transform }}
        onClick={() => setSelected(null)}
      >
        {!!groups &&
          groups.map((node, i) => (
            <ParentBubble
              key={`group-${node.data.tag_name}`}
              node={node}
              select={() => setSelected(node)}
              deselect={() => setSelected(null)}
              isSelected={selected?.data.tag_name === node.data.tag_name}
              colorBasis={(groups.length - i) / groups.length}
            />
          ))}
      </div>
    </ZoomContext.Provider>
  );
};
