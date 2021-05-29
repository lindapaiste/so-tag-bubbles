import React, { useEffect, useState } from "react";
import { HierarchyCircularNode } from "d3";
import { Bubble } from "./Bubble";
import { UserTag } from "../data/types";
import { Title } from "./Title";
import { ChildBubble } from "./ChildBubble";

interface ParentBubbleProps {
  node: HierarchyCircularNode<UserTag>;
  isSelected: boolean;
  select: () => void;
  deselect: () => void;
  colorBasis: number;
}

export const ParentBubble = ({
  node,
  isSelected,
  select,
  deselect,
  colorBasis,
}: ParentBubbleProps): JSX.Element => {
  const { children } = node;

  const [activeTagName, setActiveTagName] = useState<string | null>(null);
  // Clear active tag when the group is no longer selected.
  useEffect(() => {
    if (!isSelected) setActiveTagName(null);
  }, [isSelected]);

  return (
    <div className={`group ${isSelected ? "selected" : ""}`}>
      <Bubble
        className="tag-bubble parent"
        onClick={(e) => {
          e.stopPropagation(); // override background click
          isSelected ? deselect() : select();
        }}
        node={node}
        colorValue={colorBasis}
      >
        <Title node={node} isActive={false} />
      </Bubble>
      {!!children &&
        children.map((childNode, i) => (
          <ChildBubble
            key={childNode.data.tag_name}
            isActive={childNode.data.tag_name === activeTagName}
            setActiveTagName={setActiveTagName}
            node={childNode}
            colorValue={colorBasis + (children.length - i) / children.length}
          />
        ))}
    </div>
  );
};
