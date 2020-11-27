import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from '@blueprintjs/core';
import { AmplifySignOut } from '@aws-amplify/ui-react';

import './login.scss';

class Login extends Component {
  render() {
    const { userInfo } = this.props;
    console.log('userInfo:', userInfo);
    const displayName = userInfo && userInfo.userName && userInfo.userName !== "" ? userInfo.userName : userInfo && userInfo.firstName && userInfo.firstName !== "" ?
      userInfo.firstName : userInfo && userInfo.email && userInfo.email !== "" ?
        userInfo.email : "Dev User";
    return (
      <div className="cookApp_Login"> {/*eslint-disable-next-line*/}
        {!userInfo || !userInfo.email &&
        <Button className="login_button" text="Log in" icon="user" />}
        <>
          <div className="welcome">Welcome {displayName}</div>
          {userInfo && userInfo.email && userInfo.email !== '' && userInfo.email_verified &&<AmplifySignOut className="amplify-signin"/>}
        </>
      </div>
    );
  }
}

Login.propTypes = {};

function mapStateToProps(state, props) {
  const { user } = state;
  return {
    userInfo: user.userInfo
  };
}

export default withRouter(connect(mapStateToProps)(Login));
