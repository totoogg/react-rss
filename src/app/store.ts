import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { dataReducer } from '@/shared';

const rootReducer = combineReducers({
  data: dataReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    devTools: import.meta.env.VITE_DEV_MODE !== 'production',
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
