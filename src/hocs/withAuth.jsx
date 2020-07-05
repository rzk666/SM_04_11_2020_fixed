import React from 'react';
// Utils
import { connect } from 'react-redux';
// Redux Actions
import {
  signOut,
  refreshAuth,
  resetAuthErrors,
} from '../redux/models/auth/authActions';

// ----- Misc ----- //
const FAKE_HOME_LOADER_TIME = 4500;
const today = new Date();
const COOKIES_EXP_DATE = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);

// ----- Help Functions ----- //
const enforceAuth = (controllerProps) => {
  const {
    auth, history, signOut,
  } = controllerProps;
  const { adminToken } = auth;
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
    constructor(props) {
      super(props);
      this.state = {
        showSplash: false,
      };
    }

    componentDidMount() {
      const {
        auth, cookies, page, refreshAuth,
      } = this.props;
      if (!auth.adminToken) {
        const cookie = cookies.get('auth', '/');
        if (cookie) {
          refreshAuth(cookie);
        } else {
          enforceAuth(this.props);
        }
      }
    }

    componentDidUpdate(prevProps) {
      const { auth, history, cookies } = this.props;
      const { isLoggedIn, hasAccess } = auth;
      const cookie = cookies.get('auth', '/');
      // User Signout
      if (!isLoggedIn && prevProps.auth.isLoggedIn) {
        cookies.set('auth', auth, { path: '/', expires: COOKIES_EXP_DATE });
      }
      if (isLoggedIn && !cookie.isLoggedIn) {
        cookies.set('auth', auth, { path: '/', expires: COOKIES_EXP_DATE });
      }
      // User Login
      if (isLoggedIn && !cookie.isLoggedIn) {
        cookies.set('auth', auth, { path: '/', expires: COOKIES_EXP_DATE });
      }
      // Admin login
      if (hasAccess && !prevProps.auth.hasAccess) {
        if (!cookie) {
          cookies.set('auth', auth, { path: '/', expires: COOKIES_EXP_DATE });
        }
        this.setState({ showSplash: true });
        setTimeout(() => history.push('/'), FAKE_HOME_LOADER_TIME);
      }
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

  return connect(mapStateToProps, mapDispatchToProps)((WithAuth));
};
