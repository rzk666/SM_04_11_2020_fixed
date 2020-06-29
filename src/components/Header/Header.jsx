import React from 'react';
// Images
import BeatemHomeTitle from '../../static/images/icons/beatemhometitle.png';
import Home from '../../static/images/icons/home.png';
import Menu from '../../static/images/icons/menu.png';
// Styles
import styles from './Header.module.scss';

const Header = ({ auth }) => {
  const { isLoggedIn } = auth;
  return (
    <div className={styles.header_container}>
      <img
        src={BeatemHomeTitle}
        alt="TITLE_HOME"
        className={styles.title_img}
      />
      <div className={styles.menu_container}>
        <div className={styles.login} onClick={() => alert('login')}>
          Login
        </div>
        <img
          src={Home}
          alt="HOME_ICON"
          className={styles.home}
        />
        <img
          src={Menu}
          alt="HOME_MENU"
          className={styles.menu}
        />
      </div>
    </div>
  );
};

export default Header;
