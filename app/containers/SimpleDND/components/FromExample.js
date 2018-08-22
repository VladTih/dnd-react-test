import React from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  Form,
} from 'react-bootstrap';

export default class FormExample extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: '',
    };
  }

  getValidationState(number) {
    const length = this.state.value.length;
    if (length > number) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  checkAllValidation = () => {
    console.log(this.state);
  }

  render() {
    return (
      <Form onSubmit={this.checkAllValidation}>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState(10)}
        >
          <ControlLabel>Working example with validation</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          {/* <HelpBlock>Validation is based on string length.</HelpBlock>*/}
        </FormGroup>
        <FormGroup
          controlId="formBasicTest3"
          validationState={this.getValidationState(20)}
        >
          <ControlLabel>Working example with validation</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          {/* <HelpBlock>Validation is based on string length.</HelpBlock>*/}
        </FormGroup>
        <Button
          className="btn btn-primary btn-large centerButton"
          type="submit"
        >Send</Button>
      </Form>
    );
  }
}
