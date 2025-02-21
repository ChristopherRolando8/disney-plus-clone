import { useEffect, useMemo, useState } from "react";

// ? Implement this to get scroll coefficient => scrollY pos divided by viewport height
// ? For use in handling opacity of main image in homepage, movie detail and tv series detail
export const useScrollCoefficient = () => {
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  const handleScroll = () => {
    if (typeof window === undefined) return;

    setScrollY(window.scrollY);
  };

  const handleResize = () => {
    if (typeof window === undefined) return;

    setViewportHeight(window.innerHeight);
  };

  useEffect(() => {
    if (typeof window === undefined) return;

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleScroll();
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const coefficient = useMemo(() => {
    if (!scrollY && scrollY !== 0) return 0;
    if (!viewportHeight && viewportHeight !== 0) return 0;
    if (scrollY === 0 && viewportHeight === 0) return 0;

    return (Number(scrollY) / Number(viewportHeight)) * 2; // ? 2 is just some multiplier to tweak the value
  }, [scrollY, viewportHeight]);

  return {
    scrollY,
    viewportHeight,
    coefficient,
  };
};

export default useScrollCoefficient;
