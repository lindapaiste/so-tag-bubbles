import React, { useEffect, useState } from "react";
import { Bubble } from "./Bubble";
import { Title } from "./Title";
import { ChildBubble } from "./ChildBubble";
import { TagNode } from "../../services/d3/usePackLayout";
import clsx from "clsx";
const styles = require("./bubbles.module.scss");

interface ParentBubbleProps {
  node: TagNode;
  isSelected: boolean;
  select: () => void;
  deselect: () => void;
  colorBasis: number;
}

/**
 * Render a parent bubble and all of its children.
 * Stores the name of the selected child.
 */
export const ParentBubble = ({
  node,
  isSelected,
  select,
  deselect,
  colorBasis,
}: ParentBubbleProps): JSX.Element => {
  const { children = [] } = node;
  /**
   * The tag name of the active child, or null if none selected.
   */
  const [activeTagName, setActiveTagName] = useState<string | null>(null);
  /**
   * Clear active tag when the group is no longer selected.
   */
  useEffect(() => {
    if (!isSelected) setActiveTagName(null);
  }, [isSelected]);

  return (
    <div className="transition-all duration-500">
      <Bubble
        className={clsx(
          styles.parentBubble,
          // fade out background when selected
          isSelected && "opacity-30 transition-opacity duration-700",
          // hover effect before selection
          // Note: Tailwind bg-opacity only works if using tailwind colors
          isSelected || "transform hover:scale-95 hover:opacity-80"
        )}
        onClick={(e) => {
          e.stopPropagation(); // override background click
          isSelected ? deselect() : select();
        }}
        node={node}
        colorValue={colorBasis}
      >
        <Title
          node={node}
          isActive={false}
          className={clsx(
            // hide parent title when children are visible
            isSelected && "opacity-0 transform scale-0"
          )}
        />
      </Bubble>
      {children.map((childNode, i) => (
        <ChildBubble
          key={childNode.data.tag_name}
          isActive={childNode.data.tag_name === activeTagName}
          isSelected={isSelected}
          setActiveTagName={setActiveTagName}
          node={childNode}
          colorValue={colorBasis + (children.length - i) / children.length}
        />
      ))}
    </div>
  );
};
