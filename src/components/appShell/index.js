import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Dialog } from "@blueprintjs/core";
import Routes from '../../pages/Routes'
import { appOperations } from '../../redux/app';
import { userOperations } from '../../redux/user';
import AppTitle from './components/appTitle';
import Login from './components/login';
import SearchBar from './components/searchBar';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import '@blueprintjs/labs/lib/css/blueprint-labs.css';
import './appShell.scss';

var auth;

class AppShell extends Component {
  constructor(props) {
    super(props);
    var userObj = props.dispatch(userOperations.getUser(userObj));
  }

  updateVal = (key, newVal) => {
    const { userInfo, dispatch } = this.props;
    let cpy = Object.assign({}, userInfo);
    cpy[key] = newVal
    return dispatch(userOperations.setUser(cpy));
  }

  toggleAppShell() {
    return this.props.dispatch(appOperations.toggleAppShellPopover());
  }

  submitUserInfo = () => {
    const { userInfo, dispatch } = this.props;
    dispatch(userOperations.toggleUserInfo());
    return dispatch(userOperations.submitUserInfo(userInfo));
  }

  render() {
    const {appName, logo, firstName, lastName, isUserInfoOpen} = this.props;
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
        <Dialog
          className="user_info"
          title="Update User Info"
          isOpen={isUserInfoOpen}
        >
          <div className="form">
            <div className="first">
              <div className="label">First Name: </div>
              <input className="value" type="text" placeholder="John/Jean..." onChange={(e) => this.updateVal("firstName", e.target.value)} />
            </div>
            <div className="last">
              <div className="label">Last Name: </div>
              <input className="value" type="text" placeholder="Smith..." onChange={(e) => this.updateVal("lastName", e.target.value)} />
            </div>
            <div className="buttons">
              <Button className="bp3-intent-primary submit-btn" onClick={() => this.submitUserInfo()} />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

AppShell.propTypes = {
  appName: PropTypes.string.isRequired,
  logo: PropTypes.string,
};

function mapStateToProps(state, props) {
  const { user } = state;
  return {
    userInfo: user.userInfo,
    firstName: user.userInfo.firstName,
    lastName: user.userInfo.lastName,
    isUserInfoOpen: user.isUserInfoOpen
  };
}

export default withRouter(connect(mapStateToProps)(AppShell));
