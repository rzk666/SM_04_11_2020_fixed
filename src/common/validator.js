export const LOGIN_VALIDATOR = {
  email: (data) => (!!data),
  password: (data) => (typeof (data) === 'string'),
};
