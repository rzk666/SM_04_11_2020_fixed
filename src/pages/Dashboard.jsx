/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// Utils
import { connect } from 'react-redux';
// Redux Actions
import {
  connectSocket, initSocket, triggerMatchChange,
} from '../redux/models/webSocket/webSocketActions';
// Hocs
import page from '../hocs/page';
// Controller & View
import DashboardController from '../controllers/DashboardController';
import DashboardView from '../views/DashboardView';
// Dictioneries
import pages from '../universal/pages';


const Dashboard = (props) => <DashboardController {...props} View={DashboardView} />;

const mapStateToProps = (state) => ({
  webSocket: state.webSocket,
  availableMatches: state.availableMatches,
});

const mapDispatchToProps = (dispatch) => ({
  connectSocket: () => dispatch(connectSocket()),
  initSocket: (data) => dispatch(initSocket(data)),
  triggerMatchChange: (matchId, data) => dispatch(triggerMatchChange(matchId, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(page((Dashboard), pages.DASHBOARD));
