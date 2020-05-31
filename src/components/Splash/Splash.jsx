import React from 'react';
import { connect } from 'react-redux';
// Styles
import styles from './Splash.module.scss';

const AnimatedCols = () => (
  <div className={styles.animated_cols_wrapper}>
    <div className={styles.col} />
    <div className={styles.col} />
    <div className={styles.col} />
  </div>
);

const getImage = (asset, imgName) => asset.filter((img) => img.includes(imgName))[0];

const Splash = (props) => {
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
        <AnimatedCols />
      </>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return { assets: state.assets };
}
export default connect(mapStateToProps)(Splash);
