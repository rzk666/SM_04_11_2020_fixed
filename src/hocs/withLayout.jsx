import React from 'react';
import { connect } from 'react-redux';
// Components
import Layout from '../components/MainLayout/Layout';

export default (ComposedComponent) => {
  class WithLayout extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentSport: 'soccer',
      };
    }

    changeSport(sport) {
      this.setState({ currentSport: sport });
    }

    callbacks() {
      return {
        changeSport: this.changeSport.bind(this),
      };
    }

    render() {
      return (
        <Layout {...this.props} {...this.state}>
          <ComposedComponent {...this.callbacks()} {...this.props} {...this.state} />
        </Layout>
      );
    }
  }

  return WithLayout;
};
