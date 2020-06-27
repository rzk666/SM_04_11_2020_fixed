import React from 'react';


class HomeController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSplash: true,
    };
  }
  // login(data) {
  //   const { login } = this.props;
  //   login(data);
  // }

  componentDidMount() {
  }

  callbacks() {
    return {
      // login: this.login.bind(this),
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
