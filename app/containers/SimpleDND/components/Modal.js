import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

export default class Card extends Component {
  static propTypes = {
    saveInputValue: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    modalData: PropTypes.any.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ text: nextProps.modalData.text });
  }
  textChange =(event) => {
    this.setState({ text: event.target.value });
  }
  render() {
    const {
      modalData,
      closeModal,
      saveInputValue,
      showModal,
    } = this.props;
    return (
      <Modal show={showModal} onHide={() => { closeModal(); }}>
        <Modal.Header closeButton>
          <Modal.Title>Change input value </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea onChange={this.textChange} value={this.state.text}></textarea>
          <hr />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => { saveInputValue(modalData, this.state.text); closeModal(); }}>save</Button>
          <Button onClick={() => { closeModal(); }}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
