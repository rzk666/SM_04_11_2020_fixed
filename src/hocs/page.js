import { compose } from 'redux';
// Add Global HOCs here
// HOCs mapping
import HOCS_MAP from './hocsMap';

const globalHocs = compose(
  /* Add imported global hocs here */
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

// ----- Quick Note ----- //
// I assume WithDepartments will not be a global HOC in this app,
// So we get it in the hocsMap
