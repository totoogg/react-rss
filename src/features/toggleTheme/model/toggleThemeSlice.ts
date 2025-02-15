import { createSlice } from '@reduxjs/toolkit';

export interface ITheme {
  isSun: boolean;
}

const initialState: ITheme = {
  isSun: true,
};

const toggleThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isSun = !state.isSun;
    },
  },
});

export const { toggleTheme } = toggleThemeSlice.actions;

export const selectIsSun = (state: RootState) => state.theme.isSun;

export default toggleThemeSlice.reducer;
