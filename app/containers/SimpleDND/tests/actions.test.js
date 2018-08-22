import {
  moveBorders,
  moveCardsInsideDesk,
  moveCardsOutSideDesk,
  deleteDesk,
  deleteCard,
  addDesk,
  addCard,
  changeCardText,
} from '../actions';

import {
  MOVE_BORDERS,
  MOVE_CARDS_INSIDE_DESK,
  MOVE_CARDS_OUTSIDE_DESK,
  DELETE_DESK,
  DELETE_CARD,
  ADD_DESK,
  ADD_CARD,
  CHANGE_CARD_TEXT,
} from '../constants';

describe('SimpleDND Action', () => {
  describe('Move Borders Action', () => {
    it('has a type of  MOVE_BORDERS', () => {
      const expected = {
        type: MOVE_BORDERS,
        value: { dragIndex: 15, hoverIndex: 12 },
      };
      expect(moveBorders(15, 12)).toEqual(expected);
    });
  });
  describe('Move Cards Inside Desk', () => {
    it('has a type of  MOVE_CARDS_INSIDE_DESK', () => {
      const expected = {
        type: MOVE_CARDS_INSIDE_DESK,
        value: { deskIndex: 1, dragIndex: 2, hoverIndex: 14 },
      };
      expect(moveCardsInsideDesk(1, 2, 14)).toEqual(expected);
    });
  });
  describe('Move Cards Outside Desk', () => {
    it('has a type of  MOVE_CARDS_OUTSIDE_DESK', () => {
      const expected = {
        type: MOVE_CARDS_OUTSIDE_DESK,
        value: { deskIndexPull: 1, deskIndexPutt: 2, dragIndex: 14 },
      };
      expect(moveCardsOutSideDesk(1, 2, 14)).toEqual(expected);
    });
  });
  describe('Delete Desk', () => {
    it('has a type of  DELETE_DESK', () => {
      const expected = {
        type: DELETE_DESK,
        value: { deskIndex: 1 },
      };
      expect(deleteDesk(1)).toEqual(expected);
    });
  });
  describe('Delete Card', () => {
    test('has a type of  DELETE_CARD', () => {
      const action = deleteCard();
      expect(action.type).toBe(DELETE_CARD);
    });
  });
  describe('Add Desk', () => {
    test('has a type of  ADD_DESK', () => {
      const action = addDesk();
      expect(action.type).toBe(ADD_DESK);
    });
  });
  describe('Add Desk', () => {
    test('has a type of  ADD_DESK', () => {
      const action = addDesk();
      expect(action.type).toBe(ADD_DESK);
    });
  });
  describe('Add card ', () => {
    it('should return ADD_CARD and deskIndex', () => {
      const expectedResult = {
        type: ADD_CARD,
        value: {
          deskIndex: 1,
        },
      };
      const testValue = 1;
      expect(addCard(testValue)).toEqual(expectedResult);
    });
  });
  describe('Change  card text ', () => {
    it('should return CHANGE_CARD_TEXT and modalData', () => {
      const modalData = {
        deskIndex: 1,
        index: 2,
        text: 'Шо пацаны аниме',
      };
      const expectedResult = {
        type: CHANGE_CARD_TEXT,
        value: { modalData },
      };
      expect(changeCardText(modalData)).toEqual(expectedResult);
    });
  });
});
