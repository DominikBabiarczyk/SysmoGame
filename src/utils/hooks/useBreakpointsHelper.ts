import { useState, useEffect } from "react";

type WindowWidthType = "xs" | "s" | "md" | "lg" | "xl" | null;

const useBreakpointsHelper = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getType = (width: number): WindowWidthType => {
    if (width < 500) return "xs";
    if (width >= 500 && width < 767) return "s";
    if (width >= 767 && width < 991) return "md";
    if (width >= 991 && width < 1199) return "lg";
    if (width >= 1500) return "xl";
    return null;
  };

  const type: WindowWidthType = getType(windowWidth);

  return { width: windowWidth, height: windowHeight, type };
};

export default useBreakpointsHelper;
