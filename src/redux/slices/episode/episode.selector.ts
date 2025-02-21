import { RootState } from "@/redux/store";
import { createSelector } from "@reduxjs/toolkit";
import { episodeAdapter } from "./episode.slice";
import memoize from "lodash/memoize";
import { selectSeasonById } from "../season";

const { selectEntities } = episodeAdapter.getSelectors<RootState>(
  (state) => state.episode
);

export const selectEpisodeById = memoize((episodeId?: string) =>
  createSelector(
    selectEntities,
    (episodeEntities) => episodeEntities[episodeId || ""] || null
  )
);

export const selectEpisodeIdsBySeriesIdAndSeasonId = memoize(
  (seriesId?: number, seasonId?: number) =>
    createSelector(
      [selectEntities, selectSeasonById(String(seasonId))],
      (episodeEntities, season) => {
        const seasonNumber = season.season_number;

        const tempEpisodeIds: string[] = [];

        Object.keys(episodeEntities).forEach((key) => {
          const episode = episodeEntities[key];

          if (
            String(seasonNumber) === String(episode.season_number) &&
            String(seriesId) === String(episode.show_id) &&
            seasonNumber !== 0
          ) {
            tempEpisodeIds.push(episode.id);
          }
        });

        return tempEpisodeIds;
      }
    ),
  (...args) => JSON.stringify(args)
);

export const selectEpisodesBySeriesIdAndSeasonId = memoize(
  (seriesId?: number, seasonId?: number) =>
    createSelector(
      [
        selectEntities,
        selectEpisodeIdsBySeriesIdAndSeasonId(seriesId, seasonId),
      ],
      (episodeEntities, episodeIds) => {
        const episodes = episodeIds.map((id) => episodeEntities[id]);

        const sortedEpisodes = episodes.sort((a, b) =>
          a.episode_number > b.episode_number ? 1 : -1
        );

        return sortedEpisodes;
      }
    ),
  (...args) => JSON.stringify(args)
);
