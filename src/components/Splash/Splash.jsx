import React from 'react';
// Styles
import styles from './Splash.module.scss';

// Consts & Dictioneries
const splashBg = `${process.env.PUBLIC_URL}/images/splash/splashBg.svg`;

const AnimatedCols = () => {
  const x = 5;
  return (
    <div className={styles.animated_cols_wrapper}>
      ANIMATED COLS
    </div>
  );
};

const Splash = () => (
  <div className={styles.wrapper}>
    <img
      src={splashBg}
      alt="top background"
      className={styles.top_background}
    />
    <div className={styles.image}>
      MAIN IMAGE
    </div>
    <div className={styles.beatem}>
      BEATEM IMG
    </div>
    <AnimatedCols />
  </div>
);

export default Splash;
