import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import externalConfig from '../externalConfig';
import { appOperations } from '../redux/app';
import './Pages.scss';

class SignupPage extends Component {
  constructor(props) {
    super(props);
    props.dispatch(appOperations.setNavRoute('/signup'));
    this.state = {
      email: "",
      password: "",
      password2: "",
      firstName: "",
      lastName: ""
    };
  }

  signUp = async () => {
    const { password, email, firstName, lastName } = this.state;
    try {
      const attributes = (await Auth.currentSession()).getIdToken();
      const { user } = await Auth.currentUserInfo();
      const { attributes2 } = await Auth.currentAuthenticatedUser();
      console.log('!!!!!!user2: ', user);
      console.log('!!!!!!user3: ', attributes);
      console.log('!!!!!!user4: ', attributes2);
    } catch (error) {
      console.log('error signing up:', error);
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
      <div id="app_base" className="cookApp_Signup_Page">
        <div className="signup bp3-card bp3-elevation-2">
          <img className="logo-pic" src={externalConfig.logo} />
          <div className="form">
            <h3>Sign Up</h3>
            <div className="email">
              <div className="label">Email: </div>
              <input className="value" type="email" placeholder="Email..." onChange={(e) => this.updateVal("email", e.target.value)} />
            </div>
            <div className="password">
              <div className="label">Password: </div>
              <input className="value" type="password" placeholder="password" onChange={(e) => this.updateVal("password", e.target.value)} />
            </div>
            <div className="password">
              <div className="label">Confirm Password: </div>
              <input className="value" type="password" placeholder="password" onChange={(e) => this.updateVal("password2", e.target.value)} />
            </div>
            <div className="first">
              <div className="label">First Name: </div>
              <input className="value" type="text" placeholder="John/Jean..." onChange={(e) => this.updateVal("firstName", e.target.value)} />
            </div>
            <div className="last">
              <div className="label">Last Name: </div>
              <input className="value" type="text" placeholder="Smith..." onChange={(e) => this.updateVal("lastName", e.target.value)} />
            </div>
            <button className="bp3-button signin" onClick={() => this.signUp()} disabled={this.state.password!==this.state.password2 ||
              !this.state.email || this.state.email === "" ||
              !this.state.password || this.state.password === "" ||
              !this.state.firstName || this.state.firstName === "" ||
              !this.state.lastName || this.state.lastName === "" }>Sign Up</button>
          </div>
        </div>
        <div className="login bp3-card bp3-elevation-2">
          <a href="/login">Already have an account?</a>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {};
}

export default withRouter(connect(mapStateToProps)(SignupPage));
