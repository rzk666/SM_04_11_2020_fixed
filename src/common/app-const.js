const INITIAL_STATE = {
  auth: {
    isLoading: false,
    hasError: false,
    error: '',
    isLoggedIn: false,
    adminToken: '',
    user: {
      name: '',
      email: '',
      score: 0,
      balance: 0,
      achivments: [],
      notifications: 0,
      stats: {
        win: 0,
        lose: 0,
        totalWins: 0,
        leaguesPlayed: 0,
      },
    },
  },
  activeLeague: {
    currentLeague: 'Premier League',
    currentLeagueTable: {

    },
  },
};

export default INITIAL_STATE;
