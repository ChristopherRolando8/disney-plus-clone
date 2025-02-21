import { PageLayout } from '@/ui/layouts';
import styles from './home-main.module.scss';
import { CardCarousel } from '@/ui/components';
import { HomeMainProps } from './home-main.type';
import * as CW from '@/ui/components-wrapper';
import Head from 'next/head';
import { Meta } from '@/constants/meta';
import * as H from '@/lib/hooks';
import { useHomeMainCarousel } from './use-home-main-carousel';
import Image from 'next/image';
import { Icon } from '@/constants/icon';

const HomeMain: React.FC<HomeMainProps> = (props) => {
	const {
		data: {
			topRatedMovieIds,
			topRatedTvSeriesIds,
			trendingMovieOfTheWeekIds,
			trendingTvSeriesOfTheWeekIds,
		},
	} = props;

	const { loading } = H.usePopulateWatchlist();

	const {
		state: { currIndex, featuredTrendingContents },
		handler: { onClickPrev, onClickNext },
	} = useHomeMainCarousel(props);

	return (
		<>
			<Head>
				<title>{Meta.home.title}</title>

				<meta content={Meta.home.title} name="title" />
				<meta content={Meta.home.description} name="description" />
			</Head>

			<PageLayout>
				<div className={styles.homeMainRoot}>
					<div className={styles.carouselWrapper}>
						{featuredTrendingContents.map((content, idx) => {
							if (content.type === 'movie') {
								return (
									<CW.HeroContentMovieWrapper
										enableHref
										key={content.mediaId}
										show={currIndex === idx}
										id={content.mediaId}
										loadingButton={loading}
									/>
								);
							}

							if (content.type === 'tv') {
								return (
									<CW.HeroContentTvWrapper
										enableHref
										key={content.mediaId}
										show={currIndex === idx}
										id={content.mediaId}
										loadingButton={loading}
									/>
								);
							}

							return null;
						})}

						<div className={styles.arrowCarouselWrapper}>
							<div className={styles.arrowCarouselContainer}>
								<div
									className={styles.leftCarouselArrow}
									role="button"
									onClick={onClickPrev}
								>
									<div className={styles.logoContainer}>
										<Image alt="Prev" src={Icon.Forward} />
									</div>
								</div>

								<div
									className={styles.rightCarouselArrow}
									role="button"
									onClick={onClickNext}
								>
									<div className={styles.logoContainer}>
										<Image alt="Next" src={Icon.Forward} />
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className={styles.carouselContainer}>
						<CardCarousel title="Top Rated Movies & TV Series">
							{topRatedMovieIds.map((id) => {
								return (
									<div key={id} className={styles.cardWrapper}>
										<CW.CardMovieWrapper id={Number(id)} mediaType="movie" />
									</div>
								);
							})}

							{topRatedTvSeriesIds.map((id) => {
								return (
									<div key={id} className={styles.cardWrapper}>
										<CW.CardTvWrapper id={Number(id)} mediaType="tv" />
									</div>
								);
							})}
						</CardCarousel>

						<CardCarousel title="Top Rated Movie of The Week">
							{trendingMovieOfTheWeekIds.map((id) => {
								return (
									<div key={id} className={styles.cardWrapper}>
										<CW.CardMovieWrapper id={Number(id)} mediaType="movie" />
									</div>
								);
							})}
						</CardCarousel>

						<CardCarousel title="Top Rated TV Series of The Week">
							{trendingTvSeriesOfTheWeekIds.map((id) => {
								return (
									<div key={id} className={styles.cardWrapper}>
										<CW.CardTvWrapper id={Number(id)} mediaType="tv" />
									</div>
								);
							})}
						</CardCarousel>
					</div>
				</div>
			</PageLayout>
		</>
	);
};

export default HomeMain;
