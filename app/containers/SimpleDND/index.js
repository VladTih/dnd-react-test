/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { Grid, Row } from 'react-bootstrap';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import './index.scss';
import Container from './components/Container';
import Delete from './components/Delete';
import Modal from './components/Modal';
import Form from './components/FromExample';
import {
  moveBorders,
  moveCardsInsideDesk,
  moveCardsOutSideDesk,
  deleteDesk,
  deleteCard,
  addDesk,
  addCard,
  changeCardText,
} from './actions';
import reducer from './reducer';
import { makeSelectorBoards } from './selectors';
@DragDropContext(HTML5Backend)

export class SortableSimple extends React.PureComponent {
  static propTypes = {
    boards: PropTypes.instanceOf(List),
    moveBorders: PropTypes.func,
    moveCardsOutSideDesk: PropTypes.func,
    moveCardsInsideDesk: PropTypes.func,
    deleteDesk: PropTypes.func,
    deleteCard: PropTypes.func,
    addDesk: PropTypes.func,
    addCard: PropTypes.func,
    changeCardText: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = { showModal: false, modalData: [] };
  }
  openModal =(deskIndex, index, text) => {
    this.setState({
      modalData: {
        deskIndex,
        index,
        text,
      },
    }, () => {
      this.setState({ showModal: true });
    });
  }
  checkBntClick =() => {
    console.log('btn was click');
  }
  closeModal =() => {
    this.setState({ showModal: false });
  }
  addBtnClick =() => {
    this.props.addDesk();
  }
  addCardBtn =(deskIndex) => {
    this.props.addCard(deskIndex);
  }
  saveInputValue =(modalData, text) => {
    modalData.text = text; // eslint-disable-line no-param-reassign
    this.props.changeCardText(modalData);
  }
  render() {
    const {
      boards,
    } = this.props;
    return (
      <div className={'bored_wrapper'}>
        <button onClick={this.addBtnClick} className="w3-button w3-xlarge w3-circle w3-black">+</button>
        <Grid>
          <Modal
            closeModal={this.closeModal}
            modalData={this.state.modalData}
            showModal={this.state.showModal}
            saveInputValue={this.saveInputValue}
          />
          <Row className="show-grid">
            {boards.map((item, index) => (
              <Container
                desk={item}
                index={index}
                deskIndex={index}
                key={index + item} // eslint-disable-line react/no-array-index-key
                moveBorders={this.props.moveBorders}
                moveCardsInsideDesk={this.props.moveCardsInsideDesk}
                moveCardsOutSideDesk={this.props.moveCardsOutSideDesk}
                addCardBtn={this.addCardBtn}
                openModal={this.openModal}
                checkBntClick={this.checkBntClick}
              />
        ))}
          </Row>
          <Row className="show-grid">
            <Delete deleteDesk={this.props.deleteDesk} deleteCard={this.props.deleteCard} />
          </Row>
        </Grid>
        {/*<Form />*/}
      </div>
    );
  }
}
export function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    moveBorders,
    moveCardsInsideDesk,
    moveCardsOutSideDesk,
    deleteDesk,
    deleteCard,
    addDesk,
    addCard,
    changeCardText,
  }, dispatch);
}
const mapStateToProps = createStructuredSelector({
  boards: makeSelectorBoards(),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'boards', reducer });
export default compose(
  withReducer,
  withConnect,
)(SortableSimple);
