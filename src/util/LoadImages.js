import SoccerTopBanner from '../static/images/home/SoccerTopBanner.png';
import BasketballTopBanner from '../static/images/home/BasketballTopBanner.png';
import HockeyTopBanner from '../static/images/home/HockeyTopBanner.png';
import FootballTopBanner from '../static/images/home/FootballTopBanner.png';
import BaseballTopBanner from '../static/images/home/BaseballTopBanner.png';

/* eslint-disable no-underscore-dangle */
const IMAGES = {
  home: [SoccerTopBanner, BaseballTopBanner, HockeyTopBanner, FootballTopBanner, BasketballTopBanner],
};

const _LoadImages = (page) => {
  IMAGES[page].forEach((img) => {
    const loadImg = new Image();
    loadImg.src = img;
  });
};

export default _LoadImages;
