import withLayout from './withLayout';
import withAuth from './withAuth';

// HOCs
const HOCS_MAP = {
  home: [withAuth, withLayout],
  adminLogin: [withAuth, withLayout],
  login: [withAuth, withLayout],
  profile: [withAuth, withLayout],
  joinLeague: [withAuth, withLayout],
};


export default HOCS_MAP;
