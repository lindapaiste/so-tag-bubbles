import React, { useState } from "react";
import { ParentBubble } from "./ParentBubble";
import { ZoomContext } from "./ZoomContext";
import { TagNode } from "../../services/d3/usePackLayout";
import { Size } from "../../services/window/useWindowSize";
import styles from "./bubbles.module.css";

export interface BubbleCloudProps extends Size {
  root: TagNode;
}

export const BubbleCloud = ({
  width,
  height,
  root,
}: BubbleCloudProps): JSX.Element => {
  /**
   * Store the currently selected parent node, or null if none.
   */
  const [selected, setSelected] = useState<TagNode | null>(null);

  /**
   * The parent bubbles are the children of the root node.
   */
  const groups = root.children ?? [];

  /**
   * Zoom in on the selected node based on its size.
   * Intend for it to fill 80% of the width or height,
   * But cap the zoom at 5x for smaller nodes.
   */
  const zoomScale = selected
    ? Math.min(
        (0.8 * Math.min(width, height)) / (2 * selected.r), // 80% of canvas
        5 // maximum of 5x
      )
    : 1;

  /**
   * Create a string for the CSS transform.
   * Zoom in on the selected node and also translate
   * so that it is in the center of the screen.
   */
  const transform = selected
    ? `scale(${zoomScale}) translate(${0.5 * width - selected.x}px, ${
        0.5 * height - selected.y
      }px)`
    : undefined;

  /**
   * Render the zoom scale provider, the container div,
   * and an array of parent bubbles.
   */
  return (
    <ZoomContext.Provider value={zoomScale}>
      <div
        className={styles.cloud}
        style={{ width, height, transform }}
        onClick={() => setSelected(null)}
      >
        {groups.map((node, i) => (
          <ParentBubble
            key={`group-${node.data.tag_name}`}
            node={node}
            select={() => setSelected(node)}
            deselect={() => setSelected(null)}
            isSelected={selected?.data.tag_name === node.data.tag_name}
            colorBasis={(groups.length - i) / groups.length}
          />
        ))}
      </div>
    </ZoomContext.Provider>
  );
};
