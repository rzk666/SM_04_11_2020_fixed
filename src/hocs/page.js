import { compose } from 'redux';
// Global HOCs
import { withRouter } from 'react-router-dom';
import { withCookies } from 'react-cookie';
// HOCs mapping
import HOCS_MAP from './hocsMap';

// TODO -> Also handle environments dynamicly (server\client only HOCs)

const globalHocs = compose(
  withCookies,
  withRouter,
);

const page = (Component, currentPage) => {
  const hocsToApply = HOCS_MAP[currentPage];
  let hocsList = ((a) => a); // Just a dummy function so we can compose
  hocsToApply.forEach((hoc) => {
    hocsList = compose(hocsList, hoc);
  });
  hocsList = compose(globalHocs, hocsList);
  return hocsList(Component);
};

export default page;
