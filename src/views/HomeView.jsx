import React from 'react';
// Components
import SportsBar from '../components/Home/SportsBar';
// Styles
import styles from './HomeView.module.scss';


const HomeView = ({
  login,
  currentSport,
  changeSport,
}) => (
  <div className={styles.wrapper}>
    <SportsBar currentSport={currentSport} changeSport={(sport) => changeSport(sport)} />
  </div>
);

export default HomeView;
