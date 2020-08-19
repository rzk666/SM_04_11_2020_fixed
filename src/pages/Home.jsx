/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// Utils
import { connect } from 'react-redux';
// Redux Actions
import {
  login,
  initBets,
} from '../redux/models/auth/authActions';
import {
  updateActiveTable,
} from '../redux/models/activeTable/activeTableActions';
// Hocs
import page from '../hocs/page';
// Controller & View
import HomeController from '../controllers/HomeController';
import HomeView from '../views/HomeView';
// Dictioneries
import pages from '../universal/pages';


const Home = (props) => <HomeController {...props} View={HomeView} />;

const mapStateToProps = (state) => ({
  auth: state.auth,
  activeTable: state.activeTable,
  availableMatches: state.availableMatches,
});

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(login(data)),
  initBets: () => dispatch(initBets()),
  updateActiveTable: (data, user) => dispatch(updateActiveTable(data, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(page((Home), pages.HOME));
