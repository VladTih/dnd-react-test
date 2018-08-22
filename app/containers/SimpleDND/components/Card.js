import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
const ItemTypes = { CARD: 'card' };


const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
      deskIndex: props.deskIndex,
      ItemTypes: 'card',
    };
  },
};
const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;

    const hoverIndex = props.index;
    if (dragIndex === hoverIndex) {
      return;
    }
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect(); // eslint-disable-line react/no-find-dom-node

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    const clientOffset = monitor.getClientOffset();

    const hoverClientY = clientOffset.y - hoverBoundingRect.top;


    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    if (monitor.getItem().deskIndex !== props.deskIndex) {
      return;
    }
    props.moveCardsInsideDesk(props.deskIndex, dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex; // eslint-disable-line no-param-reassign
  },
};
@DropTarget(ItemTypes.CARD, cardTarget, (connect) => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectDragPreview: connect.dragPreview(),
}))
export default class Card extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    deskIndex: PropTypes.any.isRequired,
    isDragging: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired,
    checkBntClick: PropTypes.func.isRequired,
  }
  render() {
    const {
      text,
      isDragging,
      connectDragSource,
      connectDropTarget,
      openModal,
      checkBntClick,
      deskIndex,
      index,
    } = this.props;
    const opacity = isDragging ? 0 : 1;
    return connectDragSource(
      <div role="button" tabIndex="0" onClick={() => { openModal(deskIndex, index, text); }} className="single_card">
        <button className="check_btn" onClick={() => { checkBntClick(); }}></button>
        {connectDropTarget(
          <div style={{ opacity }}>
            {text}
          </div>,
        )}
      </div>
    );
  }
}
