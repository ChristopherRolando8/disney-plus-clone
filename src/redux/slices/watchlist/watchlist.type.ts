export type MediaType = 'movie' | 'tv';

export interface Watchlist {
	id: string;
	mediaId: number;
	mediaType: MediaType;
}

export interface WatchlistInitialState {
	watchlists: Watchlist[];
	toBeDeletedWatchlists: Watchlist[];
}
