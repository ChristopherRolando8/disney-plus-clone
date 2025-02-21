import { PageLayout } from '@/ui/layouts';
import styles from './movie-detail-main.module.scss';
import { MovieDetailMainProps } from './movie-detail-main.type';
import Head from 'next/head';
import { useAppSelector } from '@/redux/store';
import * as SL from '@/redux/slices';
import * as C from '@/ui/components';
import { tabs } from './movie-detail-main.constant';
import { useMemo, useState } from 'react';
import { CardMovieWrapper } from '@/ui/components-wrapper';
import { usePopulateWatchlist, useWatchlistStorage } from '@/lib/hooks';

const MovieDetailMain: React.FC<MovieDetailMainProps> = (props) => {
	const {
		data: { movieDetail, movieRecommendationIds },
	} = props;

	const { loading } = usePopulateWatchlist();
	const [tabValue, setTabValue] = useState(tabs[0].value);

	const movieGenres = useAppSelector(
		SL.selectMovieGenresByMovieId(Number(movieDetail.id)),
	);

	const title = useMemo(() => {
		const movieGenreString = movieGenres?.map((item) => item.name);

		return `${movieDetail.title} full movie. ${movieGenreString?.join(' ')} film in Disney Hotstar+`;
	}, [movieGenres, movieDetail]);

	const {
		handlers: { onAddToWatchlist, onRemoveFromWatchlist },
		state: { isInWatchlist },
	} = useWatchlistStorage({
		currentWatchlistDetail: {
			id: `movie${movieDetail.id}`,
			mediaType: 'movie',
			mediaId: Number(movieDetail.id),
		},
	});

	return (
		<>
			<Head>
				<title>{title}</title>

				<meta content={title} name="title" />
				<meta content={movieDetail.overview} name="description" />
			</Head>

			<PageLayout>
				<div className={styles.movieDetailMainRoot}>
					<C.HeroContentMovie
						id={movieDetail.id}
						title={movieDetail.title}
						overview={movieDetail.overview}
						backdropUrl={movieDetail.backdrop_path}
						genres={movieGenres || []}
						language={movieDetail.original_language}
						releaseDate={movieDetail.release_date}
						runtime={movieDetail.runtime}
						loadingButton={loading}
						isInWatchlist={isInWatchlist}
						onAddToWatchlist={onAddToWatchlist}
						onRemoveFromWatchlist={onRemoveFromWatchlist}
					/>

					<div className={styles.tabContainer}>
						<C.Tabs tabs={tabs} value={tabValue} onChange={setTabValue} />
					</div>

					<div className={styles.cardContainer}>
						<C.TabPanel value="more-like-this" currentValue={tabValue}>
							<C.CardCarousel>
								{movieRecommendationIds.map((id) => {
									return (
										<div key={id} className={styles.cardWrapper}>
											<CardMovieWrapper id={Number(id)} mediaType="movie" />
										</div>
									);
								})}
							</C.CardCarousel>
						</C.TabPanel>
					</div>
				</div>
			</PageLayout>
		</>
	);
};

export default MovieDetailMain;
