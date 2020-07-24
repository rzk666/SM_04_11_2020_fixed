import React, { useState } from 'react';
// Images
import FirstPlace from '../../static/images/joinleague/First.svg';
import SecondPlace from '../../static/images/joinleague/Second.svg';
import ThirdPlace from '../../static/images/joinleague/Third.svg';
// Animations
import { motion } from 'framer-motion';
// Utils
import classnames from 'classnames';
// Styles
import styles from './LeagueRules.module.scss';

const Rule = ({
  img, isActive, title, subText, reduceTextSize, onClick,
}) => (
  <div onClick={() => onClick()} className={classnames(styles.rule, { [styles.active]: isActive })}>
    <div className={styles.first_section}>
      <div className={classnames(styles.radio, { [styles.active]: isActive })} />
      <motion.img initial={{ scale: 0.9 }} animate={isActive ? { scale: 1 } : { scale: 0.8 }} src={img} alt="trophies" />
    </div>
    <div className={styles.second_section}>
      <div className={classnames(styles.description, { [styles.active]: isActive })}>
        <p className={styles.title}>{title}</p>
        <p className={classnames(styles.sub_text, { [styles.reduce_size]: reduceTextSize })}>{subText}</p>
      </div>
    </div>
  </div>
);

const LeagueRules = () => {
  const [active, setActive] = useState(0);
  return (
    <div className={styles.wrapper}>
      <Rule isActive={active === 0} onClick={() => setActive(0)} img={FirstPlace} title="THERE CAN ONLY BE ONE" subText="First Place: 100% Winning Prize" />
      <Rule isActive={active === 1} onClick={() => setActive(1)} img={SecondPlace} title="SPLIT THE FORTUNE" subText="First Place: 70%, Second Place: 30%" />
      <Rule isActive={active === 2} onClick={() => setActive(2)} reduceTextSize img={ThirdPlace} title="STRENGTH IN NUMBERS" subText="First Place: 50%, Second Place: 30%, Third Place: 20%" />
    </div>
  );
};

export default LeagueRules;
