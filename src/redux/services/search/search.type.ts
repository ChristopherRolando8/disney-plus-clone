import { MovieModel, TvModel } from '@/redux/slices';

// ============ MUTLTI SEARCH ============

export interface MultiSearchRes {
	page: number;
	results: (MovieModel | TvModel)[];
	total_pages: number;
	total_results: number;
}

export interface NormalizedMultiSearchRes {
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

export interface MultiSearchArgs {
	query: string;
	page: number;
	include_adult?: boolean;
	language?: string;
}
