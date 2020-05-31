/* eslint-disable no-await-in-loop */
import React from 'react';
// Util
import { motion } from 'framer-motion';
import { connect } from 'react-redux';
// Styles
import styles from './Splash.module.scss';

const AnimatedCols = ({ animate }) => {
  const { animate1, animate2, animate3 } = animate;
  return (
    <div className={styles.animated_cols_wrapper}>
      <motion.div transition={animate1.transition} initial={animate1.initial} animate={animate1.animation} className={styles.col} />
      <motion.div transition={animate2.transition} initial={animate2.initial} animate={animate2.animation} className={styles.col} />
      <motion.div transition={animate3.transition} initial={animate3.initial} animate={animate3.animation} className={styles.col} />
    </div>
  );
};

const getImage = (asset, imgName) => asset.filter((img) => img.includes(imgName))[0];

const Splash = (props) => {
  const animate = {
    animate1: {
      initial: {
        opacity: 0.5,
        y: 60,
      },
      animation: {
        opacity: [0.5, 1, 0.5],
        y: [60, 0, 60],
      },
      transition: {
        duration: 1.2,
        ease: 'easeIn',
        loop: Infinity,
        repeatDelay: 0,
      },
    },
    animate2: {
      initial: {
        opacity: 0.5,
        y: 60,
      },
      animation: {
        opacity: [0.5, 1, 0.5],
        y: [60, 0, 60],
      },
      transition: {
        delay: 0.2,
        duration: 1.2,
        ease: 'easeIn',
        loop: Infinity,
        repeatDelay: 0,
      },
    },
    animate3: {
      initial: {
        opacity: 0.5,
        y: 60,
      },
      animation: {
        opacity: [0.5, 1, 0.5],
        y: [60, 0, 60],
      },
      transition: {
        delay: 0.4,
        duration: 1.2,
        ease: 'easeIn',
        loop: Infinity,
        repeatDelay: 0,
      },
    },
  };

  // Get images
  const { assets } = props;
  const { splash, isLoading } = assets;
  let mainSplash;
  let splashBg;
  let beatem;
  if (splash.length) {
    mainSplash = getImage(splash, 'mainSplash');
    splashBg = getImage(splash, 'splashBg');
    beatem = getImage(splash, 'beatem.png');
  }
  // eslint-disable-next-line array-callback-return
  return (
    <div className={styles.wrapper}>
      { !isLoading
      && (
      <>
        <img
          src={splashBg}
          alt="top background"
          className={styles.top_background}
        />
        <img
          className={styles.main_image}
          src={mainSplash}
          alt="main_splash"
        />
        <img
          className={styles.beatem}
          src={beatem}
          alt="beatem_logo_wide"
        />
        <AnimatedCols
          animate={animate}
        />
      </>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return { assets: state.assets };
}
export default connect(mapStateToProps)(Splash);
