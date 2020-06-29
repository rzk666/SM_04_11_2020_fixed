import React from 'react';
// Components
import Header from '../Header/Header';
// Styles
import styles from './Layout.module.scss';
// Util
import classnames from 'classnames';
// Universal
import pages from '../../universal/pages';

// ----- Consts & Dicts ----- //
const { HOME, ADMIN_LOGIN } = pages;
const WITH_HEADER = [HOME];

const Layout = (props) => {
  const { children, page } = props;
  const showHeader = WITH_HEADER.includes(page);
  return (
    <div className={classnames(styles.layout, { [styles.with_header]: showHeader })}>
      { showHeader && <Header {...props} />}
      {children}
    </div>
  );
};

export default Layout;
