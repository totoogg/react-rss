import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Data {
  username: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  accept: boolean | string;
  file: string;
  country: string;
}

export interface IData {
  data: Data[];
}

const initialState: IData = {
  data: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<Data>) => {
      state.data.push(action.payload);
    },
  },
});

export const { addData } = dataSlice.actions;

export const selectData = (state: RootState) => state.data.data;

export default dataSlice.reducer;
