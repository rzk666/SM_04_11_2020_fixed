/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
// Components
import { Input, Button } from 'semantic-ui-react';
// Styles
import styles from './LoginView.module.scss';
// Images
import ExitIcon from '../static/images/icons/Exit.svg';
import BeatemBall from '../static/images/icons/BeatemBall.svg';

// ----- Help Components ----- //
const LoginInput = ({
  hasError, type, onChange, value,
}) => {
  const isEmailInput = type === 'email';
  return (
    <Input
      type={!isEmailInput ? 'password' : 'text'}
      error={hasError}
      icon={isEmailInput ? 'green user circle outline' : 'green key'}
      iconPosition="left"
      placeholder={isEmailInput ? 'Email' : 'Password'}
      className={styles.login_input}
      fluid
      onChange={(e, data) => onChange(data.value)}
      value={value}
    />
  );
};

const LoginButton = ({ type, login, value }) => {
  const [loginIsLoading, setLoginIsLoading] = useState(false);
  return (
    <Button
      fluid
      className={styles.login_button}
      loading={loginIsLoading}
      onClick={() => {
        setLoginIsLoading(true);
        setTimeout(() => { login(); setLoginIsLoading(false); }, 1500);
      }}
    >
      LOGIN
    </Button>
  );
};

const LoginView = ({
  history,
  handleInputsChange,
  password,
  email,
  login,
  showErrors,
}) => {
  const x = 5;
  return (
    <>
      <div className={styles.login_wrapper}>
        <img
          src={ExitIcon}
          alt="Exit_icon"
          className={styles.exit}
          onClick={() => history.goBack()}
        />
        <div className={styles.content_wrapper}>
          <img
            src={BeatemBall}
            alt="Beatem_Icon"
            className={styles.ballicon}
          />
          <div className={styles.login_title}>
            WELCOME
          </div>
          <div className={styles.divider} />
          <div className={styles.login_sec_title}>Are you ready to beatem?</div>
          <LoginInput hasError={showErrors} type="email" value={email} onChange={(data) => handleInputsChange('email', data)} />
          <LoginInput hasError={showErrors} type="password" value={password} onChange={(data) => handleInputsChange('password', data)} />
          <div className={styles.forgot_password}>
            Forgot Password?
          </div>
          <div className={styles.mini_divider} />
          <LoginButton login={() => login({ email, password })} />
          <div className={styles.no_account}>Don't have an account yet?</div>
          <div className={styles.sign_up}>Sign Up</div>
        </div>
      </div>
    </>
  );
};

export default LoginView;
