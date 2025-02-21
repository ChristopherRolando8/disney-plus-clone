export interface MovieModel {
	id: string;
	title: string;
	poster_path: string;
	backdrop_path: string;
	overview: string;
	release_date: string;
	genres?: string[];
	media_type?: 'movie';
	runtime: number;
	original_language: string;
}

export interface MovieState {
	ids: string[];
	totalPages: number;
	totalResults: number;
	page: number;
}

export interface MovieInitialState {
	selectedMovieId: string;
	topRatedMovie: MovieState;
	similarMovie: MovieState;
}
