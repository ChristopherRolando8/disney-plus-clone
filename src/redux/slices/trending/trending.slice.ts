import { createSlice } from '@reduxjs/toolkit';
import { trendingApi } from '@/redux/services';
import * as T from './trending.type';

const trendingInitialState: T.TrendingInitialState = {
	trendingMovieIds: [],
	trendingTvIds: [],
	totalPages: 0,
	totalResults: 0,
	page: 0,
};

const trendingSlice = createSlice({
	name: 'trending',
	initialState: trendingInitialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addMatcher(
				trendingApi.endpoints.fetchAllTrending.matchFulfilled,
				(state, action) => {
					const { movie, tv, page, totalPages, totalResults } = action.payload;

					const trendingMovieIds = movie.result;
					const trendingTvIds = tv.result;

					state.trendingMovieIds = trendingMovieIds;
					state.trendingTvIds = trendingTvIds;
					state.totalPages = totalPages;
					state.page = page;
					state.totalResults = totalResults;
				},
			)
			.addMatcher(
				trendingApi.endpoints.fetchTrendingMovie.matchFulfilled,
				(state, action) => {
					const { result, page, totalPages, totalResults } = action.payload;

					state.trendingMovieIds = result;
					state.totalPages = totalPages;
					state.page = page;
					state.totalResults = totalResults;
				},
			)
			.addMatcher(
				trendingApi.endpoints.fetchTrendingTv.matchFulfilled,
				(state, action) => {
					const { result, page, totalPages, totalResults } = action.payload;

					state.trendingTvIds = result;
					state.totalPages = totalPages;
					state.page = page;
					state.totalResults = totalResults;
				},
			);
	},
});

export const trendingReducer = trendingSlice.reducer;
