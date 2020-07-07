/* eslint-disable no-underscore-dangle */
import React from 'react';

class LoginController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
      showErrors: false,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      history, auth, resetAuthErrors,
    } = this.props;
    const { isLoggedIn } = auth;
    if (isLoggedIn) {
      history.go(-1);
    }
    if (!prevProps.auth.hasError && auth.hasError) {
      resetAuthErrors();
      this.setState({ showErrors: true });
    }
  }

  login(data) {
    const { login } = this.props;
    login(data);
  }

  handleInputsChange(type, value) {
    this.setState({ [type]: value, showErrors: false });
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
