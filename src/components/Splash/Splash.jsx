/* eslint-disable no-await-in-loop */
import React from 'react';
// Util
import { motion } from 'framer-motion';
import { connect } from 'react-redux';
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

const getImage = (asset, imgName) => asset.filter((img) => img.includes(imgName))[0];

const Splash = (props) => {
  const animateImages = {
    initial: {
      y: 150,
      opacity: 0.75,
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
      opacity: 0.75,
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
        y: [-45, -15, -45],
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
        y: [-45, -15, -45],
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
        y: [-45, -15, -45],
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
        <motion.img
          initial={animateTopBg.initial}
          transition={animateTopBg.transition}
          animate={animateTopBg.animation}
          src={splashBg}
          alt="top background"
          className={styles.top_background}
        />
        <motion.img
          initial={animateImages.initial}
          transition={animateImages.transition}
          animate={animateImages.animation}
          className={styles.main_image}
          src={mainSplash}
          alt="main_splash"
        />
        <motion.img
          initial={animateImages.initial}
          transition={animateImages.transition}
          animate={animateImages.animation}
          className={styles.beatem}
          src={beatem}
          alt="beatem_logo_wide"
        />
        <AnimatedCols
          animateCols={animateCols}
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
