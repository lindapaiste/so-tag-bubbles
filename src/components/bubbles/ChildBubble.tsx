import { FC } from "react";
import { Title } from "./Title";
import { Bubble, BubbleProps } from "./Bubble";
import { TagNode } from "../../services/d3/usePackLayout";
import clsx from "clsx";
const styles = require("./bubbles.module.scss");

export type ChildBubbleProps = BubbleProps & {
  /**
   * The node for this tag -- determines size, placement, and titles.
   */
  node: TagNode;
  /**
   * If this child is currently being hovered or has been tapped.
   */
  isActive: boolean;
  /**
   * If this child is part of the currently selected parent group.
   */
  isSelected: boolean;
  /**
   * Callback to update the active child tag.
   */
  setActiveTagName?: React.Dispatch<React.SetStateAction<string | null>>;
};

/**
 * Renders the child bubble along with its title texts.
 * Handles activation and deactivation.
 */
export const ChildBubble: FC<ChildBubbleProps> = ({
  node,
  isActive,
  isSelected,
  setActiveTagName,
  ...bubbleProps
}) => {
  const tag = node.data.tag_name;

  const onMouseEnter = () => setActiveTagName?.(tag);
  const onMouseLeave = () =>
    setActiveTagName?.((current) => (current === tag ? null : current));

  return (
    <Bubble
      {...bubbleProps}
      node={node}
      className={clsx(
        styles.childBubble,
        isSelected ? "transform scale-1" : "transform scale-0",
        isSelected && "duration-700",
        "cursor-default"
      )}
      // prevent parent bubble clicks -- must click outside the circle
      onClick={(e) => e.stopPropagation()}
      // activate on hover
      onMouseEnter={onMouseEnter}
      onFocus={onMouseEnter}
      // deactivate on end hover, only if it's still active
      onMouseLeave={onMouseLeave}
      onBlur={onMouseLeave}
      // aria attributes
      aria-selected={isSelected}
      aria-hidden={!isSelected}
      aria-labelledby={`tag-${tag}-name`}
      aria-details={`tag-${tag}-details`}
    >
      <Title
        node={node}
        isActive={isActive}
        className={clsx(
          isSelected ? "transform scale-1" : "transform scale-0",
          isSelected && "delay-200"
        )}
      />
    </Bubble>
  );
};
