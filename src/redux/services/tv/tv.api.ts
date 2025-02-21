import * as T from './tv.type';
import { createApi } from '@reduxjs/toolkit/query/react';
import { normalize } from 'normalizr';
import { episodeEntity, tvEntity } from './tv.entity';
import { TvModel } from '@/redux/slices';
import { generateBaseQuery } from '@/redux/base-queries/base-query';

export const tvApi = createApi({
	reducerPath: 'tvApi',
	baseQuery: generateBaseQuery({ prefix: 'tv' }),
	endpoints: (builder) => ({
		fetchTopRatedTv: builder.query<
			T.NormalizedFetchTopRatedTvRes,
			T.FetchTopRatedTvArgs
		>({
			query: ({ page, language = 'en-US' }) => ({
				url: 'top_rated',
				method: 'GET',
				params: {
					page,
					language,
				},
			}),
			transformResponse: (response: T.FetchTopRatedTvRes) => {
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

		fetchSimilarTvById: builder.query<
			T.NormalizedFetchSimilarTvRes,
			T.FetchSimilarTvArgs
		>({
			query: ({ page, language = 'en-US', id }) => ({
				url: `${id}/similar`,
				method: 'GET',
				params: {
					page,
					language,
				},
			}),
			transformResponse: (response: T.FetchSimilarTvRes) => {
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

		fetchTvDetailById: builder.query<
			T.NormalizedFetchTvDetailByIdRes,
			T.FetchTvDetailByIdArgs
		>({
			query: ({ id, language = 'en-US', append_to_response }) => ({
				url: `${id}`,
				method: 'GET',
				params: {
					language,
					...(!!append_to_response && { append_to_response }),
				},
			}),
			transformResponse: (response: T.FetchTvDetailByIdRes) => {
				const tv = response;

				const normalizedResults = normalize<TvModel>(tv || {}, tvEntity);
				const { entities, result } = normalizedResults;

				return {
					entities,
					result,
				};
			},
		}),

		fetchTvSeasonDetail: builder.query<
			T.NormalizedFetchTvSeasonDetailRes,
			T.FetchTvSeasonDetailArgs
		>({
			query: ({ series_id, season_number, language = 'en-US' }) => ({
				url: `${series_id}/season/${season_number}`,
				method: 'GET',
				params: {
					language,
				},
			}),
			transformResponse: (response: T.FetchTvSeasonDetailRes) => {
				const { episodes } = response;

				const normalizedResults = normalize(episodes || {}, [episodeEntity]);
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
	useFetchTopRatedTvQuery,
	useFetchSimilarTvByIdQuery,
	useFetchTvDetailByIdQuery,
	useFetchTvSeasonDetailQuery,
} = tvApi;
