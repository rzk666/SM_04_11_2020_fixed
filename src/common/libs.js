// Images
import Barcelona from '../static/images/teams/Barcelona.png';
import Sevillia from '../static/images/teams/Sevillia.png';
import Getafe from '../static/images/teams/Getafe.png';
import CeltaVigo from '../static/images/teams/CeltaVigo.png';
import Granada from '../static/images/teams/Granada.png';
import Valencia from '../static/images/teams/Valencia.png';
import Villareal from '../static/images/teams/Villareal.png';

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

export const calculateTotalScore = (users, matches) => {
  console.log(users);
  console.log(matches);
  let totalScore = 0;
  users.map((user) => {
    totalScore += calculateUserScore(user, matches);
  });
  return totalScore;
};

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
    default:
      return Barcelona;
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
