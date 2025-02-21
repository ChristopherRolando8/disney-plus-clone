import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { SeasonModel } from './season.type';
import { tvApi } from '@/redux/services';

export const seasonAdapter = createEntityAdapter<SeasonModel>();

const seasonSlice = createSlice({
	name: 'season',
	initialState: seasonAdapter.getInitialState({}),
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			tvApi.endpoints.fetchTvDetailById.matchFulfilled,
			(state, action) => {
				const { entities } = action.payload;

				const { season = {} } = entities;

				seasonAdapter.upsertMany(state, season);
			},
		);
	},
});

export const seasonReducer = seasonSlice.reducer;
