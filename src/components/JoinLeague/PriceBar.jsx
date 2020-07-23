import React from 'react';
// Styles
import styles from './PriceBar.module.scss';
// Animations
import { motion } from 'framer-motion';
// Utils
import classnames from 'classnames';
// Images
import Hockey from '../../static/images/icons/hockey.svg';

// ----- Dicts & Consts ----- //
const PRICES = ['3', '5', '10', '15', '20'];

// ----- Help Functions ----- //
const getUnderbarX = (priceIndex) => {
  const underbarWidth = window.innerWidth / 5;
  return priceIndex * underbarWidth;
};

const PriceBar = ({ currentPrice, changePrice }) => {
  const priceIndex = PRICES.indexOf(currentPrice);
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
          className={classnames(styles.price_container, { [styles.active]: price === currentPrice })}
          onClick={() => changePrice(price)}
        >
          {`${price}€`}
        </div>
      ))}
    </div>
  );
};

export default PriceBar;
