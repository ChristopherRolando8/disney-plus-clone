import { schema } from 'normalizr';

export const genreEntity = new schema.Entity('genre');

export const movieEntity = new schema.Entity('movie', {
	genres: [genreEntity],
});
