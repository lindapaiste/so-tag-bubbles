import React, { useState } from "react";
import Bubbles from "./render/Bubbles";

/**
 * link to answers in tag: https://stackoverflow.com/search?q=user:10431574+[react-redux]
 */
/**
 * TODO: receive data from a server with caching.
 *
 * Right now preload with stored data from a .json file
 * and overwrite with fresh data from API response.
 *
 * TBH there is not much volatility in my top tags,
 * so the .json file is pretty good.
 */
const App = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const [data, setData] = useState();

  // "https://api.stackexchange.com/2.2/users/10431574/top-answer-tags?site=stackoverflow";
};

export default Bubbles;
