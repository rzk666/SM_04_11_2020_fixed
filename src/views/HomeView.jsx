import React from 'react';
// Components
import Splash from '../components/Splash/Splash';
// Styles
import styles from './HomeView.module.scss';

const HomeHeader = () => <div className={styles.tests} />;


const HomeView = ({
  showSplash,
  login,
}) => (
  <div className={styles.wrapper}>
    { showSplash ? <Splash />
      : <HomeHeader />}
  </div>
);

export default HomeView;
