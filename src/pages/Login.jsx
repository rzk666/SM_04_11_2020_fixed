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
import LoginController from '../controllers/LoginController';
import LoginView from '../views/LoginView';
// Dictioneries
import pages from '../universal/pages';


const Login = (props) => <LoginController {...props} View={LoginView} />;

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(login(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(page((Login), pages.LOGIN));
