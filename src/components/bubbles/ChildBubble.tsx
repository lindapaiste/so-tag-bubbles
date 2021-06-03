import React, { FC } from "react";
import { Title } from "./Title";
import { Bubble, BubbleProps } from "./Bubble";
import { TagNode } from "../../services/d3/usePackLayout";
import clsx from "clsx";
const styles = require("./bubbles.module.css");

export type ChildBubbleProps = BubbleProps & {
  node: TagNode;
  isActive: boolean;
  setActiveTagName?: React.Dispatch<React.SetStateAction<string | null>>;
};

/**
 * Renders the child bubble along with its title texts.
 * Handles activation and deactivation.
 */
export const ChildBubble: FC<ChildBubbleProps> = ({
  node,
  isActive,
  setActiveTagName,
  ...bubbleProps
}) => {
  const tag = node.data.tag_name;

  return (
    <Bubble
      {...bubbleProps}
      node={node}
      className={clsx(styles.tagBubble, styles.child)}
      // prevent parent bubble clicks -- must click outside the circle
      onClick={(e) => e.stopPropagation()}
      // activate on hover
      onMouseEnter={() => setActiveTagName?.(tag)}
      // deactivate on end hover, only if it's still active
      onMouseLeave={() =>
        setActiveTagName?.((current) => (current === tag ? null : current))
      }
    >
      <Title node={node} isActive={isActive} />
    </Bubble>
  );
};
