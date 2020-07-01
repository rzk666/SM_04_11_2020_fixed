/* eslint-disable no-underscore-dangle */
import React from 'react';

class LoginController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
    };
  }

  handleInputsChange(type, value) {
    this.setState({ [type]: value });
  }

  callbacks() {
    return {
      handleInputsChange: this.handleInputsChange.bind(this),
    };
  }

  render() {
    const { View } = this.props;
    return (
      <View
        {...this.props}
        {...this.state}
        {...this.callbacks()}
      />
    );
  }
}

export default LoginController;
