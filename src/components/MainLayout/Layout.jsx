import React from 'react';
// Components
import Header from '../Header/Header';
// Styles
import styles from './Layout.module.scss';
// Animations
import { motion } from 'framer-motion';
// Util
import classnames from 'classnames';
// Universal
import pages from '../../universal/pages';

// ----- Consts & Dicts ----- //
const { HOME, ADMIN_LOGIN, LOGIN } = pages;
const WITH_HEADER = [HOME];
const WITH_DISSOLVE = [HOME, LOGIN];

const Layout = (props) => {
  const { children, page } = props;
  const showHeader = WITH_HEADER.includes(page);
  const dissolveAnimation = {
    animate: { opacity: 1 },
    initial: { opacity: 0 },
    transition: { duration: 0.3, ease: 'easeIn' },
  };
  return (
    <>
      { !WITH_DISSOLVE.includes(page)
        ? (
          <div className={classnames(styles.layout, { [styles.with_header]: showHeader })}>
            { showHeader && <Header {...props} />}
            {children}
          </div>
        ) : (
          <motion.div
            animate={dissolveAnimation.animate}
            transition={dissolveAnimation.transition}
            initial={dissolveAnimation.initial}
            className={classnames(styles.layout, { [styles.with_header]: showHeader })}
          >
            { showHeader && <Header {...props} />}
            {children}
          </motion.div>
        )}
    </>
  );
};

export default Layout;
