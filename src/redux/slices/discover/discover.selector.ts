import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

const selectDiscover = (state: RootState) => state.discover;

export const selectDiscoverMovieIds = createSelector(
	selectDiscover,
	(discover) => discover.discoverMovieIds,
);

export const selectDiscoverTvIds = createSelector(
	selectDiscover,
	(discover) => discover.discoverTvIds,
);
