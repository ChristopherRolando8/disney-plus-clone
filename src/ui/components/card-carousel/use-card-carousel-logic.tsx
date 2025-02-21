import { useEffect, useMemo, useRef, useState } from "react";

export const useCardCarouselLogic = () => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [maxScrollOffset, setMaxScrollOffset] = useState(0);

  const cardContainerRef = useRef<HTMLDivElement>(null);

  const renderPrevArrow = useMemo(() => scrollOffset > 0, [scrollOffset]);
  const renderNextArrow = useMemo(
    () => scrollOffset < maxScrollOffset,
    [scrollOffset, maxScrollOffset]
  );

  useEffect(() => {
    if (!cardContainerRef.current) return;

    const maxOffset =
      cardContainerRef.current.clientWidth -
      cardContainerRef.current.scrollWidth;

    setMaxScrollOffset(Math.abs(maxOffset));
  }, [cardContainerRef]);

  const scrollNext = () => {
    if (!cardContainerRef.current) return;

    const scrollAmount = cardContainerRef.current.clientWidth / 1.5;
    setScrollOffset((prevOffset) =>
      Math.min(prevOffset + scrollAmount, maxScrollOffset)
    );
  };

  const scrollPrev = () => {
    if (!cardContainerRef.current) return;

    const scrollAmount = cardContainerRef.current.clientWidth / 1.5;
    setScrollOffset((prevOffset) => Math.max(prevOffset - scrollAmount, 0));
  };

  return {
    handlers: { scrollNext, scrollPrev },
    state: {
      renderNextArrow,
      renderPrevArrow,
      containerRef: cardContainerRef,
      scrollOffset,
      maxScrollOffset,
    },
  };
};
