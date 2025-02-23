import { createSelector } from '@reduxjs/toolkit';

export const selectLengthChoosePeople = (state: RootState) =>
  state.choose.length;

export const selectChoosePeople = createSelector(
  (state: RootState) => state.choose,
  (state) =>
    Object.fromEntries(
      Object.entries(state).filter(([name]) => name !== 'length')
    )
);

export const selectIsChoosePeople = createSelector(
  [(state: RootState) => state.choose, (_state, name: string) => name],
  (state, name) => Object.prototype.hasOwnProperty.call(state, name)
);
