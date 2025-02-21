import { RootState } from '@/redux/store';
import { createSelector } from '@reduxjs/toolkit';
import { movieAdapter } from './movie.slice';
import memoize from 'lodash/memoize';

const selectMovie = (state: RootState) => state.movie;

export const {
	selectEntities: selectMovieEntities,
	selectAll: selectAllMovie,
} = movieAdapter.getSelectors<RootState>((state) => state.movie);

export const selectAllMovies = createSelector(selectAllMovie, (movie) => movie);

export const selectAllTopRatedMovies = createSelector(
	selectMovie,
	(movie) => movie.topRatedMovie.ids,
);

export const selectAllSimilarMovies = createSelector(
	selectMovie,
	(movie) => movie.similarMovie.ids,
);

export const selectMovieById = memoize((movieId?: number) =>
	createSelector(
		selectMovieEntities,
		(movieEntities) => movieEntities[movieId || ''] || null,
	),
);

export const selectSelectedMovieId = createSelector(
	selectMovie,
	(movie) => movie.selectedMovieId,
);
