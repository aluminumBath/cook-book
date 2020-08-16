import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import externalConfig from '../externalConfig';
import { appOperations } from '../redux/app';
import './Pages.scss';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    props.dispatch(appOperations.setNavRoute('/login'));
    this.state = {
      email: "",
      password: ""
    };
  }

  signIn = async () => {
    const { email, password } = this.state;
    try {
        const user = await Auth.signIn(email, password);
        console.log('!!!!!!user: ', user);
    } catch (error) {
        console.log('error signing in', error);
    }
  }

  updateVal = (key, newVal) => {
    return this.setState({
      ...this.state,
      [key]: newVal
    });
  }

  render() {
    return (
      <div id="app_base" className="cookApp_Login_Page">
        <div className="login bp3-card bp3-elevation-2">
          <img className="logo-pic" src={externalConfig.logo} />
          <div className="form">
            <h3>Sign In</h3>
            <div className="email">
              <div className="label">Email: </div>
              <input className="value" type="email" placeholder="Email..." onChange={(e) => this.updateVal("email", e.target.value)} />
            </div>
            <div className="password">
              <div className="label">Password: </div>
              <input className="value" type="password" placeholder="password" onChange={(e) => this.updateVal("password", e.target.value)} />
            </div>
            <button className="bp3-button signin" onClick={() => this.signIn()}>Sign In</button>
          </div>
        </div>
        <div className="create bp3-card bp3-elevation-2">
          <a href="/signup">Don't have an account?</a>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {};
}

export default withRouter(connect(mapStateToProps)(LoginPage));
