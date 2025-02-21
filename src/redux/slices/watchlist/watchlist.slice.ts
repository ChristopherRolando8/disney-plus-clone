import { createSlice } from '@reduxjs/toolkit';
import * as T from './watchlist.type';

const watchlistInitialState: T.WatchlistInitialState = {
	watchlists: [],
	toBeDeletedWatchlists: [],
};

const watchlistSlice = createSlice({
	name: 'watchlist',
	initialState: watchlistInitialState,
	reducers: {
		insertToWatchlist(state, { payload }) {
			const { id } = payload;
			const currentWatchlists = state.watchlists;

			const isAlreadyInWatchlist = !!currentWatchlists.find(
				(item) => item.id === id,
			);

			if (isAlreadyInWatchlist) return;

			const newWatchlists = [payload, ...currentWatchlists];

			state.watchlists = newWatchlists;
		},
		removeFromWatchlist(state, { payload }) {
			const { id } = payload;
			const currentWatchlists = state.watchlists;

			const newWatchlists = currentWatchlists.filter((item) => {
				return item.id !== id;
			});

			state.watchlists = newWatchlists;
		},
		setWatchlist(state, { payload }) {
			state.watchlists = payload;
		},
		insertToBeDeletedWatchlist(state, { payload }) {
			const { id } = payload;
			const currentToBeDeletedWatchlists = state.toBeDeletedWatchlists;

			const isAlreadyInWatchlist = !!currentToBeDeletedWatchlists.find(
				(item) => item.id === id,
			);

			if (isAlreadyInWatchlist) return;

			const toBeDeletedWatchlists = [payload, ...currentToBeDeletedWatchlists];

			state.toBeDeletedWatchlists = toBeDeletedWatchlists;
		},
		removeFromToBeDeletedWatchlist(state, { payload }) {
			const { id } = payload;
			const currentToBeDeletedWatchlists = state.toBeDeletedWatchlists;

			const toBeDeletedWatchlists = currentToBeDeletedWatchlists.filter(
				(item) => {
					return item.id !== id;
				},
			);

			state.toBeDeletedWatchlists = toBeDeletedWatchlists;
		},
		setToBeDeletedWatchlist(state, { payload }) {
			state.toBeDeletedWatchlists = payload;
		},
	},
});

export const {
	insertToWatchlist,
	removeFromWatchlist,
	setWatchlist,
	insertToBeDeletedWatchlist,
	removeFromToBeDeletedWatchlist,
	setToBeDeletedWatchlist,
} = watchlistSlice.actions;

export const watchlistReducer = watchlistSlice.reducer;
