import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IPeople {
  name: string;
  birth_year: string;
  films: string;
  url: string;
}

export interface IChoosePeople {
  length: number;
  [key: string]: IPeople | number;
}

const initialState: IChoosePeople = { length: 0 };

const choosePeopleSlice = createSlice({
  name: 'choose',
  initialState,
  reducers: {
    choosePeople: (state, action: PayloadAction<IPeople>) => {
      if (Object.prototype.hasOwnProperty.call(state, action.payload.name)) {
        delete state[action.payload.name];
        state.length -= 1;
      } else {
        state[action.payload.name] = action.payload;
        state.length += 1;
      }
    },
  },
});

export const { choosePeople } = choosePeopleSlice.actions;

export default choosePeopleSlice.reducer;
