import { MovieModel, TvModel } from '@/redux/slices';

// ============ FETCH ALL TRENDING CONTENT ============

export interface FetchAllTrendingRes {
	page: number;
	results: (MovieModel | TvModel)[];
	total_pages: number;
	total_results: number;
}

export interface NormalizedFetchAllTrendingRes {
	movie: {
		entities: {
			movie?: Record<string, MovieModel>;
		};
		result: string[];
	};
	tv: {
		entities: {
			tv?: Record<string, TvModel>;
		};
		result: string[];
	};
	page: number;
	totalPages: number;
	totalResults: number;
}

export interface FetchAllTrendingArgs {
	time_window: 'day' | 'week';
	language?: string;
}

// ============ FETCH ALL TRENDING MOVIES ============

export interface FetchTrendingMovieRes {
	page: number;
	results: MovieModel[];
	total_pages: number;
	total_results: number;
}

export interface NormalizedFetchTrendingMovieRes {
	entities: {
		movie?: Record<string, MovieModel>;
	};
	result: string[];
	page: number;
	totalPages: number;
	totalResults: number;
}

export interface FetchTrendingMovieArgs {
	time_window: 'day' | 'week';
	language?: string;
}

// ============ FETCH ALL TRENDING TV SERIES ============

export interface FetchTrendingTvRes {
	page: number;
	results: TvModel[];
	total_pages: number;
	total_results: number;
}

export interface NormalizedFetchTrendingTvRes {
	entities: {
		tv?: Record<string, TvModel>;
	};
	result: string[];
	page: number;
	totalPages: number;
	totalResults: number;
}

export interface FetchTrendingTvArgs {
	time_window: 'day' | 'week';
	language?: string;
}
