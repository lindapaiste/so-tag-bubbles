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
  const [size, setSize] = useState(initialSize);

  useEffect(() => {
    // need this to set size on first render
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    function handleResize(this: Window) {
      setSize({
        width: this.innerWidth,
        height: this.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};
