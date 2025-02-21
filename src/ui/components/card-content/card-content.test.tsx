import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardContent from './card-content';
import { DummyMovie } from '@/lib/test-utils/dummy-data';
import { generateUrlFromContent } from '@/lib/utils';

describe('Card Content', () => {
	describe('View', () => {
		it('should render an image poster by default', () => {
			render(
				<CardContent
					backdropUrl={DummyMovie.backdrop_path}
					id={Number(DummyMovie.id)}
					mediaType="movie"
					overview={DummyMovie.overview}
					title={DummyMovie.title}
					posterUrl={DummyMovie.poster_path}
				/>,
			);

			const baseCard = screen.getByTestId(`movie-${DummyMovie.id}-base-card`);
			const posterImage = screen.getByRole('img', {
				name: `${DummyMovie.title} Poster`,
			});

			expect(baseCard).toBeInTheDocument();
			expect(posterImage).toBeInTheDocument();
		});

		it('should render an anchor tag with correct link', async () => {
			render(
				<CardContent
					backdropUrl={DummyMovie.backdrop_path}
					id={Number(DummyMovie.id)}
					mediaType="movie"
					overview={DummyMovie.overview}
					title={DummyMovie.title}
					posterUrl={DummyMovie.poster_path}
				/>,
			);

			const url = screen.getByRole('link');

			expect(url).toHaveAttribute(
				'href',
				generateUrlFromContent({
					id: Number(DummyMovie.id),
					mediaType: 'movie',
					title: DummyMovie.title,
				}),
			);
		});

		it('should render a title placeholder by default', () => {
			render(
				<CardContent
					backdropUrl={DummyMovie.backdrop_path}
					id={Number(DummyMovie.id)}
					mediaType="movie"
					overview={DummyMovie.overview}
					title={DummyMovie.title}
					posterUrl={DummyMovie.poster_path}
				/>,
			);

			const placeholderTitle = screen.getByTestId(
				`movie-${DummyMovie.id}-title-placeholder`,
			);

			expect(placeholderTitle).toBeInTheDocument();
		});

		it('should NOT render a popup card by default', () => {
			render(
				<CardContent
					backdropUrl={DummyMovie.backdrop_path}
					id={Number(DummyMovie.id)}
					mediaType="movie"
					overview={DummyMovie.overview}
					title={DummyMovie.title}
					posterUrl={DummyMovie.poster_path}
				/>,
			);

			const popupCard = screen.getByTestId(`movie-${DummyMovie.id}-popup-card`);

			expect(popupCard).toHaveClass('expand expandHide');
		});

		it('should render a popup card when hovered', async () => {
			const user = userEvent.setup();

			render(
				<CardContent
					backdropUrl={DummyMovie.backdrop_path}
					id={Number(DummyMovie.id)}
					mediaType="movie"
					overview={DummyMovie.overview}
					title={DummyMovie.title}
					posterUrl={DummyMovie.poster_path}
				/>,
			);

			const baseCard = screen.getByTestId(`movie-${DummyMovie.id}-base-card`);
			const popupCard = screen.getByTestId(`movie-${DummyMovie.id}-popup-card`);

			act(() => {
				user.hover(baseCard);
			});

			await waitFor(
				() => {
					expect(popupCard).toHaveClass('expand expandShow');
				},
				{ timeout: 8000 },
			);
		});

		it('should render a button to add to watchlist when the content is not in watchlist', async () => {
			const user = userEvent.setup();

			render(
				<CardContent
					backdropUrl={DummyMovie.backdrop_path}
					id={Number(DummyMovie.id)}
					mediaType="movie"
					overview={DummyMovie.overview}
					title={DummyMovie.title}
					posterUrl={DummyMovie.poster_path}
					isInWatchlist={false}
				/>,
			);

			const baseCard = screen.getByTestId(`movie-${DummyMovie.id}-base-card`);
			const popupCard = screen.getByTestId(`movie-${DummyMovie.id}-popup-card`);

			act(() => {
				user.hover(baseCard);
			});

			await waitFor(
				() => {
					expect(popupCard).toHaveClass('expand expandShow');

					const addButton = screen.getByRole('button', {
						name: /add to watchlist/i,
					});

					expect(addButton).toBeInTheDocument();
				},
				{ timeout: 2000 },
			);
		});

		it('should render a button to remove from watchlist when the content is in watchlist', async () => {
			const user = userEvent.setup();

			render(
				<CardContent
					backdropUrl={DummyMovie.backdrop_path}
					id={Number(DummyMovie.id)}
					mediaType="movie"
					overview={DummyMovie.overview}
					title={DummyMovie.title}
					posterUrl={DummyMovie.poster_path}
					isInWatchlist
				/>,
			);

			const baseCard = screen.getByTestId(`movie-${DummyMovie.id}-base-card`);
			const popupCard = screen.getByTestId(`movie-${DummyMovie.id}-popup-card`);

			act(() => {
				user.hover(baseCard);
			});

			await waitFor(
				() => {
					expect(popupCard).toHaveClass('expand expandShow');

					const removeButton = screen.getByRole('button', {
						name: /remove from watchlist/i,
					});

					expect(removeButton).toBeInTheDocument();
				},
				{ timeout: 2000 },
			);
		});

		it('should render loading button if buttonLoading is true', async () => {
			const user = userEvent.setup();

			render(
				<CardContent
					backdropUrl={DummyMovie.backdrop_path}
					id={Number(DummyMovie.id)}
					mediaType="movie"
					overview={DummyMovie.overview}
					title={DummyMovie.title}
					posterUrl={DummyMovie.poster_path}
					buttonLoading
				/>,
			);

			const baseCard = screen.getByTestId(`movie-${DummyMovie.id}-base-card`);
			const popupCard = screen.getByTestId(`movie-${DummyMovie.id}-popup-card`);

			act(() => {
				user.hover(baseCard);
			});

			await waitFor(
				() => {
					expect(popupCard).toHaveClass('expand expandShow');

					const loadingButton = screen.getByRole('progressbar');

					expect(loadingButton).toBeInTheDocument();
				},
				{ timeout: 2000 },
			);
		});
	});

	describe('Interaction & Logic', () => {
		it('should trigger function to add to watchlist, if content is not in watchlist', async () => {
			const user = userEvent.setup();
			const onAddToWatchlist = jest.fn();
			const onRemoveFromWatchlist = jest.fn();

			render(
				<CardContent
					backdropUrl={DummyMovie.backdrop_path}
					id={Number(DummyMovie.id)}
					mediaType="movie"
					overview={DummyMovie.overview}
					title={DummyMovie.title}
					posterUrl={DummyMovie.poster_path}
					onAddToWatchlistClick={onAddToWatchlist}
					onRemoveFromWatchlistClick={onRemoveFromWatchlist}
					isInWatchlist={false}
				/>,
			);

			const baseCard = screen.getByTestId(`movie-${DummyMovie.id}-base-card`);
			const popupCard = screen.getByTestId(`movie-${DummyMovie.id}-popup-card`);

			act(() => {
				user.hover(baseCard);
			});

			await waitFor(
				async () => {
					expect(popupCard).toHaveClass('expand expandShow');

					const addButton = screen.getByRole('button', {
						name: /add to watchlist/i,
					});

					await user.click(addButton);

					expect(onAddToWatchlist).toHaveBeenCalledTimes(1);
					expect(onRemoveFromWatchlist).toHaveBeenCalledTimes(0);
				},
				{ timeout: 2000 },
			);
		});

		it('should trigger function to remove from watchlist, if content is in watchlist', async () => {
			const user = userEvent.setup();
			const onAddToWatchlist = jest.fn();
			const onRemoveFromWatchlist = jest.fn();

			render(
				<CardContent
					backdropUrl={DummyMovie.backdrop_path}
					id={Number(DummyMovie.id)}
					mediaType="movie"
					overview={DummyMovie.overview}
					title={DummyMovie.title}
					posterUrl={DummyMovie.poster_path}
					onAddToWatchlistClick={onAddToWatchlist}
					onRemoveFromWatchlistClick={onRemoveFromWatchlist}
					isInWatchlist
				/>,
			);

			const baseCard = screen.getByTestId(`movie-${DummyMovie.id}-base-card`);
			const popupCard = screen.getByTestId(`movie-${DummyMovie.id}-popup-card`);

			act(() => {
				user.hover(baseCard);
			});

			await waitFor(
				async () => {
					expect(popupCard).toHaveClass('expand expandShow');

					const removeButton = screen.getByRole('button', {
						name: /remove from watchlist/i,
					});

					await user.click(removeButton);

					expect(onRemoveFromWatchlist).toHaveBeenCalledTimes(1);
					expect(onAddToWatchlist).toHaveBeenCalledTimes(0);
				},
				{ timeout: 2000 },
			);
		});
	});
});
