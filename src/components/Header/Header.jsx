import React from 'react';
// Styles
import styles from './Header.module.scss';

const Header = ({ auth }) => {
  const { isLoggedIn } = auth;
  return (
    <div className={styles.header_container}>
      I am header
    </div>
  );
};

export default Header;
