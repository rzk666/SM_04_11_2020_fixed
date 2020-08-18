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
      joiningLeague: false,
    };
  }

  componentDidMount() {
    const { initBets } = this.props;
    initBets();
    _LoadImages('home');
  }

  componentDidUpdate(prevProps) {
    const { history } = this.props;
    const { creatingLeague, joiningLeague } = this.state;
    let state = {};
    if (history
      && history.location
      && history.location.state
      && prevProps.history
      && prevProps.history.location
      && prevProps.history.location.state) {
      state = history.location.state;
      // On Homepage click
      if (state.resetHome) {
        this.setState({ creatingLeague: false, joiningLeague: false });
        history.push({ pathname: '/', state: { resetHome: false } });
      }
    }
  }

  resetHome() {
    this.setState({ creatingLeague: false, joiningLeague: false });
  }

  handleSearchChange(leaguesSearch) {
    this.setState({ leaguesSearch });
  }

  toggleLeagueCreation() {
    const { creatingLeague } = this.state;
    this.setState({ creatingLeague: !creatingLeague });
  }

  toggleJoiningLeague() {
    const { joiningLeague } = this.state;
    this.setState({ joiningLeague: !joiningLeague });
  }

  callbacks() {
    return {
      // login: this.login.bind(this),
      resetHome: this.resetHome.bind(this),
      toggleJoiningLeague: this.toggleJoiningLeague.bind(this),
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
