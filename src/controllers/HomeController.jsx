import React from 'react';

class HomeController extends React.Component {
  adminLogin(data) {
    const { adminLogin } = this.props;
    adminLogin(data);
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

export default HomeController;
