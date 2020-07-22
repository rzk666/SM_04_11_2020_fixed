import React from 'react';
// Utils
import { connect } from 'react-redux';
// Redux Actions
import {
  signOut,
  refreshAuth,
  resetAuthErrors,
} from '../redux/models/auth/authActions';
// Misc
import pages from '../universal/pages';

// ----- Misc ----- //
const { PROFILE } = pages;
const LOCKED_PAGES = [PROFILE];
const FAKE_HOME_LOADER_TIME = 4500;
const today = new Date();
const COOKIES_EXP_DATE = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);

// ----- Help Functions ----- //
const enforceAuth = (controllerProps) => {
  const {
    auth, history,
  } = controllerProps;
  const { location } = history;
  const { pathname } = location;
  const { adminToken, isLoggedIn } = auth;
  const path = pathname.slice(1, pathname.length);
  // NEXT => HANDLE SIGN OUT
  // When a user signs out check if the page requires 'isLoggedIn' and
  // if so simply send the user to '/' (homepage), if there are problems with
  // enforceAuth make enforceUserAuth function
  if (!adminToken) {
    history.push('/adminLogin');
  } else if (!isLoggedIn && LOCKED_PAGES.includes(path)) {
    history.push('/');
  }
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
      const {
        auth, history, cookies, page,
      } = this.props;
      const { isLoggedIn, hasAccess } = auth;
      const { location } = history;
      const { pathname } = location;
      const cookie = cookies.get('auth', '/');
      console.log(history.location);
      // User Signout
      if (!isLoggedIn && prevProps.auth.isLoggedIn) {
        cookies.set('auth', auth, { path: '/', expires: COOKIES_EXP_DATE });
        enforceAuth(this.props);
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
        if (pathname === '/adminLogin') {
          this.setState({ showSplash: true });
          setTimeout(() => history.push('/'), FAKE_HOME_LOADER_TIME);
        }
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
