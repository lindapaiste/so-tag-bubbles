import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Bubble } from "./Bubble";
import { Title } from "./Title";
import { ChildBubble } from "./ChildBubble";
import { TagNode } from "../../services/d3/usePackLayout";

const styles = require("./bubbles.module.scss");

interface ParentBubbleProps {
  node: TagNode;
  isSelected: boolean;
  select: () => void;
  deselect: () => void;
  clearSelection: () => void;
  colorBasis: number;
  loaded?: boolean;
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
  clearSelection,
  colorBasis,
  loaded = true,
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
  /**
   * Control hover using state rather than pure CSS to support keyboard control.
   */
  const [isHovered, setIsHovered] = useState(false);

  /**
   * MDN recommends setting focus on the element from state using a ref:
   * https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_accessibility
   */
  const liRef = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={liRef}
      role="treeitem"
      aria-expanded={isSelected}
      aria-labelledby={`tag-group-${node.data.tag_name}-name`}
      className="transition-all duration-500"
    >
      <ul role="group">
        <Bubble
          className={clsx(
            styles.parentBubble,
            // fade out background when selected
            isSelected && "opacity-30 transition-opacity duration-700",
            // hover effect before selection
            // Note: Tailwind bg-opacity only works if using tailwind colors
            isHovered && !isSelected && "scale-95 opacity-80",
            // cursor style
            isSelected ? "cursor-zoom-out" : "cursor-zoom-in",
            // load in effect
            loaded ? "scale-1" : "scale-0"
          )}
          node={node}
          colorValue={colorBasis}
          tabIndex={isSelected ? -1 : 0}
          // hover state
          onMouseEnter={() => setIsHovered(true)}
          onFocus={() => {
            setIsHovered(true);
            // clear selection of previous parent, if needed
            clearSelection();
          }}
          onMouseLeave={() => setIsHovered(false)}
          onBlur={() => setIsHovered(false)}
          // selecting
          onClick={(e) => {
            e.stopPropagation(); // override background click
            (isSelected ? deselect : select)();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") select();
          }}
        >
          <Title
            node={node}
            isActive={false}
            className={clsx(
              // hide parent title when children are visible
              isSelected && "scale-0 opacity-0"
            )}
          />
        </Bubble>
      </ul>
      <ul role="group">
        {children.map((childNode, i) => (
          <ChildBubble
            key={childNode.data.tag_name}
            isActive={childNode.data.tag_name === activeTagName}
            isSelected={isSelected}
            setActiveTagName={setActiveTagName}
            node={childNode}
            colorValue={colorBasis + (children.length - i) / children.length}
            // children can be tabbed through only when parent is selected
            tabIndex={isSelected ? 0 : -1}
          />
        ))}
      </ul>
    </li>
  );
};
