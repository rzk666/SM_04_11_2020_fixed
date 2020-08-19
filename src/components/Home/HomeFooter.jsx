import React from 'react';
// Styles
import styles from './HomeFooter.module.scss';
// Images
import Facebook from '../../static/images/icons/social/facebook.svg';
import Instagram from '../../static/images/icons/social/instagram.svg';
import Youtube from '../../static/images/icons/social/youtube.svg';
import Twitter from '../../static/images/icons/social/twitter.svg';
import FacebookGrey from '../../static/images/icons/social/facebookgrey.svg';
import InstagramGrey from '../../static/images/icons/social/instagramgrey.svg';
import YoutubeGrey from '../../static/images/icons/social/youtubegrey.svg';
import TwitterGrey from '../../static/images/icons/social/twittergrey.svg';
import FacebookOrange from '../../static/images/icons/social/facebookorange.svg';
import InstagramOrange from '../../static/images/icons/social/instagramorange.svg';
import YoutubeOrange from '../../static/images/icons/social/youtubeorange.svg';
import TwitterOrange from '../../static/images/icons/social/twitterorange.svg';
import FacebookCyan from '../../static/images/icons/social/facebookcyan.svg';
import InstagramCyan from '../../static/images/icons/social/instagramcyan.svg';
import YoutubeCyan from '../../static/images/icons/social/youtubecyan.svg';
import TwitterCyan from '../../static/images/icons/social/twittercyan.svg';
import FacebookBlue from '../../static/images/icons/social/facebookblue.svg';
import InstagramBlue from '../../static/images/icons/social/instagramblue.svg';
import YoutubeBlue from '../../static/images/icons/social/youtubeblue.svg';
import TwitterBlue from '../../static/images/icons/social/twitterblue.svg';
// Utils
import classnames from 'classnames';
// Animation
import { motion, useAnimation } from 'framer-motion';

// ----- Consts & Dicts ----- //
const LINKS = [
  {
    text: 'How it works?',
    href: 'www.google.com',
  },
  {
    text: 'FAQ',
    href: 'www.google.com',
  },
  {
    text: 'Contact Us',
    href: 'www.google.com',
  },
  {
    text: 'Legal',
    href: 'www.google.com',
  }];
const SOCIAL_LINKS = ['facebook', 'instagram', 'youtube', 'twitter'];

// ----- Help Function ----- //
const getSocialImage = (social, sport) => {
  switch (social) {
    case 'facebook':
      switch (sport) {
        case 'soccer':
          return Facebook;
        case 'baseball':
          return FacebookGrey;
        case 'basketball':
          return FacebookOrange;
        case 'hockey':
          return FacebookCyan;
        case 'football':
          return FacebookBlue;
        default:
          return null;
      }
    case 'instagram':
      switch (sport) {
        case 'soccer':
          return Instagram;
        case 'baseball':
          return InstagramGrey;
        case 'basketball':
          return InstagramOrange;
        case 'hockey':
          return InstagramCyan;
        case 'football':
          return InstagramBlue;
        default:
          return null;
      }
    case 'youtube':
      switch (sport) {
        case 'soccer':
          return Youtube;
        case 'baseball':
          return YoutubeGrey;
        case 'basketball':
          return YoutubeOrange;
        case 'hockey':
          return YoutubeCyan;
        case 'football':
          return YoutubeBlue;
        default:
          return null;
      }
    case 'twitter':
      switch (sport) {
        case 'soccer':
          return Twitter;
        case 'baseball':
          return TwitterGrey;
        case 'basketball':
          return TwitterOrange;
        case 'hockey':
          return TwitterCyan;
        case 'football':
          return TwitterBlue;
        default:
          return null;
      }
    default:
      return 0;
  }
};

const HomeFooter = ({ currentSport }) => {
  const controls = useAnimation();
  controls.start({
    opacity: [0, 1],
    transiton: { duration: 0.3, ease: 'easeIn' },
  });
  return (
    <motion.div animate={{ opacity: [0, 1], transiton: { duration: 0.3, ease: 'easeIn' } }} className={classnames(styles.footer_container, styles[currentSport])}>
      <div className={styles.links_container}>
        {LINKS.map((link) => {
          const { text, href } = link;
          return (
            <a className="white_text_2">
              {text}
            </a>
          );
        })}
      </div>
      <div className={styles.social_container}>
        {SOCIAL_LINKS.map((link) => <img src={getSocialImage(link, currentSport)} alt={`${link}_icon`} />)}
      </div>
      <div className={styles.footer_text}>
        © 2020 BEAT'EM. ALL RIGHTS RESERVED
      </div>
    </motion.div>
  );
};

export default HomeFooter;
