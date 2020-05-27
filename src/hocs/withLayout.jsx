import React from 'react';
import { connect } from 'react-redux';
import Layout from '../components/MainLayout/Layout';

export default (ComposedComponent) => {
  class WithLayout extends React.Component {
    componentDidMount() {
    }

    render() {
      return (
        <Layout {...this.props}>
          <ComposedComponent {...this.props} />
        </Layout>
      );
    }
  }

  const mapStateToProps = (state) => ({
  });

  const mapDispatchToProps = (dispatch) => ({
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithLayout);
};
