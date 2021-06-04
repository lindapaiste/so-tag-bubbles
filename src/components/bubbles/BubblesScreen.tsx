import React, { useState } from "react";
import {
  TagData,
  TagNode,
  usePackLayout,
} from "../../services/d3/usePackLayout";
import { BubbleCloud } from "./BubbleCloud";
import { CSSTransition } from "react-transition-group";
import { Size } from "../../services/window/useWindowSize";
const styles = require("./bubbles.module.css");

export interface BubblesScreenProps extends Size {
  tags: TagData[];
}

/**
 * Pure render component so that data fetching can be done via getServerSideProps
 * Want h1/h2 titles to be effected by zoom state, so
 * need to lift the selection state up to this component.
 */
export const BubblesScreen = ({
  width,
  height,
  tags,
}: BubblesScreenProps): JSX.Element => {
  /**
   * Create the layout.
   * The parent bubbles are the children of the root node.
   */
  const nodes = usePackLayout({
    width,
    height,
    tags,
  });

  /**
   * Store the currently selected parent node, or null if none.
   */
  const [selected, setSelected] = useState<TagNode | null>(null);

  return (
    <CSSTransition
      appear
      in
      timeout={500}
      classNames={{
        appear: "appear",
        appearActive: "appearActive",
        appearDone: "appearDone",
      }}
    >
      <CSSTransition
        in={selected !== null}
        timeout={500}
        classNames={{
          enter: styles.zoomEnter,
          enterActive: styles.zoomEnterActive,
          enterDone: styles.zoomEnterDone,
          exit: styles.zoomExit,
          exitActive: styles.zoomExitActive,
          exitDone: styles.zoomExitDone,
        }}
      >
        <div className={styles.container}>
          <div className={styles.topLeft}>
            <h1>Linda Paiste</h1>
          </div>
          <CSSTransition
            in={tags.length > 0}
            appear={tags.length > 0}
            timeout={500}
            classNames={{
              enter: styles.loadedEnter,
              enterActive: styles.loadedEnterActive,
            }}
          >
            <BubbleCloud
              width={width}
              height={height}
              nodes={nodes}
              selected={selected}
              onSelect={setSelected}
            />
          </CSSTransition>
          <div className={styles.bottomRight}>
            <h2>
              Top{" "}
              <a
                className={styles.underlined}
                href="https://stackoverflow.com/users/10431574/linda-paiste"
              >
                StackOverflow
              </a>{" "}
              Answer Tags
            </h2>
          </div>
        </div>
      </CSSTransition>
    </CSSTransition>
  );
};
