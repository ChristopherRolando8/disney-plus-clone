import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { discoverApi, searchApi, trendingApi, tvApi } from "@/redux/services";
import { TvInitialState, TvModel } from "./tv.type";

export const tvAdapter = createEntityAdapter<TvModel>();

const tvSlice = createSlice({
  name: "tv",
  initialState: tvAdapter.getInitialState<TvInitialState>({
    selectedTvId: "",
    topRatedTv: {
      ids: [],
      totalPages: 0,
      totalResults: 0,
      page: 0,
    },
    similarTv: {
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
        tvApi.endpoints.fetchTopRatedTv.matchFulfilled,
        (state, action) => {
          const { entities, totalPages, totalResults, page, result } =
            action.payload;

          state.topRatedTv.totalPages = totalPages;
          state.topRatedTv.totalResults = totalResults;
          state.topRatedTv.page = page;
          state.topRatedTv.ids = result;

          const { tv = {} } = entities;

          tvAdapter.upsertMany(state, tv);
        }
      )
      .addMatcher(
        tvApi.endpoints.fetchSimilarTvById.matchFulfilled,
        (state, action) => {
          const { entities, totalPages, totalResults, page, result } =
            action.payload;

          state.similarTv.totalPages = totalPages;
          state.similarTv.totalResults = totalResults;
          state.similarTv.page = page;
          state.similarTv.ids = result;

          const { tv = {} } = entities;

          tvAdapter.upsertMany(state, tv);
        }
      )
      .addMatcher(
        tvApi.endpoints.fetchTvDetailById.matchFulfilled,
        (state, action) => {
          const { entities } = action.payload;

          const { tv = {} } = entities;

          tvAdapter.upsertMany(state, tv);

          // Need to store the current selected id application wide to communicate to components
          const { id } = action.meta.arg.originalArgs;

          if (!id) return;

          state.selectedTvId = id;
        }
      )
      .addMatcher(
        trendingApi.endpoints.fetchAllTrending.matchFulfilled,
        (state, action) => {
          const { tv } = action.payload;

          const { tv: tvEntities = {} } = tv.entities;

          tvAdapter.upsertMany(state, tvEntities);
        }
      )
      .addMatcher(
        trendingApi.endpoints.fetchTrendingTv.matchFulfilled,
        (state, action) => {
          const { entities } = action.payload;

          const { tv = {} } = entities;

          tvAdapter.upsertMany(state, tv);
        }
      )
      .addMatcher(
        discoverApi.endpoints.fetchDiscoverTv.matchFulfilled,
        (state, action) => {
          const { entities } = action.payload;

          const { tv = {} } = entities;

          tvAdapter.upsertMany(state, tv);
        }
      )
      .addMatcher(
        searchApi.endpoints.multiSearch.matchFulfilled,
        (state, action) => {
          const { tv } = action.payload;

          const { tv: tvEntities = {} } = tv.entities;

          tvAdapter.upsertMany(state, tvEntities);
        }
      );
  },
});

export const tvReducer = tvSlice.reducer;
