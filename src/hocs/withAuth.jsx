import React from 'react';
// Utils
import { connect } from 'react-redux';
// Redux Actions
import {
  signOut,
  refreshAuth,
} from '../redux/models/auth/authActions';

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
    componentDidMount() {
      const { auth, cookies } = this.props;
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
      const { auth, history, cookies } = this.props;
      const { isLoggedIn, hasAccess } = auth;
      if (isLoggedIn !== prevProps.auth.isLoggedIn) {
        enforceAuth(this.props);
      }
      // Admin login
      if (hasAccess && !prevProps.auth.hasAccess) {
        cookies.set('auth', auth);
        history.push('/');
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
