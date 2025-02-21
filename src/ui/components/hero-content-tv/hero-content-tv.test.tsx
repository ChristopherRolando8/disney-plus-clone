import { render, screen } from '@testing-library/react';
import HeroContentTv from './hero-content-tv';
import { DummyTv } from '@/lib/test-utils/dummy-data';
import userEvent from '@testing-library/user-event';
import { generateUrlFromContent } from '@/lib/utils';

describe('Hero Content Tv', () => {
	describe('View', () => {
		it('should render image backdrop', () => {
			render(
				<HeroContentTv
					backdropUrl={DummyTv.backdrop_path}
					id={DummyTv.id}
					overview={DummyTv.overview}
					title={DummyTv.name}
					airDate={DummyTv.first_air_date}
					numberOfSeasons={2}
					language={DummyTv.original_language}
					genres={[{ id: '1', name: 'Drama' }]}
				/>,
			);

			const backdropImage = screen.getByRole('img', {
				name: `${DummyTv.name} backdrop`,
			});

			expect(backdropImage).toBeInTheDocument();
		});

		it('should render correct tv information', () => {
			render(
				<HeroContentTv
					backdropUrl={DummyTv.backdrop_path}
					id={DummyTv.id}
					overview={DummyTv.overview}
					title={DummyTv.name}
					airDate={DummyTv.first_air_date}
					numberOfSeasons={2}
					language={DummyTv.original_language}
					genres={[{ id: '1', name: 'Drama' }]}
				/>,
			);

			const title = screen.getByText(DummyTv.name);
			const year = screen.getByText('2022');
			const season = screen.getByText('2 Season');
			const overview = screen.getByText(DummyTv.overview);
			const language = screen.getByText(DummyTv.original_language);

			expect(title).toBeInTheDocument();
			expect(year).toBeInTheDocument();
			expect(season).toBeInTheDocument();
			expect(overview).toBeInTheDocument();
			expect(language).toBeInTheDocument();
		});

		it('should render a button to add to watchlist when the content is not in watchlist', async () => {
			render(
				<HeroContentTv
					backdropUrl={DummyTv.backdrop_path}
					id={DummyTv.id}
					overview={DummyTv.overview}
					title={DummyTv.name}
					airDate={DummyTv.first_air_date}
					numberOfSeasons={2}
					language={DummyTv.original_language}
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
				<HeroContentTv
					backdropUrl={DummyTv.backdrop_path}
					id={DummyTv.id}
					overview={DummyTv.overview}
					title={DummyTv.name}
					airDate={DummyTv.first_air_date}
					numberOfSeasons={2}
					language={DummyTv.original_language}
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
				<HeroContentTv
					backdropUrl={DummyTv.backdrop_path}
					id={DummyTv.id}
					overview={DummyTv.overview}
					title={DummyTv.name}
					airDate={DummyTv.first_air_date}
					numberOfSeasons={2}
					language={DummyTv.original_language}
					genres={[{ id: '1', name: 'Drama' }]}
					enableHref
				/>,
			);

			const url = screen.getByRole('link');

			expect(url).toHaveAttribute(
				'href',
				generateUrlFromContent({
					id: Number(DummyTv.id),
					mediaType: 'tv',
					title: DummyTv.name,
				}),
			);
		});

		it('should not render anchor tags if enableHref -> false ', () => {
			render(
				<HeroContentTv
					backdropUrl={DummyTv.backdrop_path}
					id={DummyTv.id}
					overview={DummyTv.overview}
					title={DummyTv.name}
					airDate={DummyTv.first_air_date}
					numberOfSeasons={2}
					language={DummyTv.original_language}
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
				<HeroContentTv
					backdropUrl={DummyTv.backdrop_path}
					id={DummyTv.id}
					overview={DummyTv.overview}
					title={DummyTv.name}
					airDate={DummyTv.first_air_date}
					numberOfSeasons={2}
					language={DummyTv.original_language}
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
				<HeroContentTv
					backdropUrl={DummyTv.backdrop_path}
					id={DummyTv.id}
					overview={DummyTv.overview}
					title={DummyTv.name}
					airDate={DummyTv.first_air_date}
					numberOfSeasons={2}
					language={DummyTv.original_language}
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
