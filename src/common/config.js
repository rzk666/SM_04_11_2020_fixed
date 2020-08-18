const SERVER_PROTOCOL = process.env.REACT_APP_SERVER_PROTOCOL;
const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

module.exports = {
  APP_CLUSTER: 'eu',
  APP_KEY: '69e08057e65fa63465ac',
  app: {
    port: process.env.REACT_APP_PORT,
    env: process.env.NODE_ENV,
    url: process.env.REACT_APP_URL,
  },
  server: {
    host: SERVER_HOST,
    protocol: SERVER_PROTOCOL,
  },
  api: {
    endpoint: process.env.REACT_APP_API_ENDPOINT,
    url: `${SERVER_PROTOCOL}://${SERVER_HOST}/${API_ENDPOINT}`,
    admin: `${SERVER_PROTOCOL}://${SERVER_HOST}/${API_ENDPOINT}/admin`,
  },
  credentials: {
  },
};
