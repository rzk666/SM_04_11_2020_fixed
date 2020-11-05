import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// Redux Actions
import fetchDeparments from '../redux/models/global';
// Components

const WithDepartmentsHOC = (ComposedComponent) => {
  const WithLayout = (props) => {
    useEffect(() => {
      fetchDepartments();
    }, []);
    return (
      <>
        <ComposedComponent {...props} />
      </>
    );
  };

  const mapStateToProps = (state) => ({
    globals: state.globals,
  });

  const mapDispatchToProps = (dispatch) => ({
    fetchDeparments: () => dispatch(fetchDeparments()),
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithLayout);
};

export default WithDepartmentsHOC;
