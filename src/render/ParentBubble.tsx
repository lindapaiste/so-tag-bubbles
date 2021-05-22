import React from "react";
import { HierarchyCircularNode } from "d3";
import { Bubble } from "./Bubble";
import { UserTag } from "../data/types";

interface ParentBubbleProps {
  parent: HierarchyCircularNode<UserTag>;
  isSelected: boolean;
  select?: () => void;
  deselect?: () => void;
  colorBasis: number;
}

export const ParentBubble = ({
  parent,
  isSelected,
  select,
  deselect,
  colorBasis,
}: ParentBubbleProps): JSX.Element => {
  const { children } = parent;
  return (
    <div
      className={`group ${isSelected ? "selected" : ""}`}
      onMouseLeave={deselect}
    >
      <Bubble
        className="tag-bubble"
        onMouseEnter={select}
        node={parent}
        colorValue={colorBasis}
      />
      {!!children &&
        children.map((node, i) => (
          <Bubble
            className="tag-bubble child"
            onMouseEnter={select}
            node={node}
            colorValue={colorBasis + (children.length - i) / children.length}
          />
        ))}
    </div>
  );
};
