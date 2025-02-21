import React, { useMemo } from "react";
import { HeroContentTvWrapperProps } from "./hero-content-tv-wrapper.type";
import { useWatchlistStorage } from "@/lib/hooks";
import { useAppSelector } from "@/redux/store";
import * as SL from "@/redux/slices";
import { HeroContentTv } from "@/ui/components/hero-content-tv";

const HeroContentTvWrapper: React.FC<HeroContentTvWrapperProps> = (props) => {
  const {
    id,
    loadingButton = false,
    show = true,
    enableHref,
    ...otherProps
  } = props;

  const currentWatchlistDetail = useMemo<SL.Watchlist>(
    () => ({
      id: `tv${id}`,
      mediaType: "tv",
      mediaId: id || 0,
    }),
    [id]
  );

  const {
    handlers: { onAddToWatchlist, onRemoveFromWatchlist },
    state: { isInWatchlist },
  } = useWatchlistStorage({
    currentWatchlistDetail,
  });

  const tv = useAppSelector(SL.selectTvById(id || 0));

  const tvGenres = useAppSelector(SL.selectTvGenresByTvId(Number(tv?.id)));

  const tvSeasons = useAppSelector(SL.selectTvSeasonsByTvId(Number(id)));

  const numberOfSeasons = useMemo(() => {
    if (!tvSeasons) return 0;

    return tvSeasons.filter((season) => season.season_number !== 0).length;
  }, [tvSeasons]);

  if (!tv) return null;

  return (
    <HeroContentTv
      enableHref={enableHref}
      id={tv.id}
      show={show}
      title={tv.name}
      overview={tv.overview}
      backdropUrl={tv.backdrop_path}
      genres={tvGenres || []}
      language={tv.original_language}
      airDate={tv.first_air_date}
      numberOfSeasons={numberOfSeasons}
      loadingButton={loadingButton}
      isInWatchlist={isInWatchlist}
      onAddToWatchlist={onAddToWatchlist}
      onRemoveFromWatchlist={onRemoveFromWatchlist}
      {...otherProps}
    />
  );
};

export default HeroContentTvWrapper;
