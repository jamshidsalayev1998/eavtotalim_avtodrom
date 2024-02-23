import { useState, useEffect } from "react";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    heigh: undefined,
  });

  useEffect(() => {
    function handleSize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleSize);

    handleSize();

    return () => window.removeEventListener("resize", handleSize);
  }, []);

  return windowSize;
}
