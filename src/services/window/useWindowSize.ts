import { useEffect, useState } from "react";

export interface Size {
  /**
   * The width in pixels
   */
  width: number;
  /**
   * The height in pixels
   */
  height: number;
}

/**
 * Must start with an arbitrary size on next.js because
 * window is not available during server-side rendering.
 */
export const useWindowSize = (initialSize: Size): Size => {
  /**
   * Note: Cannot use the window size as the initial state because this breaks
   * the rehydration process. The DOM at first client render must match the
   * server-generated DOM.
   * See: https://www.joshwcomeau.com/react/the-perils-of-rehydration/
   */
  const [size, setSize] = useState(initialSize);
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    function handleResize(this: Window) {
      setSize({
        width: this.innerWidth,
        height: this.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (didMount) {
      // need this to set size on first render
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    } else {
      setDidMount(true);
    }
  }, [didMount, setDidMount]);

  return size;
};
