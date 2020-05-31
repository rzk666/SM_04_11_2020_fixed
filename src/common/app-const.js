const INITIAL_STATE = {
  auth: {
    isLoading: false,
    hasError: false,
    error: '',
    isLoggedIn: false,
    userToken: '',
    adminToken: '',
  },
  assets: {
    isLoading: false,
    hasError: false,
    error: '',
    splash: [],
  },

};

export default INITIAL_STATE;
