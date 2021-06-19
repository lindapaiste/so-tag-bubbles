import { useState } from "react";
import {
  TagData,
  TagNode,
  usePackLayout,
} from "../../services/d3/usePackLayout";
import { BubbleCloud } from "./BubbleCloud";
import { CSSTransition } from "react-transition-group";
import { Size } from "../../services/window/useWindowSize";
import { ClientOnly } from "../../services/window/ClientOnly";
import clsx from "clsx";
import { useAfterMount } from "../../services/window/useAfterMount";
const styles = require("./bubbles.module.scss");

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

  /**
   * Want to scale up from 0 starting at 0 on first render.
   */
  const [loaded, setLoaded] = useState(false);

  useAfterMount(() => setLoaded(true));

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
          className="w-screen h-screen overflow-hidden relative flex font-bold font-benchnine uppercase"
          id={styles.container}
        >
          <div
            className="absolute top-0 left-0 px-6 py-0 transition-all duration-500"
            id={styles.topLeft}
          >
            <h1
              className={clsx(
                "font-normal margin-0",
                "transition-all duration-500",
                "flex flex-col"
              )}
            >
              Linda Paiste
            </h1>
          </div>
          <ClientOnly>
            <BubbleCloud
              width={width}
              height={height}
              nodes={nodes}
              selected={selected}
              onSelect={setSelected}
              loaded={loaded}
            />
          </ClientOnly>
          <div
            className="absolute bottom-0 right-0 px-12 py-6 transition-all duration-500"
            id={styles.bottomRight}
          >
            <h2 className="font-normal margin-0 transition-all duration-500">
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
