import { createSlice } from '@reduxjs/toolkit';
import { discoverApi } from '@/redux/services';
import * as T from './discover.type';

const discoverInitialState: T.DiscoverInitialState = {
	discoverMovieIds: [],
	discoverTvIds: [],
};

const discoverSlice = createSlice({
	name: 'discover',
	initialState: discoverInitialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addMatcher(
				discoverApi.endpoints.fetchDiscoverMovie.matchFulfilled,
				(state, action) => {
					const { result } = action.payload;

					state.discoverMovieIds = result;
				},
			)
			.addMatcher(
				discoverApi.endpoints.fetchDiscoverTv.matchFulfilled,
				(state, action) => {
					const { result } = action.payload;

					state.discoverTvIds = result;
				},
			);
	},
});

export const discoverReducer = discoverSlice.reducer;
