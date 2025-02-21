import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

const selectTrending = (state: RootState) => state.trending;

export const selectTrendingMovieIds = createSelector(
	selectTrending,
	(trending) => trending.trendingMovieIds,
);

export const selectTrendingTvIds = createSelector(
	selectTrending,
	(trending) => trending.trendingTvIds,
);
