import { FC, useEffect, useState } from "react";

/**
 * Copied from https://www.joshwcomeau.com/react/the-perils-of-rehydration/#abstractions
 */
export const ClientOnly: FC = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted ? <>{children}</> : null;
};
