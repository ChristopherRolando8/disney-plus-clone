import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import {
  discoverApi,
  movieApi,
  searchApi,
  trendingApi,
} from "@/redux/services";
import { MovieInitialState, MovieModel } from "./movie.type";

export const movieAdapter = createEntityAdapter<MovieModel>();

const movieSlice = createSlice({
  name: "movie",
  initialState: movieAdapter.getInitialState<MovieInitialState>({
    selectedMovieId: "",
    topRatedMovie: {
      ids: [],
      totalPages: 0,
      totalResults: 0,
      page: 0,
    },
    similarMovie: {
      ids: [],
      totalPages: 0,
      totalResults: 0,
      page: 0,
    },
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        movieApi.endpoints.fetchTopRatedMovie.matchFulfilled,
        (state, action) => {
          const { entities, totalPages, totalResults, page, result } =
            action.payload;

          state.topRatedMovie.totalPages = totalPages;
          state.topRatedMovie.totalResults = totalResults;
          state.topRatedMovie.page = page;
          state.topRatedMovie.ids = result;

          const { movie = {} } = entities;

          movieAdapter.upsertMany(state, movie);
        }
      )
      .addMatcher(
        movieApi.endpoints.fetchSimilarMovieById.matchFulfilled,
        (state, action) => {
          const { entities, totalPages, totalResults, page, result } =
            action.payload;

          state.similarMovie.totalPages = totalPages;
          state.similarMovie.totalResults = totalResults;
          state.similarMovie.page = page;
          state.similarMovie.ids = result;

          const { movie = {} } = entities;

          movieAdapter.upsertMany(state, movie);
        }
      )
      .addMatcher(
        movieApi.endpoints.fetchMovieDetailById.matchFulfilled,
        (state, action) => {
          const { entities } = action.payload;

          const { movie = {} } = entities;

          movieAdapter.upsertMany(state, movie);

          // Need to store the current selected id application wide to communicate to components
          const { id } = action.meta.arg.originalArgs;

          if (!id) return;

          state.selectedMovieId = id;
        }
      )
      .addMatcher(
        trendingApi.endpoints.fetchAllTrending.matchFulfilled,
        (state, action) => {
          const { movie } = action.payload;

          const { movie: movieEntities = {} } = movie.entities;

          movieAdapter.upsertMany(state, movieEntities);
        }
      )
      .addMatcher(
        trendingApi.endpoints.fetchTrendingMovie.matchFulfilled,
        (state, action) => {
          const { entities } = action.payload;

          const { movie = {} } = entities;

          movieAdapter.upsertMany(state, movie);
        }
      )
      .addMatcher(
        discoverApi.endpoints.fetchDiscoverMovie.matchFulfilled,
        (state, action) => {
          const { entities } = action.payload;

          const { movie = {} } = entities;

          movieAdapter.upsertMany(state, movie);
        }
      )
      .addMatcher(
        searchApi.endpoints.multiSearch.matchFulfilled,
        (state, action) => {
          const { movie } = action.payload;

          const { movie: movieEntities = {} } = movie.entities;

          movieAdapter.upsertMany(state, movieEntities);
        }
      );
  },
});

export const movieReducer = movieSlice.reducer;
