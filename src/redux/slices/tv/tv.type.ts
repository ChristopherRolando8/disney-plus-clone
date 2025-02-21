export interface TvModel {
	id: string;
	name: string;
	poster_path: string;
	backdrop_path: string;
	overview: string;
	first_air_date: string;
	genres?: string[];
	media_type?: 'tv';
	seasons: string[];
	original_language: string;
}

export interface TvState {
	ids: string[];
	totalPages: number;
	totalResults: number;
	page: number;
}

export interface TvInitialState {
	selectedTvId: string;
	topRatedTv: TvState;
	similarTv: TvState;
}
