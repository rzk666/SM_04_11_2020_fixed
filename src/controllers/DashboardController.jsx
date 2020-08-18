/* eslint-disable no-underscore-dangle */
import React from 'react';
// Web Socket
import Pusher from 'pusher-js';
// Consts & Dicts
import { APP_CLUSTER, APP_KEY } from '../common/config';
// Redux actions

// Init pusher
Pusher.logToConsole = true;
const pusher = new Pusher(APP_KEY, { cluster: APP_CLUSTER });
pusher.logToConsole = true;
const channel = pusher.subscribe('beatem-demo-2020');

class DashboardController extends React.Component {
  componentDidMount() {
    const { connectSocket, initSocket } = this.props;
    channel.bind('INIT', () => initSocket(true));
    setTimeout(() => connectSocket(), 2000);
  }

  componentDidUpdate() {
  }

  callbacks() {
    return {
      // adminLogin: this.adminLogin.bind(this),
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

export default DashboardController;
