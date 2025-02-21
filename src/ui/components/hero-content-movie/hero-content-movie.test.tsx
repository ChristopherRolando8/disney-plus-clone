import { render, screen } from '@testing-library/react';
import HeroContentMovie from './hero-content-movie';
import { DummyMovie } from '@/lib/test-utils/dummy-data';
import userEvent from '@testing-library/user-event';
import { generateUrlFromContent } from '@/lib/utils';

describe('Hero Content Movie', () => {
	describe('View', () => {
		it('should render image backdrop', () => {
			render(
				<HeroContentMovie
					backdropUrl={DummyMovie.backdrop_path}
					id={DummyMovie.id}
					overview={DummyMovie.overview}
					title={DummyMovie.title}
					releaseDate={DummyMovie.release_date}
					runtime={DummyMovie.runtime}
					language={DummyMovie.original_language}
					genres={[{ id: '1', name: 'Drama' }]}
				/>,
			);

			const backdropImage = screen.getByRole('img', {
				name: `${DummyMovie.title} backdrop`,
			});

			expect(backdropImage).toBeInTheDocument();
		});

		it('should render correct movie information', () => {
			render(
				<HeroContentMovie
					backdropUrl={DummyMovie.backdrop_path}
					id={DummyMovie.id}
					overview={DummyMovie.overview}
					title={DummyMovie.title}
					releaseDate={DummyMovie.release_date}
					runtime={DummyMovie.runtime}
					language={DummyMovie.original_language}
					genres={[{ id: '1', name: 'Drama' }]}
				/>,
			);

			const title = screen.getByText(DummyMovie.title);
			const year = screen.getByText('1994');
			const overview = screen.getByText(DummyMovie.overview);
			const language = screen.getByText(DummyMovie.original_language);

			expect(title).toBeInTheDocument();
			expect(year).toBeInTheDocument();
			expect(overview).toBeInTheDocument();
			expect(language).toBeInTheDocument();
		});

		it('should render a button to add to watchlist when the content is not in watchlist', async () => {
			render(
				<HeroContentMovie
					backdropUrl={DummyMovie.backdrop_path}
					id={DummyMovie.id}
					overview={DummyMovie.overview}
					title={DummyMovie.title}
					releaseDate={DummyMovie.release_date}
					runtime={DummyMovie.runtime}
					language={DummyMovie.original_language}
					genres={[{ id: '1', name: 'Drama' }]}
					isInWatchlist={false}
				/>,
			);

			const addButton = screen.getByRole('button', {
				name: /add to watchlist/i,
			});

			expect(addButton).toBeInTheDocument();
		});

		it('should render a button to remove from watchlist when the content is in watchlist', async () => {
			render(
				<HeroContentMovie
					backdropUrl={DummyMovie.backdrop_path}
					id={DummyMovie.id}
					overview={DummyMovie.overview}
					title={DummyMovie.title}
					releaseDate={DummyMovie.release_date}
					runtime={DummyMovie.runtime}
					language={DummyMovie.original_language}
					genres={[{ id: '1', name: 'Drama' }]}
					isInWatchlist
				/>,
			);

			const addButton = screen.getByRole('button', {
				name: /remove from watchlist/i,
			});

			expect(addButton).toBeInTheDocument();
		});

		it('should render anchor tags if enableHref -> true ', () => {
			render(
				<HeroContentMovie
					backdropUrl={DummyMovie.backdrop_path}
					id={DummyMovie.id}
					overview={DummyMovie.overview}
					title={DummyMovie.title}
					releaseDate={DummyMovie.release_date}
					runtime={DummyMovie.runtime}
					language={DummyMovie.original_language}
					genres={[{ id: '1', name: 'Drama' }]}
					enableHref
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

		it('should not render anchor tags if enableHref -> false ', () => {
			render(
				<HeroContentMovie
					backdropUrl={DummyMovie.backdrop_path}
					id={DummyMovie.id}
					overview={DummyMovie.overview}
					title={DummyMovie.title}
					releaseDate={DummyMovie.release_date}
					runtime={DummyMovie.runtime}
					language={DummyMovie.original_language}
					genres={[{ id: '1', name: 'Drama' }]}
					enableHref={false}
				/>,
			);

			const url = screen.queryByRole('link');

			expect(url).not.toBeInTheDocument();
		});
	});

	describe('Interaction & Logic', () => {
		it('should trigger function to add to watchlist, if content is not in watchlist', async () => {
			const user = userEvent.setup();
			const onAddToWatchlist = jest.fn();
			const onRemoveFromWatchlist = jest.fn();

			render(
				<HeroContentMovie
					backdropUrl={DummyMovie.backdrop_path}
					id={DummyMovie.id}
					overview={DummyMovie.overview}
					title={DummyMovie.title}
					releaseDate={DummyMovie.release_date}
					runtime={DummyMovie.runtime}
					language={DummyMovie.original_language}
					genres={[{ id: '1', name: 'Drama' }]}
					isInWatchlist={false}
					onAddToWatchlist={onAddToWatchlist}
					onRemoveFromWatchlist={onRemoveFromWatchlist}
				/>,
			);

			const addButton = screen.getByRole('button', {
				name: /add to watchlist/i,
			});

			await user.click(addButton);

			expect(onAddToWatchlist).toHaveBeenCalledTimes(1);
			expect(onRemoveFromWatchlist).toHaveBeenCalledTimes(0);
		});

		it('should trigger function to remove from watchlist, if content is in watchlist', async () => {
			const user = userEvent.setup();
			const onAddToWatchlist = jest.fn();
			const onRemoveFromWatchlist = jest.fn();

			render(
				<HeroContentMovie
					backdropUrl={DummyMovie.backdrop_path}
					id={DummyMovie.id}
					overview={DummyMovie.overview}
					title={DummyMovie.title}
					releaseDate={DummyMovie.release_date}
					runtime={DummyMovie.runtime}
					language={DummyMovie.original_language}
					genres={[{ id: '1', name: 'Drama' }]}
					isInWatchlist
					onAddToWatchlist={onAddToWatchlist}
					onRemoveFromWatchlist={onRemoveFromWatchlist}
				/>,
			);

			const removeButton = screen.getByRole('button', {
				name: /remove from watchlist/i,
			});

			await user.click(removeButton);

			expect(onAddToWatchlist).toHaveBeenCalledTimes(0);
			expect(onRemoveFromWatchlist).toHaveBeenCalledTimes(1);
		});
	});
});
