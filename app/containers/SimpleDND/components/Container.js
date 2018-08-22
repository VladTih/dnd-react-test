import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import { Col } from 'react-bootstrap';
import Card from './Card';
const ItemTypes = { DESK: 'DESK', CARD: 'card' };


const deskSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
      ItemTypes: 'DESK',
    };
  },
};
const deskTarget = {
  drop(props, monitor, component) {
    let dragIndex = monitor.getItem().index;
    if (monitor.getItem().ItemTypes !== 'card') {
      const hoverIndex = props.index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = findDOMNode(component).getBoundingClientRect(); // eslint-disable-line react/no-find-dom-node

      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientX = clientOffset.X - hoverBoundingRect.left;

      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }
      props.moveBorders(dragIndex, hoverIndex);

      monitor.getItem().index = hoverIndex; // eslint-disable-line no-param-reassign
    } else {
      if (monitor.getItem().deskIndex === props.index) {
        return;
      }
      const deskIndexPutt = monitor.getItem().deskIndex;
      const deskIndexPull = props.index;
      dragIndex = monitor.getItem().index;
      props.moveCardsOutSideDesk(deskIndexPull, deskIndexPutt, dragIndex);
    }
  },
};


@DropTarget([ItemTypes.DESK, ItemTypes.CARD], deskTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),


}))
@DragSource(ItemTypes.DESK, deskSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectDragPreview: connect.dragPreview(),
}))
export default class Container extends Component {

  static propTypes = {
    desk: PropTypes.any.isRequired,
    deskIndex: PropTypes.any.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    moveCardsInsideDesk: PropTypes.func.isRequired,
    moveCardsOutSideDesk: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
    connectDropTarget: PropTypes.func.isRequired,
    canDrop: PropTypes.any.isRequired,
    isOver: PropTypes.any.isRequired,
    addCardBtn: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    checkBntClick: PropTypes.func.isRequired,
  }
  render() {
    const {
      desk,
      deskIndex,
      connectDragSource,
      connectDropTarget,
      moveCardsInsideDesk,
      canDrop,
      isOver,
      addCardBtn,
      openModal,
      checkBntClick,
      } = this.props;

    const isActive = canDrop && isOver;
    let backgroundColor = '';
    if (isActive) {
      backgroundColor = 'darkgreen';
    }

    return (
      <Col xs={4} md={4}>
        { connectDragSource(connectDropTarget(
          <div className="single_desc">
            <button onClick={() => { addCardBtn(deskIndex); }} className="w3-button w3-xlarge w3-circle w3-green">+</button>
            <div className="singe_desc_block" style={{ backgroundColor }}>
              { desk.map((item, index) => (
                <Card
                  key={item.get('id')}
                  moveCardsInsideDesk={moveCardsInsideDesk}
                  index={index}
                  openModal={openModal}
                  deskIndex={deskIndex}
                  id={item.get('id')}
                  text={item.get('text')}
                  checkBntClick={checkBntClick}
                />
              ))}
            </div>
          </div>
        ))}
      </Col>
    );
  }
}
