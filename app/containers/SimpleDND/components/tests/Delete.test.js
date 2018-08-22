import React from 'react';
import { mount } from 'enzyme';
// import { List, Map } from 'immutable';
import sinon from 'sinon';
import { DragDropContext } from 'react-dnd';
import TestBackend from 'react-dnd-test-backend';
import Delete from '../Delete';
function wrapInTestContext(DecoratedComponent) {
  @DragDropContext(TestBackend)
  class TestContextContainer extends React.Component {
    render() {
      return <DecoratedComponent {...this.props} />;
    }
  }
  return TestContextContainer;
}


// // import PropTypes from "prop-types";
// import {
//   moveBorders,
//   moveCardsInsideDesk,
//   moveCardsOutSideDesk,
//   deleteDesk,
//   deleteCard,
//   addDesk,
//   addCard,
//   changeCardText,
// } from '../actions';


// const boards =
//   new List([
//     new List([
//       new Map({ id: 1, text: '322' }),
//     ]),
//   ]);

describe('Check Delete  Container ', () => {
  it('check delete color', () => {
    const DeleteItemWrapped = wrapInTestContext(Delete);
    // const identity = (el) => el;
    // const moveCardsInsideDesk = sinon.spy();
    const connectDropTarget = sinon.spy();
    const wrapper = mount(<DeleteItemWrapped
      connectDropTarget={connectDropTarget}
      isOver
      canDrop
    />);
    console.log(wrapper.find('.delete').prop('style'));
  });
  // it('check openModal state', () => {
  //   const openModal = sinon.spy();
  //   const dragDropManager = sinon.spy();
  //   const wrapper = mount(<SortableSimple
  //     boards={boards}
  //     moveCardsInsideDesk={moveCardsInsideDesk}
  //     moveCardsOutSideDesk={moveCardsOutSideDesk}
  //     addCard={addCard}
  //     openModal={openModal}
  //     moveBorders={moveBorders}
  //     deleteDesk={deleteDesk}
  //     deleteCard={deleteCard}
  //     addDesk={addDesk}
  //     changeCardText={changeCardText}
  //     dragDropManager={dragDropManager}
  //   />);
  //   // console.log(wrapper.instance());
  //   // const openModal = sinon.spy(SortableSimple.openModal)
  //   // expect(wrapper.find('Card').find('.w3-green')).toHaveLength(1);
  //   // console.log(wrapper.find('Container').html());
  //   console.log(wrapper.html());
  //   expect(wrapper.find('Container').find('.w3-green').length).toEqual(1);
  //   // wrapper.update();
  //   // expect(status).to.equal('LOADED');
  //   // expect(wrapper.find('Container').dive().find('.show-grid')).toHaveLength(1);
  //   wrapper.find('.w3-green').simulate('click', 15);
  //   wrapper.update();
  //   console.log(wrapper.html());
  //   // console.log(wrapper.instance().openModal().getCalls());
  //   // expect(wrapper.find('.single_card')).toHaveLength(2);
  // });
});
