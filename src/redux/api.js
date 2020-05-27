/* eslint-disable no-unused-expressions */
// imports
import HttpRequest from '../util/HttpRequest';

// TYPE
export const API = 'API';

// ACTION
export const httpRequestAction = (action, dispatch, token) => {
  const {
    url,
    method = 'get',
    data = {},
    params = {},
    success,
    failure,
    loader,
  } = action.payload;

  const { base, endpoint } = url;
  !loader || dispatch(loader(true));
  const options = {
    method,
    url: base ? base + endpoint : endpoint,
  };
  if (Object.keys(data).length) { options.data = data; }
  if (Object.keys(params).length) { options.params = params; }
  return new HttpRequest(token)(options)
    .then((response) => dispatch(success(response.data)))
    .then(() => !loader || dispatch(loader(false)))
    .catch((e) => dispatch(failure(e)));
};
