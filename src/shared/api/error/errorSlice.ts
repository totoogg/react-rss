import { createSlice } from '@reduxjs/toolkit';

export interface IError {
  isError: boolean;
}

const initialState: IError = {
  isError: false,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    showError: (state) => {
      state.isError = true;
    },
  },
});

export const { showError } = errorSlice.actions;

export const selectIsError = (state: RootState) => state.error.isError;

export default errorSlice.reducer;
