import axios from 'axios';

class HttpRequest {
  constructor(token) {
    const options = token ? {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } : {};
    return axios.create(options);
  }
}

export default HttpRequest;
