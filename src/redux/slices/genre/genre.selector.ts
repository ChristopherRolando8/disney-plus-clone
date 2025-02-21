import { RootState } from '@/redux/store';
import { createSelector } from '@reduxjs/toolkit';
import { genreAdapter } from './genre.slice';
import memoize from 'lodash/memoize';
import { selectMovieById } from '../movie';
import { selectTvById } from '../tv';

const { selectEntities } = genreAdapter.getSelectors<RootState>(
	(state) => state.genre,
);

export const selectGenreById = memoize((genreId?: string) =>
	createSelector(
		selectEntities,
		(genreEntities) => genreEntities[genreId || ''] || null,
	),
);

export const selectMovieGenresByMovieId = memoize((movieId?: number) =>
	createSelector(
		[selectEntities, selectMovieById(movieId)],
		(genreEntities, movie) => {
			if (!movie) return null;

			const { genres } = movie;

			if (!genres) return null;

			return genres?.map((genreId) => genreEntities[genreId]);
		},
	),
);

export const selectTvGenresByTvId = memoize((tvId?: number) =>
	createSelector(
		[selectEntities, selectTvById(tvId)],
		(genreEntities, movie) => {
			if (!movie) return null;

			const { genres } = movie;

			if (!genres) return null;

			return genres?.map((genreId) => genreEntities[genreId]);
		},
	),
);
