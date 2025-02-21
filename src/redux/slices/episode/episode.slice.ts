import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { EpisodeModel } from './episode.type';
import { tvApi } from '@/redux/services';

export const episodeAdapter = createEntityAdapter<EpisodeModel>();

const episodeSlice = createSlice({
	name: 'episode',
	initialState: episodeAdapter.getInitialState({}),
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			tvApi.endpoints.fetchTvSeasonDetail.matchFulfilled,
			(state, action) => {
				const { entities } = action.payload;

				const { episode = {} } = entities;

				episodeAdapter.upsertMany(state, episode);
			},
		);
	},
});

export const episodeReducer = episodeSlice.reducer;
