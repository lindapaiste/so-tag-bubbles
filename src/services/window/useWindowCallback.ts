import { useEffect, useState } from "react";

type WindowCallback = (this: Window) => void;

/**
 * Call a function on every change of the DOM
 */
export const useWindowCallback = (callback: WindowCallback): void => {
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", callback);

    return () => window.removeEventListener("resize", callback);
  }, [callback]);

  useEffect(() => {
    if (didMount) {
      // need this to set size on first render, or whenever callback changes
      callback.call(window);
    } else {
      setDidMount(true);
    }
  }, [callback, didMount, setDidMount]);
};
