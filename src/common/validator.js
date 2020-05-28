const ADMIN_LOGIN_VALIDATOR = {
  string: (data) => (!!data),
  password: (data) => (typeof (data) === 'string'),
};

export default ADMIN_LOGIN_VALIDATOR;
