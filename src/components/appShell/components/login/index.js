import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from '@blueprintjs/core';
import { userOperations } from '../../../../redux/user';

import './login.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    props.dispatch(userOperations.loginUser());
  }

  render() {
    return (
      <div className="cookApp_Login">
        <Button className="login_button" text="Log in" icon="user" />
      </div>
    );
  }
}

Login.propTypes = {};

function mapStateToProps(state, props) {
  return {};
}

export default withRouter(connect(mapStateToProps)(Login));
