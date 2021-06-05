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
    <div className={clsx(styles.group, isSelected ? styles.selected : "")}>
      <Bubble
        className={styles.parentBubble}
        onClick={(e) => {
          e.stopPropagation(); // override background click
          isSelected ? deselect() : select();
        }}
        node={node}
        colorValue={colorBasis}
      >
        <Title node={node} isActive={false} />
      </Bubble>
      {children.map((childNode, i) => (
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
