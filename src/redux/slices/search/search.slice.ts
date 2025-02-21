import { createSlice } from '@reduxjs/toolkit';
import { searchApi } from '@/redux/services';
import * as T from './search.type';

const searchInitialState: T.SearchInitialState = {
	searchedMovieIds: [],
	searchedTvIds: [],
	totalPages: 0,
	totalResults: 0,
	page: 0,
};

const searchSlice = createSlice({
	name: 'search',
	initialState: searchInitialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			searchApi.endpoints.multiSearch.matchFulfilled,
			(state, action) => {
				const { movie, tv, page, totalPages, totalResults } = action.payload;

				const searchedMovieIds = movie.result;
				const searchedTvIds = tv.result;

				state.searchedMovieIds = searchedMovieIds;
				state.searchedTvIds = searchedTvIds;
				state.totalPages = totalPages;
				state.page = page;
				state.totalResults = totalResults;
			},
		);
	},
});

export const searchReducer = searchSlice.reducer;
