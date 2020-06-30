import React from 'react';


class HomeController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSplash: true,
      leaguesSearch: '',
    };
  }
  // login(data) {
  //   const { login } = this.props;
  //   login(data);
  // }

  handleSearchChange(leaguesSearch) {
    this.setState({ leaguesSearch });
  }

  callbacks() {
    return {
      // login: this.login.bind(this),
      handleSearchChange: this.handleSearchChange.bind(this),
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
