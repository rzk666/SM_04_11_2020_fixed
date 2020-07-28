import React from 'react';
// Styles
import styles from './TableTopBar.module.scss';
// Animations
import { motion } from 'framer-motion';
// Utils
import classnames from 'classnames';

// ----- Dicts & Consts ----- //
const PRICES = ['LEADERBOARD', 'MY BETS', 'LIVE STATUS', 'REAL TABLE'];

// ----- Help Functions ----- //
const getUnderbarX = (priceIndex) => {
  const underbarWidth = window.innerWidth / 4;
  return priceIndex * underbarWidth;
};

const PriceBar = ({ currentView, changeView }) => {
  const priceIndex = PRICES.indexOf(currentView);
  const animateUnderbar = {
    x: getUnderbarX(priceIndex),
    backgroundColor: '#57bb78',
  };
  return (
    <div className={styles.pricebar_container}>
      <motion.div
        transition={{ type: 'spring', damping: 18 }}
        animate={animateUnderbar}
        className={styles.underbar}
      />
      {PRICES.map((price, i) => (
        <div
          key={`${price}_${i}`}
          className={classnames(styles.price_container, { [styles.active]: price === currentView })}
          onClick={() => changeView(price)}
        >
          {`${price}€`}
        </div>
      ))}
    </div>
  );
};

export default PriceBar;
