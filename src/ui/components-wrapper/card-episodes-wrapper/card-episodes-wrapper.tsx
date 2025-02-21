import React from "react";
import { CardEpisodesWrapperProps } from "./card-episodes-wrapper.type";
import { selectEpisodesBySeriesIdAndSeasonId } from "@/redux/slices";
import { useAppSelector } from "@/redux/store";
import { useFetchTvSeasonDetailQuery } from "@/redux/services";
import { RenderIf } from "@/ui/components/render-if";
import { CardEpisode } from "@/ui/components/card-episode";

const CardEpisodesWrapper: React.FC<CardEpisodesWrapperProps> = (props) => {
  const { seasonId, tvSeriesId, seasonNumber } = props;

  const episodes = useAppSelector(
    selectEpisodesBySeriesIdAndSeasonId(tvSeriesId, seasonId)
  );

  const { isFetching } = useFetchTvSeasonDetailQuery(
    {
      season_number: String(seasonNumber),
      series_id: String(tvSeriesId),
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !!episodes.length,
    }
  );

  return (
    <>
      <RenderIf isTrue={!isFetching}>
        {episodes.map((episode) => {
          return (
            <CardEpisode
              id={episode.id}
              key={episode.id}
              posterUrl={episode.still_path}
              name={episode.name}
              season={episode.season_number}
              episode={episode.episode_number}
              duration={episode.runtime}
              airDate={episode.air_date}
              overview={episode.overview}
            />
          );
        })}
      </RenderIf>

      <RenderIf isTrue={isFetching}>
        <>
          {Array.from(Array(5).keys()).map((idx) => {
            return (
              <CardEpisode
                id=""
                key={idx}
                posterUrl=""
                name=""
                season={0}
                episode={0}
                duration={0}
                airDate=""
                overview=""
                loading
              />
            );
          })}
        </>
      </RenderIf>
    </>
  );
};

export default CardEpisodesWrapper;
