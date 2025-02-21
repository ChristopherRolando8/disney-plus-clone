import { HomeSSRProps } from "@/pages";
import { useCallback, useEffect, useMemo, useState } from "react";
import { slideshowSettings } from "./home-main.constant";
import { ButtonProps } from "@/ui/components";

export const useHomeMainCarousel = ({ data }: { data: HomeSSRProps }) => {
  // ========== Get the current trending content to display as a hero content that alternates
  const { trendingMovieOfTheWeekIds, trendingTvSeriesOfTheWeekIds } = data;

  // We want to get all the trending movies and tv series and merge them together
  const featuredTrendingContents = useMemo(() => {
    const movies = trendingMovieOfTheWeekIds
      .slice(0, slideshowSettings.maxMovieHeading)
      .map((id) => ({ id: `movie${id}`, type: "movie", mediaId: Number(id) }));

    const tvSeries = trendingTvSeriesOfTheWeekIds
      .slice(0, slideshowSettings.maxTvHeading)
      .map((id) => ({ id: `tv${id}`, type: "tv", mediaId: Number(id) }));

    return [...movies, ...tvSeries];
  }, [trendingMovieOfTheWeekIds, trendingTvSeriesOfTheWeekIds]);

  const [currIndex, setCurrIndex] = useState(0);
  const [alternate, setAlternate] = useState(true);

  const maxSlideshow = useMemo(
    () => slideshowSettings.maxMovieHeading + slideshowSettings.maxTvHeading,
    []
  );

  const handlePrev = useCallback(() => {
    const toBeIndex = currIndex - 1;

    const prevIndex = (() => {
      if (toBeIndex < 0) return maxSlideshow - 1;
      return toBeIndex;
    })();

    setCurrIndex(prevIndex);
  }, [currIndex, maxSlideshow]);

  const handleNext = useCallback(() => {
    const toBeIndex = currIndex + 1;

    const nextIndex = (() => {
      if (toBeIndex > maxSlideshow - 1) return 0;
      return toBeIndex;
    })();

    setCurrIndex(nextIndex);
  }, [currIndex, maxSlideshow]);

  useEffect(() => {
    setTimeout(() => {
      if (!alternate) return;
      handleNext();
    }, slideshowSettings.duration);
  }, [alternate, handleNext]);

  const onClickPrev: ButtonProps["onClick"] = (e) => {
    e?.preventDefault();
    handlePrev();
    setAlternate(false); // If user click, we wont alternate anymore
  };

  const onClickNext: ButtonProps["onClick"] = (e) => {
    e?.preventDefault();
    handleNext();
    setAlternate(false); // If user click, we wont alternate anymore
  };

  return {
    state: {
      currIndex,
      featuredTrendingContents,
    },
    handler: {
      onClickPrev,
      onClickNext,
    },
  };
};
