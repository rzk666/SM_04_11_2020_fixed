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
import ProfileController from '../controllers/ProfileController';
import ProfileView from '../views/ProfileView';
// Dictioneries
import pages from '../universal/pages';


const Profile = (props) => <ProfileController {...props} View={ProfileView} />;

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  adminLogin: (data) => dispatch(adminLogin(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(page((Profile), pages.PROFILE));
