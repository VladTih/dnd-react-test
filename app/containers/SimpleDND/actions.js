/*
 *
 * Profile actions
 *
 */

import {
  MOVE_BORDERS,
  MOVE_CARDS_INSIDE_DESK,
  MOVE_CARDS_OUTSIDE_DESK,
  DELETE_DESK,
  DELETE_CARD,
  ADD_DESK,
  ADD_CARD,
  CHANGE_CARD_TEXT,
} from './constants';

export function moveBorders(dragIndex, hoverIndex) {
  return {
    type: MOVE_BORDERS,
    value: { dragIndex, hoverIndex },
  };
}
export function moveCardsInsideDesk(deskIndex, dragIndex, hoverIndex) {
  return {
    type: MOVE_CARDS_INSIDE_DESK,
    value: { deskIndex, dragIndex, hoverIndex },
  };
}
export function moveCardsOutSideDesk(deskIndexPull, deskIndexPutt, dragIndex) {
  return {
    type: MOVE_CARDS_OUTSIDE_DESK,
    value: { deskIndexPutt, deskIndexPull, dragIndex },
  };
}
export function deleteDesk(deskIndex) {
  return {
    type: DELETE_DESK,
    value: { deskIndex },
  };
}

export function deleteCard(deskIndex, itemIndex) {
  return {
    type: DELETE_CARD,
    value: { deskIndex, itemIndex },
  };
}
export function addDesk() {
  return {
    type: ADD_DESK,
  };
}
export function addCard(deskIndex) {
  return {
    type: ADD_CARD,
    value: { deskIndex },
  };
}
export function changeCardText(modalData) {
  return {
    type: CHANGE_CARD_TEXT,
    value: { modalData },
  };
}

