import { useState, useEffect } from "react";

function useWindowWidthMoreThan(x: number): Boolean {
  const [state, setState] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > x) {
        setState(true);
      } else {
        setState(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [x]);

  return state;
}
