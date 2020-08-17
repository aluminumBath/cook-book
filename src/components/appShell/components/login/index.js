import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from '@blueprintjs/core';
import { AmplifySignOut } from '@aws-amplify/ui-react';

import './login.scss';

class Login extends Component {
  render() {
    const { userInfo } = this.props;
    return (
      <div className="cookApp_Login"> {/* eslint-disable-next-line */}
        {!userInfo || !userInfo.email || userInfo.email === '' || !userInfo.email_verified && <Button className="login_button" text="Log in" icon="user" />}
        {userInfo && userInfo.email && userInfo.email !== '' && userInfo.email_verified &&
        <>
          <div className="welcome">Welcome {userInfo.email}</div>
          <AmplifySignOut className="amplify-signin"/>
        </>}
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
