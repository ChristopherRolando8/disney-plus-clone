import * as SL from '@/redux/slices';
import { TabItem } from '@/ui/components';

// ? Dummy data for test purposes
export const DummyMovie: SL.MovieModel = {
	id: '278',
	backdrop_path: '/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg',
	genres: ['18', '80'],
	original_language: 'en',
	overview:
		'Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.',
	poster_path: '/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg',
	release_date: '1994-09-23',
	runtime: 142,
	title: 'The Shawshank Redemption',
};

export const DummyTv: SL.TvModel = {
	backdrop_path: '/etj8E2o0Bud0HkONVQPjyCkIvpv.jpg',
	first_air_date: '2022-08-21',
	id: '94997',
	name: 'House of the Dragon',
	overview:
		'The Targaryen dynasty is at the absolute apex of its power, with more than 15 dragons under their yoke. Most empires crumble from such heights. In the case of the Targaryens, their slow fall begins when King Viserys breaks with a century of tradition by naming his daughter Rhaenyra heir to the Iron Throne. But when Viserys later fathers a son, the court is shocked when Rhaenyra retains her status as his heir, and seeds of division sow friction across the realm.',
	poster_path: '/7QMsOTMUswlwxJP0rTTZfmz2tX2.jpg',
	seasons: [],
	original_language: 'en',
};

export const DummyEpisode: SL.EpisodeModel = {
	air_date: '2019-07-25',
	episode_number: 1,
	id: '1705013',
	name: 'The Name of the Game',
	overview:
		'When a Supe kills the love of his life, A/V salesman Hughie Campbell teams up with Billy Butcher, a vigilante hell-bent on punishing corrupt Supes — and Hughie’s life will never be the same again.',
	runtime: 61,
	season_number: 1,
	show_id: '76479',
	still_path: '/83vFYTHtCqWwaDtZluSU8bmnFYG.jpg',
};

export const DummyTabs: TabItem[] = [
	{
		id: '1',
		value: 'similar',
		label: 'Similar',
	},
	{
		id: '2',
		value: 'more-like-this',
		label: 'More Like This',
	},
];
