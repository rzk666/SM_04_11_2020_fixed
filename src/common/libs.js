// Images
import Barcelona from '../static/images/teams/Barcelona.png';
import Sevillia from '../static/images/teams/Sevillia.png';
import RealMadrid from '../static/images/teams/RealMadrid.png';
import Getafe from '../static/images/teams/Getafe.png';
import CeltaVigo from '../static/images/teams/CeltaVigo.png';
import Granada from '../static/images/teams/Granada.png';
import Valencia from '../static/images/teams/Valencia.png';
import Villareal from '../static/images/teams/Villareal.png';
import ManchesterCity from '../static/images/teams/ManchesterCity.png';
import ManchesterUnited from '../static/images/teams/ManchesterUnited.png';
import AstonVilla from '../static/images/teams/AstonVilla.png';
import Juventus from '../static/images/teams/Juventus.png';
import Liverpool from '../static/images/teams/Liverpool.png';
import Arsenal from '../static/images/teams/Arsenal.png';
import Leicester from '../static/images/teams/Leicester.png';
import Chelsea from '../static/images/teams/Chelsea.png';
import Tottenham from '../static/images/teams/Tottenham.png';

export const calculateMatchScore = (
  homeScore,
  homeBet,
  awayScore,
  awayBet,
  homeOdds,
  awayOdds,
  drawOdds,
) => {
  let newScore = 0;
  // Handle bets on home team win
  if (homeBet > awayBet) {
    // Check if home team is currently winning
    if (homeScore > awayScore) {
      // Add match score
      newScore += homeOdds;
      if (homeBet - awayBet === homeScore - awayScore) {
        // Add differance bonus (20)
        newScore += 20;
      }
      if (homeBet === homeScore) {
        // Add exact goals bonus (5)
        newScore += 5;
      }
      if (awayBet === awayScore) {
        // Add exact goals bonus (5)
        newScore += 5;
      }
      if (homeBet === homeScore && awayBet === awayScore) {
        // Add exact hit bonus (20)
        newScore += 20;
      }
    }
    // Next, handle the opposite -> awayTeam bet
  } else if (awayBet > homeBet) {
    // Add match score
    if (awayScore > homeScore) {
      newScore += awayOdds;
      if (awayBet - homeBet === awayScore - homeScore) {
        // Add differance bonus (20)
        newScore += 20;
      }
      if (homeBet === homeScore) {
        // Add exact goals bonus (5)
        newScore += 5;
      }
      if (awayBet === awayScore) {
        // Add exact goals bonus (5)
        newScore += 5;
      }
      if (homeBet === homeScore && awayBet === awayScore) {
        // Add exact hit bonus (20)
        newScore += 20;
      }
    }
    // Handle draw
  } else if (awayScore === homeScore) {
    newScore += drawOdds;
    // Handle exact bonus
    if (awayScore === awayBet && homeScore === homeBet) {
      // ASK BARAK -> Here + 20 or + 40?
      newScore += 20;
    }
  }
  return newScore;
};

export const calculateUserScore = (user, matches) => {
  const { bets } = user;
  let newScore = 0;
  matches.map((match) => {
    const {
      homeScore, awayScore, homeOdds, awayOdds, drawOdds,
    } = match;
    const currentBet = bets.find((bet) => bet.matchId === match.id);
    const awayBet = currentBet.awayScore;
    const homeBet = currentBet.homeScore;
    newScore += calculateMatchScore(homeScore, homeBet, awayScore, awayBet, homeOdds, awayOdds, drawOdds);
  });
  return newScore;
};

export const hasBetsChanged = (previousBets, currentBets) => {
  let hasChanged = false;
  for (let i = 0; (i < previousBets.length && !hasChanged); i += 1) {
    const previousBet = previousBets[i];
    const currentBet = currentBets[i];
    if (previousBet.homeScore !== currentBet.homeScore
        || previousBet.awayScore !== currentBet.awayScore) {
      hasChanged = true;
    }
  }
  return hasChanged;
};

export const calculateTotalScore = (users, matches) => {
  let totalScore = 0;
  users.map((user) => {
    totalScore += calculateUserScore(user, matches);
  });
  return totalScore;
};

export const calculateTotalTime = (matches) => {
  let totalTime = 0;
  matches.map((match) => {
    const { matchTime } = match;
    if (matchTime === 'HT') {
      totalTime += 45;
    } else if (matchTime === 'FT') {
      totalTime += 90;
    } else {
      totalTime += matchTime;
    }
  });
  return totalTime;
};

export const getLeagueMatches = (matches, league) => matches.filter((match) => match.league === league);

export const getTeamImage = (team) => {
  switch (team) {
    case 'Barcelona':
      return Barcelona;
    case 'Sevillia':
      return Sevillia;
    case 'Celta Vigo':
      return CeltaVigo;
    case 'Getafe':
      return Getafe;
    case 'Granada':
      return Granada;
    case 'Valencia':
      return Valencia;
    case 'Villareal':
      return Villareal;
    case 'Leicester City':
      return Leicester;
    case 'Manchester City':
      return ManchesterCity;
    case 'Manchester United':
      return ManchesterUnited;
    case 'Aston Villa':
      return AstonVilla;
    case 'Tottenham':
      return Tottenham;
    case 'Chelsea':
      return Chelsea;
    case 'Real Madrid':
      return RealMadrid;
    case 'Juventus':
      return Juventus;
    case 'Liverpool':
      return Liverpool;
    case 'Arsenal':
      return Arsenal;
    default:
      return Barcelona;
  }
};

export const getShortTeamName = (team) => {
  switch (team) {
    case 'Manchester United':
      return 'Man. Utd';
    case 'Manchester City':
      return 'Man. City';
    case 'Leicester City':
      return 'Lei. City';
    default:
      return team;
  }
};

export const getShortDayName = (day) => {
  switch (day) {
    case 0:
      return 'Sun';
    case 1:
      return 'Mon';
    case 2:
      return 'The';
    case 3:
      return 'Wed';
    case 4:
      return 'Thu';
    case 5:
      return 'Fri';
    case 6:
      return 'Sat';
    default:
      return 'Sun';
  }
};
