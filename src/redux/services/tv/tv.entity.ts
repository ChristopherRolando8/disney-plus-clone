import { schema } from 'normalizr';

export const genreEntity = new schema.Entity('genre');

export const seasonEntity = new schema.Entity('season');

export const tvEntity = new schema.Entity('tv', {
	genres: [genreEntity],
	seasons: [seasonEntity],
});

export const episodeEntity = new schema.Entity('episode');
