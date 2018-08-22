import React from 'react';
import { mount } from 'enzyme';
import { List, Map } from 'immutable';
import { Provider } from 'react-redux'; // eslint-disable-line no-unused-vars
import { createStore } from 'redux';
import sinon from 'sinon'; // eslint-disable-line no-unused-vars
import { DragDropContext } from 'react-dnd';
import TestBackend from 'react-dnd-test-backend';
import { SortableSimple } from '../index';
import reducer from '../reducer';
// import PropTypes from "prop-types";
import {
  // moveBorders,
  // moveCardsInsideDesk,
  // moveCardsOutSideDesk,
  // deleteDesk,
  // deleteCard,
  // addDesk,
  // addCard,
  // changeCardText,
} from '../actions';
const store = createStore(reducer); // eslint-disable-line no-unused-vars

function wrapInTestContext(DecoratedComponent) { // eslint-disable-line no-unused-vars
  @DragDropContext(TestBackend)
  class TestContextContainer extends React.Component {
    render() {
      return <DecoratedComponent {...this.props} />;
    }
  }
  return TestContextContainer;
}


const boards =
    new List([
      new List([
        new Map({ id: 1, text: '322' }),
      ]),
    ]);

describe('SortableSimple  Props ', () => {
  it('should render Containers', () => {
    const moveCardsInsideDesk = sinon.spy();
    const moveCardsOutSideDesk = sinon.spy();
    const wrapper = mount(<SortableSimple
      boards={boards}
      moveCardsInsideDesk={moveCardsInsideDesk}
      moveCardsOutSideDesk={moveCardsOutSideDesk}
      store={store}
    />);
    expect(wrapper.find('Container')).toHaveLength(1);
  });

  it('shod add new desk', () => {
    const moveCardsInsideDesk = sinon.spy();
    const moveCardsOutSideDesk = sinon.spy();
    const addDesk = sinon.spy();
    const wrapper = mount(<SortableSimple
      boards={boards}
      addDesk={addDesk}
      moveCardsInsideDesk={moveCardsInsideDesk}
      moveCardsOutSideDesk={moveCardsOutSideDesk}
      store={store}
    />);
    const btn = wrapper.find('.w3-black');
    btn.simulate('click', 1);
    expect(addDesk.calledOnce).toBe(true);
  });
  it('shod add new card', () => {
    const moveCardsInsideDesk = sinon.spy();
    const moveCardsOutSideDesk = sinon.spy();
    const addDesk = sinon.spy();
    const addCard = sinon.spy();
    const wrapper = mount(<SortableSimple
      boards={boards}
      addDesk={addDesk}
      addCard={addCard}
      moveCardsInsideDesk={moveCardsInsideDesk}
      moveCardsOutSideDesk={moveCardsOutSideDesk}
      store={store}
    />);
    const btn = wrapper.find('.w3-green');
    btn.simulate('click', 1);
    expect(addCard.calledOnce).toBe(true);
  });
  it('shod add text', () => {
    const moveCardsInsideDesk = sinon.spy();
    const moveCardsOutSideDesk = sinon.spy();
    const addDesk = sinon.spy();
    const addCard = sinon.spy();
    const checkBntClick = sinon.spy();
    const wrapper = mount(<SortableSimple
      boards={boards}
      addDesk={addDesk}
      addCard={addCard}
      moveCardsInsideDesk={moveCardsInsideDesk}
      moveCardsOutSideDesk={moveCardsOutSideDesk}
      store={store}
      checkBntClick={checkBntClick}
    />);
    // const btn = wrapper.find('.check_btn');
    console.log(wrapper.find('.single_card').length);
    wrapper.setState({ showModal: true });
    console.log(wrapper.state());
    console.log(document.getElementsByClassName('modal-open').length);
   // btn.simulate('click', 1);

    // expect(checkBntClick.calledOnce).toBe(true);
  });


  // it('check openModal state', () => {
  //   const openModal = sinon.spy();
  //   const dragDropManager = sinon.spy();
  //   const DeleteItemWrapped = wrapInTestContext(SortableSimple); // eslint-disable-line no-unused-vars
  //   const wrapper = mount(<Provider store={store}> <SortableSimple
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
  //   /></Provider>);
  //   // console.log(wrapper.instance());
  //   // const openModal = sinon.spy(SortableSimple.openModal)
  //   // expect(wrapper.find('Card').find('.w3-green')).toHaveLength(1);
  //   // console.log(wrapper.find('Container').html());
  //   console.log(wrapper.html());
  //   expect(wrapper.find('Container').find('.w3-green').length).toEqual(1);
  //  // wrapper.update();
  //   // expect(status).to.equal('LOADED');
  //   // expect(wrapper.find('Container').dive().find('.show-grid')).toHaveLength(1);
  //   wrapper.find('.w3-green').prop('onClick');
  //   wrapper.update();
  //   wrapper.render();
  //   console.log(wrapper.html());
  //   // console.log(wrapper.instance().openModal().getCalls());
  //   // expect(wrapper.find('.single_card')).toHaveLength(2);
  // });
});
