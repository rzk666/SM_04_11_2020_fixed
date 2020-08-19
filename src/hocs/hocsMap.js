import withLayout from './withLayout';
import withAuth from './withAuth';
import withPusher from './withPusher';

// HOCs
const HOCS_MAP = {
  home: [withAuth, withLayout],
  adminLogin: [withAuth, withLayout],
  login: [withAuth, withLayout],
  profile: [withAuth, withLayout],
  joinLeague: [withAuth, withLayout],
  weeklyMatches: [],
  table: [withAuth, withLayout, withPusher],
  dashboard: [withPusher],
};


export default HOCS_MAP;
