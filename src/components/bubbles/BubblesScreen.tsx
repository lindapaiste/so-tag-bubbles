import { KeyboardEvent, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import clsx from "clsx";
import {
  TagData,
  TagNode,
  usePackLayout,
} from "../../services/d3/usePackLayout";
import { BubbleCloud } from "./BubbleCloud";
import { useAfterMount } from "../../services/window/useAfterMount";
import { safeAccessWindow } from "../../services/window";

const styles = require("./bubbles.module.scss");

export interface BubblesScreenProps {
  tags: TagData[];
}

/**
 * Pure render component so that data fetching can be done via getServerSideProps
 * Want h1/h2 titles to be effected by zoom state, so
 * need to lift the selection state up to this component.
 */
export const BubblesScreen = ({ tags }: BubblesScreenProps): JSX.Element => {
  /**
   * Create the layout.
   * The parent bubbles are the children of the root node.
   */
  const nodes = usePackLayout(tags);

  /**
   * Store the currently selected parent node, or null if none.
   */
  const [selected, setSelected] = useState<TagNode | null>(null);

  /**
   * Move the bubbles into full view if clicked after scrolling.
   */
  useEffect(() => {
    safeAccessWindow()?.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [selected]);

  /**
   * Want to scale up from 0 starting at 0 on first render.
   */
  const [loaded, setLoaded] = useState(false);

  useAfterMount(() => setLoaded(true));

  /**
   * Keyboard event -- close selection on escape key
   * Note: must use keydown event because keypress does not fire for escape
   */
  const handleKey = (e: KeyboardEvent) => {
    if (e.key === "Esc" || e.key === "Escape") {
      setSelected(null);
    }
  };

  return (
    <CSSTransition
      appear
      in
      timeout={1000}
      classNames={{
        appear: styles.loading,
        appearActive: styles.loadingActive,
        appearDone: styles.loadingDone,
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
        <div
          className={clsx(
            "h-screen w-screen overflow-hidden",
            "relative flex",
            "font-benchnine font-bold uppercase",
            selected === null ? "cursor-default" : "cursor-zoom-out",
            "select-none"
          )}
          id={styles.container}
          // exit selection by clicking on the background or pressing Esc
          onClick={() => setSelected(null)}
          onKeyDown={handleKey}
          role="presentation" // not really sure what the best role is for a background cancel
        >
          <div
            className="absolute top-0 left-0 px-6 py-0 transition-all duration-500"
            id={styles.topLeft}
          >
            <h1
              className={clsx(
                "margin-0 font-normal",
                "transition-all duration-500",
                "flex flex-col"
              )}
            >
              Linda Paiste
            </h1>
          </div>
          <BubbleCloud
            nodes={nodes}
            selected={selected}
            onSelect={setSelected}
            loaded={loaded}
          />
          <div
            className="absolute bottom-0 right-0 px-12 py-6 transition-all duration-500"
            id={styles.bottomRight}
          >
            <h2 className="margin-0 font-normal transition-all duration-500">
              Top{" "}
              <a
                className={clsx(
                  styles.underlined,
                  "text-black no-underline",
                  "transition-all duration-500"
                )}
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
