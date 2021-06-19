import { Dispatch, SetStateAction } from "react";
import clsx from "clsx";
import { ParentBubble } from "./ParentBubble";
import { ZoomContext } from "./ZoomContext";
import { TagNode } from "../../services/d3/usePackLayout";
import { Size } from "../../services/window/useWindowSize";

export interface BubbleCloudProps extends Size {
  nodes: TagNode[];
  selected: TagNode | null;
  onSelect: Dispatch<SetStateAction<TagNode | null>>;
  loaded?: boolean;
}

export const BubbleCloud = ({
  width,
  height,
  nodes,
  selected,
  onSelect,
  loaded = true,
}: BubbleCloudProps): JSX.Element => {
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
   * Keyboard event -- close selection on escape key
   * Note: must use keydown event because keypress does not fire for escape
   */
  const handleKey = (e: React.KeyboardEvent) => {
    console.log("handleKey");
    if (e.key === "Esc" || e.key === "Escape") {
      onSelect(null);
    }
  };

  /**
   * Render the zoom scale provider, the container div,
   * and an array of parent bubbles.
   */
  return (
    <ZoomContext.Provider value={zoomScale}>
      <ul
        role="tree"
        aria-label="Top Tags"
        className={clsx(
          "transition-transform duration-500",
          "w-screen h-screen",
          selected === null ? "cursor-default" : "cursor-zoom-out",
          "select-none"
        )}
        style={{ transform }}
        // exit selection by clicking on the background or pressing Esc
        onClick={() => onSelect(null)}
        onKeyDown={handleKey}
      >
        {nodes.map((node, i) => (
          <ParentBubble
            key={`group-${node.data.tag_name}`}
            node={node}
            select={() => onSelect(node)}
            // deselect is conditional -- won't set to null if another tag is selected/
            deselect={() =>
              onSelect((current) =>
                current?.data.tag_name === node.data.tag_name ? null : current
              )
            }
            // clear always sets to null
            clearSelection={() => onSelect(null)}
            isSelected={selected?.data.tag_name === node.data.tag_name}
            colorBasis={(nodes.length - i) / nodes.length}
            loaded={loaded}
          />
        ))}
      </ul>
    </ZoomContext.Provider>
  );
};
