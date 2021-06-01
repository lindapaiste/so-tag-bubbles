import React from "react";
import { TagData, usePackLayout } from "../../services/d3/usePackLayout";
import { BubbleCloud } from "./BubbleCloud";
import { CSSTransition } from "react-transition-group";
import { TAG_COUNT } from "../../config";
import { Size } from "../../services/window/useWindowSize";
import styles from "./bubbles.module.css";

export interface BubblesScreenProps extends Size {
  tags: TagData[];
}

/**
 * Pure render component so that data fetching can be done via getServerSideProps
 */
export const BubblesScreen = ({
  width,
  height,
  tags,
}: BubblesScreenProps): JSX.Element => {
  const root = usePackLayout({
    width,
    height,
    tags,
    count: TAG_COUNT,
  });

  return (
    <div className={styles.container}>
      <div className={styles.topLeft}>
        <h1>Linda Paiste</h1>
      </div>
      <CSSTransition
        in={tags.length > 0}
        appear={tags.length > 0}
        timeout={500}
        classNames="loaded"
      >
        <BubbleCloud width={width} height={height} root={root} />
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
  );
};
