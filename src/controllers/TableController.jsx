/* eslint-disable no-underscore-dangle */
import React from 'react';

class TableController extends React.Component {
  adminLogin(data) {
    const { adminLogin } = this.props;
    // Failed details
    if (!data.email || !data.password) {
      alert('Fill Details');
    } else {
      adminLogin(data);
    }
  }

  callbacks() {
    return {
      adminLogin: this.adminLogin.bind(this),
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

export default TableController;
