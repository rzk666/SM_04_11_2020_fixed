import withLayout from './withLayout';
import withAuth from './withAuth';

// HOCs
const HOCS_MAP = {
  login: [withLayout],
  home: [withAuth, withLayout],
  admin: [withAuth, withLayout],
};


export default HOCS_MAP;
