import React from 'react';
// Util
import _LoadImages from '../util/LoadImages';

class HomeController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSplash: true,
      leaguesSearch: '',
      creatingLeague: false,
    };
  }

  componentDidMount() {
    _LoadImages('home');
  }

  handleSearchChange(leaguesSearch) {
    this.setState({ leaguesSearch });
  }

  toggleLeagueCreation() {
    const { creatingLeague } = this.state;
    this.setState({ creatingLeague: !creatingLeague });
  }

  callbacks() {
    return {
      // login: this.login.bind(this),
      handleSearchChange: this.handleSearchChange.bind(this),
      toggleLeagueCreation: this.toggleLeagueCreation.bind(this),
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
