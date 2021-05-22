import React, { useEffect, useState } from "react";
import { useTopTags } from "./data/useTopTags";
import { usePackLayout } from "./data/usePackLayout";
import { BubbleCloud } from "./render/BubbleCloud";

export const App = (): JSX.Element => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const tags = useTopTags();

  const root = usePackLayout({
    ...size,
    tags,
    /**
     * The number of tags to show. Can adjust this amount.
     */
    count: 40,
  });

  return (
    <div className="bubbles-container">
      <div className="top-left">
        <h1>Linda Paiste</h1>
      </div>
      <BubbleCloud width={size.width} height={size.height} root={root} />

      <div className="bottom-right">
        <h2>
          Top{" "}
          <a className="underlined"
             href="https://stackoverflow.com/users/10431574/linda-paiste">
            StackOverflow
          </a>{" "}
          Answer Tags
        </h2>
      </div>
    </div>
  );
};
