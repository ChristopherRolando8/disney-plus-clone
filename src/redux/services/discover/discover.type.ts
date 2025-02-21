import { MovieModel, TvModel } from '@/redux/slices';

// ============ FETCH DISCOVER MOVIE ============

export interface FetchDiscoverMovieRes {
	page: number;
	results: MovieModel[];
	total_pages: number;
	total_results: number;
}

export interface NormalizedFetchDiscoverMovieRes {
	entities: {
		movie?: Record<string, MovieModel>;
	};
	result: string[];
	page: number;
	totalPages: number;
	totalResults: number;
}

export interface FetchDiscoverMovieArgs {
	page: number;
	sort_by?: string;
	include_adult?: boolean;
	include_video?: boolean;
	language?: string;
}

// ============ FETCH DISCOVER TV ============

export interface FetchDiscoverTvRes {
	page: number;
	results: TvModel[];
	total_pages: number;
	total_results: number;
}

export interface NormalizedFetchDiscoverTvRes {
	entities: {
		tv?: Record<string, TvModel>;
	};
	result: string[];
	page: number;
	totalPages: number;
	totalResults: number;
}

export interface FetchDiscoverTvArgs {
	page: number;
	sort_by?: string;
	include_adult?: boolean;
	include_video?: boolean;
	language?: string;
}
