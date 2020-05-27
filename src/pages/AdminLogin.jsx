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
import AdminLoginController from '../controllers/AdminLoginController';
import AdminLoginView from '../views/AdminLoginView';
// Dictioneries
import pages from '../universal/pages';


const AdminLogin = (props) => <AdminLoginController {...props} View={AdminLoginView} />;

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  adminLogin: (data) => dispatch(adminLogin(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(page((AdminLogin), pages.ADMIN_LOGIN));
