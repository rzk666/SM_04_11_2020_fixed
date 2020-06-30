import React from 'react';
// Styles
import styles from './HomeFooter.module.scss';
// Images
import Facebook from '../../static/images/icons/social/facebook.svg';
import Instagram from '../../static/images/icons/social/instagram.svg';
import Youtube from '../../static/images/icons/social/youtube.svg';
import Twitter from '../../static/images/icons/social/twitter.svg';

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
const getSocialImage = (social) => {
  switch (social) {
    case 'facebook':
      return Facebook;
    case 'instagram':
      return Instagram;
    case 'youtube':
      return Youtube;
    case 'twitter':
      return Twitter;
    default:
      return 0;
  }
};

const HomeFooter = () => {
  const x = 5;
  return (
    <div className={styles.footer_container}>
      <div className={styles.links_container}>
        {LINKS.map((link) => {
          const { text, href } = link;
          return (
            <a href={href} className="white_text_2">
              {text}
            </a>
          );
        })}
      </div>
      <div className={styles.social_container}>
        {SOCIAL_LINKS.map((link) => <a href="www.google.com"><img src={getSocialImage(link)} alt={`${link}_icon`} /></a>)}
      </div>
      <div className={styles.footer_text}>
        © 2020 BEAT'EM. ALL RIGHTS RESERVED
      </div>
    </div>
  );
};

export default HomeFooter;
