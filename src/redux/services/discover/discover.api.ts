import { createApi } from '@reduxjs/toolkit/query/react';
import * as T from './discover.type';
import { normalize } from 'normalizr';
import { generateBaseQuery } from '@/redux/base-queries/base-query';
import { movieEntity } from '../movie/movie.entity';
import { tvEntity } from '../tv/tv.entity';

export const discoverApi = createApi({
	reducerPath: 'discoverApi',
	baseQuery: generateBaseQuery({ prefix: 'discover' }),
	endpoints: (builder) => ({
		fetchDiscoverMovie: builder.query<
			T.NormalizedFetchDiscoverMovieRes,
			T.FetchDiscoverMovieArgs
		>({
			query: ({
				page,
				sort_by = 'popularity.desc',
				include_adult = false,
				include_video = false,
				language = 'en-US',
			}) => ({
				url: 'movie',
				method: 'GET',
				params: {
					page,
					sort_by,
					include_adult,
					include_video,
					language,
				},
			}),
			transformResponse: (response: T.FetchDiscoverMovieRes) => {
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

		fetchDiscoverTv: builder.query<
			T.NormalizedFetchDiscoverTvRes,
			T.FetchDiscoverTvArgs
		>({
			query: ({
				page,
				sort_by = 'popularity.desc',
				include_adult = false,
				include_video = false,
				language = 'en-US',
			}) => ({
				url: 'tv',
				method: 'GET',
				params: {
					page,
					sort_by,
					include_adult,
					include_video,
					language,
				},
			}),
			transformResponse: (response: T.FetchDiscoverTvRes) => {
				const { page, results, total_pages, total_results } = response;

				const normalizedResults = normalize(results || {}, [tvEntity]);
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
	}),
});

export const { useFetchDiscoverMovieQuery, useFetchDiscoverTvQuery } =
	discoverApi;
