const SERVER_PROTOCOL = process.env.REACT_APP_SEVER_PROTOCOL;
const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const config = {
  app: {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
  },
  server: {
    host: SERVER_HOST,
    protocol: SERVER_PROTOCOL,
  },
  api: {
    endpoint: API_ENDPOINT,
    url: `${SERVER_PROTOCOL}://${SERVER_HOST}/${API_ENDPOINT}`,
  },
};

export default config;
