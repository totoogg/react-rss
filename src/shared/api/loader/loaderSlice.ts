import { createSlice } from '@reduxjs/toolkit';

export interface ILoader {
  isLoader: boolean;
  countLoader: number;
}

const initialState: ILoader = {
  isLoader: true,
  countLoader: 1,
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    addLoader: (state) => {
      state.countLoader += 1;
      state.isLoader = true;
    },
    removeLoader: (state) => {
      state.countLoader -= 1;
      if (state.countLoader < 0) state.countLoader = 0;
      if (state.countLoader === 0) state.isLoader = false;
    },
  },
});

export const { addLoader, removeLoader } = loaderSlice.actions;

export const selectIsLoader = (state: RootState) => state.loader.isLoader;

export default loaderSlice.reducer;
