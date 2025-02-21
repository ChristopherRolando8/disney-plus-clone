import { createApi } from "@reduxjs/toolkit/query/react";
import * as T from "./search.type";
import { normalize } from "normalizr";
import { movieEntity } from "../movie/movie.entity";
import { tvEntity } from "../tv/tv.entity";
import { generateBaseQuery } from "@/redux/base-queries/base-query";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: generateBaseQuery({ prefix: "search" }),
  endpoints: (builder) => ({
    multiSearch: builder.query<T.NormalizedMultiSearchRes, T.MultiSearchArgs>({
      query: ({ query, page, language = "en-US", include_adult = false }) => ({
        url: `multi`,
        method: "GET",
        params: {
          query,
          page,
          language,
          include_adult,
        },
      }),
      transformResponse: (response: T.MultiSearchRes) => {
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
  }),
});

export const { useMultiSearchQuery } = searchApi;
