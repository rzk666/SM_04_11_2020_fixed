import React from 'react';
// Components
import Header from '../Header/Header';
// Styles
import styles from './Layout.module.scss';
// Universal
import pages from '../../universal/pages';

// ----- Consts & Dicts ----- //
const { HOME, ADMIN_LOGIN } = pages;
const WITH_HEADER = [HOME];

const Layout = (props) => {
  const { children, page } = props;
  return (
    <div className={styles.layout}>
      { WITH_HEADER.includes(page) && <Header {...props} />}
      {children}
    </div>
  );
};

export default Layout;
