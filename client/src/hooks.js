import { useState, useEffect } from "react";

export default function useWindowSize() {
  const isClient = typeof window === "object";

  function getSize() {
    return {
      // window is not defined on the server, so we need to check if it's defined
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }
  // use useState to store the window size
  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    // remove the event listener when the component is unmounted
    return () => window.removeEventListener("resize", handleResize);
  });

  return windowSize;
}
