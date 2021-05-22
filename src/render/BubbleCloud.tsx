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
  const [selected, setSelected] = useState<string | null>(null);

  const groups = root.children;

  return (
    <>
      <div
        className={`bubbles-container ${selected === null ? "" : "zoomed"}`}
        style={{ width, height }}
      >
        {!!groups &&
          groups.map((node, i) => (
            <ParentBubble
              key={`group-${node.data.tag_name}`}
              parent={node}
              select={() => setSelected(node.data.tag_name)}
              deselect={() => setSelected(null)}
              isSelected={selected === node.data.tag_name}
              colorBasis={(groups.length - i) / groups.length}
            />
          ))}
      </div>
    </>
  );
};
