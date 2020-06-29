import React from 'react';
// Components
import SportsBar from '../components/Home/SportsBar';
// Styles
import styles from './HomeView.module.scss';


const HomeView = ({
  login,
}) => (
  <div className={styles.wrapper}>
    <SportsBar />
  </div>
);

export default HomeView;
