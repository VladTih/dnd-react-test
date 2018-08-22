import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
const ItemTypes = { DESK: 'DESK', CARD: 'card', DELETE: 'delete' };


const delteTarget = {
  drop(props, monitor) {
    if (monitor.getItem().ItemTypes === ItemTypes.CARD) {
      props.deleteCard(monitor.getItem().deskIndex, monitor.getItem().index);
    }
    if (monitor.getItem().ItemTypes === ItemTypes.DESK) {
      props.deleteDesk(monitor.getItem().index);
    }
  },
};
@DropTarget([ItemTypes.CARD, ItemTypes.DESK], delteTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))

export default class Delete extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.any.isRequired,
    canDrop: PropTypes.any.isRequired,
  }
  render() {
    const {
      connectDropTarget,
      isOver,
      canDrop,
    } = this.props;
    const isActive = canDrop && isOver;
    let backgroundColor = '';
    if (isActive) {
      backgroundColor = 'red';
    }
    return (
      connectDropTarget(
        <div className="delete" style={{ backgroundColor }}>
          Delete
        </div>
      )
    );
  }
}
