import * as SR from "@/redux/services";
import * as SL from "@/redux/slices";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { AppStore } from "./store.type";

/**
  My Store Definitions steps:
  1. First, we need to combine all the lists of reducer we are using (const combinedReducer = ...)
 			(Reference: https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics#configuring-the-store)
  2. Second, we need to handle syncing state from server <-> client, using next-redux-wrapper we can do state reconciliation in hydration (const hydratedReducer = ...)
 			(Reference: https://github.com/kirill-konshin/next-redux-wrapper?tab=readme-ov-file#state-reconciliation-during-hydration)
  3. Third, we insert all our API services' middlewares when calling configureStore function, as it is recommended by redux best practice
  4. Fourth, we call createWrapper function from next-redux-wrapper to wrap our store to enable SSR with Redux
 */
const combinedReducer = combineReducers({
  [SR.movieApi.reducerPath]: SR.movieApi.reducer,
  [SR.tvApi.reducerPath]: SR.tvApi.reducer,
  [SR.trendingApi.reducerPath]: SR.trendingApi.reducer,
  [SR.discoverApi.reducerPath]: SR.discoverApi.reducer,
  [SR.searchApi.reducerPath]: SR.searchApi.reducer,
  movie: SL.movieReducer,
  tv: SL.tvReducer,
  trending: SL.trendingReducer,
  genre: SL.genreReducer,
  episode: SL.episodeReducer,
  season: SL.seasonReducer,
  discover: SL.discoverReducer,
  search: SL.searchReducer,
  watchlist: SL.watchlistReducer,
});

// https://github.com/kirill-konshin/next-redux-wrapper?tab=readme-ov-file#getserversideprops
// This is used to hydrate the server redux state into the client
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hydratedReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };

    // We need to preserve the watchlist that is obtained from the localStorage on Client Side
    // This is to prevent the watchlist is empty when navigating to other site
    if (state.watchlist) nextState.watchlist = state.watchlist;

    return nextState;
  }
  return combinedReducer(state, action);
};

export const configureStoreWithMiddlewares = () => {
  const enhancedStore = configureStore({
    reducer: hydratedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(SR.movieApi.middleware)
        .concat(SR.tvApi.middleware)
        .concat(SR.trendingApi.middleware)
        .concat(SR.discoverApi.middleware)
        .concat(SR.searchApi.middleware),
  });

  return enhancedStore;
};

export const store = configureStoreWithMiddlewares();

// https://github.com/kirill-konshin/next-redux-wrapper#redux-toolkit
export const wrapper = createWrapper<AppStore>(configureStoreWithMiddlewares, {
  serializeState: (state) => JSON.stringify(state),
  deserializeState: (state) => JSON.parse(state),
});
