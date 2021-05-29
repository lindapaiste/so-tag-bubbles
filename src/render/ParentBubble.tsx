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
  const onClick = isSelected ? deselect : select;
  return (
    <div className={`group ${isSelected ? "selected" : ""}`}>
      <Bubble
        className="tag-bubble parent"
        onClick={onClick}
        node={parent}
        colorValue={colorBasis}
      />
      {!!children &&
        children.map((node, i) => (
          <Bubble
            key={node.data.tag_name}
            className="tag-bubble child"
            onClick={onClick}
            node={node}
            colorValue={colorBasis + (children.length - i) / children.length}
          />
        ))}
    </div>
  );
};
