/* eslint-disable max-len */
import React, { Component, useState } from 'react';
// Components
import { Input } from 'semantic-ui-react';
import LeagueRules from '../JoinLeague/LeagueRules';
// Images
import LeagueAvatar from '../../static/images/createleague/LeagueAvatar.svg';
import Share from '../../static/images/createleague/Share.svg';
import Soccer from '../../static/images/icons/soccer.svg';
import Link from '../../static/images/createleague/Link.svg';
import Copy from '../../static/images/createleague/Copy.svg';
import PremiereLeague from '../../static/images/createleague/PremiereLeague.png';
import LaLiga from '../../static/images/createleague/LaLiga.png';
import RightArrowWhite from '../../static/images/icons/RightArrowWhite.svg';
import DownArrow from '../../static/images/icons/DownArrow.svg';
// MISC IMAGES
import Messi from '../../static/images/profiles/Messi.png';
import Neymar from '../../static/images/profiles/Neymar.png';
import Ronaldo from '../../static/images/profiles/Ronaldo.png';
import Buffon from '../../static/images/profiles/Buffon.png';
// Animations
import { motion } from 'framer-motion';
// Styles
import styles from './CreateLeague.module.scss';
// Utils
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
// Misc
const FAKE_USERS = [{
  name: 'Lionel Messi',
  profilePicture: Messi,
},
{
  name: 'Neymar da Silva Santos Junior',
  profilePicture: Neymar,
},
{
  name: 'Cristiano Ronaldo',
  profilePicture: Ronaldo,
},
{
  name: 'Gianluigi Buffon',
  profilePicture: Buffon,
}];

const StageOne = ({ updateStage }) => {
  const [weeklyActive, setActive] = useState(true);
  return (
    <div className={styles.stage_one_container}>
      <div className={styles.top_bg}>
        <div className={styles.bg_content_wrapper}>
          <div className={styles.title}>CREATE NEW LEAGUE</div>
          <Input transparent className={styles.input_type_one} fluid placeholder="Choose a name for your league" />
          <Input transparent className={styles.input_type_one} fluid placeholder="Write a description for your league" />
        </div>
        <img src={LeagueAvatar} alt="Avatar" className={styles.league_avatar} />
      </div>
      <div className={styles.details_container}>
        <div className={styles.first_details_row}>
          <div className={styles.titled_input} style={{ marginRight: '12.5px' }}>
            <p>League Bet</p>
            <Input className={styles.input_type_two} icon="euro green large" iconPosition="left" fluid />
          </div>
          <div className={classnames(styles.titled_input, styles.small_font)}>
            <p>Max Players</p>
            <Input icon="users" iconPosition="left" className={classnames(styles.input_type_two, { [styles.empty]: true })} fluid placeholder="UNLIMITED" />
          </div>
        </div>
        <div className={styles.unlimited} onClick={() => alert('unlimited')}>
          <div className={classnames(styles.radio, { [styles.active]: true })} />
          Create league with unlimited number of players
        </div>
        <div className={styles.weekly_season_row}>
          <div onClick={() => setActive(true)} className={classnames(styles.selection_btn, { [styles.active]: weeklyActive })}>
            WEEKLY
          </div>
          <div onClick={() => setActive(false)} className={classnames(styles.selection_btn, { [styles.active]: !weeklyActive })}>
            SEASON
          </div>
        </div>
        <motion.div whileTap={{ scale: 0.9 }} onClick={() => updateStage(2)} className={styles.next_btn}>
          SELECT REWARDS
          <img src={RightArrowWhite} alt="Next" />
        </motion.div>
      </div>
    </div>
  );
};

const StageTwo = ({ updateStage }) => {
  const x = 5;
  return (
    <div className={styles.stage_two_container}>
      <div className={styles.title}>
        SELECT REWARDS
      </div>
      <div style={{ height: '315px', width: '100%' }}>
        <LeagueRules />
      </div>
      <motion.div whileTap={{ scale: 0.9 }} onClick={() => updateStage(3)} style={{ marginTop: 'auto', marginBottom: '15px' }} className={styles.next_btn}>
        SELECT MATCHES
        <img src={RightArrowWhite} alt="Next" />
      </motion.div>
    </div>
  );
};

const LeagueRow = ({ name, img }) => (
  <>
    <div className={styles.league_row_container}>
      <img src={img} alt="League Row Img" style={{ marginRight: '15px', width: '20px' }} />
      {name}
      <img src={DownArrow} alt="Open" style={{ marginLeft: 'auto' }} />
    </div>
    <div className={styles.divider} />
  </>
);

const StageThree = ({ updateStage }) => {
  const x = 5;
  return (
    <div className={styles.stage_three_container}>
      <div className={styles.title}>SELECT MATCHES</div>
      <Input
        fluid
        iconPosition="left"
        icon="search"
        placeholder="Search Matches"
        className={styles.search}
      />
      <LeagueRow name="Premiere League" img={PremiereLeague} />
      <LeagueRow name="La Liga" img={LaLiga} />
      <motion.div whileTap={{ scale: 0.9 }} onClick={() => updateStage(4)} style={{ marginTop: 'auto', marginBottom: '15px' }} className={styles.next_btn}>
        INVITE FRIENDS
        <img src={RightArrowWhite} alt="Next" />
      </motion.div>
    </div>
  );
};

const FriendRow = ({ invited, user }) => {
  const { name, profilePicture } = user;
  return (
    <>
      <div className={styles.friend_row}>
        <img src={profilePicture} alt={`${name}_picture`} style={{ borderRadius: '255px', width: '30px' }} />
        {name}
        <motion.div
          whileTap={{ scale: 0.9 }}
          className={classnames(styles.invite_btn, { [styles.invited]: invited })}
        >
          { invited ? 'INVITED' : 'INVITE'}
        </motion.div>
      </div>
      <div className={styles.divider} />
    </>
  );
};

const StageFour = () => {
  const history = useHistory();
  return (
    <div className={styles.stage_four_container}>
      <div className={styles.title}>INVITE FRIENDS</div>
      <div className={styles.invite_link_container}>
        <div className={styles.link_title}>INVITATION LINK</div>
        <div className={styles.link_row}>
          <img src={Link} alt="Link" />
          https://invite.beatem.com/inBTM0325fr
        </div>
        <div className={styles.link_actions}>
          <div className={styles.copy}>
            <img src={Copy} alt="Copy" />
            Copy Link
          </div>
          <div className={styles.copy}>
            <img src={Share} alt="Share" />
            Share Link
          </div>
        </div>
      </div>
      <Input
        fluid
        iconPosition="left"
        icon="search"
        placeholder="Search Friends"
        className={styles.search}
      />
      <div className={styles.friends_container}>
        <FriendRow invited={false} user={FAKE_USERS[0]} />
        <FriendRow invited user={FAKE_USERS[1]} />
        <FriendRow invited={false} user={FAKE_USERS[2]} />
        <FriendRow invited={false} user={FAKE_USERS[3]} />
      </div>
      <motion.div whileTap={{ scale: 0.9 }} onClick={() => history.push('/table')} style={{ marginTop: 'auto', marginBottom: '15px' }} className={styles.next_btn}>
        CREATE LEAGUE
        <img src={Soccer} alt="Go to table" style={{ width: '20px' }} />
      </motion.div>
    </div>
  );
};

const CurrentStageIndicator = ({ stage }) => {
  const Stage = ({ isActive }) => <div className={classnames(styles.dot, { [styles.active]: isActive })}> </div>;
  return (
    <div className={styles.current_stage_container}>
      <Stage isActive />
      <Stage isActive={stage > 1} />
      <Stage isActive={stage > 2} />
      <Stage isActive={stage > 3} />
    </div>
  );
};

class CreateLeague extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 1,
      leagueName: '',
      leagueDescription: '',
    };
  }

  changeLeagueName(leagueName) {
    this.setState({ leagueName });
  }

  changeLeagueDescription(leagueDescription) {
    this.setState({ leagueDescription });
  }

  updateStage(stage) {
    this.setState({ stage });
  }


  render() {
    const { stage } = this.state;
    let currentStage;
    switch (stage) {
      case 1:
        currentStage = <StageOne updateStage={(stage) => this.updateStage(stage)} />;
        break;
      case 2:
        currentStage = <StageTwo updateStage={(stage) => this.updateStage(stage)} />;
        break;
      case 3:
        currentStage = <StageThree updateStage={(stage) => this.updateStage(stage)} />;
        break;
      case 4:
        currentStage = <StageFour />;
        break;
      default:
        break;
    }
    return (
      <div className={styles.container}>
        {currentStage}
        <CurrentStageIndicator stage={stage} />
      </div>
    );
  }
}

export default CreateLeague;
