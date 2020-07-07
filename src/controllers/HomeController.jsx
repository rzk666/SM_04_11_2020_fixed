import React from 'react';
// Util
import _LoadImages from '../util/LoadImages';

class HomeController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSplash: true,
      leaguesSearch: '',
    };
  }

  componentDidMount() {
    _LoadImages('home');
  }

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
