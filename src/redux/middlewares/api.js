import { API, httpRequestAction } from '../api';

const api = ({ dispatch, getState }) => (next) => (action) => {
  console.log(action);
  if (action.type !== API) {
    return next(action);
  }
  httpRequestAction(action, dispatch, getState().auth.token);
};

export default api;
