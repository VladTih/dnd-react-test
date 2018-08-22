import { Map, List } from 'immutable';
import {
  INIT_BORDERS,
  MOVE_BORDERS,
  MOVE_CARDS_INSIDE_DESK,
  MOVE_CARDS_OUTSIDE_DESK,
  DELETE_DESK,
  DELETE_CARD,
  ADD_DESK,
  ADD_CARD,
  CHANGE_CARD_TEXT,
} from './constants';

const initialState = new Map({
  cards:
    new List([
    ]),
});

function SimpleDNDReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_BORDERS:
      return initialState;

    case MOVE_BORDERS: {
      return state
              .setIn(['cards', action.value.hoverIndex], state.get('cards').get(action.value.dragIndex))
              .setIn(['cards', action.value.dragIndex], state.get('cards').get(action.value.hoverIndex));
    }
    case MOVE_CARDS_INSIDE_DESK: {
      const {
          deskIndex,
          dragIndex,
          hoverIndex,
        } = action.value;
      const cards = state.get('cards');
      return state.setIn(
          ['cards', deskIndex],
          cards.get(deskIndex).splice(dragIndex, 1)
            .splice(hoverIndex, 0, cards.get(deskIndex).get(dragIndex)));
    }
    case MOVE_CARDS_OUTSIDE_DESK: {
      const {
        deskIndexPutt,
        deskIndexPull,
      } = action.value;
      const cards = state.get('cards');
      const dragIndex = action.value.dragIndex;
      let getDragValue = cards.get(deskIndexPutt).get(dragIndex);
      getDragValue = new Map({
        id: Date.now(),
        text: getDragValue.get('text'),
      });
      const deletedDeskCard = cards.get(deskIndexPutt).remove(dragIndex);
      return state.setIn(['cards', deskIndexPutt], deletedDeskCard).setIn(['cards', deskIndexPull], cards.get(deskIndexPull).insert(0, getDragValue));
    }
    case DELETE_DESK: {
      const deskIndex = action.value.deskIndex;
      const cards = state.get('cards');
      return state.set('cards', cards.remove(deskIndex));
    }
    case DELETE_CARD: {
      const deskIndex = action.value.deskIndex;
      const itemIndex = action.value.itemIndex;
      const cards = state.get('cards');
      const removeCards = cards.get(deskIndex).remove(itemIndex);
      return state.setIn(['cards', deskIndex], removeCards);
    }
    case ADD_DESK: {
      return state.setIn(['cards'], state.get('cards').insert(0, new List()));
    }
    case ADD_CARD: {
      const deskIndex = action.value.deskIndex;
      const findhighestId = state.get('cards').get(deskIndex);
      let gethighestId = Math.max(...findhighestId.map((item) => item.get('id'))) + 1;
      if (gethighestId === -Infinity) {
        gethighestId = 1;
      }
      return state.setIn(
        ['cards', deskIndex],
        state.get('cards').get(deskIndex)
          .insert(0,
            new Map(
              {
                id: gethighestId,
                text: '',
              }
            )
          )
      );
    }
    case CHANGE_CARD_TEXT: {
      const deskIndex = action.value.modalData.deskIndex;
      const index = action.value.modalData.index;
      const text = action.value.modalData.text;
      return state.setIn(['cards', deskIndex, index, 'text'], text);
    }
    default:
      return state;
  }
}

export default SimpleDNDReducer;
