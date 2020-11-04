import axios from 'axios';

// We assume we'll use the auth header with a token in our requests to the server
const HttpRequest = (token) => {
  const options = token
    ? {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    : {};
  return axios.create(options);
};

export default HttpRequest;
