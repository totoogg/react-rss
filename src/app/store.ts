import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiSlice, errorReducer, loaderReducer } from '@/shared';
import { choosePeopleReducer } from '@/features';

const rootReducer = combineReducers({
  choose: choosePeopleReducer,
  loader: loaderReducer,
  error: errorReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: import.meta.env.VITE_DEV_MODE !== 'production',
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
