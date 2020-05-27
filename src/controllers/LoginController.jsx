import React from 'react';
// common
import ROUTES from '../universal/routes';
// Redux Action

// ----- Dictioneries ----- //
const { ADMIN_ROUTE, HOME_ROUTE } = ROUTES;

// ----- Help Functions ----- //
const handleAuthChange = (controllerProps) => {
  const { auth, history } = controllerProps;
  const { isLoggedIn } = auth;
  const { user } = auth;
  if (isLoggedIn) {
    const { cookies } = controllerProps;
    cookies.set('auth', auth, { path: '/' });
    if (user.role === 'admin') {
      history.push(ADMIN_ROUTE);
    } else {
      history.push(HOME_ROUTE);
    }
  }
};

class LoginController extends React.Component {
  componentDidMount() {
    // handle cookies
    const { cookies, refreshAuth } = this.props;
    const cookie = cookies.get('auth');
    if (cookie.token) {
      refreshAuth(cookie);
    }
  }

  componentDidUpdate(prevProps) {
    const { auth } = this.props;
    const { isLoggedIn } = auth;
    // Indicates a successfull login
    if (prevProps.auth.isLoggedIn !== isLoggedIn) {
      handleAuthChange(this.props);
    }
  }

  login(data) {
    const { login } = this.props;
    login(data);
  }

  callbacks() {
    return {
      login: this.login.bind(this),
    };
  }

  render() {
    const { View } = this.props;
    return (
      <View
        {...this.props}
        {...this.state}
        {...this.callbacks()}
      />
    );
  }
}

export default LoginController;
