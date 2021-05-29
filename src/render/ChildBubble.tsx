import React, { FC } from "react";
import { Title } from "./Title";
import { Bubble, BubbleProps } from "./Bubble";

/**
 * Basic bubble which can be used for the parent or the child.
 * Creates the size, color, position, and title.
 */
export type ChildBubbleProps = BubbleProps & {
  isActive: boolean;
  setActiveTagName: React.Dispatch<React.SetStateAction<string | null>>;
};

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
      className={"tag-bubble child"}
      // prevent parent bubble clicks -- must click outside the circle
      onClick={(e) => e.stopPropagation()}
      // activate on hover
      onMouseEnter={() => setActiveTagName(tag)}
      // deactivate on end hover, only if it's still active
      onMouseLeave={() =>
        setActiveTagName((current) => (current === tag ? null : current))
      }
    >
      <Title node={node} isActive={isActive} />
    </Bubble>
  );
};
