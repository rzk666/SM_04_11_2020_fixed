import React from 'react';
// Utils
import { connect } from 'react-redux';
// Socket
import Pusher from 'pusher-js';
// Consts & Dicts
import { APP_CLUSTER, APP_KEY } from '../common/config';
// Redux Actions
import {
  signOut,
  refreshAuth,
  resetAuthErrors,
} from '../redux/models/auth/authActions';

Pusher.logToConsole = true;
const pusher = new Pusher(APP_KEY, { cluster: APP_CLUSTER });
pusher.logToConsole = true;
const channel = pusher.subscribe('beatem-demo-2020');


export default (ComposedComponent) => {
  class WithPusher extends React.Component {
    componentDidMount() {
      channel.bind('goal', () => this.handleGoal());
    }

    handleGoal() {
      alert('GOAL');
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
    signOut: () => dispatch(signOut()),
    refreshAuth: (cookie) => dispatch(refreshAuth(cookie)),
    resetAuthErrors: () => dispatch(resetAuthErrors()),
  });

  return connect(mapStateToProps, mapDispatchToProps)((WithPusher));
};
