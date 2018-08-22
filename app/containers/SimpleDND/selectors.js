import { createSelector } from 'reselect';

const selectBoards = (state) => state.get('boards');

const makeSelectorBoards = () => createSelector(
  selectBoards,
  (boardsState) => boardsState.get('cards')
);

export {
  makeSelectorBoards,
  selectBoards,
};

