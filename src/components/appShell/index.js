import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Routes from '../../pages/Routes'
import { appOperations } from '../../redux/app';

import AppTitle from './components/appTitle';
import Login from './components/login';
import SearchBar from './components/searchBar';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import '@blueprintjs/labs/lib/css/blueprint-labs.css';
import './appShell.scss';

class AppShell extends Component {
  toggleAppShell() {
    return this.props.dispatch(appOperations.toggleAppShellPopover());
  }

  render() {
    const {appName, logo} = this.props;
    return (
      <div className="cookApp_AppShell">
        <h1 className="cookApp_name_header">
          <AppTitle appName={appName} logo={logo} />
          <SearchBar />
          <Login />
        </h1>
        <div className="cookApp-body">
          <Routes className="cookApp-routes"/>
        </div>
      </div>
    );
  }
}

AppShell.propTypes = {
  appName: PropTypes.string.isRequired,
  logo: PropTypes.string,
};

function mapStateToProps(state, props) {
  return {};
}

export default withRouter(connect(mapStateToProps)(AppShell));
