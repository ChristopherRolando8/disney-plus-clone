import { DummyEpisode } from '@/lib/test-utils/dummy-data';
import CardEpisode from './card-episode';
import { render, screen } from '@testing-library/react';

describe('Card Episode', () => {
	describe('View', () => {
		it('should render the title based from props', () => {
			render(
				<CardEpisode
					id={DummyEpisode.id}
					name={DummyEpisode.name}
					season={DummyEpisode.season_number}
					airDate={DummyEpisode.air_date}
					duration={DummyEpisode.runtime}
					episode={DummyEpisode.episode_number}
					overview={DummyEpisode.overview}
					posterUrl={DummyEpisode.still_path}
				/>,
			);

			const title = screen.getByText(DummyEpisode.name);

			expect(title).toBeInTheDocument();
		});

		it('should render the season and episode, both in display and in placeholder, based from props', () => {
			render(
				<CardEpisode
					id={DummyEpisode.id}
					name={DummyEpisode.name}
					season={DummyEpisode.season_number}
					airDate={DummyEpisode.air_date}
					duration={DummyEpisode.runtime}
					episode={DummyEpisode.episode_number}
					overview={DummyEpisode.overview}
					posterUrl={DummyEpisode.still_path}
				/>,
			);

			const seasonEpisodeText = screen.getAllByText(
				`S${DummyEpisode.season_number} E${DummyEpisode.episode_number}`,
			);

			expect(seasonEpisodeText).toHaveLength(2); // ? both in placeholder and in display
		});

		it('should render the formatted date based from props', () => {
			render(
				<CardEpisode
					id={DummyEpisode.id}
					name={DummyEpisode.name}
					season={DummyEpisode.season_number}
					airDate={DummyEpisode.air_date}
					duration={DummyEpisode.runtime}
					episode={DummyEpisode.episode_number}
					overview={DummyEpisode.overview}
					posterUrl={DummyEpisode.still_path}
				/>,
			);

			const airDateText = screen.getByText(`25 Jul 2019`);

			expect(airDateText).toBeInTheDocument();
		});

		it('should render the duration based from props', () => {
			render(
				<CardEpisode
					id={DummyEpisode.id}
					name={DummyEpisode.name}
					season={DummyEpisode.season_number}
					airDate={DummyEpisode.air_date}
					duration={DummyEpisode.runtime}
					episode={DummyEpisode.episode_number}
					overview={DummyEpisode.overview}
					posterUrl={DummyEpisode.still_path}
				/>,
			);

			const duration = screen.getByText(`${DummyEpisode.runtime}m`);

			expect(duration).toBeInTheDocument();
		});

		it('should render the overview based from props', () => {
			render(
				<CardEpisode
					id={DummyEpisode.id}
					name={DummyEpisode.name}
					season={DummyEpisode.season_number}
					airDate={DummyEpisode.air_date}
					duration={DummyEpisode.runtime}
					episode={DummyEpisode.episode_number}
					overview={DummyEpisode.overview}
					posterUrl={DummyEpisode.still_path}
				/>,
			);

			const overview = screen.getByText(DummyEpisode.overview);

			expect(overview).toBeInTheDocument();
		});

		it('should render the image from props', () => {
			render(
				<CardEpisode
					id={DummyEpisode.id}
					name={DummyEpisode.name}
					season={DummyEpisode.season_number}
					airDate={DummyEpisode.air_date}
					duration={DummyEpisode.runtime}
					episode={DummyEpisode.episode_number}
					overview={DummyEpisode.overview}
					posterUrl={DummyEpisode.still_path}
				/>,
			);

			const posterImage = screen.getByRole('img', {
				name: `${DummyEpisode.name} Poster`,
			});

			expect(posterImage).toBeInTheDocument();
		});
	});
});
