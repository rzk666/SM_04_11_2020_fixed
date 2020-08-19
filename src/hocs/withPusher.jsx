import React from 'react';
// Utils
import { connect } from 'react-redux';
// Socket
import Pusher from 'pusher-js';
// Consts & Dicts
import { APP_CLUSTER, APP_KEY } from '../common/config';
// Redux Actions
import {
  updateAvailableMatches,
} from '../redux/models/matches/matchesActions';

// PROD -> False
Pusher.logToConsole = true;
const pusher = new Pusher(APP_KEY, { cluster: APP_CLUSTER });
// PROD -> False
pusher.logToConsole = true;
const channel = pusher.subscribe('beatem-demo-2020');


export default (ComposedComponent) => {
  class WithPusher extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        activePopup: { type: 'none' },
      };
    }

    componentDidMount() {
      channel.bind('Trigger', (data) => this.handleMatchUpdate(data));
    }

    disablePopup() {
      const newActivePopup = { type: 'none' };
      this.setState({ activePopup: { ...newActivePopup } });
    }

    handleActivePopup(activePopup) {
      setTimeout(() => this.disablePopup(), 2000);
      this.setState({ activePopup });
    }

    handleMatchUpdate(data) {
      const { activePopup } = this.state;
      const { updateAvailableMatches, availableMatches } = this.props;
      const { matchId, updatedMatch } = data;
      const {
        homeTeam, awayTeam, homeScore, awayScore, matchTime, isLocked,
      } = updatedMatch;
      const prevMatch = availableMatches.matches.find((match) => match.id === parseInt(updatedMatch.id));
      const prevHomeScore = prevMatch.homeScore;
      const prevAwayScore = prevMatch.awayScore;
      // // Handle goal event
      if (prevHomeScore !== homeScore || prevAwayScore !== awayScore) {
        const winner = prevHomeScore < homeScore ? 'home' : 'away';
        console.log('GOAL');
        const newActivePopup = {
          ...activePopup,
          title: 'GOAL!',
          type: 'goal',
          homeTeam,
          awayTeam,
          homeScore,
          awayScore,
          prevAwayScore,
          prevHomeScore,
          winner,
        };
        this.handleActivePopup(newActivePopup);
      } else
      // Handle starting soon
      if (!prevMatch.isLocked && isLocked) {
        console.log('LOCKED!!');
        const newActivePopup = {
          title: 'Match Is Starting Soon',
          type: 'info',
          homeTeam,
          awayTeam,
          homeScore,
          awayScore,
          prevAwayScore,
          prevHomeScore,
        };
        this.handleActivePopup(newActivePopup);
      } else
      if (prevMatch.matchTime === 0 && matchTime !== 0) {
        console.log('STARTED');
        const newActivePopup = {
          title: 'Match Started',
          type: 'info',
          homeTeam,
          awayTeam,
          homeScore,
          awayScore,
          prevAwayScore,
          prevHomeScore,
        };
        this.handleActivePopup(newActivePopup);
      }
      setTimeout(() => updateAvailableMatches(matchId, updatedMatch), 300);
    }

    render() {
      return (
        <>
          <ComposedComponent {...this.props} {...this.state} />
        </>
      );
    }
  }

  const mapStateToProps = (state) => ({
    auth: state.auth,
    availableMatches: state.availableMatches,
  });

  const mapDispatchToProps = (dispatch) => ({
    updateAvailableMatches: (matchId, data) => dispatch(updateAvailableMatches(matchId, data)),
  });

  return connect(mapStateToProps, mapDispatchToProps)((WithPusher));
};
