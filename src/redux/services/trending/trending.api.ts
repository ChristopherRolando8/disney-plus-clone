import { createApi } from "@reduxjs/toolkit/query/react";
import * as T from "./trending.type";
import { normalize } from "normalizr";
import { movieEntity } from "../movie/movie.entity";
import { tvEntity } from "../tv/tv.entity";
import { generateBaseQuery } from "@/redux/base-queries/base-query";

export const trendingApi = createApi({
  reducerPath: "trendingApi",
  baseQuery: generateBaseQuery({ prefix: "trending" }),
  endpoints: (builder) => ({
    fetchAllTrending: builder.query<
      T.NormalizedFetchAllTrendingRes,
      T.FetchAllTrendingArgs
    >({
      query: ({ time_window, language = "en-US" }) => ({
        url: `all/${time_window}`,
        method: "GET",
        params: {
          language,
        },
      }),
      transformResponse: (response: T.FetchAllTrendingRes) => {
        const { page, results, total_pages, total_results } = response;
        const movieResults = results.filter(
          (item) => item?.media_type === "movie"
        );
        const tvResults = results.filter((item) => item?.media_type === "tv");

        const normalizedMovieResult = normalize(movieResults || {}, [
          movieEntity,
        ]);
        const { entities: movieEntities, result: movieResult } =
          normalizedMovieResult;

        const normalizedTvResult = normalize(tvResults || {}, [tvEntity]);
        const { entities: tvEntities, result: tvResult } = normalizedTvResult;

        return {
          movie: {
            entities: movieEntities,
            result: movieResult,
          },
          tv: {
            entities: tvEntities,
            result: tvResult,
          },
          totalPages: total_pages,
          totalResults: total_results,
          page,
        };
      },
    }),

    fetchTrendingMovie: builder.query<
      T.NormalizedFetchTrendingMovieRes,
      T.FetchTrendingMovieArgs
    >({
      query: ({ time_window, language = "en-US" }) => ({
        url: `movie/${time_window}`,
        method: "GET",
        params: {
          language,
        },
      }),
      transformResponse: (response: T.FetchTrendingMovieRes) => {
        const { page, results, total_pages, total_results } = response;

        const normalizedResult = normalize(results || {}, [movieEntity]);
        const { entities, result } = normalizedResult;

        return {
          entities,
          result,
          totalPages: total_pages,
          totalResults: total_results,
          page,
        };
      },
    }),

    fetchTrendingTv: builder.query<
      T.NormalizedFetchTrendingTvRes,
      T.FetchTrendingTvArgs
    >({
      query: ({ time_window, language = "en-US" }) => ({
        url: `tv/${time_window}`,
        method: "GET",
        params: {
          language,
        },
      }),
      transformResponse: (response: T.FetchTrendingTvRes) => {
        const { page, results, total_pages, total_results } = response;

        const normalizedResult = normalize(results || {}, [tvEntity]);
        const { entities, result } = normalizedResult;

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

export const {
  useFetchAllTrendingQuery,
  useFetchTrendingMovieQuery,
  useFetchTrendingTvQuery,
} = trendingApi;
