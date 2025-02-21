import { GenreModel, MovieModel } from '@/redux/slices';

export interface HeroContentMovieProps {
	id: MovieModel['id'];
	title: MovieModel['title'];
	backdropUrl: MovieModel['backdrop_path'];
	releaseDate: MovieModel['release_date'];
	runtime: MovieModel['runtime'];
	language: MovieModel['original_language'];
	overview: MovieModel['overview'];
	genres: GenreModel[];
	isInWatchlist?: boolean;
	onAddToWatchlist?: () => void;
	onRemoveFromWatchlist?: () => void;
	loadingButton?: boolean;
	show?: boolean;
	enableHref?: boolean;
}
