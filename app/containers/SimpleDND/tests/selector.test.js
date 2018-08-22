import { fromJS, List } from 'immutable';
import {
   selectBoards,
   makeSelectorBoards,
} from '../selectors';


describe('make Selector Boards', () => {
  it('should select the global state', () => {
    const globalState = fromJS({});
    const mockedState = fromJS({
      boards: globalState,
    });
    expect(selectBoards(mockedState)).toEqual(globalState);
  });
});
describe('makeSelectorBoards', () => {
  const makeSelector = makeSelectorBoards();
  it('should select the posts', () => {
    const cards = new List();
    const mockedState = fromJS({
      boards: {
        cards,
      },
    });
    expect(makeSelector(mockedState)).toEqual(cards);
  });
});
