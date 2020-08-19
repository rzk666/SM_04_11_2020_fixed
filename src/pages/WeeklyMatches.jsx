/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// Utils
import { connect } from 'react-redux';
// Redux Actions
import {
  adminLogin,
} from '../redux/models/auth/authActions';
// Hocs
import page from '../hocs/page';
// Controller & View
import WeeklyMatchesController from '../controllers/WeeklyMatchesController';
import WeeklyMatchesView from '../views/WeeklyMatchesView';
// Dictioneries
import pages from '../universal/pages';


const WeeklyMatches = (props) => <WeeklyMatchesController {...props} View={WeeklyMatchesView} />;

const mapStateToProps = (state) => ({
  activeLeague: state.activeLeague,
  availableMatches: state.availableMatches,
});

const mapDispatchToProps = (dispatch) => ({
  adminLogin: (data) => dispatch(adminLogin(data)),
});

// eslint-disable-next-line max-len
export default connect(mapStateToProps, mapDispatchToProps)(page((WeeklyMatches), pages.WEEKLY_MATCHES));
