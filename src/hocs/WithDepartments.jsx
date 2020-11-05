import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// Components
import Loader from '../components/common/Loader';
// Redux Actions
import { fetchDepartments } from '../redux/models/globals/globalsActions';

const WithDepartmentsHOC = (ComposedComponent) => {
  const WithDepartments = (props) => {
    useEffect(() => {
      const { fetchDepartments } = props;
      fetchDepartments();
    }, []);
    const { globals } = props;
    const { isLoading } = globals;
    return (
      <>
        { isLoading ? <Loader /> : <ComposedComponent {...props} />}
      </>
    );
  };

  const mapStateToProps = (state) => ({
    globals: state.globals,
  });

  const mapDispatchToProps = (dispatch) => ({
    fetchDepartments: () => dispatch(fetchDepartments()),
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithDepartments);
};

export default WithDepartmentsHOC;
