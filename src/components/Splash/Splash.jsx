/* eslint-disable no-await-in-loop */
import React from 'react';
// Animations
import { motion } from 'framer-motion';
// Images
import MainSplash from '../../static/images/splash/mainSplash.svg';
import SplashBg from '../../static/images/splash/splashBg.svg';
import Beatem from '../../static/images/splash/beatem.png';
// Styles
import styles from './Splash.module.scss';

const AnimatedCols = ({ animateCols }) => {
  const { animate1, animate2, animate3 } = animateCols;
  return (
    <div className={styles.animated_cols_wrapper}>
      <motion.div
        transition={animate1.transition}
        initial={animate1.initial}
        animate={animate1.animation}
        className={styles.col}
      />
      <motion.div
        transition={animate2.transition}
        initial={animate2.initial}
        animate={animate2.animation}
        className={styles.col}
      />
      <motion.div
        transition={animate3.transition}
        initial={animate3.initial}
        animate={animate3.animation}
        className={styles.col}
      />
    </div>
  );
};

const Splash = (props) => {
  const animateImages = {
    initial: {
      y: 150,
      opacity: 0,
    },
    animation: {
      opacity: 1,
      y: 0,
    },
    transition: {
      duration: 1,
      delay: 0.3,
    },
  };
  const animateTopBg = {
    initial: {
      y: -150,
      opacity: 0,
    },
    animation: {
      opacity: 1,
      y: 0,
    },
    transition: {
      delay: 0.3,
      duration: 1,
    },
  };
  const animateCols = {
    animate1: {
      initial: {
        opacity: 0,
        y: -15,
      },
      animation: {
        opacity: [0.75, 1, 0.75],
        y: [-30, -15, -30],
      },
      transition: {
        delay: 2,
        duration: 1.5,
        ease: 'easeInOut',
        loop: Infinity,
        repeatDelay: 0,
      },
    },
    animate2: {
      initial: {
        opacity: 0,
        y: -45,
      },
      animation: {
        opacity: [0.75, 1, 0.75],
        y: [-30, -15, -30],
      },
      transition: {
        delay: 2.5,
        duration: 1.5,
        ease: 'easeInOut',
        loop: Infinity,
        repeatDelay: 0,
      },
    },
    animate3: {
      initial: {
        opacity: 0,
        y: -45,
      },
      animation: {
        opacity: [0.75, 1, 0.75],
        y: [-30, -15, -30],
      },
      transition: {
        delay: 3,
        duration: 1.5,
        ease: 'easeInOut',
        loop: Infinity,
        repeatDelay: 0,
      },
    },
  };

  // eslint-disable-next-line array-callback-return
  return (
    <div className={styles.wrapper}>
      <>
        <motion.img
          initial={animateTopBg.initial}
          transition={animateTopBg.transition}
          animate={animateTopBg.animation}
          src={SplashBg}
          alt="top background"
          className={styles.top_background}
        />
        <motion.img
          initial={animateImages.initial}
          transition={animateImages.transition}
          animate={animateImages.animation}
          className={styles.main_image}
          src={MainSplash}
          alt="main_splash"
        />
        <motion.img
          initial={animateImages.initial}
          transition={animateImages.transition}
          animate={animateImages.animation}
          className={styles.beatem}
          src={Beatem}
          alt="beatem_logo_wide"
        />
        <AnimatedCols
          animateCols={animateCols}
        />
      </>
    </div>
  );
};

export default Splash;
