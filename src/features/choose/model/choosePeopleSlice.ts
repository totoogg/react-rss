import { ICharacter } from '@/shared';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IChoosePeople {
  length: number;
  [key: string]: ICharacter | number;
}

const initialState: IChoosePeople = { length: 0 };

const choosePeopleSlice = createSlice({
  name: 'choose',
  initialState,
  reducers: {
    choosePeople: (state, action: PayloadAction<ICharacter>) => {
      if (Object.prototype.hasOwnProperty.call(state, action.payload.name)) {
        delete state[action.payload.name];
        state.length -= 1;
      } else {
        state[action.payload.name] = action.payload;
        state.length += 1;
      }
    },
    clearChoosePeople: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const { choosePeople, clearChoosePeople } = choosePeopleSlice.actions;

export default choosePeopleSlice.reducer;
