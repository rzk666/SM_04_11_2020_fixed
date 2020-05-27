import React from 'react';
// Utils
import { connect } from 'react-redux';
// Redux Actions
import {
  login,
  adminLogin,
  signOut,
  refreshAuth,
} from '../redux/models/auth/authActions';

// ----- Help Functions ----- //
const enforceAuth = (controllerProps) => {
  const {
    auth, history, location, signOut, cookies,
  } = controllerProps;
  const { isLoggedIn, adminToken } = auth;
  const { pathname } = location;
  // Handle logout
  // if (!isLoggedIn) {
  //   signOut();
  //   cookies.set('auth', '');
  //   history.push('/login');
  //   return;
  // }
  if (!adminToken) {
    history.push('/adminLogIn');
  }
  // TODO: Add future screens that must have isLoggedIn
};

export default (ComposedComponent) => {
  class WithAuth extends React.Component {
    componentDidMount() {
      const { auth, cookies, refreshAuth } = this.props;
      if (!auth.adminToken) {
        const cookie = cookies.get('auth');
        const token = cookie && cookie.adminToken;
        if (token) {
          refreshAuth(cookie);
        } else {
          enforceAuth(this.props);
        }
      }
    }

    componentDidUpdate(prevProps) {
      const { auth } = this.props;
      const { isLoggedIn } = auth;
      if (isLoggedIn !== prevProps.auth.isLoggedIn) {
        enforceAuth(this.props);
      }
    }

    render() {
      return (
        <>
          <ComposedComponent {...this.props} />
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
  });

  return connect(mapStateToProps, mapDispatchToProps)((WithAuth));
};
