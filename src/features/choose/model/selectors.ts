import { createSelector } from '@reduxjs/toolkit';

export const selectLengthChoosePeople = (state: RootState) =>
  state.choose.length;

export const selectIsChoosePeople = createSelector(
  [(state: RootState) => state.choose, (_state, name: string) => name],
  (state, name) => Object.prototype.hasOwnProperty.call(state, name)
);
