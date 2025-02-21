import { createApi } from '@reduxjs/toolkit/query/react';
import * as T from './movie.type';
import { normalize } from 'normalizr';
import { movieEntity } from './movie.entity';
import { MovieModel } from '@/redux/slices';
import { generateBaseQuery } from '@/redux/base-queries/base-query';

export const movieApi = createApi({
	reducerPath: 'movieApi',
	baseQuery: generateBaseQuery({ prefix: 'movie' }),
	endpoints: (builder) => ({
		fetchTopRatedMovie: builder.query<
			T.NormalizedFetchTopRatedMovieRes,
			T.FetchTopRatedMovieArgs
		>({
			query: ({ page, language = 'en-US', region }) => ({
				url: 'top_rated',
				method: 'GET',
				params: {
					page,
					language,
					...(!!region && { region }),
				},
			}),
			transformResponse: (response: T.FetchTopRatedMovieRes) => {
				const { page, results, total_pages, total_results } = response;

				const normalizedResults = normalize(results || {}, [movieEntity]);
				const { entities, result } = normalizedResults;

				return {
					entities,
					result,
					totalPages: total_pages,
					totalResults: total_results,
					page,
				};
			},
		}),

		fetchSimilarMovieById: builder.query<
			T.NormalizedFetchSimilarMovieRes,
			T.FetchSimilarMovieArgs
		>({
			query: ({ page, language = 'en-US', id }) => ({
				url: `${id}/similar`,
				method: 'GET',
				params: {
					page,
					language,
				},
			}),
			transformResponse: (response: T.FetchSimilarMovieRes) => {
				const { page, results, total_pages, total_results } = response;

				const normalizedResults = normalize(results || {}, [movieEntity]);
				const { entities, result } = normalizedResults;

				return {
					entities,
					result,
					totalPages: total_pages,
					totalResults: total_results,
					page,
				};
			},
		}),

		fetchMovieDetailById: builder.query<
			T.NormalizedFetchMovieDetailByIdRes,
			T.FetchMovieDetailByIdArgs
		>({
			query: ({ id, language = 'en-US', append_to_response }) => ({
				url: `${id}`,
				method: 'GET',
				params: {
					language,
					...(!!append_to_response && { append_to_response }),
				},
			}),
			transformResponse: (response: T.FetchMovieDetailByIdRes) => {
				const movie = response;

				const normalizedResults = normalize<MovieModel>(
					movie || {},
					movieEntity,
				);
				const { entities, result } = normalizedResults;

				return {
					entities,
					result,
				};
			},
		}),
	}),
});

export const {
	useFetchTopRatedMovieQuery,
	useFetchSimilarMovieByIdQuery,
	useFetchMovieDetailByIdQuery,
} = movieApi;
