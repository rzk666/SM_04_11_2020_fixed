/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// Utils
import { connect } from 'react-redux';
// Redux Actions
import {
  login,
} from '../redux/models/auth/authActions';
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
});

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(login(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(page((Home), pages.HOME));
