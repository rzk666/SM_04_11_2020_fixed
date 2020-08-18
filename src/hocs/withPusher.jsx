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

Pusher.logToConsole = true;
const pusher = new Pusher(APP_KEY, { cluster: APP_CLUSTER });
pusher.logToConsole = true;
const channel = pusher.subscribe('beatem-demo-2020');


export default (ComposedComponent) => {
  class WithPusher extends React.Component {
    componentDidMount() {
      channel.bind('Trigger', (data) => this.handleMatchUpdate(data));
    }

    handleMatchUpdate(data) {
      const { updateAvailableMatches } = this.props;
      const { matchId, updatedMatch } = data;
      updateAvailableMatches(matchId, updatedMatch);
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
  });

  const mapDispatchToProps = (dispatch) => ({
    updateAvailableMatches: (matchId, data) => dispatch(updateAvailableMatches(matchId, data)),
  });

  return connect(mapStateToProps, mapDispatchToProps)((WithPusher));
};
