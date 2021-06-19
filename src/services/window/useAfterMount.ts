import { useEffect, useState } from "react";

/**
 * Use this hook to call a callback function on the SECOND render.
 */
export const useAfterMount = (callback: () => void): void => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (hasMounted) {
      callback();
    }
  }, [hasMounted]);

  useEffect(() => {
    setHasMounted(true);
  }, []);
};
