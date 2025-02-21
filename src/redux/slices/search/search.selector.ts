import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

const selectSearch = (state: RootState) => state.search;

export const selectSearchedMovieIds = createSelector(
	selectSearch,
	(searched) => searched.searchedMovieIds,
);

export const selectSearchedTvIds = createSelector(
	selectSearch,
	(searched) => searched.searchedTvIds,
);
