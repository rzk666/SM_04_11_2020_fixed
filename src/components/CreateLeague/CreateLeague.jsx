/* eslint-disable max-len */
import React, { Component, useState } from 'react';
// Components
import { Input } from 'semantic-ui-react';
import LeagueRules from '../JoinLeague/LeagueRules';
import OddsRow from '../common/OddsRow';
// Images
import LeagueAvatar from '../../static/images/createleague/LeagueAvatar.svg';
import Share from '../../static/images/createleague/Share.svg';
import Soccer from '../../static/images/icons/soccer.svg';
import Link from '../../static/images/createleague/Link.svg';
import Copy from '../../static/images/createleague/Copy.svg';
import PremiereLeague from '../../static/images/createleague/PremiereLeague.png';
import LaLiga from '../../static/images/createleague/LaLiga.png';
import Champions from '../../static/images/leagues/champions.png';
import RightArrowWhite from '../../static/images/icons/RightArrowWhite.svg';
import DownArrow from '../../static/images/icons/DownArrow.svg';
// MISC IMAGES
import Messi from '../../static/images/profiles/Messi.png';
import Neymar from '../../static/images/profiles/Neymar.png';
import Ronaldo from '../../static/images/profiles/Ronaldo.png';
import Buffon from '../../static/images/profiles/Buffon.png';
// TEAM IMAGES
import Sevillia from '../../static/images/teams/Sevillia.png';
// Animations
import { motion } from 'framer-motion';
// Styles
import styles from './CreateLeague.module.scss';
// Utils
import { getShortDayName } from '../../common/libs';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';

// Help Functions
const getLeagueMatches = (matches, league) => matches.filter((match) => match.league === league);

const getTeamImage = (team) => {
  switch (team) {
    case 'test':
      return '';
    default:
      return Sevillia;
  }
};

const getLeaguesArray = (matches) => {
  const leagues = [];
  matches.map((match) => {
    const { league } = match;
    if (!leagues.includes(league)) {
      leagues.push(league);
    }
  });
};

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

const StageOne = ({ updateStage, stage }) => {
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
      </div>
      <Bottom
        stage={stage}
        onClick={() => updateStage({
          stageNumber: stage.stageNumber + 1,
          text: 'SELECT MATCHES',
          img: RightArrowWhite,
        })}
      />
    </div>
  );
};

const StageTwo = ({ stage, updateStage }) => {
  const x = 5;
  return (
    <div className={styles.stage_two_container}>
      <div className={styles.title}>
        SELECT REWARDS
      </div>
      <div style={{ height: '315px', width: '100%' }}>
        <LeagueRules />
      </div>
      <Bottom
        stage={stage}
        onClick={() => updateStage({ stageNumber: stage.stageNumber + 1, text: 'INVITE FRIENDS', img: RightArrowWhite })}
      />
    </div>
  );
};

const Match = ({ onPick, isActive, match }) => {
  const {
    homeTeam,
    awayTeam,
    homeOdds,
    awayOdds,
    drawOdds,
    startDate,
  } = match;
  // Team Component
  const Team = ({ name }) => (
    <div className={styles.team_container}>
      <img src={getTeamImage(name)} alt={`${name}_img`} className={styles.team_image} />
      {name}
    </div>
  );
  return (
    <div className={styles.match_container} onClick={() => onPick()}>
      <motion.div
        animate={{ backgroundColor: isActive ? '#60d587' : '#cbcbcb' }}
        className={classnames(styles.pick_btn, { [styles.is_active]: isActive })}
      />
      <div className={styles.match_top_row}>
        <Team name={homeTeam} />
        <div className={styles.vs_container}>
          VS
          <div className={styles.date_container}>
            <p>{`${getShortDayName(startDate.getDay())}, ${startDate.getDate()}/${startDate.getMonth() + 1}`}</p>
            <p>{`${startDate.getHours()}:00`}</p>
          </div>
        </div>
        <Team name={awayTeam} />
      </div>
      <OddsRow
        homeOdds={homeOdds}
        awayOdds={awayOdds}
        drawOdds={drawOdds}
        type="b"
      />
    </div>
  );
};

const LeagueRow = ({
  isActive,
  changeActiveLeague,
  matches,
  name,
  img,
  selectedMatches,
  toggleMatch,
}) => {
  let selectedCounter = 0;
  matches.forEach((match) => {
    if (selectedMatches.includes(match.id) && match.league === name) {
      selectedCounter += 1;
    }
  });
  return (
    <>
      <div
        onClick={() => changeActiveLeague(name)}
        className={styles.league_row_container}
      >
        <img src={img} alt="League Row Img" style={{ marginRight: '15px', width: '20px' }} />
        { selectedCounter > 0 && (
        <div className={styles.selected}>
          {selectedCounter}
        </div>
        )}
        {name}
        <img src={DownArrow} alt="Open" style={{ marginLeft: 'auto' }} />
      </div>
      <div className={styles.divider} />
      { isActive && (
      <div className={styles.matches_container}>
        {matches.map((match) => (<Match isActive={selectedMatches.includes(match.id)} onPick={() => toggleMatch(match.id)} match={match} />))}
      </div>
      )}
    </>
  );
};

const StageThree = ({
  changeActiveLeague,
  activeLeague,
  updateStage,
  availableMatches,
  stage,
  toggleMatch,
  selectedMatches,
}) => {
  const { matches } = availableMatches;
  return (
    <div className={styles.stage_three_container}>
      <div className={styles.gradient_block} />
      <div className={styles.title}>SELECT MATCHES</div>
      <Input
        fluid
        iconPosition="left"
        icon="search"
        placeholder="Search Matches"
        className={styles.search}
      />
      <LeagueRow
        selectedMatches={selectedMatches}
        toggleMatch={(match) => toggleMatch(match)}
        changeActiveLeague={() => changeActiveLeague('Premiere League')}
        isActive={activeLeague === 'Premiere League'}
        matches={getLeagueMatches(matches, 'Premiere League')}
        name="Premiere League"
        img={PremiereLeague}
      />
      <LeagueRow
        selectedMatches={selectedMatches}
        toggleMatch={(match) => toggleMatch(match)}
        changeActiveLeague={() => changeActiveLeague('La Liga')}
        isActive={activeLeague === 'La Liga'}
        matches={getLeagueMatches(matches, 'La Liga')}
        name="La Liga"
        img={LaLiga}
      />
      <LeagueRow
        selectedMatches={selectedMatches}
        toggleMatch={(match) => toggleMatch(match)}
        changeActiveLeague={() => changeActiveLeague('Champions League')}
        isActive={activeLeague === 'Champions League'}
        matches={getLeagueMatches(matches, 'Champions League')}
        name="Champions League"
        img={Champions}
      />
      <Bottom
        stage={stage}
        onClick={() => updateStage({ stageNumber: stage.stageNumber + 1, text: 'INVITE FRIENDS', img: RightArrowWhite })}
      />
    </div>
  );
};

const Bottom = ({
  stage, onClick,
}) => {
  const { stageNumber, text, img } = stage;
  return (
    <div className={styles.bottom_container}>
      <motion.div whileTap={{ scale: 0.9 }} onClick={() => onClick()} style={{ marginTop: 'auto', marginBottom: '15px' }} className={styles.next_btn}>
        {text}
        <img src={img} alt={`${img}_logo`} />
      </motion.div>
      <CurrentStageIndicator stage={stageNumber} />
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

const StageFour = ({ handleTableCreation }) => {
  const history = useHistory();
  return (
    <div className={styles.stage_four_container}>
      <div className={styles.gradient_block} />
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
      <motion.div
        whileTap={{ scale: 0.9 }}
        onClick={() => handleTableCreation()}
        style={{ marginTop: 'auto', marginBottom: '15px' }}
        className={styles.next_btn}
      >
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
      stage: {
        stageNumber: 1,
        img: RightArrowWhite,
        text: 'SELECT REWARDS',
      },
      leagueName: '',
      leagueDescription: '',
      tableType: 'a',
      selectedMatches: [],
      betSize: 0,
      players: 0,
      activeLeague: 'Champions League',
    };
  }

  handleTableCreation() {
    const {
      leagueName,
      leagueDescription,
      tableType,
      selectedMatches,
      betSize,
      players,
    } = this.state;
    const {
      auth, updateActiveTable, history, availableMatches,
    } = this.props;
    const { matches } = availableMatches;
    const { user } = auth;
    const leagues = getLeaguesArray(matches);
    updateActiveTable({
      players,
      leagues,
      prizePool: betSize * players,
      name: leagueName,
      description: leagueDescription,
      type: tableType,
      matches: selectedMatches,

    }, user);
    history.push('/table');
  }

  toggleMatch(matchId) {
    const { selectedMatches } = this.state;
    if (selectedMatches.includes(matchId)) {
      this.setState({ selectedMatches: [...selectedMatches].filter((match) => match !== matchId) });
    } else {
      this.setState({ selectedMatches: [...selectedMatches, matchId] });
    }
  }

  changeActiveLeague(leagueName) {
    const { activeLeague } = this.state;
    if (activeLeague === leagueName) {
      this.setState({ activeLeague: '' });
    } else {
      this.setState({ activeLeague: leagueName });
    }
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
    const { stage, activeLeague, selectedMatches } = this.state;
    const { availableMatches } = this.props;
    const { stageNumber } = stage;
    let currentStage;
    switch (stageNumber) {
      case 1:
        currentStage = (
          <StageOne
            stage={stage}
            updateStage={(stage) => this.updateStage(stage)}
          />
        );
        break;
      case 2:
        currentStage = (
          <StageTwo
            stage={stage}
            updateStage={(stage) => this.updateStage(stage)}
          />
        );
        break;
      case 3:
        currentStage = (
          <StageThree
            toggleMatch={(matchId) => this.toggleMatch(matchId)}
            selectedMatches={selectedMatches}
            stage={stage}
            activeLeague={activeLeague}
            changeActiveLeague={(league) => this.changeActiveLeague(league)}
            availableMatches={availableMatches}
            updateStage={(stage) => this.updateStage(stage)}
          />
        );
        break;
      case 4:
        currentStage = <StageFour {...this.state} />;
        break;
      default:
        break;
    }
    return (
      <div className={styles.container}>
        {currentStage}
      </div>
    );
  }
}

export default CreateLeague;
